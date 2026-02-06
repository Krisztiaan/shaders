<script lang="ts">
  import {
    GlassDistortionShapes,
    GlassGridShapes,
    ShaderFitOptions,
    flutedGlassFragmentShader,
    getShaderColorFromString,
    type FlutedGlassParams,
    type FlutedGlassUniforms,
  } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './fluted-glass.js';

  type Props = ShaderComponentProps & FlutedGlassParams & { count?: number };

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colorShadow = defaultPreset.params.colorShadow,
    colorHighlight = defaultPreset.params.colorHighlight,
    image = '',
    shadows = defaultPreset.params.shadows,
    angle = defaultPreset.params.angle,
    distortion = defaultPreset.params.distortion,
    distortionShape = defaultPreset.params.distortionShape,
    highlights = defaultPreset.params.highlights,
    shape = defaultPreset.params.shape,
    shift = defaultPreset.params.shift,
    blur = defaultPreset.params.blur,
    edges = defaultPreset.params.edges,
    margin,
    marginLeft = margin ?? defaultPreset.params.marginLeft,
    marginRight = margin ?? defaultPreset.params.marginRight,
    marginTop = margin ?? defaultPreset.params.marginTop,
    marginBottom = margin ?? defaultPreset.params.marginBottom,
    grainMixer = defaultPreset.params.grainMixer,
    grainOverlay = defaultPreset.params.grainOverlay,
    stretch = defaultPreset.params.stretch,
    count,
    size,
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

  // `count` was deprecated in favor of `size` (normalized). Keep it for convenience.
  let actualSize = $derived(
    size ?? (count === undefined ? defaultPreset.params.size : Math.pow(1 / (count * 1.6), 1 / 6) / 0.7 - 0.5)
  );

  let uniforms = $derived({
    u_image: image,
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorShadow: getShaderColorFromString(colorShadow),
    u_colorHighlight: getShaderColorFromString(colorHighlight),
    u_shadows: shadows,
    u_size: actualSize,
    u_angle: angle,
    u_distortion: distortion,
    u_shift: shift,
    u_blur: blur,
    u_edges: edges,
    u_stretch: stretch,
    u_distortionShape: GlassDistortionShapes[distortionShape],
    u_highlights: highlights,
    u_shape: GlassGridShapes[shape],
    u_marginLeft: marginLeft,
    u_marginRight: marginRight,
    u_marginTop: marginTop,
    u_marginBottom: marginBottom,
    u_grainMixer: grainMixer,
    u_grainOverlay: grainOverlay,

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies FlutedGlassUniforms);
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
  fragmentShader={flutedGlassFragmentShader}
  mipmaps={['u_image']}
  {uniforms}
/>
