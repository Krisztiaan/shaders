<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, staticRadialGradientFragmentShader, type StaticRadialGradientParams, type StaticRadialGradientUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './static-radial-gradient.js';

  type Props = ShaderComponentProps & StaticRadialGradientParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colors = defaultPreset.params.colors,
    radius = defaultPreset.params.radius,
    focalDistance = defaultPreset.params.focalDistance,
    focalAngle = defaultPreset.params.focalAngle,
    falloff = defaultPreset.params.falloff,
    grainMixer = defaultPreset.params.grainMixer,
    mixing = defaultPreset.params.mixing,
    distortion = defaultPreset.params.distortion,
    distortionShift = defaultPreset.params.distortionShift,
    distortionFreq = defaultPreset.params.distortionFreq,
    grainOverlay = defaultPreset.params.grainOverlay,
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
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,
    u_radius: radius,
    u_focalDistance: focalDistance,
    u_focalAngle: focalAngle,
    u_falloff: falloff,
    u_mixing: mixing,
    u_distortion: distortion,
    u_distortionShift: distortionShift,
    u_distortionFreq: distortionFreq,
    u_grainMixer: grainMixer,
    u_grainOverlay: grainOverlay,

    u_fit: ShaderFitOptions[fit],
    u_rotation: rotation,
    u_scale: scale,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies StaticRadialGradientUniforms);
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
  fragmentShader={staticRadialGradientFragmentShader}
  {uniforms}
/>
