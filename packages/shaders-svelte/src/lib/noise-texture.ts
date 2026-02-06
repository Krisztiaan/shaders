import { getShaderNoiseTexture } from '@paper-design/shaders';

let sharedNoiseTexture: HTMLImageElement | undefined;

export function getSharedNoiseTexture(): HTMLImageElement | undefined {
  if (sharedNoiseTexture) return sharedNoiseTexture;
  sharedNoiseTexture = getShaderNoiseTexture();
  return sharedNoiseTexture;
}

