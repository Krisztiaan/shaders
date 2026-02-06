<script lang="ts">
  import { ShaderFitOptions, colorPanelsFragmentShader, getShaderColorFromString, type ColorPanelsParams, type ColorPanelsUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './color-panels.js';

  type Props = ShaderComponentProps & ColorPanelsParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colors = defaultPreset.params.colors,
    colorBack = defaultPreset.params.colorBack,
    angle1 = defaultPreset.params.angle1,
    angle2 = defaultPreset.params.angle2,
    length = defaultPreset.params.length,
    edges = defaultPreset.params.edges,
    blur = defaultPreset.params.blur,
    fadeIn = defaultPreset.params.fadeIn,
    fadeOut = defaultPreset.params.fadeOut,
    density = defaultPreset.params.density,
    gradient = defaultPreset.params.gradient,
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
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,
    u_colorBack: getShaderColorFromString(colorBack),
    u_angle1: angle1,
    u_angle2: angle2,
    u_length: length,
    u_edges: edges,
    u_blur: blur,
    u_fadeIn: fadeIn,
    u_fadeOut: fadeOut,
    u_density: density,
    u_gradient: gradient,

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies ColorPanelsUniforms);
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
  fragmentShader={colorPanelsFragmentShader}
  {uniforms}
/>
