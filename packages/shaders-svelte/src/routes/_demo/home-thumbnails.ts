import type { Component } from 'svelte';
import {
  ColorPanels,
  colorPanelsPresets,
  Dithering,
  ditheringPresets,
  DotGrid,
  dotGridPresets,
  DotOrbit,
  dotOrbitPresets,
  FlutedGlass,
  flutedGlassPresets,
  GodRays,
  godRaysPresets,
  GrainGradient,
  grainGradientPresets,
  Aurora,
  auroraPresets,
  Caustics,
  causticsPresets,
  HalftoneCmyk,
  halftoneCmykPresets,
  HalftoneDots,
  halftoneDotsPresets,
  Heatmap,
  heatmapPresets,
  ImageDithering,
  imageDitheringPresets,
  LiquidMetal,
  liquidMetalPresets,
  MeshGradient,
  meshGradientPresets,
  Metaballs,
  metaballsPresets,
  NeuroNoise,
  neuroNoisePresets,
  PaperTexture,
  paperTexturePresets,
  PerlinNoise,
  perlinNoisePresets,
  PulsingBorder,
  pulsingBorderPresets,
  SimplexNoise,
  simplexNoisePresets,
  SmokeRing,
  smokeRingPresets,
  Spiral,
  spiralPresets,
  StaticMeshGradient,
  staticMeshGradientPresets,
  StaticRadialGradient,
  staticRadialGradientPresets,
  Swirl,
  swirlPresets,
  Voronoi,
  voronoiPresets,
  Warp,
  warpPresets,
  Water,
  waterPresets,
  Waves,
  wavesPresets,
} from '$lib';

export type HomeShaderConfig = {
  name: string;
  image: string;
  url: string;
  pixelated?: boolean;
  ShaderComponent: Component<any>;
  shaderConfig: Record<string, unknown>;

  /**
   * Whether to render the shader itself in place of the preview image
   * (can be used for grainy shaders that look bad when previews are compressed/resized)
   */
  alwaysLivePreview?: boolean;
};

type HomeCategory = {
  name: string;
  shaders: HomeShaderConfig[];
};

