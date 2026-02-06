<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, godRaysFragmentShader, type GodRaysParams, type GodRaysUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './god-rays.js';

  type Props = ShaderComponentProps & GodRaysParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBloom = defaultPreset.params.colorBloom,
    colorBack = defaultPreset.params.colorBack,
    colors = defaultPreset.params.colors,
    density = defaultPreset.params.density,
    spotty = defaultPreset.params.spotty,
    midIntensity = defaultPreset.params.midIntensity,
    midSize = defaultPreset.params.midSize,
    intensity = defaultPreset.params.intensity,
    bloom = defaultPreset.params.bloom,
    fit = defaultPreset.params.fit,
    scale = defaultPreset.params.scale,
    rotation = defaultPreset.params.rotation,
    originX = defaultPreset.params.originX,
    originY = defaultPreset.params.originY,
    offsetX = defaultPreset.params.offsetX,
    offsetY = defaultPreset.params.offsetY,
    worldWidth = defaultPreset.params.worldWidth,
    worldHeight = defaultPreset.params.worldHeight,
    minPixelRatio,
    maxPixelCount,
    webGlContextAttributes,
    width,
    height,
    ...rest
  }: Props = $props();

  let uniforms = $derived({
    u_colorBloom: getShaderColorFromString(colorBloom),
    u_colorBack: getShaderColorFromString(colorBack),
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,
    u_density: density,
    u_spotty: spotty,
    u_midIntensity: midIntensity,
    u_midSize: midSize,
    u_intensity: intensity,
    u_bloom: bloom,
    u_noiseTexture: getSharedNoiseTexture(),

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies GodRaysUniforms);
</script>

<ShaderMount
  {...rest}
  {width}
  {height}
  {minPixelRatio}
  {maxPixelCount}
  {webGlContextAttributes}
  {speed}
  {frame}
  fragmentShader={godRaysFragmentShader}
  {uniforms}
/>
