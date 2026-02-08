import type { vec4 } from '../types.js';
import type { ShaderMotionParams } from '../shader-mount.js';
import { type ShaderSizingParams, type ShaderSizingUniforms } from '../shader-sizing.js';
import { declarePI, textureRandomizerR, colorBandingFix } from '../shader-utils.js';

export const smokeMeta = {
  maxColorCount: 5,
} as const;

/**
 * Wispy turbulent smoke plumes — advection-like motion with density falloff.
 *
 * Note: this is a single-pass, stateless approximation (no feedback/ping-pong simulation).
 *
 * Fragment shader uniforms:
 * - u_time (float): Animation time
 * - u_scale (float): Overall zoom level, used for anti-aliasing calculations
 * - u_noiseTexture (sampler2D): Pre-computed randomizer source texture
 * - u_colorBack (vec4): Background color in RGBA
 * - u_colors (vec4[]): Up to 5 smoke colors in RGBA (used as a gradient)
 * - u_colorsCount (float): Number of active smoke colors
 * - u_size (float): Pattern scale (0.01 to 7)
 * - u_density (float): Overall smoke amount (0 to 1)
 * - u_softness (float): Edge softness (0 to 1)
 * - u_turbulence (float): Turbulence strength (0 to 1)
 * - u_detail (float): Detail frequency (0 to 1)
 * - u_rise (float): Upward motion strength (0 to 2)
 * - u_wind (float): Sideways drift (-2 to 2)
 * - u_intensity (float): Color intensity (0 to 2)
 *
 * Vertex shader outputs (used in fragment shader):
 * - v_patternUV (vec2): UV coordinates for pattern with global sizing applied
 */
// language=GLSL
export const smokeFragmentShader: string = `#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${smokeMeta.maxColorCount}];
uniform float u_colorsCount;

uniform float u_size;
uniform float u_density;
uniform float u_softness;
uniform float u_turbulence;
uniform float u_detail;
uniform float u_rise;
uniform float u_wind;
uniform float u_intensity;

in vec2 v_patternUV;

out vec4 fragColor;

${declarePI}
${textureRandomizerR}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * valueNoise(p);
    p *= 2.0;
    a *= 0.55;
  }
  return v;
}

vec2 curl(vec2 p) {
  float e = 0.35;
  float n1 = fbm(p + vec2(0.0, e));
  float n2 = fbm(p - vec2(0.0, e));
  float n3 = fbm(p + vec2(e, 0.0));
  float n4 = fbm(p - vec2(e, 0.0));
  float dx = (n1 - n2) / (2.0 * e);
  float dy = (n3 - n4) / (2.0 * e);
  return vec2(dx, -dy);
}

vec4 gradient(float s) {
  float count = max(1.0, u_colorsCount);
  float mixer = clamp(s, 0.0, 1.0) * (count - 1.0);

  vec4 g = u_colors[0];
  g.rgb *= g.a;

  for (int i = 1; i < ${smokeMeta.maxColorCount}; i++) {
    if (i >= int(count)) break;
    float m = clamp(mixer - float(i - 1), 0.0, 1.0);
    float aa = fwidth(m);
    float sm = smoothstep(0.0 - aa, 1.0 + aa, m);
    vec4 c = u_colors[i];
    c.rgb *= c.a;
    g = mix(g, c, sm);
  }

  return g;
}

void main() {
  vec2 p = v_patternUV;

  float t = u_time;
  float size = max(0.0, u_size);

  // Pattern scaling in the same spirit as other shaders in this repo.
  p *= vec2(1.1, 1.0);
  p /= (.01 + .09 * size);

  float detail = clamp(u_detail, 0.0, 1.0);
  float turb = clamp(u_turbulence, 0.0, 1.0);

  // Advection-like coordinate flow (curl noise gives nice swirls).
  vec2 q = p;
  q.x += clamp(u_wind, -2.0, 2.0) * 0.25 * t;
  q.y += clamp(u_rise, 0.0, 2.0) * 0.45 * t;

  vec2 flow = curl(q * (0.35 + 0.8 * detail) + vec2(0.0, 0.25 * t));
  q += turb * 2.2 * flow;

  float n = fbm(q * (0.7 + 1.6 * detail) + vec2(0.0, 0.15 * t));
  float n2 = fbm(q * (1.9 + 2.8 * detail) + vec2(3.0, -0.12 * t));

  // Base plume mask: stronger toward the "bottom" with wavy sources across X.
  float y = clamp(p.y * 0.12 + 0.5, 0.0, 1.0);
  float sources = 0.55 + 0.45 * sin(0.55 * p.x + 2.0 * n2);
  float base = smoothstep(0.0, 0.55, 1.0 - y) * sources;

  float field = clamp(0.65 * n + 0.35 * n2, 0.0, 1.0);
  field = pow(field, 1.4);

  float density = clamp(u_density, 0.0, 1.0);
  float smoke = density * base * smoothstep(0.25, 0.95, field);

  // Softer edges.
  float softness = clamp(u_softness, 0.0, 1.0);
  float aa = max(0.001, fwidth(smoke) * (0.9 + 0.1 * u_scale));
  smoke = smoothstep(0.15 - (0.25 * softness) - aa, 0.65 + (0.25 * softness) + aa, smoke);

  // Fade out with height.
  smoke *= (0.35 + 0.65 * (1.0 - y));

  vec4 back = u_colorBack;
  back.rgb *= back.a;

  float intensity = clamp(u_intensity, 0.0, 2.0);

  float s = clamp(0.55 * field + 0.35 * n2 + 0.15 * sin(0.4 * t), 0.0, 1.0);
  vec3 smokeCol = gradient(s).rgb * intensity;

  vec3 color = mix(back.rgb, smokeCol, smoke);
  ${colorBandingFix}
  fragColor = vec4(color, 1.0);
}
`;

export interface SmokeUniforms extends ShaderSizingUniforms {
  u_colorBack: vec4;
  u_colors: vec4[];
  u_colorsCount: number;
  u_size: number;
  u_density: number;
  u_softness: number;
  u_turbulence: number;
  u_detail: number;
  u_rise: number;
  u_wind: number;
  u_intensity: number;
  u_noiseTexture?: HTMLImageElement;
}

export interface SmokeParams extends ShaderSizingParams, ShaderMotionParams {
  colorBack?: string;
  colors?: string[];
  size?: number;
  density?: number;
  softness?: number;
  turbulence?: number;
  detail?: number;
  rise?: number;
  wind?: number;
  intensity?: number;
}

