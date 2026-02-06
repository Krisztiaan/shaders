<script lang="ts">
  import { ShaderFitOptions, WarpPatterns, getShaderColorFromString, type WarpParams, type WarpUniforms, warpFragmentShader } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './warp.js';

  type Props = ShaderComponentProps & WarpParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colors = defaultPreset.params.colors,
    proportion = defaultPreset.params.proportion,
    softness = defaultPreset.params.softness,
    distortion = defaultPreset.params.distortion,
    swirl = defaultPreset.params.swirl,
    swirlIterations = defaultPreset.params.swirlIterations,
    shapeScale = defaultPreset.params.shapeScale,
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
    maxPixelCount,
    webGlContextAttributes,
    width,
    height,
    ...rest
  }: Props = $props();

  let uniforms = $derived({
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,
    u_proportion: proportion,
    u_softness: softness,
    u_distortion: distortion,
    u_swirl: swirl,
    u_swirlIterations: swirlIterations,
    u_shapeScale: shapeScale,
    u_shape: WarpPatterns[shape],
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
  } satisfies WarpUniforms);
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
  fragmentShader={warpFragmentShader}
  {uniforms}
/>
