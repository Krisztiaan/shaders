<script lang="ts">
  import { HalftoneDotsGrids, HalftoneDotsTypes, ShaderFitOptions, getShaderColorFromString, halftoneDotsFragmentShader, type HalftoneDotsParams, type HalftoneDotsUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './halftone-dots.js';

  type Props = ShaderComponentProps & HalftoneDotsParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorFront = defaultPreset.params.colorFront,
    colorBack = defaultPreset.params.colorBack,
    image = '',
    size = defaultPreset.params.size,
    radius = defaultPreset.params.radius,
    contrast = defaultPreset.params.contrast,
    originalColors = defaultPreset.params.originalColors,
    inverted = defaultPreset.params.inverted,
    grainMixer = defaultPreset.params.grainMixer,
    grainOverlay = defaultPreset.params.grainOverlay,
    grainSize = defaultPreset.params.grainSize,
    grid = defaultPreset.params.grid,
    type = defaultPreset.params.type,
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
    u_image: image,
    u_colorFront: getShaderColorFromString(colorFront),
    u_colorBack: getShaderColorFromString(colorBack),
    u_size: size,
    u_radius: radius,
    u_contrast: contrast,
    u_originalColors: originalColors,
    u_inverted: inverted,
    u_grainMixer: grainMixer,
    u_grainOverlay: grainOverlay,
    u_grainSize: grainSize,
    u_grid: HalftoneDotsGrids[grid],
    u_type: HalftoneDotsTypes[type],

    u_fit: ShaderFitOptions[fit],
    u_rotation: rotation,
    u_scale: scale,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies HalftoneDotsUniforms);
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
  fragmentShader={halftoneDotsFragmentShader}
  {uniforms}
/>
