<script lang="ts">
  import { DitheringTypes, ShaderFitOptions, getShaderColorFromString, imageDitheringFragmentShader, type ImageDitheringParams, type ImageDitheringUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './image-dithering.js';

  type Props = ShaderComponentProps & ImageDitheringParams & { pxSize?: number };

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorFront = defaultPreset.params.colorFront,
    colorBack = defaultPreset.params.colorBack,
    colorHighlight = defaultPreset.params.colorHighlight,
    image = '',
    type = defaultPreset.params.type,
    colorSteps = defaultPreset.params.colorSteps,
    originalColors = defaultPreset.params.originalColors,
    inverted = defaultPreset.params.inverted,
    pxSize,
    size = defaultPreset.params.size,
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

  let actualSize = $derived(pxSize === undefined ? size : pxSize);

  let uniforms = $derived({
    u_image: image,
    u_colorFront: getShaderColorFromString(colorFront),
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorHighlight: getShaderColorFromString(colorHighlight),
    u_type: DitheringTypes[type],
    u_pxSize: actualSize,
    u_colorSteps: colorSteps,
    u_originalColors: originalColors,
    u_inverted: inverted,

    u_fit: ShaderFitOptions[fit],
    u_rotation: rotation,
    u_scale: scale,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies ImageDitheringUniforms);
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
  fragmentShader={imageDitheringFragmentShader}
  {uniforms}
/>
