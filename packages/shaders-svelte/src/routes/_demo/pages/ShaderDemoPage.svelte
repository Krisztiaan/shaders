<script lang="ts">
  import type { Component as SvelteComponent } from 'svelte';
  import {
    auroraMeta,
    causticsMeta,
    dotOrbitMeta,
    heatmapMeta,
    meshGradientMeta,
    metaballsMeta,
    smokeRingMeta,
    swirlMeta,
    warpMeta,
  } from '$lib';
  import CopyButton from '../components/CopyButton.svelte';
  import SiteHeader from '../components/SiteHeader.svelte';

  type Preset = { name: string; params: Record<string, unknown> };

  let {
    slug,
    title,
    importName,
    ShaderComponent,
    presets,
    sampleImageSet,
  } = $props<{
    slug: string;
    title: string;
    importName: string;
    ShaderComponent: SvelteComponent<any>;
    presets: ReadonlyArray<Preset>;
    sampleImageSet?: 'image-filters' | 'logos';
  }>();

  const webGlContextAttributes = {
    antialias: true,
    alpha: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
  } satisfies WebGLContextAttributes;

  const imageFilterFiles = [
    '001.webp',
    '002.webp',
    '003.webp',
    '004.webp',
    '005.webp',
    '006.webp',
    '007.webp',
    '008.webp',
    '009.webp',
    '0010.webp',
    '0011.webp',
    '0012.webp',
    '0013.webp',
    '0014.webp',
    '0015.webp',
    '0016.webp',
    '0017.webp',
    '0018.webp',
  ] as const;

  const logoFiles = [
    'contra.svg',
    'apple.svg',
    'paradigm.svg',
    'paper-logo-only.svg',
    'brave.svg',
    'capy.svg',
    'infinite.svg',
    'linear.svg',
    'mercury.svg',
    'mymind.svg',
    'resend.svg',
    'shopify.svg',
    'wealth-simple.svg',
    'chanel.svg',
    'cibc.svg',
    'cloudflare.svg',
    'discord.svg',
    'nasa.svg',
    'nike.svg',
    'volkswagen.svg',
    'diamond.svg',
  ] as const;

  const install = 'npm i @paper-design/shaders-svelte';

  const maxColorCountBySlug: Partial<Record<string, number>> = {
    aurora: auroraMeta.maxColorCount,
    caustics: causticsMeta.maxColorCount,
    'mesh-gradient': meshGradientMeta.maxColorCount,
    'dot-orbit': dotOrbitMeta.maxColorCount,
    metaballs: metaballsMeta.maxColorCount,
    'smoke-ring': smokeRingMeta.maxColorCount,
    swirl: swirlMeta.maxColorCount,
    warp: warpMeta.maxColorCount,
    heatmap: heatmapMeta.maxColorCount,
  };

  let defaultParams = $derived(presets[0]?.params ?? {});

  function buildInitialParams(p: Record<string, unknown>): Record<string, unknown> {
    const next = { ...p };

    if (sampleImageSet === 'image-filters' && 'image' in next && !next['image']) {
      next['image'] = '/images/image-filters/0018.webp';
    }

    if (sampleImageSet === 'logos' && 'image' in next && !next['image']) {
      next['image'] = '/images/logos/diamond.svg';
    }

    if ((slug === 'heatmap' || slug === 'liquid-metal') && !('suspendWhenProcessingImage' in next)) {
      next['suspendWhenProcessingImage'] = true;
    }

    return next;
  }

  let params = $state<Record<string, any>>({});
  let initialized = $state(false);
  let canStartResize = $state(false);
  let currentUrl = $state('');

  $effect(() => {
    if (typeof window === 'undefined') return;
    currentUrl = window.location.href.split('#')[0] ?? '';
  });

  $effect(() => {
    if (initialized) return;
    params = buildInitialParams(defaultParams);
    initialized = true;
  });

  function applyPreset(preset: Preset) {
    params = buildInitialParams(preset.params);
  }

  function setNumber(key: string, value: number) {
    params[key] = value;
  }

  function setString(key: string, value: string) {
    params[key] = value;
  }

  function setBoolean(key: string, value: boolean) {
    params[key] = value;
  }

  function isHexColor(value: unknown): value is string {
    return typeof value === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
  }

  function cycleImage() {
    if (!sampleImageSet) return;
    const list = sampleImageSet === 'logos' ? logoFiles : imageFilterFiles;
    const current = typeof params.image === 'string' ? (params.image as string) : '';
    const currentName = current.split('/').pop();
    const currentIdx = currentName ? list.indexOf(currentName as never) : -1;
    const nextIdx = (currentIdx + 1) % list.length;
    const nextName = list[nextIdx];
    params.image = sampleImageSet === 'logos' ? `/images/logos/${nextName}` : `/images/image-filters/${nextName}`;
  }

  function formatAttr(key: string, value: unknown): string {
    if (value === true) return key;
    if (value === false) return `${key}={false}`;
    if (typeof value === 'string') return `${key}="${value}"`;
    if (typeof value === 'number') {
      const formattedNumber = Number.isInteger(value) ? value : Number.parseFloat(value.toFixed(2));
      return `${key}={${formattedNumber}}`;
    }
    if (Array.isArray(value)) return `${key}={[${value.map((v) => JSON.stringify(v)).join(', ')}]}`;
    if (typeof value === 'object') return `${key}={${JSON.stringify(value)}}`;
    return `${key}={${JSON.stringify(value)}}`;
  }

  let codeImageUrl = $derived(
    sampleImageSet === 'logos'
      ? 'https://shaders.paper.design/images/logos/diamond.svg'
      : 'https://shaders.paper.design/images/image-filters/0018.webp'
  );

  let code = $derived.by(() => {
    const ignored = new Set([
      'worldWidth',
      'worldHeight',
      'width',
      'height',
      'minPixelRatio',
      'maxPixelCount',
      'webGlContextAttributes',
      'class',
      'style',
    ]);

    const hasImageProp = 'image' in defaultParams;

    const attrs = Object.entries(params)
      .filter(([key, value]) => {
        if (ignored.has(key)) return false;
        if (key === 'image') return false;
        if (key === 'frame' && value === 0) return false;
        if (key === 'rotation' && value === 0) return false;
        if ((key === 'offsetX' || key === 'offsetY') && value === 0) return false;
        if (key === 'scale' && value === 1) return false;

        const def = (defaultParams as Record<string, unknown>)[key];
        if (Array.isArray(value) && Array.isArray(def)) return JSON.stringify(value) !== JSON.stringify(def);
        if (typeof value === 'object' && typeof def === 'object') return JSON.stringify(value) !== JSON.stringify(def);
        return value !== def;
      })
      .map(([key, value]) => formatAttr(key, value))
      .join('\n  ');

    const imageAttr = hasImageProp ? `\n  image=\"${codeImageUrl}\"` : '';
    const propsBlock = attrs ? `\n  ${attrs}` : '';

    return `import { ${importName} } from '@paper-design/shaders-svelte';\n\n<${importName}\n  width={1280}\n  height={720}${imageAttr}${propsBlock}\n/>`;
  });

  let maxColorCount = $derived(maxColorCountBySlug[slug] ?? 10);