export const homeThumbnails = [
  {
    name: 'Image Filters',
    shaders: [
      {
        name: 'paper texture',
        url: '/paper-texture',
        ShaderComponent: PaperTexture,
        image: '/shaders/paper-texture.webp',
        shaderConfig: { ...paperTexturePresets[0].params, scale: 1.05 },
      },
      {
        name: 'fluted glass',
        url: '/fluted-glass',
        ShaderComponent: FlutedGlass,
        image: '/shaders/fluted-glass.webp',
        shaderConfig: { ...flutedGlassPresets[0].params, scale: 1.05, distortion: 0.2 },
      },
      {
        name: 'water',
        url: '/water',
        ShaderComponent: Water,
        image: '/shaders/water.webp',
        shaderConfig: {
          ...waterPresets[0].params,
          scale: 1.05,
          colorBack: '#e0f2ff',
          image: '/images/image-filters/0018.webp',
        },
      },
      {
        name: 'image dithering',
        url: '/image-dithering',
        ShaderComponent: ImageDithering,
        image: '/shaders/image-dithering.webp',
        shaderConfig: { ...imageDitheringPresets[0].params, scale: 1.05 },
      },
      {
        name: 'halftone dots',
        url: '/halftone-dots',
        ShaderComponent: HalftoneDots,
        image: '/shaders/halftone-dots.webp',
        shaderConfig: {
          ...halftoneDotsPresets[0].params,
          image: '/images/image-filters/0018.webp',
          speed: 0,
        },
      },
      {
        name: 'halftone cmyk',
        url: '/halftone-cmyk',
        ShaderComponent: HalftoneCmyk,
        image: '/shaders/halftone-cmyk.webp',
        shaderConfig: {
          ...halftoneCmykPresets[0].params,
          image: '/images/image-filters/0018.webp',
          size: 0.7,
          softness: 0.5,
          speed: 0,
        },
      },
    ],
  },
  {
    name: 'Logo Animations',
    shaders: [
      {
        name: 'heatmap',
        url: '/heatmap',
        ShaderComponent: Heatmap,
        image: '/shaders/heatmap.webp',
        shaderConfig: {
          ...heatmapPresets[0].params,
          scale: 0.9,
          frame: 5800,
          suspendWhenProcessingImage: true,
          image: '/images/logos/diamond.svg',
        },
      },
      {
        name: 'liquid metal',
        url: '/liquid-metal',
        ShaderComponent: LiquidMetal,
        image: '/shaders/liquid-metal.webp',
        shaderConfig: {
          ...liquidMetalPresets[0].params,
          scale: 0.9,
          suspendWhenProcessingImage: true,
          image: '/images/logos/diamond.svg',
        },
      },
    ],
  },
  {
    name: 'Effects',
    shaders: [
      {
        name: 'aurora',
        image: '/shaders/aurora.svg',
        url: '/aurora',
        ShaderComponent: Aurora,
        shaderConfig: { ...auroraPresets[0].params },
        alwaysLivePreview: true,
      },
      {
        name: 'caustics',
        image: '/shaders/caustics.svg',
        url: '/caustics',
        ShaderComponent: Caustics,
        shaderConfig: { ...causticsPresets[0].params },
        alwaysLivePreview: true,
      },
      {
        name: 'mesh gradient',
        image: '/shaders/mesh-gradient.webp',
        url: '/mesh-gradient',
        ShaderComponent: MeshGradient,
        shaderConfig: { ...meshGradientPresets[0].params },
      },
      {
        name: 'static mesh gradient',
        url: '/static-mesh-gradient',
        ShaderComponent: StaticMeshGradient,
        image: '/shaders/static-mesh-gradient.webp',
        shaderConfig: { ...staticMeshGradientPresets[0].params },
      },
      {
        name: 'static radial gradient',
        url: '/static-radial-gradient',
        ShaderComponent: StaticRadialGradient,
        image: '/shaders/static-radial-gradient.webp',
        shaderConfig: { ...staticRadialGradientPresets[0].params, radius: 0.65, offsetY: -0.03 },
      },
      {
        name: 'dithering',
        url: '/dithering',
        ShaderComponent: Dithering,
        image: '/shaders/dithering.webp',
        pixelated: true,
        shaderConfig: { ...ditheringPresets[0].params },
        alwaysLivePreview: true,
      },
      {
        name: 'grain gradient',
        image: '/shaders/grain-gradient.webp',
        url: '/grain-gradient',
        ShaderComponent: GrainGradient,
        shaderConfig: { ...grainGradientPresets[0].params, speed: 1.5 },
        alwaysLivePreview: true,
      },
      {
        name: 'dot orbit',
        image: '/shaders/dot-orbit.webp',
        url: '/dot-orbit',
        ShaderComponent: DotOrbit,
        shaderConfig: { ...dotOrbitPresets[0].params, scale: 0.45 },
      },
      {
        name: 'dot grid',
        url: '/dot-grid',
        ShaderComponent: DotGrid,
        image: '/shaders/dot-grid.webp',
        shaderConfig: { ...dotGridPresets[0].params, gapX: 24, gapY: 24, size: 1.5, speed: 0 },
      },
      {
        name: 'warp',
        url: '/warp',
        ShaderComponent: Warp,
        image: '/shaders/warp.webp',
        shaderConfig: { ...warpPresets[0].params, scale: 0.6 },
      },
      {
        name: 'spiral',
        url: '/spiral',
        ShaderComponent: Spiral,
        image: '/shaders/spiral.webp',
        shaderConfig: { ...spiralPresets[0].params, scale: 0.5, speed: 2 },
      },
      {
        name: 'swirl',
        url: '/swirl',
        ShaderComponent: Swirl,
        image: '/shaders/swirl.webp',
        shaderConfig: { ...swirlPresets[0].params },
      },
      {
        name: 'waves',
        url: '/waves',
        ShaderComponent: Waves,
        image: '/shaders/waves.webp',
        shaderConfig: { ...wavesPresets[0].params, speed: 0, scale: 0.55, spacing: 1.2 },
      },
      {
        name: 'neuro noise',
        image: '/shaders/neuro-noise.webp',
        url: '/neuro-noise',
        ShaderComponent: NeuroNoise,
        shaderConfig: { ...neuroNoisePresets[0].params, scale: 0.8 },
      },
      {
        name: 'perlin',
        url: '/perlin-noise',
        ShaderComponent: PerlinNoise,
        image: '/shaders/perlin-noise.webp',
        shaderConfig: { ...perlinNoisePresets[0].params, scale: 0.8, speed: 0.2 },
      },
      {
        name: 'simplex noise',
        image: '/shaders/simplex-noise.webp',
        url: '/simplex-noise',
        ShaderComponent: SimplexNoise,
        shaderConfig: { ...simplexNoisePresets[0].params, scale: 0.4 },
      },
      {
        name: 'voronoi',
        url: '/voronoi',
        ShaderComponent: Voronoi,
        image: '/shaders/voronoi.webp',
        shaderConfig: { ...voronoiPresets[0].params, scale: 0.35 },
      },
      {
        name: 'pulsing border',
        url: '/pulsing-border',
        ShaderComponent: PulsingBorder,
        image: '/shaders/pulsing-border.webp',
        shaderConfig: { ...pulsingBorderPresets[0].params },
      },
      {
        name: 'metaballs',
        image: '/shaders/metaballs.webp',
        url: '/metaballs',
        ShaderComponent: Metaballs,
        shaderConfig: { ...metaballsPresets[0].params, scale: 1, count: 8, speed: 1.5 },
      },
      {
        name: 'color panels',
        url: '/color-panels',
        ShaderComponent: ColorPanels,
        image: '/shaders/color-panels.webp',
        shaderConfig: { ...colorPanelsPresets[0].params, scale: 0.75, speed: 2 },
      },
      {
        name: 'smoke ring',
        image: '/shaders/smoke-ring.webp',
        url: '/smoke-ring',
        ShaderComponent: SmokeRing,
        shaderConfig: { ...smokeRingPresets[0].params, scale: 0.8, speed: 1 },
      },
      {
        name: 'god rays',
        url: '/god-rays',
        ShaderComponent: GodRays,
        image: '/shaders/god-rays.webp',
        shaderConfig: { ...godRaysPresets[0].params, offsetY: -0.7, speed: 1.25 },
      },
    ],
  },
] satisfies HomeCategory[];

export const flatHomeThumbnails = homeThumbnails.flatMap((category) => category.shaders as HomeShaderConfig[]);
