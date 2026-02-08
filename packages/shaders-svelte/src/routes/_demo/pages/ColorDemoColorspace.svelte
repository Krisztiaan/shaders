<script lang="ts">
  import { ShaderMount, getShaderColorFromString } from '$lib';
  import CopyButton from '../components/CopyButton.svelte';
  import SiteHeader from '../components/SiteHeader.svelte';

  const install = 'npm i @paper-design/shaders-svelte';

  type Vec4 = [number, number, number, number];
  const maxColorCount = 7;

  const fragmentShader = `#version 300 es
precision mediump float;

uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_time;

uniform float u_colorSpace;
uniform vec4 u_colors[${maxColorCount}];
uniform float u_colorsCount;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

// magic numbers (and magic could be better tbh)
#define OKLCH_CHROMA_THRESHOLD .001
#define OKLCH_HUE_NEUTRALIZER -2.

vec3 srgbToLinear(vec3 srgb) {
    return pow(srgb, vec3(2.2));
}

vec3 linearToSrgb(vec3 linear) {
    return pow(linear, vec3(1.0/2.2));
}

vec3 LrgbToOklab(vec3 rgb) {
    float L = pow(0.4122214708 * rgb.r + 0.5363325363 * rgb.g + 0.0514459929 * rgb.b, 1.0 / 3.0);
    float M = pow(0.2119034982 * rgb.r + 0.6806995451 * rgb.g + 0.1073969566 * rgb.b, 1.0 / 3.0);
    float S = pow(0.0883024619 * rgb.r + 0.2817188376 * rgb.g + 0.6299787005 * rgb.b, 1.0 / 3.0);
    return vec3(
        0.2104542553 * L + 0.793617785 * M - 0.0040720468 * S,
        1.9779984951 * L - 2.428592205 * M + 0.4505937099 * S,
        0.0259040371 * L + 0.7827717662 * M - 0.808675766 * S
    );
}

vec3 OklabToLrgb(vec3 oklab) {
    float L = oklab.x;
    float a = oklab.y;
    float b = oklab.z;

    float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    float s_ = L - 0.0894841775 * a - 1.291485548 * b;

    float l = l_ * l_ * l_;
    float m = m_ * m_ * m_;
    float s = s_ * s_ * s_;

    return vec3(
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
    );
}

vec3 oklabToOklch(vec3 oklab) {
    float C = length(oklab.yz);
    float H = atan(oklab.z, oklab.y);
    if (C < OKLCH_CHROMA_THRESHOLD) {
      H = OKLCH_HUE_NEUTRALIZER;
    }
    return vec3(oklab.x, C, H);
}

vec3 oklchToOklab(vec3 oklch) {
    float a = oklch.y * cos(oklch.z);
    float b = oklch.y * sin(oklch.z);
    return vec3(oklch.x, a, b);
}

float mixHue(float h1, float h2, float mixer) {
    float delta = mod(h2 - h1 + PI, TWO_PI) - PI;
    return h1 + mixer * delta;
}

vec3 srgbToOklab(vec3 rgb) {
    return oklabToOklch(LrgbToOklab(srgbToLinear(rgb)));
}

vec3 oklabToSrgb(vec3 oklab) {
    return linearToSrgb(OklabToLrgb(oklchToOklab(oklab)));
}

vec3 mixOklabVector(vec3 color1, vec3 color2, float mixer) {
  color1.x = mix(color1.x, color2.x, mixer);
  color1.y = mix(color1.y, color2.y, mixer);
  if (color1.y > OKLCH_CHROMA_THRESHOLD && color2.y > OKLCH_CHROMA_THRESHOLD) {
    color1.z = mixHue(color1.z, color2.z, mixer);
  }
  return color1;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float mixer = uv.x * (u_colorsCount - 1.);
    vec3 color = vec3(0.);

    vec3 gradient = u_colors[0].rgb;
    if (u_colorSpace == 1.) {
      gradient = srgbToOklab(u_colors[0].rgb);
    }

    for (int i = 1; i < ${maxColorCount}; i++) {
      if (i >= int(u_colorsCount)) break;
      float localMixer = clamp(mixer - float(i - 1), 0., 1.);
      vec3 c = u_colors[i].rgb;
      if (u_colorSpace == 0.) {
        gradient = mix(gradient, c, localMixer);
      } else {
        c = srgbToOklab(u_colors[i].rgb);
        gradient = mixOklabVector(gradient, c, localMixer);
      }
    }

    if (u_colorSpace == 0.) {
      color = gradient;
    } else {
      color = oklabToSrgb(gradient);
    }

    fragColor = vec4(color, 1.);
}
`;

  let colors = $state<string[]>([
    'hsla(0, 100%, 50%, 1)',
    'hsla(240, 100%, 50%, 1)',
    'hsla(72, 76%, 20%, 1)',
    'hsla(259, 29%, 73%, 1)',
    'hsla(263, 57%, 39%, 1)',
    'hsla(48, 73%, 84%, 1)',
    'hsla(295, 32%, 70%, 1)',
  ]);

  let colorSpace = $state(1);

  const uniforms = $derived({
    u_colors: colors.map(getShaderColorFromString) as Vec4[],
    u_colorsCount: colors.length,
    u_colorSpace: colorSpace,
  });
