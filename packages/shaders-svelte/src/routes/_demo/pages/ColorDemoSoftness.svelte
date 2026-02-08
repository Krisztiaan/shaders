<script lang="ts">
  import { ShaderMount, getShaderColorFromString } from '$lib';
  import CopyButton from '../components/CopyButton.svelte';
  import SiteHeader from '../components/SiteHeader.svelte';

  const install = 'npm i @paper-design/shaders-svelte';

  type Vec4 = [number, number, number, number];
  const maxColorCount = 10;

  const fragmentShader = `#version 300 es
precision mediump float;

uniform float u_pixelRatio;
uniform vec2 u_resolution;
uniform float u_time;

uniform float u_shape;
uniform float u_softness;
uniform vec4 u_colors[${maxColorCount}];
uniform float u_colorsCount;
uniform bool u_extraSides;
uniform float u_test;

out vec4 fragColor;


void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float ratio = u_resolution.x / u_resolution.y;

  float noise = (sin(gl_FragCoord.x * 1.2 + sin(gl_FragCoord.y * 1.2)) * .5 + .5);

  float shape = pow(uv.x, u_shape);


  float mixer = shape * (u_colorsCount - 1.);
  if (u_extraSides == true) {
    mixer = (shape - .5 / u_colorsCount) * u_colorsCount;
  }

  vec3 gradient = u_colors[0].rgb;

  for (int i = 1; i < ${maxColorCount}; i++) {
      if (i >= int(u_colorsCount)) break;
      float localT = clamp(mixer - float(i - 1), 0.0, 1.0);

      if (u_test == 0.) {

      } else if (u_test == 1.) {
        localT = smoothstep(.5 - .5 * u_softness, .5 + .5 * u_softness, localT);
      } else if (u_test == 2.) {
        localT = 1. / (1. + exp(-1. / (pow(u_softness, 4.) + 1e-3) * (localT - .5)));
      } else if (u_test == 3.) {
        localT = smoothstep(0., 1., localT);
        localT = 1. / (1. + exp(-1. / (pow(u_softness, 4.) + 1e-3) * (localT - .5)));
      }


      gradient = mix(gradient, u_colors[i].rgb, localT);
  }

  vec3 color = vec3(shape);
  if (uv.y < .5) {
   color = gradient;
  }

  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);

  fragColor = vec4(color, 1.);
}
`;

  let colors = $state<string[]>([
    'hsla(259, 29%, 73%, 1)',
    'hsla(263, 57%, 39%, 1)',
    'hsla(48, 73%, 84%, 1)',
    'hsla(295, 32%, 70%, 1)',
  ]);

  let shape = $state(1);
  let extraSides = $state(true);
  let test = $state(1);
  let softness = $state(0.5);

  const uniforms = $derived({
    u_colors: colors.map(getShaderColorFromString) as Vec4[],
    u_colorsCount: colors.length,
    u_shape: shape,
    u_softness: softness,
    u_extraSides: extraSides,
    u_test: test,
  });

  const blendingLabel = $derived.by(() => {
    if (test === 0) return 'simple linear interpolation';
    if (test === 1) return 'smoothstep (use softness control)';
    if (test === 2) return 'custom mixer (use softness control)';
    return 'custom mixer + smoothstep (use softness control)';
  });
</script>

<div class="container">
  <SiteHeader />

  <main class="main">
    <div class="header-row">
      <h1>Color Demo: Softness</h1>
    </div>

    <div class="stage">
      <div class="shader-wrap">
        <div class="overlay">{blendingLabel}</div>
        <ShaderMount class="fill" fragmentShader={fragmentShader} {uniforms} />
      </div>

      <aside class="panel">
        <div class="panel-title">Controls</div>
        <div class="panel-body">
          <label class="control">
            <span>shape</span>
            <input type="range" min="0" max="3" step="0.01" value={shape} oninput={(e) => (shape = e.currentTarget.valueAsNumber)} />
          </label>

          <label class="control checkbox">
            <input type="checkbox" checked={extraSides} onchange={(e) => (extraSides = e.currentTarget.checked)} />
            <span>extraSides</span>
          </label>

          <label class="control">
            <span>test</span>
            <input type="range" min="0" max="3" step="1" value={test} oninput={(e) => (test = e.currentTarget.valueAsNumber)} />
          </label>

          <label class="control">
            <span>softness</span>
            <input type="range" min="0" max="1" step="0.01" value={softness} oninput={(e) => (softness = e.currentTarget.valueAsNumber)} />
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
    position: relative;
    display: flex;
    aspect-ratio: 16 / 9;
    width: 100%;
    overflow: hidden;
  }

  :global(.fill) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .overlay {
    position: absolute;
    inset: calc(100% / 3) auto auto 0;
    padding: 8px;
    font-weight: 700;
    color: white;
    white-space: pre;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
    z-index: 1;
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

  .checkbox {
    display: flex;
    align-items: center;
    gap: 8px;
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
