<script lang="ts">
  import { ShaderFitOptions, getShaderColorFromString, perlinNoiseFragmentShader, type PerlinNoiseParams, type PerlinNoiseUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { defaultPreset } from './perlin-noise.js';

  type Props = ShaderComponentProps & PerlinNoiseParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorFront = defaultPreset.params.colorFront,
    colorBack = defaultPreset.params.colorBack,
    proportion = defaultPreset.params.proportion,
    softness = defaultPreset.params.softness,
    octaveCount = defaultPreset.params.octaveCount,
    persistence = defaultPreset.params.persistence,
    lacunarity = defaultPreset.params.lacunarity,
    fit = defaultPreset.params.fit,
    worldWidth = defaultPreset.params.worldWidth,
    worldHeight = defaultPreset.params.worldHeight,
    scale = defaultPreset.params.scale,
    rotation = defaultPreset.params.rotation,
    originX = defaultPreset.params.originX,
    originY = defaultPreset.params.originY,
    offsetX = defaultPreset.params.offsetX,
    offsetY = defaultPreset.params.offsetY,
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
    u_proportion: proportion,
    u_softness: softness ?? defaultPreset.params.softness,
    u_octaveCount: octaveCount ?? defaultPreset.params.octaveCount,
    u_persistence: persistence ?? defaultPreset.params.persistence,
    u_lacunarity: lacunarity ?? defaultPreset.params.lacunarity,

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies PerlinNoiseUniforms);
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
  fragmentShader={perlinNoiseFragmentShader}
  {uniforms}
/>
