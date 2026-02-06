<script lang="ts">
  import { DitheringShapes, DitheringTypes, ShaderFitOptions, ditheringFragmentShader, getShaderColorFromString, type DitheringParams, type DitheringUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './dithering.js';

  type Props = ShaderComponentProps & DitheringParams & { pxSize?: number };

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colorFront = defaultPreset.params.colorFront,
    shape = defaultPreset.params.shape,
    type = defaultPreset.params.type,
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
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorFront: getShaderColorFromString(colorFront),
    u_shape: DitheringShapes[shape],
    u_type: DitheringTypes[type],
    u_pxSize: actualSize,

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies DitheringUniforms);
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
  fragmentShader={ditheringFragmentShader}
  {uniforms}
/>
