<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, type WavesParams, type WavesUniforms, wavesFragmentShader } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './waves.js';

  type Props = ShaderComponentProps & WavesParams;

  let {
    colorFront = defaultPreset.params.colorFront,
    colorBack = defaultPreset.params.colorBack,
    shape = defaultPreset.params.shape,
    frequency = defaultPreset.params.frequency,
    amplitude = defaultPreset.params.amplitude,
    spacing = defaultPreset.params.spacing,
    proportion = defaultPreset.params.proportion,
    softness = defaultPreset.params.softness,
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
    u_colorFront: getShaderColorFromString(colorFront),
    u_colorBack: getShaderColorFromString(colorBack),
    u_shape: shape,
    u_frequency: frequency,
    u_amplitude: amplitude,
    u_spacing: spacing,
    u_proportion: proportion,
    u_softness: softness,

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies WavesUniforms);
</script>

<ShaderMount
  {...rest}
  {width}
  {height}
  {minPixelRatio}
  {maxPixelCount}
  {webGlContextAttributes}
  fragmentShader={wavesFragmentShader}
  {uniforms}
/>
