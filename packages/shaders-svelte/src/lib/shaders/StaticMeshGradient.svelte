<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, staticMeshGradientFragmentShader, type StaticMeshGradientParams, type StaticMeshGradientUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './static-mesh-gradient.js';

  type Props = ShaderComponentProps & StaticMeshGradientParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colors = defaultPreset.params.colors,
    positions = defaultPreset.params.positions,
    waveX = defaultPreset.params.waveX,
    waveXShift = defaultPreset.params.waveXShift,
    waveY = defaultPreset.params.waveY,
    waveYShift = defaultPreset.params.waveYShift,
    mixing = defaultPreset.params.mixing,
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
    u_positions: positions,
    u_waveX: waveX,
    u_waveXShift: waveXShift,
    u_waveY: waveY,
    u_waveYShift: waveYShift,
    u_mixing: mixing,
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
  } satisfies StaticMeshGradientUniforms);
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
  fragmentShader={staticMeshGradientFragmentShader}
  {uniforms}
/>