</script>

<div class="container">
  <SiteHeader />

  <main class="main">
    <div class="header-row">
      <h1>Color Demo: Color Space</h1>
    </div>

    <div class="stage">
      <div class="shader-wrap">
        <div class="stack">
          <div class="stack-item">
            <span class="label">CSS OKLCH</span>
            <div class="fill" style={`background: linear-gradient(to right in oklch, ${colors.join(', ')})`}></div>
          </div>
          <div class="stack-item">
            <span class="label">Shader</span>
            <ShaderMount class="fill" fragmentShader={fragmentShader} {uniforms} />
          </div>
          <div class="stack-item">
            <span class="label">CSS Default</span>
            <div class="fill" style={`background: linear-gradient(to right, ${colors.join(', ')})`}></div>
          </div>
        </div>
      </div>

      <aside class="panel">
        <div class="panel-title">Controls</div>
        <div class="panel-body">
          <label class="control">
            <span>colorSpace</span>
            <input
              type="range"
              min="0"
              max="1"
              step="1"
              value={colorSpace}
              oninput={(e) => (colorSpace = e.currentTarget.valueAsNumber)}
            />
          </label>

          <div class="colors">
            <div class="colors-title">colors</div>
            {#each colors as color, idx (idx)}
              <div class="color-row">
                <input
                  class="color-text"
                  type="text"
                  value={color}
                  oninput={(e) => {
                    const next = [...colors];
                    next[idx] = e.currentTarget.value;
                    colors = next;
                  }}
                />
                <button
                  class="color-remove"
                  type="button"
                  onclick={() => {
                    colors = colors.filter((_, i) => i !== idx);
                  }}
                  aria-label={`Remove color ${idx + 1}`}
                >
                  −
                </button>
              </div>
            {/each}
            <button
              class="color-add"
              type="button"
              onclick={() => {
                if (colors.length >= maxColorCount) return;
                colors = [...colors, 'hsla(0, 0%, 100%, 1)'];
              }}
            >
              add color
            </button>
          </div>
        </div>
      </aside>
    </div>

    <div class="details">
      <section class="detail">
        <div class="detail-title">
          <h2>Installation</h2>
          <CopyButton class="icon-copy" text={install} aria-label="Copy install command" />
        </div>
        <pre class="code"><code>{install}</code></pre>
      </section>
    </div>
  </main>
</div>

<style>
  .container {
    margin: 0 auto;
    box-sizing: content-box;
    max-width: var(--max-w);
    padding: 0 var(--page-x) 96px;
  }

  .main {
    max-width: 1104px;
  }

  .header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid color-mix(in oklab, currentcolor 10%, transparent);
    height: 80px;
  }

  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 330;
    text-transform: lowercase;
  }

  .stage {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
  }

  @media (min-width: 64rem) {
    .stage {
      grid-template-columns: minmax(0, 1fr) 300px;
      gap: 32px;
      align-items: start;
    }
  }

  .shader-wrap {
    display: flex;
    aspect-ratio: 16 / 9;
    width: 100%;
  }

  .stack {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .stack-item {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  .label {
    position: absolute;
    inset: 0 auto auto 0;
    padding: 8px;
    font-weight: 700;
    color: white;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .fill {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .panel {
    display: none;
    border-radius: 16px;
    background: var(--color-backplate-1);
    box-shadow: var(--shadow-floating);
    padding-bottom: 10px;
    overflow: hidden;
  }

  @media (min-width: 64rem) {
    .panel {
      display: block;
      position: sticky;
      top: 16px;
    }
  }

  .panel-title {
    padding: 10px;
    font-family: var(--font-mono);
    font-size: 11px;
    cursor: default;
  }

  .panel-body {
    padding: 0 10px 10px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .control {
    display: grid;
    grid-template-columns: 1fr;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
  }

  .colors {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .colors-title {
    font-family: var(--font-mono);
    font-size: 12px;
  }

  .color-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 6px;
    align-items: center;
  }

  .color-text {
    font-family: var(--font-mono);
    padding: 6px 8px;
    border-radius: 8px;
    border: 1px solid color-mix(in oklab, currentcolor 20%, transparent);
    background: var(--color-backplate-2);
    color: inherit;
    outline: 0;
  }

  .color-remove,
  .color-add {
    appearance: none;
    border: 0;
    background: var(--color-backplate-2);
    border-radius: 8px;
    padding: 6px 10px;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 12px;
    color: inherit;
    outline: 0;
  }

  .details {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .detail {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .detail-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: lowercase;
  }

  :global(.icon-copy) {
    width: 32px;
    height: 32px;
    margin: -14px 0 -16px;
    border-radius: 10px;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: 0;
  }

  .code {
    margin: 0;
    width: 100%;
    overflow-x: auto;
    border-radius: 16px;
    background: var(--color-backplate-1);
    padding: 24px;
    color: var(--color-code);
  }
</style>
