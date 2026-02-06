import { ShaderMount as ShaderMountVanilla } from '@paper-design/shaders';
import type { ShaderMountUniforms } from '@paper-design/shaders';
import { processUniforms } from './process-uniforms.js';
import type { ShaderMountActionParams } from './shader-mount.js';

const areStringArraysEqual = (a: string[] | undefined, b: string[] | undefined): boolean => {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export function shaderMount(node: HTMLElement, params: ShaderMountActionParams) {
  let shaderMount: ShaderMountVanilla | null = null;
  let destroyed = false;

  let lastFragmentShader: string | null = null;
  let lastMipmaps: string[] | undefined;
  let lastWebGlContextAttributes: WebGLContextAttributes | undefined;
  let lastColorSpace: ShaderMountActionParams['colorSpace'];

  let initToken = 0;
  let uniformsToken = 0;

  const dispose = () => {
    shaderMount?.dispose();
    shaderMount = null;
  };

  const initIfNeeded = async (next: ShaderMountActionParams): Promise<void> => {
    const needsRemount =
      shaderMount === null ||
      lastFragmentShader !== next.fragmentShader ||
      !areStringArraysEqual(lastMipmaps, next.mipmaps) ||
      lastWebGlContextAttributes !== next.webGlContextAttributes ||
      lastColorSpace !== next.colorSpace;

    if (!needsRemount) return;

    lastFragmentShader = next.fragmentShader;
    lastMipmaps = next.mipmaps;
    lastWebGlContextAttributes = next.webGlContextAttributes;
    lastColorSpace = next.colorSpace;

    const currentInitToken = ++initToken;
    const processedUniforms = await processUniforms(next.uniforms);
    if (destroyed || currentInitToken !== initToken) return;

    dispose();

    shaderMount = new ShaderMountVanilla(
      node,
      next.fragmentShader,
      processedUniforms,
      next.webGlContextAttributes,
      next.speed,
      next.frame,
      next.minPixelRatio,
      next.maxPixelCount,
      next.mipmaps ?? [],
      next.colorSpace
    );
  };

  const updateUniforms = async (next: ShaderMountActionParams): Promise<void> => {
    if (!shaderMount) return;

    const currentUniformsToken = ++uniformsToken;
    const processedUniforms: ShaderMountUniforms = await processUniforms(next.uniforms);
    if (destroyed || currentUniformsToken !== uniformsToken) return;

    shaderMount?.setUniforms(processedUniforms);
  };

  const update = (next: ShaderMountActionParams) => {
    void initIfNeeded(next).then(() => void updateUniforms(next));

    // These are safe to run even if we are still initializing.
    shaderMount?.setSpeed(next.speed ?? 0);
    shaderMount?.setFrame(next.frame ?? 0);
    shaderMount?.setMinPixelRatio(next.minPixelRatio);
    shaderMount?.setMaxPixelCount(next.maxPixelCount);
  };

  update(params);

  return {
    update,
    destroy() {
      destroyed = true;
      dispose();
    },
  };
}
