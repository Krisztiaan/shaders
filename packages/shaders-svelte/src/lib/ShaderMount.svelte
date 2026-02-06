<script lang="ts">
  import { createAttachmentKey, fromAction } from 'svelte/attachments';
  import { shaderMount } from './shader-mount-action.js';
  import type { ShaderMountProps, ShaderMountUniformsInput } from './shader-mount.js';

  const attachKey = createAttachmentKey();

  const toCssSize = (value: string | number): string => {
    if (typeof value === 'number') return `${value}px`;
    if (typeof value === 'string' && Number.isNaN(+value) === false) return `${+value}px`;
    return value;
  };

  let {
    fragmentShader,
    uniforms = {},
    speed = 0,
    frame = 0,
    mipmaps,
    minPixelRatio,
    maxPixelCount,
    webGlContextAttributes,
    colorSpace,
    width,
    height,
    element = $bindable(null),
    ...rest
  }: ShaderMountProps = $props();

  let actionParams = $derived({
    fragmentShader,
    uniforms: uniforms as ShaderMountUniformsInput,
    speed,
    frame,
    mipmaps,
    minPixelRatio,
    maxPixelCount,
    webGlContextAttributes,
    colorSpace,
  });

  const attach = fromAction(shaderMount, () => actionParams);

  let styleString = $derived.by(() => {
    const baseStyle = typeof rest.style === 'string' ? rest.style : '';
    const pieces: string[] = [];
    if (width !== undefined) pieces.push(`width: ${toCssSize(width)};`);
    if (height !== undefined) pieces.push(`height: ${toCssSize(height)};`);
    const sizeStyle = pieces.join(' ');
    if (!sizeStyle) return baseStyle;
    if (!baseStyle) return sizeStyle;
    return `${sizeStyle} ${baseStyle}`;
  });

  let divProps = $derived.by(() => ({
    ...rest,
    style: styleString,
    [attachKey]: attach,
  }));
</script>

<div bind:this={element} {...divProps}></div>
