<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, spiralFragmentShader, type SpiralParams, type SpiralUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './spiral.js';

  type Props = ShaderComponentProps & SpiralParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colorFront = defaultPreset.params.colorFront,
    density = defaultPreset.params.density,
    distortion = defaultPreset.params.distortion,
    strokeWidth = defaultPreset.params.strokeWidth,
    strokeTaper = defaultPreset.params.strokeTaper,
    strokeCap = defaultPreset.params.strokeCap,
    noiseFrequency = defaultPreset.params.noiseFrequency,
    noise = defaultPreset.params.noise,
    softness = defaultPreset.params.softness,
    fit = defaultPreset.params.fit,
    rotation = defaultPreset.params.rotation,
    scale = defaultPreset.params.scale,
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
    u_colorFront: getShaderColorFromString(colorFront),
    u_density: density,
    u_distortion: distortion,
    u_strokeWidth: strokeWidth,
    u_strokeTaper: strokeTaper,
    u_strokeCap: strokeCap,
    u_noiseFrequency: noiseFrequency,
    u_noise: noise,
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
  } satisfies SpiralUniforms);
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
  fragmentShader={spiralFragmentShader}
  {uniforms}
/>
