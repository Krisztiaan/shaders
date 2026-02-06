<script lang="ts">
  import { DotGridShapes, ShaderFitOptions, dotGridFragmentShader, getShaderColorFromString, type DotGridParams, type DotGridUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './dot-grid.js';

  type Props = ShaderComponentProps & DotGridParams;

  let {
    colorBack = defaultPreset.params.colorBack,
    colorFill = defaultPreset.params.colorFill,
    colorStroke = defaultPreset.params.colorStroke,
    size = defaultPreset.params.size,
    gapX = defaultPreset.params.gapX,
    gapY = defaultPreset.params.gapY,
    strokeWidth = defaultPreset.params.strokeWidth,
    sizeRange = defaultPreset.params.sizeRange,
    opacityRange = defaultPreset.params.opacityRange,
    shape = defaultPreset.params.shape,
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
    maxPixelCount = 6016 * 3384,
    webGlContextAttributes,
    width,
    height,
    ...rest
  }: Props = $props();

  let uniforms = $derived({
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorFill: getShaderColorFromString(colorFill),
    u_colorStroke: getShaderColorFromString(colorStroke),
    u_dotSize: size,
    u_gapX: gapX,
    u_gapY: gapY,
    u_strokeWidth: strokeWidth,
    u_sizeRange: sizeRange,
    u_opacityRange: opacityRange,
    u_shape: DotGridShapes[shape],

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies DotGridUniforms);
</script>

<ShaderMount
  {...rest}
  {width}
  {height}
  {minPixelRatio}
  {maxPixelCount}
  {webGlContextAttributes}
  fragmentShader={dotGridFragmentShader}
  {uniforms}
/>
