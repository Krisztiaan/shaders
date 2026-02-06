<script lang="ts">
  import { GrainGradientShapes, ShaderFitOptions, getShaderColorFromString, grainGradientFragmentShader, type GrainGradientParams, type GrainGradientUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './grain-gradient.js';

  type Props = ShaderComponentProps & GrainGradientParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colors = defaultPreset.params.colors,
    softness = defaultPreset.params.softness,
    intensity = defaultPreset.params.intensity,
    noise = defaultPreset.params.noise,
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
    u_colorBack: getShaderColorFromString(colorBack),
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,
    u_softness: softness,
    u_intensity: intensity,
    u_noise: noise,
    u_shape: GrainGradientShapes[shape],
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
  } satisfies GrainGradientUniforms);
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
  fragmentShader={grainGradientFragmentShader}
  {uniforms}
/>
