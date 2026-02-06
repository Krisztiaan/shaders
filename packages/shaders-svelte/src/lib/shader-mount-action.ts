import { ShaderMount as ShaderMountVanilla } from '@paper-design/shaders';
import type { ShaderMountUniforms } from '@paper-design/shaders';
import { processUniforms } from './process-uniforms.js';
import type { ShaderMountActionParams } from './shader-mount.js';

const areStringArraysEqual = (a: string[] | undefined, b: string[] | undefined): boolean => {
  if (a === b) return true;
  const aValue = a ?? [];
  const bValue = b ?? [];
  if (aValue.length !== bValue.length) return false;
  for (let i = 0; i < aValue.length; i++) {
    if (aValue[i] !== bValue[i]) return false;
  }
  return true;
};

export function shaderMount(node: HTMLElement, params: ShaderMountActionParams) {
  let shaderMount: ShaderMountVanilla | null = null;
  let destroyed = false;

  let lastFragmentShader: string | null = null;
  let lastMipmaps: string[] | undefined;
  let lastWebGlContextAttributes: WebGLContextAttributes | undefined;

  let updateToken = 0;

  const performUpdate = async (next: ShaderMountActionParams): Promise<void> => {
    const currentUpdateToken = ++updateToken;

    let processedUniforms: ShaderMountUniforms;
    try {
      processedUniforms = await processUniforms(next.uniforms);
    } catch (error) {
      console.error('Paper Shaders (Svelte): failed to process uniforms.', error);
      return;
    }

    if (destroyed || currentUpdateToken !== updateToken) return;

    const needsRemount =
      shaderMount === null ||
      lastFragmentShader !== next.fragmentShader ||
      !areStringArraysEqual(lastMipmaps, next.mipmaps) ||
      lastWebGlContextAttributes !== next.webGlContextAttributes;
 
     if (needsRemount) {
       const previousMount = shaderMount;
       const previousCanvas = previousMount?.canvasElement;
 
       try {
         const newMount = new ShaderMountVanilla(
           node,
           next.fragmentShader,
           processedUniforms,
           next.webGlContextAttributes,
           next.speed,
           next.frame,
           next.minPixelRatio,
           next.maxPixelCount,
           next.mipmaps ?? []
         );
 
         if (destroyed || currentUpdateToken !== updateToken) {
           newMount.dispose();
           return;
         }
 
         // Only commit remount state once initialization succeeds.
         previousMount?.dispose();
         shaderMount = newMount;
         lastFragmentShader = next.fragmentShader;
         lastMipmaps = next.mipmaps;
         lastWebGlContextAttributes = next.webGlContextAttributes;
       } catch (error) {
         // Attempt to remove any partially-mounted canvas inserted by the failed mount,
         // while preserving the previous mount/canvas if one existed.
         while (node.firstChild instanceof HTMLCanvasElement && node.firstChild !== previousCanvas) {
           node.firstChild.remove();
         }
 
         console.error('Paper Shaders (Svelte): failed to initialize ShaderMount.', error);
         return;
       }
     } else {
       try {
         shaderMount?.setUniforms(processedUniforms);
       } catch (error) {
         console.error('Paper Shaders (Svelte): failed to update uniforms.', error);
       }
     }
 
     // Make sure these are applied to the latest mount after async work completes.
     shaderMount?.setSpeed(next.speed ?? 0);
     shaderMount?.setFrame(next.frame ?? 0);
     shaderMount?.setMinPixelRatio(next.minPixelRatio);
     shaderMount?.setMaxPixelCount(next.maxPixelCount);
   };

  const update = (next: ShaderMountActionParams) => {
    void performUpdate(next).catch((error) => {
      console.error('Paper Shaders (Svelte): update failed.', error);
    });

    // These are safe to run even if we are still initializing (applies immediately to the current mount).
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
      shaderMount?.dispose();
      shaderMount = null;
    },
  };
}
