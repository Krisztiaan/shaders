<script lang="ts">
  import type { Component } from 'svelte';
  import {
    ColorPanels,
    DotOrbit,
    FlutedGlass,
    GodRays,
    GrainGradient,
    MeshGradient,
    PaperTexture,
    SmokeRing,
    Swirl,
    Warp,
  } from '../lib/index.js';

  const webGlContextAttributes = {
    antialias: true,
    alpha: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
  } satisfies WebGLContextAttributes;

  const demoSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0b1020"/>
          <stop offset="0.45" stop-color="#402060"/>
          <stop offset="1" stop-color="#00d4ff"/>
        </linearGradient>
        <radialGradient id="r" cx="35%" cy="30%" r="75%">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#g)"/>
      <circle cx="420" cy="260" r="360" fill="url(#r)"/>
      <circle cx="920" cy="640" r="420" fill="url(#r)"/>
      <g opacity="0.25">
        <path d="M0 660 C 240 560, 420 820, 680 720 S 1080 640, 1200 720 V 900 H 0 Z" fill="#000000"/>
      </g>
    </svg>
  `.trim();
  const demoImageUrl = `data:image/svg+xml,${encodeURIComponent(demoSvg)}`;

  type Demo = {
    id: string;
    name: string;
    description: string;
    speed: number;
    Component: Component<any>;
    props?: Record<string, unknown>;
  };

  const demos: Demo[] = [
    {
      id: 'mesh-gradient',
      name: 'MeshGradient',
      description: 'Flowing composition of color spots with organic distortion.',
      speed: 0.2,
      Component: MeshGradient,
      props: {
        colors: ['#e0eaff', '#241d9a', '#f75092', '#9f50d3'],
        distortion: 0.8,
        swirl: 0.2,
        grainOverlay: 0.15,
      },
    },
    {
      id: 'smoke-ring',
      name: 'SmokeRing',
      description: 'Radial multi-colored gradient shaped with layered noise.',
      speed: 0.15,
      Component: SmokeRing,
      props: {
        colors: ['#ff3b81', '#4e5cff', '#00e5ff'],
        softness: 0.6,
        grainMixer: 0.1,
      },
    },
    {
      id: 'dot-orbit',
      name: 'DotOrbit',
      description: 'Orbiting dots pattern with up to 40 colors.',
      speed: 0.35,
      Component: DotOrbit,
      props: {
        colors: ['#d2822d', '#0c3b7e', '#b31a57', '#37a066'],
        colorBack: '#0b0b0f',
        scale: 0.55,
      },
    },
    {
      id: 'warp',
      name: 'Warp',
      description: 'Warped animated color fields over base patterns.',
      speed: 0.2,
      Component: Warp,
      props: {
        colors: ['#f8ff7a', '#ff4bd8', '#5a4bff', '#00e0ff'],
        pattern: 'split',
        softness: 0.85,
        distortion: 0.6,
        swirl: 0.2,
      },
    },
    {
      id: 'grain-gradient',
      name: 'GrainGradient',
      description: 'Multi-color gradients with grainy distortion.',
      speed: 0.12,
      Component: GrainGradient,
      props: {
        shape: 'waves',
        colors: ['#0d1321', '#1d2d44', '#3e5c76', '#748cab', '#f0ebd8'],
        grain: 0.2,
      },
    },
    {
      id: 'swirl',
      name: 'Swirl',
      description: 'Twisting animated bands of color.',
      speed: 0.18,
      Component: Swirl,
      props: {
        colors: ['#ff4d6d', '#ffd166', '#06d6a0', '#118ab2'],
        softness: 0.7,
      },
    },
    {
      id: 'paper-texture',
      name: 'PaperTexture',
      description: 'Paper-like texture with noise and crumples.',
      speed: 0.08,
      Component: PaperTexture,
      props: {
        colorFront: '#f6f3ea',
        colorBack: '#c7c0b0',
        contrast: 1.1,
        roughness: 0.7,
      },
    },
    {
      id: 'fluted-glass',
      name: 'FlutedGlass',
      description: 'Glass distortion over an image with highlight/shadow.',
      speed: 0.12,
      Component: FlutedGlass,
      props: {
        image: demoImageUrl,
        colorBack: '#0b0b0f',
        colorShadow: '#000000',
        colorHighlight: '#ffffff',
        distortion: 0.25,
        blur: 0.4,
        edges: 0.7,
        highlights: 0.7,
      },
    },
    {
      id: 'color-panels',
      name: 'ColorPanels',
      description: 'Graphic panels with adjustable layout and grain.',
      speed: 0.12,
      Component: ColorPanels,
      props: {
        colors: ['#f72585', '#b5179e', '#7209b7', '#3a0ca3', '#4361ee', '#4cc9f0'],
        grainOverlay: 0.1,
      },
    },
    {
      id: 'god-rays',
      name: 'GodRays',
      description: 'Rays of light radiating from the center.',
      speed: 0.12,
      Component: GodRays,
      props: {
        colors: ['#0b0b0f', '#3a86ff', '#8338ec', '#ff006e'],
        density: 0.7,
        brightness: 0.85,
        glow: 0.25,
      },
    },
  ];

  let activeDemoId = $state<string | null>(null);
</script>

<svelte:head>
  <title>Shaders Svelte — Showcase</title>
</svelte:head>

<div class="page">
  <header class="header">
    <div class="title">
      <h1>@paper-design/shaders-svelte</h1>
      <p class="subtitle">SvelteKit showcase (hover a card to animate)</p>
    </div>
    <div class="install">
      <code>npm i @paper-design/shaders-svelte</code>
    </div>
  </header>

  <main class="grid">
    {#each demos as demo (demo.id)}
      {@const Component = demo.Component}
      <button
        type="button"
        class="card"
        aria-label={demo.name}
        onpointerenter={(event) => {
          if (event.pointerType !== 'touch') activeDemoId = demo.id;
        }}
        onpointerleave={(event) => {
          if (event.pointerType !== 'touch') activeDemoId = null;
        }}
      >
        <div class="preview">
          <Component
            style="width: 100%; height: 100%;"
            webGlContextAttributes={webGlContextAttributes}
            fit="cover"
            worldWidth={400}
            worldHeight={300}
            {...(demo.props ?? {})}
            speed={activeDemoId === demo.id ? demo.speed : 0}
          />
        </div>
        <div class="meta">
          <h2>{demo.name}</h2>
          <p>{demo.description}</p>
        </div>
      </button>
    {/each}
  </main>
</div>

<style>
  .page {
    margin: 0 auto;
    max-width: 1120px;
    padding: 32px 20px 80px;
    color: rgba(255, 255, 255, 0.92);
  }

  :global(body) {
    margin: 0;
    background: radial-gradient(1200px 800px at 10% 0%, #1c1c26 0%, #0b0b10 60%, #07070b 100%);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji',
      'Segoe UI Emoji';
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 24px;
  }

  h1 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .subtitle {
    margin: 6px 0 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
  }

  .install code {
    display: inline-flex;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.06);
    font-size: 12px;
    color: rgba(255, 255, 255, 0.8);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 16px;
  }

  @media (min-width: 720px) {
    .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 1040px) {
    .grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .card {
    appearance: none;
    padding: 0;
    text-align: left;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    overflow: hidden;
    cursor: default;
  }

  .preview {
    aspect-ratio: 4 / 3;
    background: rgba(255, 255, 255, 0.04);
  }

  .card:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.55);
    outline-offset: 4px;
  }

  .meta {
    padding: 12px 12px 14px;
  }

  h2 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .meta p {
    margin: 6px 0 0;
    font-size: 12px;
    line-height: 1.35;
    color: rgba(255, 255, 255, 0.68);
  }

  @media (prefers-reduced-motion: reduce) {
    .subtitle::after {
      content: ' (reduced motion)';
    }
  }
</style>
