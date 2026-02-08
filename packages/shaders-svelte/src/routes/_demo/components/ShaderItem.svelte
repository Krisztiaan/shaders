<script lang="ts">
  import { resolve } from '$app/paths';
  import type { HomeShaderConfig } from '../home-thumbnails.js';

  let {
    name,
    image,
    url,
    pixelated = false,
    ShaderComponent,
    shaderConfig,
    alwaysLivePreview = false,
  }: HomeShaderConfig = $props();

  const webGlContextAttributes = {
    antialias: true,
    alpha: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
  } satisfies WebGLContextAttributes;

  let visibility = $state<'hidden' | 'visible' | 'fading-out'>('hidden');

  function setVisible(next: 'hidden' | 'visible' | 'fading-out') {
    visibility = next;
  }

  let canAnimate = $derived((shaderConfig as Record<string, unknown>)['speed'] !== 0);
</script>

<a
  href={resolve(url as `/${string}`)}
  class="item"
  onpointerenter={(event) => {
    if (event.pointerType !== 'touch') setVisible('visible');
  }}
  onpointerleave={(event) => {
    if (event.pointerType !== 'touch') setVisible('fading-out');
  }}
>
  <div
    class="card"
    data-pixelated={pixelated ? '' : undefined}
  >
    {#if alwaysLivePreview}
      <div class="always-live" style={`background: ${(shaderConfig.colorBack as string | undefined) ?? 'black'} url(${image}) center/cover`}>
        <ShaderComponent
          class="shader"
          style="width: 100%; height: 100%;"
          {...shaderConfig}
          speed={0}
          worldWidth={400}
          worldHeight={300}
          fit="contain"
          {webGlContextAttributes}
        />
      </div>
    {:else}
      <img class="preview" src={image} alt={`Preview of ${name}`} loading="eager" decoding="async" />
    {/if}

    {#if visibility !== 'hidden' && canAnimate}
      <ShaderComponent
        class="shader"
        style={`opacity: ${visibility === 'fading-out' ? 0 : 1}; filter: ${visibility === 'fading-out' ? 'blur(4px)' : 'none'}; transition: opacity 100ms ease-out, filter 100ms ease-out;`}
        {...shaderConfig}
        worldWidth={400}
        worldHeight={300}
        fit="contain"
        {webGlContextAttributes}
        ontransitionend={() => {
          if (visibility === 'fading-out') setVisible('hidden');
        }}
      />
    {/if}
  </div>
  <div class="name">{name}</div>
</a>

<style>
  .item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-decoration: none;
    outline: 0;
  }

  .card {
    position: relative;
    display: flex;
    aspect-ratio: 4 / 3;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 24px;
    background: rgba(240, 239, 228, 0.5);
    outline: 0;
    outline-offset: 4px;
    will-change: transform;
  }

  @media (prefers-color-scheme: dark) {
    .card {
      background: rgba(240, 239, 228, 0.08);
    }
  }

  .card:focus-visible {
    outline: 2px solid var(--color-focus);
  }

  .preview,
  :global(.shader),
  .always-live {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  [data-pixelated] .preview,
  [data-pixelated] :global(canvas) {
    image-rendering: pixelated;
  }

  .name {
    text-align: center;
    text-transform: lowercase;
  }
</style>
