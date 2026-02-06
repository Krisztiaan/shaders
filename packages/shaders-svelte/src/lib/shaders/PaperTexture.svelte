<script lang="ts">
  import {
    ShaderFitOptions,
    getShaderColorFromString,
    paperTextureFragmentShader,
    type PaperTextureParams,
    type PaperTextureUniforms,
  } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { getSharedNoiseTexture } from '../noise-texture.js';
  import { defaultPreset } from './paper-texture.js';

  type Props = ShaderComponentProps &
    PaperTextureParams & {
      fiberScale?: number;
      crumplesScale?: number;
      foldsNumber?: number;
      blur?: number;
    };

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    colorFront = defaultPreset.params.colorFront,
    colorBack = defaultPreset.params.colorBack,
    image = '',
    contrast = defaultPreset.params.contrast,
    roughness = defaultPreset.params.roughness,
    fiber = defaultPreset.params.fiber,
    crumples = defaultPreset.params.crumples,
    folds = defaultPreset.params.folds,
    drops = defaultPreset.params.drops,
    seed = defaultPreset.params.seed,
    fiberScale,
    fiberSize = fiberScale === undefined ? defaultPreset.params.fiberSize : 0.2 / fiberScale,
    crumplesScale,
    crumpleSize = crumplesScale === undefined ? defaultPreset.params.crumpleSize : 0.2 / crumplesScale,
    blur,
    fade = blur === undefined ? defaultPreset.params.fade : blur,
    foldsNumber,
    foldCount = foldsNumber === undefined ? defaultPreset.params.foldCount : foldsNumber,
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
    u_colorFront: getShaderColorFromString(colorFront),
    u_colorBack: getShaderColorFromString(colorBack),
    u_contrast: contrast,
    u_roughness: roughness,
    u_fiber: fiber,
    u_fiberSize: fiberSize,
    u_crumples: crumples,
    u_crumpleSize: crumpleSize,
    u_foldCount: foldCount,
    u_folds: folds,
    u_fade: fade,
    u_drops: drops,
    u_seed: seed,
    u_noiseTexture: getSharedNoiseTexture(),

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies PaperTextureUniforms);
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
  fragmentShader={paperTextureFragmentShader}
  mipmaps={['u_image']}
  {uniforms}
/>
