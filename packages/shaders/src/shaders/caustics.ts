import type { vec4 } from '../types.js';
import type { ShaderMotionParams } from '../shader-mount.js';
import { type ShaderSizingParams, type ShaderSizingUniforms } from '../shader-sizing.js';
import { declarePI, textureRandomizerR, colorBandingFix } from '../shader-utils.js';

export const causticsMeta = {
  maxColorCount: 5,
} as const;

/**
 * Swimming-pool style projected caustics — bright dancing networks of refracted light.
 *
 * Note: distinct from `waterFragmentShader`, which focuses on surface distortion. This shader
 * renders the caustic light pattern itself, intended as a background/overlay.
 *
 * Fragment shader uniforms:
 * - u_time (float): Animation time
 * - u_scale (float): Overall zoom level, used for anti-aliasing calculations
 * - u_noiseTexture (sampler2D): Pre-computed randomizer source texture
 * - u_colorBack (vec4): Background color in RGBA
 * - u_colors (vec4[]): Up to 5 highlight colors in RGBA
 * - u_colorsCount (float): Number of active highlight colors
 * - u_size (float): Pattern scale (0.01 to 7)
 * - u_distortion (float): Noise-driven warping strength (0 to 1)
 * - u_thickness (float): Thickness of light lines (0 to 1)
 * - u_contrast (float): Contrast of caustic lines (0 to 1)
 * - u_intensity (float): Overall brightness (0 to 2)
 * - u_glow (float): Additive glow bleed amount (0 to 1)
 *
 * Vertex shader outputs (used in fragment shader):
 * - v_patternUV (vec2): UV coordinates for pattern with global sizing applied
 */
// language=GLSL
export const causticsFragmentShader: string = `#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${causticsMeta.maxColorCount}];
uniform float u_colorsCount;

uniform float u_size;
uniform float u_distortion;
uniform float u_thickness;
uniform float u_contrast;
uniform float u_intensity;
uniform float u_glow;

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
  for (int i = 0; i < 4; i++) {
    v += a * valueNoise(p);
    p *= 2.0;
    a *= 0.55;
  }
  return v;
}

mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float getCausticNoise(vec2 uv, float t, float scale) {
  vec2 n = vec2(.1);
  vec2 N = vec2(.1);
  mat2 m = rotate2D(.5);
  for (int j = 0; j < 6; j++) {
    uv *= m;
    n *= m;
    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
    n += sin(q);
    N += cos(q) / scale;
    scale *= 1.1;
  }
  return (N.x + N.y + 1.);
}

vec4 gradient(float s) {
  float count = max(1.0, u_colorsCount);
  float mixer = clamp(s, 0.0, 1.0) * (count - 1.0);

  vec4 g = u_colors[0];
  g.rgb *= g.a;

  for (int i = 1; i < ${causticsMeta.maxColorCount}; i++) {
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

  // Scale coordinates into a comfortable range for the caustic function.
  p *= vec2(1.25, 1.0);
  p /= (.01 + .09 * max(0.0, u_size));

  // A little domain warping to add natural turbulence.
  float warp = clamp(u_distortion, 0.0, 1.0);
  vec2 w = vec2(fbm(p * 0.35 + vec2(0.0, 0.15 * t)), fbm(p * 0.35 + vec2(4.0, 0.12 * t))) - 0.5;
  p += warp * 1.35 * w;

  float c = getCausticNoise(p, 1.2 * t, 1.55);
  c += 0.65 * getCausticNoise(p * 1.15 + 0.2 * w, 0.9 * t, 2.05);
  c = c * c;

  float thickness = clamp(u_thickness, 0.0, 1.0);
  float contrast = clamp(u_contrast, 0.0, 1.0);

  // Caustic networks tend to be bright, thin ridges. A good approximation is
  // using the gradient magnitude of the caustic field.
  float grad = length(vec2(dFdx(c), dFdy(c)));
  grad *= (0.8 + 1.2 * max(0.0, u_size));

  float threshold = mix(0.20, 0.06, thickness);
  float aa = max(0.001, fwidth(grad) * (0.85 + 0.15 * u_scale));

  float core = smoothstep(threshold - aa, threshold + aa, grad);
  float halo = smoothstep(0.4 * threshold - aa, 1.35 * threshold + aa, grad);

  core = pow(core, mix(2.6, 0.9, contrast));
  halo = pow(halo, mix(2.1, 0.85, contrast));

  vec4 back = u_colorBack;
  back.rgb *= back.a;

  float colorT = fract(0.06 * p.x + 0.05 * p.y + 0.22 * fbm(p * 0.15 + vec2(0.2 * t, 0.0)));
  vec3 causticCol = gradient(colorT).rgb;

  float intensity = clamp(u_intensity, 0.0, 2.0);
  float glow = clamp(u_glow, 0.0, 1.0);

  vec3 color = mix(back.rgb, causticCol, intensity * core);
  color += glow * intensity * 0.45 * halo * causticCol;

  ${colorBandingFix}
  fragColor = vec4(color, 1.0);
}
`;

export interface CausticsUniforms extends ShaderSizingUniforms {
  u_colorBack: vec4;
  u_colors: vec4[];
  u_colorsCount: number;
  u_size: number;
  u_distortion: number;
  u_thickness: number;
  u_contrast: number;
  u_intensity: number;
  u_glow: number;
  u_noiseTexture?: HTMLImageElement;
}

export interface CausticsParams extends ShaderSizingParams, ShaderMotionParams {
  colorBack?: string;
  colors?: string[];
  size?: number;
  distortion?: number;
  thickness?: number;
  contrast?: number;
  intensity?: number;
  glow?: number;
}
