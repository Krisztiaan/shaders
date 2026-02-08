<script lang="ts">
  import {
    LiquidMetalShapes,
    ShaderFitOptions,
    getShaderColorFromString,
    liquidMetalFragmentShader,
    toProcessedLiquidMetal,
    type LiquidMetalParams,
    type LiquidMetalUniforms,
  } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { transparentPixel } from '../transparent-pixel.js';
  import { defaultPreset } from './liquid-metal.js';

  type Props = ShaderComponentProps &
    LiquidMetalParams & {
      /**
       * Suspends the component while the image is being processed.
       */
      suspendWhenProcessingImage?: boolean;
    };

  let {
    colorBack = defaultPreset.params.colorBack,
    colorTint = defaultPreset.params.colorTint,
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    image = '',
    contour = defaultPreset.params.contour,
    distortion = defaultPreset.params.distortion,
    softness = defaultPreset.params.softness,
    repetition = defaultPreset.params.repetition,
    shiftRed = defaultPreset.params.shiftRed,
    shiftBlue = defaultPreset.params.shiftBlue,
    angle = defaultPreset.params.angle,
    shape = defaultPreset.params.shape,
    suspendWhenProcessingImage = false,
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

  let imageUrl = $derived(typeof image === 'string' ? image : image.src);
  let processedImage = $state<string>(transparentPixel);
  let isProcessing = $state(false);

  $effect(() => {
    if (typeof window === 'undefined') return;

    if (!imageUrl) {
      isProcessing = false;
      processedImage = transparentPixel;
      return;
    }

    let active = true;
    let urlToRevoke: string | undefined;

    if (suspendWhenProcessingImage) isProcessing = true;

    void toProcessedLiquidMetal(imageUrl)
      .then((result) => {
        if (!active) return;
        urlToRevoke = URL.createObjectURL(result.pngBlob);
        processedImage = urlToRevoke;
        isProcessing = false;
      })
      .catch(() => {
        if (!active) return;
        processedImage = transparentPixel;
        isProcessing = false;
      });

    return () => {
      active = false;
      if (urlToRevoke) URL.revokeObjectURL(urlToRevoke);
    };
  });

  let uniforms = $derived({
    u_colorBack: getShaderColorFromString(colorBack),
    u_colorTint: getShaderColorFromString(colorTint),
    u_image: processedImage,
    u_contour: contour,
    u_distortion: distortion,
    u_softness: softness,
    u_repetition: repetition,
    u_shiftRed: shiftRed,
    u_shiftBlue: shiftBlue,
    u_angle: angle,
    u_isImage: Boolean(imageUrl),
    u_shape: LiquidMetalShapes[shape],

    u_fit: ShaderFitOptions[fit],
    u_scale: scale,
    u_rotation: rotation,
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_worldWidth: worldWidth,
    u_worldHeight: worldHeight,
  } satisfies LiquidMetalUniforms);
</script>

{#if !suspendWhenProcessingImage || !isProcessing}
  <ShaderMount
    {...rest}
    {width}
    {height}
    {minPixelRatio}
    {maxPixelCount}
    {webGlContextAttributes}
    {speed}
    {frame}
    fragmentShader={liquidMetalFragmentShader}
    mipmaps={['u_image']}
    {uniforms}
  />
{/if}
