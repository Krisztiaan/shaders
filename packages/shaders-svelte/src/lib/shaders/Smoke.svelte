<script lang="ts">
  import {
    ShaderFitOptions,
    getShaderColorFromString,
    smokeFragmentShader,
    type SmokeParams,
    type SmokeUniforms,
  } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './smoke.js';

  type Props = ShaderComponentProps & SmokeParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colors = defaultPreset.params.colors,
    size = defaultPreset.params.size,
    density = defaultPreset.params.density,
    softness = defaultPreset.params.softness,
    turbulence = defaultPreset.params.turbulence,
    detail = defaultPreset.params.detail,
    rise = defaultPreset.params.rise,
    wind = defaultPreset.params.wind,
    intensity = defaultPreset.params.intensity,
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
    u_colorBack: getShaderColorFromString(colorBack),
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,
    u_size: size,
    u_density: density,
    u_softness: softness,
    u_turbulence: turbulence,
    u_detail: detail,
    u_rise: rise,
    u_wind: wind,
    u_intensity: intensity,
    u_noiseTexture: getSharedNoiseTexture(),

    u_scale: scale,
    u_rotation: rotation,
    u_fit: ShaderFitOptions[fit],
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies SmokeUniforms);
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
  fragmentShader={smokeFragmentShader}
  {uniforms}
/>

