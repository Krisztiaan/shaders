<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, meshGradientFragmentShader, type MeshGradientParams, type MeshGradientUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './mesh-gradient.js';

  type Props = ShaderComponentProps & MeshGradientParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colors = defaultPreset.params.colors,
    distortion = defaultPreset.params.distortion,
    swirl = defaultPreset.params.swirl,
    grainMixer = defaultPreset.params.grainMixer,
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
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,
    u_distortion: distortion,
    u_swirl: swirl,
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
  } satisfies MeshGradientUniforms);
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
  fragmentShader={meshGradientFragmentShader}
  {uniforms}
/>