</script>

<div class="container">
  <SiteHeader />

  <main class="main">
    <div class="header-row">
      <h1>{title}</h1>
      <div class="header-actions">
        <CopyButton class="header-copy" text={currentUrl} aria-label="Copy link">
          copy link
        </CopyButton>
      </div>
    </div>

    <div class="stage">
      {#if initialized}
        <div
          class="shader-wrap"
          role="presentation"
          onpointermove={(event) => (canStartResize = event.altKey)}
          onpointerleave={() => (canStartResize = false)}
        >
          <div class="shader-resizable" data-resizable={canStartResize ? '' : undefined}>
            {#if sampleImageSet}
              <button type="button" class="shader-inner" onclick={cycleImage} aria-label="Change sample image">
                <ShaderComponent class="shader" style="width: 100%; height: 100%;" {...params} {webGlContextAttributes} />
              </button>
            {:else}
              <div class="shader-inner">
                <ShaderComponent class="shader" style="width: 100%; height: 100%;" {...params} {webGlContextAttributes} />
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <div class="shader-wrap" aria-hidden="true"></div>
      {/if}

      <aside class="panel">
        <div class="panel-title">Presets</div>
        <div class="panel-body">
          <div class="preset-buttons">
            {#each presets as preset (preset.name)}
              <button class="preset" type="button" onclick={() => applyPreset(preset)}>{preset.name}</button>
            {/each}
          </div>

          <div class="controls">
            {#if sampleImageSet}
              <button class="control" type="button" onclick={cycleImage}>change sample image</button>
            {/if}

            {#if typeof params.speed === 'number'}
              <label class="control">
                <span>speed</span>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.01"
                  value={params.speed}
                  oninput={(e) => setNumber('speed', e.currentTarget.valueAsNumber)}
                />
              </label>
            {/if}

            {#if typeof params.scale === 'number'}
              <label class="control">
                <span>scale</span>
                <input
                  type="range"
                  min="0.01"
                  max="4"
                  step="0.01"
                  value={params.scale}
                  oninput={(e) => setNumber('scale', e.currentTarget.valueAsNumber)}
                />
              </label>
            {/if}

            {#if typeof params.rotation === 'number'}
              <label class="control">
                <span>rotation</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={params.rotation}
                  oninput={(e) => setNumber('rotation', e.currentTarget.valueAsNumber)}
                />
              </label>
            {/if}

            {#if typeof params.offsetX === 'number'}
              <label class="control">
                <span>offsetX</span>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={params.offsetX}
                  oninput={(e) => setNumber('offsetX', e.currentTarget.valueAsNumber)}
                />
              </label>
            {/if}

            {#if typeof params.offsetY === 'number'}
              <label class="control">
                <span>offsetY</span>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={params.offsetY}
                  oninput={(e) => setNumber('offsetY', e.currentTarget.valueAsNumber)}
                />
              </label>
            {/if}

            {#if typeof params.fit === 'string'}
              <label class="control">
                <span>fit</span>
                <select value={params.fit} onchange={(e) => setString('fit', e.currentTarget.value)}>
                  <option value="contain">contain</option>
                  <option value="cover">cover</option>
                </select>
              </label>
            {/if}

            {#if Array.isArray(params.colors)}
              <div class="colors">
                <div class="colors-title">colors</div>
                <div class="colors-list">
                  {#each params.colors as color, idx (idx)}
                    <div class="color-row">
                      {#if isHexColor(color)}
                        <input
                          class="color-swatch"
                          type="color"
                          value={color}
                          oninput={(e) => {
                            const next = [...params.colors];
                            next[idx] = e.currentTarget.value;
                            params.colors = next;
                          }}
                          aria-label={`Color ${idx + 1}`}
                        />
                      {/if}
                      <input
                        class="color-text"
                        type="text"
                        value={color}
                        oninput={(e) => {
                          const next = [...params.colors];
                          next[idx] = e.currentTarget.value;
                          params.colors = next;
                        }}
                      />
                      <button
                        class="color-remove"
                        type="button"
                        onclick={() => {
                          const next = params.colors.filter((_: unknown, i: number) => i !== idx);
                          params.colors = next;
                        }}
                        aria-label={`Remove color ${idx + 1}`}
                      >
                        −
                      </button>
                    </div>
                  {/each}
                </div>
                <button
                  class="color-add"
                  type="button"
                  onclick={() => {
                    if (params.colors.length >= maxColorCount) return;
                    params.colors = [...params.colors, '#ffffff'];
                  }}
                >
                  add color
                </button>
              </div>
            {/if}

            {#if typeof params.colorBack === 'string'}
              <label class="control">
                <span>colorBack</span>
                <input
                  type="text"
                  value={params.colorBack}
                  oninput={(e) => setString('colorBack', e.currentTarget.value)}
                />
              </label>
            {/if}

            {#if typeof params.extraSides === 'boolean'}
              <label class="control checkbox">
                <input type="checkbox" checked={params.extraSides} onchange={(e) => setBoolean('extraSides', e.currentTarget.checked)} />
                <span>extraSides</span>
              </label>
            {/if}
          </div>
        </div>
      </aside>
    </div>

    {#if sampleImageSet}
      <div class="hint">Click the shader to change the sample image</div>
    {/if}

    <div class="details">
      <section class="detail">
        <div class="detail-title">
          <h2>Installation</h2>
          <CopyButton class="icon-copy" text={install} aria-label="Copy install command" />
        </div>
        <pre class="code"><code>{install}</code></pre>
      </section>

      <section class="detail">
        <div class="detail-title">
          <h2>Code</h2>
          <CopyButton class="icon-copy" text={code} aria-label="Copy code snippet" />
        </div>
        <pre class="code custom-scrollbar"><code>{code}</code></pre>
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

  @media (prefers-color-scheme: dark) {
    .header-row {
      border-top-color: color-mix(in oklab, currentcolor 20%, transparent);
    }
  }

  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 330;
    text-transform: lowercase;
  }

  .header-actions {
    display: none;
    align-items: center;
    gap: 24px;
  }

  @media (min-width: 64rem) {
    .header-actions {
      display: flex;
    }
  }

  :global(.header-copy) {
    display: flex;
    height: 32px;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    margin: 0 -8px;
    border-radius: 8px;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: 0;
    transition: background-color 120ms ease;
  }

  :global(.header-copy:hover) {
    background: var(--color-backplate-2);
  }

  :global(.header-copy:active) {
    background: var(--color-backplate-3);
  }

  :global(.header-copy:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .stage {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    position: relative;
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
    aspect-ratio: 4 / 3;
  }

  @media (min-width: 28rem) {
    .shader-wrap {
      aspect-ratio: 3 / 2;
    }
  }

  @media (min-width: 48rem) {
    .shader-wrap {
      aspect-ratio: 16 / 9;
    }
  }

  .shader-resizable {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .shader-resizable[data-resizable] {
    resize: both;
  }

  .shader-inner {
    width: 100%;
    height: 100%;
    overflow: hidden;
    appearance: none;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
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

  .preset-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .preset {
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

  .preset:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .controls {
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
    color: inherit;
  }

  .control input[type='range'] {
    width: 100%;
  }

  .control input[type='text'],
  .control select {
    font-family: var(--font-mono);
    padding: 6px 8px;
    border-radius: 8px;
    border: 1px solid color-mix(in oklab, currentcolor 20%, transparent);
    background: var(--color-backplate-2);
    color: inherit;
    outline: 0;
  }

  .control input[type='text']:focus-visible,
  .control select:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
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

  .colors-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .color-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 6px;
    align-items: center;
  }

  .color-swatch {
    width: 32px;
    height: 26px;
    border: 0;
    padding: 0;
    background: transparent;
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

  .color-remove:focus-visible,
  .color-add:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .hint {
    margin: 16px auto 48px;
    width: fit-content;
    font-size: 16px;
    color: color-mix(in oklab, currentcolor 70%, transparent);
    user-select: none;
    text-align: center;
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

  :global(.icon-copy:hover) {
    background: var(--color-backplate-1);
  }

  :global(.icon-copy:active) {
    background: var(--color-backplate-2);
  }

  :global(.icon-copy:focus-visible) {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
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
