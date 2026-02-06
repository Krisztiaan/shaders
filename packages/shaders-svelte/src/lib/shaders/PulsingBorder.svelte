<script lang="ts">
  import { PulsingBorderAspectRatios, ShaderFitOptions, getShaderColorFromString, pulsingBorderFragmentShader, type PulsingBorderParams, type PulsingBorderUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './pulsing-border.js';

  type Props = ShaderComponentProps & PulsingBorderParams & { margin?: number };

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colors = defaultPreset.params.colors,
    colorBack = defaultPreset.params.colorBack,
    roundness = defaultPreset.params.roundness,
    thickness = defaultPreset.params.thickness,
    aspectRatio = defaultPreset.params.aspectRatio,
    softness = defaultPreset.params.softness,
    bloom = defaultPreset.params.bloom,
    intensity = defaultPreset.params.intensity,
    spots = defaultPreset.params.spots,
    spotSize = defaultPreset.params.spotSize,
    pulse = defaultPreset.params.pulse,
    smoke = defaultPreset.params.smoke,
    smokeSize = defaultPreset.params.smokeSize,
    margin,
    marginLeft = defaultPreset.params.marginLeft,
    marginRight = defaultPreset.params.marginRight,
    marginTop = defaultPreset.params.marginTop,
    marginBottom = defaultPreset.params.marginBottom,
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

  let actualMarginLeft = $derived(margin ?? marginLeft);
  let actualMarginRight = $derived(margin ?? marginRight);
  let actualMarginTop = $derived(margin ?? marginTop);
  let actualMarginBottom = $derived(margin ?? marginBottom);

  let uniforms = $derived({
    u_colorBack: getShaderColorFromString(colorBack),
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,
    u_roundness: roundness,
    u_thickness: thickness,
    u_marginLeft: actualMarginLeft,
    u_marginRight: actualMarginRight,
    u_marginTop: actualMarginTop,
    u_marginBottom: actualMarginBottom,
    u_aspectRatio: PulsingBorderAspectRatios[aspectRatio],
    u_softness: softness,
    u_intensity: intensity,
    u_bloom: bloom,
    u_spots: spots,
    u_spotSize: spotSize,
    u_pulse: pulse,
    u_smoke: smoke,
    u_smokeSize: smokeSize,
    u_noiseTexture: getSharedNoiseTexture(),

    u_fit: ShaderFitOptions[fit],
    u_rotation: rotation,
    u_scale: scale,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies PulsingBorderUniforms);
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
  fragmentShader={pulsingBorderFragmentShader}
  {uniforms}
/>
