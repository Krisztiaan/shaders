<script lang="ts">
  import { HalftoneCmykTypes, ShaderFitOptions, getShaderColorFromString, halftoneCmykFragmentShader, type HalftoneCmykParams, type HalftoneCmykUniforms } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './halftone-cmyk.js';

  type Props = ShaderComponentProps & HalftoneCmykParams;

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorBack = defaultPreset.params.colorBack,
    colorC = defaultPreset.params.colorC,
    colorM = defaultPreset.params.colorM,
    colorY = defaultPreset.params.colorY,
    colorK = defaultPreset.params.colorK,
    image = '',
    size = defaultPreset.params.size,
    contrast = defaultPreset.params.contrast,
    softness = defaultPreset.params.softness,
    grainSize = defaultPreset.params.grainSize,
    grainMixer = defaultPreset.params.grainMixer,
    grainOverlay = defaultPreset.params.grainOverlay,
    gridNoise = defaultPreset.params.gridNoise,
    floodC = defaultPreset.params.floodC,
    floodM = defaultPreset.params.floodM,
    floodY = defaultPreset.params.floodY,
    floodK = defaultPreset.params.floodK,
    gainC = defaultPreset.params.gainC,
    gainM = defaultPreset.params.gainM,
    gainY = defaultPreset.params.gainY,
    gainK = defaultPreset.params.gainK,
    type = defaultPreset.params.type,
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

  let uniforms = $derived({
    u_image: image,
    u_noiseTexture: getSharedNoiseTexture(),
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorC: getShaderColorFromString(colorC),
    u_colorM: getShaderColorFromString(colorM),
    u_colorY: getShaderColorFromString(colorY),
    u_colorK: getShaderColorFromString(colorK),
    u_size: size,
    u_contrast: contrast,
    u_softness: softness,
    u_grainSize: grainSize,
    u_grainMixer: grainMixer,
    u_grainOverlay: grainOverlay,
    u_gridNoise: gridNoise,
    u_floodC: floodC,
    u_floodM: floodM,
    u_floodY: floodY,
    u_floodK: floodK,
    u_gainC: gainC,
    u_gainM: gainM,
    u_gainY: gainY,
    u_gainK: gainK,
    u_type: HalftoneCmykTypes[type],

    u_fit: ShaderFitOptions[fit],
    u_rotation: rotation,
    u_scale: scale,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies HalftoneCmykUniforms);
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
  fragmentShader={halftoneCmykFragmentShader}
  {uniforms}
/>
