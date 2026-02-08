import type { vec4 } from '../types.js';
import type { ShaderMotionParams } from '../shader-mount.js';
import { type ShaderSizingParams, type ShaderSizingUniforms } from '../shader-sizing.js';
import { declarePI, colorBandingFix } from '../shader-utils.js';

export const auroraMeta = {
  maxColorCount: 7,
} as const;

/**
 * Aurora borealis inspired shader — shimmering vertical curtains of color with
 * soft glow bleeding and gentle folding motion. Designed for animated backgrounds.
 *
 * Fragment shader uniforms:
 * - u_time (float): Animation time
 * - u_scale (float): Overall zoom level (for anti-aliasing calculations)
 * - u_noiseTexture (sampler2D): Pre-computed randomizer source texture
 * - u_colors (vec4[]): Up to 7 aurora colors in RGBA
 * - u_colorsCount (float): Number of active colors
 * - u_colorBack (vec4): Background color
 * - u_intensity (float): Overall brightness (0 to 2)
 * - u_softness (float): Stripe softness (0 to 1)
 * - u_glow (float): Glow bleeding strength (0 to 1)
 * - u_bands (float): Stripe frequency (0.1 to 10)
 * - u_distortion (float): Curtain sway/distortion strength (0 to 1)
 *
 * Vertex shader outputs (used in fragment shader):
 * - v_patternUV (vec2): UV coordinates for pattern with global sizing applied
 */
// language=GLSL
export const auroraFragmentShader: string = `#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${auroraMeta.maxColorCount}];
uniform float u_colorsCount;

uniform float u_intensity;
uniform float u_softness;
uniform float u_glow;
uniform float u_bands;
uniform float u_distortion;

in vec2 v_patternUV;

out vec4 fragColor;

${declarePI}

float randomR(vec2 p) {
  vec2 uv = floor(p) / 100. + .5;
  return texture(u_noiseTexture, fract(uv)).r;
}

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
  for (int i = 0; i < 4; i++) {
    v += a * valueNoise(p);
    p *= 2.0;
    a *= 0.55;
  }
  return v;
}

vec4 gradient(float s) {
  float count = max(1.0, u_colorsCount);
  float mixer = clamp(s, 0.0, 1.0) * (count - 1.0);

  vec4 g = u_colors[0];
  g.rgb *= g.a;

  for (int i = 1; i < ${auroraMeta.maxColorCount}; i++) {
    if (i >= int(count)) break;
    float m = clamp(mixer - float(i - 1), 0.0, 1.0);
    float aa = fwidth(m);
    float sm = smoothstep(0.0 - aa, 1.0 + aa, m);
    sm = mix(m, sm, clamp(u_softness, 0.0, 1.0));

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    g = mix(g, c, sm);
  }

  return g;
}

void main() {
  vec2 p = v_patternUV;

  // Normalize-ish Y into 0..1 (bottom..top)
  float yn = clamp(p.y * 0.15 + 0.5, 0.0, 1.0);

  float t = 0.08 * (u_time + 100.0);

  // A slowly varying boundary for where the aurora fades out toward the bottom.
  float boundaryNoise = fbm(vec2(p.x * 0.15, t * 0.25));
  float boundary = 0.35 + 0.35 * boundaryNoise;
  float verticalMask = smoothstep(boundary - 0.25, boundary, yn);

  // Curtain field: shimmering vertical rays with y-dependent sway.
  float bands = max(0.1, u_bands);
  float x = p.x * bands;

  float n = fbm(vec2(0.12 * x, 0.9 * t));
  float n2 = fbm(vec2(0.35 * x + 4.0, 0.55 * p.y - 1.2 * t));

  float sway = sin(0.6 * p.y + 1.6 * t + 7.0 * n2);
  float fold = (fbm(vec2(0.06 * x, 0.12 * p.y + 0.8 * t)) - 0.5);

  float rayX = x + u_distortion * (2.2 * sway + 2.6 * fold);

  float cell = fract(rayX);
  float ray = 1.0 - abs(cell - 0.5) * 2.0;
  ray = clamp(ray, 0.0, 1.0);

  float softness = clamp(u_softness, 0.0, 1.0);
  float core = pow(ray, mix(10.0, 2.2, softness));
  float halo = pow(ray, 1.2);

  float shimmer = 0.65 + 0.35 * sin(2.4 * t + 0.35 * p.y + 6.0 * n + 4.0 * n2);
  float a = mix(halo, core, 0.7) * shimmer;
  a *= verticalMask;
  a *= (0.35 + 0.65 * yn);
  a *= clamp(u_intensity, 0.0, 2.0);
  a = clamp(a, 0.0, 1.0);

  // Color along the curtains.
  float s = fract(0.06 * rayX + 0.55 * yn + 0.55 * n2 + 0.04 * sin(t + 0.12 * x));
  vec4 g = gradient(s);

  vec3 bg = u_colorBack.rgb * u_colorBack.a;
  vec3 col = g.rgb;

  // Glow bleed — boost the halo in a soft, additive way.
  float glow = clamp(u_glow, 0.0, 1.0);
  col *= (1.0 + glow * 1.25 * pow(a, 0.5));

  vec3 color = mix(bg, col, a);
  ${colorBandingFix}
  fragColor = vec4(color, 1.0);
}
`;

export interface AuroraUniforms extends ShaderSizingUniforms {
  u_colorBack: vec4;
  u_colors: vec4[];
  u_colorsCount: number;
  u_intensity: number;
  u_softness: number;
  u_glow: number;
  u_bands: number;
  u_distortion: number;
  u_noiseTexture?: HTMLImageElement;
}

export interface AuroraParams extends ShaderSizingParams, ShaderMotionParams {
  colorBack?: string;
  colors?: string[];
  intensity?: number;
  softness?: number;
  glow?: number;
  bands?: number;
  distortion?: number;
}
