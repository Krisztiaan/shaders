<script lang="ts">
  import {
    ShaderFitOptions,
    getShaderColorFromString,
    heatmapFragmentShader,
    toProcessedHeatmap,
    type HeatmapParams,
    type HeatmapUniforms,
  } from '@paper-design/shaders';
  import ShaderMount from '../ShaderMount.svelte';
  import type { ShaderComponentProps } from '../component-props.js';
  import { transparentPixel } from '../transparent-pixel.js';
  import { defaultPreset } from './heatmap.js';

  type Props = ShaderComponentProps &
    HeatmapParams & {
      /**
       * Suspends the component while the image is being processed.
       */
      suspendWhenProcessingImage?: boolean;
    };

  let {
    speed = defaultPreset.params.speed,
    frame = defaultPreset.params.frame,
    image = '',
    contour = defaultPreset.params.contour,
    angle = defaultPreset.params.angle,
    noise = defaultPreset.params.noise,
    innerGlow = defaultPreset.params.innerGlow,
    outerGlow = defaultPreset.params.outerGlow,
    colorBack = defaultPreset.params.colorBack,
    colors = defaultPreset.params.colors,
    suspendWhenProcessingImage = false,
    fit = defaultPreset.params.fit,
    offsetX = defaultPreset.params.offsetX,
    offsetY = defaultPreset.params.offsetY,
    originX = defaultPreset.params.originX,
    originY = defaultPreset.params.originY,
    rotation = defaultPreset.params.rotation,
    scale = defaultPreset.params.scale,
    worldHeight = defaultPreset.params.worldHeight,
    worldWidth = defaultPreset.params.worldWidth,
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

    void toProcessedHeatmap(imageUrl)
      .then((result) => {
        if (!active) return;
        urlToRevoke = URL.createObjectURL(result.blob);
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
    u_image: processedImage,
    u_contour: contour,
    u_angle: angle,
    u_noise: noise,
    u_innerGlow: innerGlow,
    u_outerGlow: outerGlow,
    u_colorBack: getShaderColorFromString(colorBack),
    u_colors: colors.map(getShaderColorFromString),
    u_colorsCount: colors.length,

    u_fit: ShaderFitOptions[fit],
    u_offsetX: offsetX,
    u_offsetY: offsetY,
    u_originX: originX,
    u_originY: originY,
    u_rotation: rotation,
    u_scale: scale,
    u_worldHeight: worldHeight,
    u_worldWidth: worldWidth,
  } satisfies HeatmapUniforms);
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
    fragmentShader={heatmapFragmentShader}
    mipmaps={['u_image']}
    {uniforms}
  />
{/if}
