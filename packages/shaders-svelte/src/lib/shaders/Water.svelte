<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, type WaterParams, type WaterUniforms, waterFragmentShader } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './water.js';

  type Props = ShaderComponentProps & WaterParams & { effectScale?: number };

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colorHighlight = defaultPreset.params.colorHighlight,
    image = '',
    highlights = defaultPreset.params.highlights,
    layering = defaultPreset.params.layering,
    waves = defaultPreset.params.waves,
    edges = defaultPreset.params.edges,
    caustic = defaultPreset.params.caustic,
    effectScale,
    size = defaultPreset.params.size,
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

  let actualSize = $derived(effectScale === undefined ? size : 10 / 9 / effectScale - 1 / 9);

  let uniforms = $derived({
    u_image: image,
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorHighlight: getShaderColorFromString(colorHighlight),
    u_highlights: highlights,
    u_layering: layering,
    u_waves: waves,
    u_edges: edges,
    u_caustic: caustic,
    u_size: actualSize,

    u_fit: ShaderFitOptions[fit],
    u_rotation: rotation,
    u_scale: scale,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies WaterUniforms);
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
  fragmentShader={waterFragmentShader}
  mipmaps={['u_image']}
  {uniforms}
/>
