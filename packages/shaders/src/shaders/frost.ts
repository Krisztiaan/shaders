import type { vec4 } from '../types.js';
import type { ShaderMotionParams } from '../shader-mount.js';
import { type ShaderSizingParams, type ShaderSizingUniforms } from '../shader-sizing.js';
import { declarePI, textureRandomizerR, colorBandingFix } from '../shader-utils.js';

export const frostMeta = {
  maxColorCount: 6,
} as const;

/**
 * Frost / ice-crystal growth inspired shader — branching, crystalline patterns that "freeze" over time.
 *
 * Note: this is a stateless shader (single-pass) so the "growth" is an animated reveal of a
 * precomputed crystalline field (no history/ping-pong feedback).
 *
 * Fragment shader uniforms:
 * - u_time (float): Animation time
 * - u_scale (float): Overall zoom level, used for anti-aliasing calculations
 * - u_noiseTexture (sampler2D): Pre-computed randomizer source texture
 * - u_colorBack (vec4): Background color in RGBA
 * - u_colors (vec4[]): Up to 6 frost colors in RGBA
 * - u_colorsCount (float): Number of active frost colors
 * - u_coverage (float): How far the frost has progressed (0 to 1, multiplied by time-based growth)
 * - u_softness (float): Edge softness of the freezing front (0 to 1)
 * - u_detail (float): Crystal detail/frequency (0 to 1)
 * - u_crystal (float): Branching strength (0 to 1)
 * - u_intensity (float): Overall frost brightness (0 to 2)
 * - u_glow (float): Highlight/glow bleed amount (0 to 1)
 *
 * Vertex shader outputs (used in fragment shader):
 * - v_patternUV (vec2): UV coordinates for pattern with global sizing applied
 */
// language=GLSL
export const frostFragmentShader: string = `#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${frostMeta.maxColorCount}];
uniform float u_colorsCount;

uniform float u_coverage;
uniform float u_softness;
uniform float u_detail;
uniform float u_crystal;
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

float ridge(float n) {
  return 1.0 - abs(2.0 * n - 1.0);
}

vec4 gradient(float s) {
  float count = max(1.0, u_colorsCount);
  float mixer = clamp(s, 0.0, 1.0) * (count - 1.0);

  vec4 g = u_colors[0];
  g.rgb *= g.a;

  for (int i = 1; i < ${frostMeta.maxColorCount}; i++) {
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
  float detail = clamp(u_detail, 0.0, 1.0);
  float crystal = clamp(u_crystal, 0.0, 1.0);

  // Base coordinate scaling (v_patternUV is in pixel-ish units * 0.01).
  vec2 q = p * (0.55 + 1.8 * detail);

  // Domain warp for organic dendrites.
  vec2 w = vec2(
    fbm(q * 0.35 + vec2(0.0, 0.09 * t)),
    fbm(q * 0.35 + vec2(4.0, 0.07 * t))
  ) - 0.5;
  q += (0.75 * crystal) * 2.0 * w;

  float n0 = fbm(q * 0.45 + vec2(0.05 * t, 0.0));
  float n1 = fbm(q * 1.2 + vec2(0.0, 0.03 * t));

  // A ridged field, then a directional "branch" modulation using polar angle.
  float r = ridge(n1);
  float ang = atan(p.y, p.x);
  float branchFreq = 6.0 + 10.0 * crystal;
  float branches = abs(sin(branchFreq * ang + 6.0 * n0));
  branches = pow(1.0 - branches, 2.2);

  float dend = pow(clamp(r * branches, 0.0, 1.0), 1.15 + 2.6 * crystal);
  float filaments = pow(ridge(fbm(q * 2.4 + 3.0)), 1.5);

  float field = clamp(0.7 * dend + 0.3 * filaments, 0.0, 1.0);

  // Growth reveal: approaches u_coverage over time.
  float coverage = clamp(u_coverage, 0.0, 1.0);
  float progress = coverage * (1.0 - exp(-0.08 * max(0.0, t)));

  // Local variability for more natural spreading.
  float seed = fbm(p * 0.12 + vec2(0.0, 0.04 * t));
  float front = clamp(0.12 + 0.38 * clamp(u_softness, 0.0, 1.0), 0.02, 0.6);

  float freeze = smoothstep(progress - front, progress + front, field + 0.22 * seed);

  // Enhance crisp crystal ridges.
  float aa = max(0.001, fwidth(field) * (0.9 + 0.1 * u_scale));
  float ridgeEdge = smoothstep(0.55 - aa, 0.88 + aa, dend);
  float core = freeze * ridgeEdge;

  vec4 back = u_colorBack;
  back.rgb *= back.a;

  float intensity = clamp(u_intensity, 0.0, 2.0);
  float glow = clamp(u_glow, 0.0, 1.0);

  float s = clamp(0.85 * field + 0.25 * seed, 0.0, 1.0);
  vec3 frostCol = gradient(s).rgb * intensity;

  vec3 color = mix(back.rgb, frostCol, core);
  color += glow * 0.25 * freeze * frostCol;

  ${colorBandingFix}
  fragColor = vec4(color, 1.0);
}
`;

export interface FrostUniforms extends ShaderSizingUniforms {
  u_colorBack: vec4;
  u_colors: vec4[];
  u_colorsCount: number;
  u_coverage: number;
  u_softness: number;
  u_detail: number;
  u_crystal: number;
  u_intensity: number;
  u_glow: number;
  u_noiseTexture?: HTMLImageElement;
}

export interface FrostParams extends ShaderSizingParams, ShaderMotionParams {
  colorBack?: string;
  colors?: string[];
  coverage?: number;
  softness?: number;
  detail?: number;
  crystal?: number;
  intensity?: number;
  glow?: number;
}

