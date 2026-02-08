<script lang="ts">
  import {
    ShaderFitOptions,
    causticsFragmentShader,
    getShaderColorFromString,
    type CausticsParams,
    type CausticsUniforms,
  } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './caustics.js';

  type Props = ShaderComponentProps & CausticsParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colors = defaultPreset.params.colors,
    size = defaultPreset.params.size,
    distortion = defaultPreset.params.distortion,
    thickness = defaultPreset.params.thickness,
    contrast = defaultPreset.params.contrast,
    intensity = defaultPreset.params.intensity,
    glow = defaultPreset.params.glow,
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
    u_distortion: distortion,
    u_thickness: thickness,
    u_contrast: contrast,
    u_intensity: intensity,
    u_glow: glow,
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
  } satisfies CausticsUniforms);
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
  fragmentShader={causticsFragmentShader}
  {uniforms}
/>

