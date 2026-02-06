<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, smokeRingFragmentShader, type SmokeRingParams, type SmokeRingUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './smoke-ring.js';

  type Props = ShaderComponentProps & SmokeRingParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colors = defaultPreset.params.colors,
    noiseScale = defaultPreset.params.noiseScale,
    thickness = defaultPreset.params.thickness,
    radius = defaultPreset.params.radius,
    innerShape = defaultPreset.params.innerShape,
    noiseIterations = defaultPreset.params.noiseIterations,
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
    u_noiseScale: noiseScale,
    u_thickness: thickness,
    u_radius: radius,
    u_innerShape: innerShape,
    u_noiseIterations: noiseIterations,
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
  } satisfies SmokeRingUniforms);
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
  fragmentShader={smokeRingFragmentShader}
  {uniforms}
/>
