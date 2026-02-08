import type { vec4 } from '../types.js';
import type { ShaderMotionParams } from '../shader-mount.js';
import { type ShaderSizingParams, type ShaderSizingUniforms } from '../shader-sizing.js';
import { declarePI, textureRandomizerR, colorBandingFix } from '../shader-utils.js';

export const rainMeta = {
  maxColorCount: 3,
} as const;

/**
 * Diagonal rain streaks with subtle variation. Works as a standalone mood shader or overlay (via transparent colorBack).
 *
 * Fragment shader uniforms:
 * - u_time (float): Animation time
 * - u_scale (float): Overall zoom level, used for anti-aliasing calculations
 * - u_noiseTexture (sampler2D): Pre-computed randomizer source texture
 * - u_colorBack (vec4): Background color in RGBA (set alpha to 0 for overlay)
 * - u_colors (vec4[]): Up to 3 rain colors in RGBA
 * - u_colorsCount (float): Number of active rain colors
 * - u_density (float): Drop density (0 to 1)
 * - u_angle (float): Angle in degrees (-80 to 80)
 * - u_length (float): Streak length (0 to 1)
 * - u_thickness (float): Streak thickness (0 to 1)
 * - u_speed (float): Speed multiplier (0 to 2)
 *
 * Vertex shader outputs (used in fragment shader):
 * - v_patternUV (vec2): UV coordinates for pattern with global sizing applied
 */
// language=GLSL
export const rainFragmentShader: string = `#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_scale;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${rainMeta.maxColorCount}];
uniform float u_colorsCount;

uniform float u_density;
uniform float u_angle;
uniform float u_length;
uniform float u_thickness;
uniform float u_speed;

in vec2 v_patternUV;

out vec4 fragColor;

${declarePI}
${textureRandomizerR}

vec4 gradient(float s) {
  float count = max(1.0, u_colorsCount);
  float mixer = clamp(s, 0.0, 1.0) * (count - 1.0);

  vec4 g = u_colors[0];
  g.rgb *= g.a;

  for (int i = 1; i < ${rainMeta.maxColorCount}; i++) {
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

mat2 rotate2D(float a) {
  return mat2(cos(a), -sin(a), sin(a), cos(a));
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 p = v_patternUV;

  // Work in a rotated space so rain is easy to draw as vertical segments.
  float ang = radians(clamp(u_angle, -80.0, 80.0));
  vec2 q = rotate2D(ang) * p;

  // Controls.
  float density = clamp(u_density, 0.0, 1.0);
  float len = clamp(u_length, 0.0, 1.0);
  float thick = clamp(u_thickness, 0.0, 1.0);
  float spd = clamp(u_speed, 0.0, 2.0);

  // Grid-based drops.
  float cols = mix(18.0, 70.0, density);
  float rows = cols;
  vec2 g = vec2(cols, rows);
  vec2 id = floor(q * g);
  vec2 f = fract(q * g);

  float r = randomR(id);
  float active = step(1.0 - density, r);

  // Per-column time offset and speed.
  float t = u_time * (0.35 + 1.15 * spd) + 6.0 * r;
  float y = fract(f.y + t);

  // Segment endpoints in cell space.
  float dropLen = mix(0.12, 0.95, len) * (0.55 + 0.75 * r);
  float y0 = y;
  float y1 = y + dropLen;

  // Distance to a vertical segment centered in the cell.
  float xCenter = 0.5 + 0.2 * (randomR(id + vec2(3.0, 9.0)) - 0.5);
  float d = sdSegment(f, vec2(xCenter, y0), vec2(xCenter, y1));

  float w = mix(0.055, 0.012, thick);
  float aa = max(0.001, fwidth(d) * (0.9 + 0.1 * u_scale));
  float a = active * (1.0 - smoothstep(w - aa, w + aa, d));

  // Fade streak head/tail.
  float head = smoothstep(0.0, 0.12, (y1 - f.y));
  float tail = smoothstep(0.0, 0.22, (f.y - y0));
  a *= head * tail;

  vec4 back = u_colorBack;
  back.rgb *= back.a;

  float cT = fract(r + 0.25 * randomR(id + vec2(13.0, 1.0)));
  vec3 dropCol = gradient(cT).rgb;

  // Overlay-friendly alpha composition.
  float dropAlpha = clamp(a, 0.0, 1.0);
  vec3 color = back.rgb + dropCol * dropAlpha;
  float opacity = clamp(back.a + dropAlpha, 0.0, 1.0);

  ${colorBandingFix}
  fragColor = vec4(color, opacity);
}
`;

export interface RainUniforms extends ShaderSizingUniforms {
  u_colorBack: vec4;
  u_colors: vec4[];
  u_colorsCount: number;
  u_density: number;
  u_angle: number;
  u_length: number;
  u_thickness: number;
  u_speed: number;
  u_noiseTexture?: HTMLImageElement;
}

export interface RainParams extends ShaderSizingParams, ShaderMotionParams {
  colorBack?: string;
  colors?: string[];
  density?: number;
  angle?: number;
  length?: number;
  thickness?: number;
  speedMultiplier?: number;
}

