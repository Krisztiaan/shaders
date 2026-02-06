import type { ShaderColorSpace, ShaderMotionParams } from '@paper-design/shaders';
import type { HTMLAttributes } from 'svelte/elements';

export type ShaderMountUniformValue =
  | string
  | boolean
  | number
  | number[]
  | number[][]
  | HTMLImageElement
  | undefined;

/**
 * Svelte wrapper accepts URL strings as uniform values, which will be treated as images and loaded.
 * If you already have a loaded image, pass an `HTMLImageElement`.
 */
export type ShaderMountUniformsInput = Record<string, ShaderMountUniformValue>;

export interface ShaderMountActionParams extends ShaderMotionParams {
  fragmentShader: string;
  uniforms: ShaderMountUniformsInput;
  mipmaps?: string[];
  minPixelRatio?: number;
  maxPixelCount?: number;
  /**
   * WebGL context attributes.
   *
   * Note: changing the object identity will cause a remount. Prefer passing a stable reference
   * (e.g. define a `const attrs = { ... }` once and pass that), rather than inline object literals.
   */
  webGlContextAttributes?: WebGLContextAttributes;
  colorSpace?: ShaderColorSpace;
}

export interface ShaderMountProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
    ShaderMountActionParams {
  /** Inline CSS width style */
  width?: string | number;
  /** Inline CSS height style */
  height?: string | number;

  /**
   * Bindable mount element (`bind:element`).
   *
   * At runtime this element will also satisfy `PaperShaderElement` (it gets a `paperShaderMount` property),
   * so you can narrow with `isPaperShaderElement`.
   */
  element?: HTMLDivElement | null;
}
