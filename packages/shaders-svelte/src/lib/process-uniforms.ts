import { getEmptyPixel, type ShaderMountUniforms } from '@paper-design/shaders';
import { setMinImageSize } from './set-min-image-size.js';
import type { ShaderMountUniformsInput } from './shader-mount.js';

const isValidUrl = (url: string): boolean => {
  try {
    if (url.startsWith('/')) return true;
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isExternalUrl = (url: string): boolean => {
  try {
    if (url.startsWith('/')) return false;
    const urlObject = new URL(url, window.location.origin);
    return urlObject.origin !== window.location.origin;
  } catch {
    return false;
  }
};

/** Parse the provided uniforms, turning URL strings into loaded images. */
export async function processUniforms(uniformsProp: ShaderMountUniformsInput): Promise<ShaderMountUniforms> {
  const processedUniforms = {} as ShaderMountUniforms;
  const imageLoadPromises: Promise<void>[] = [];

  Object.entries(uniformsProp).forEach(([key, value]) => {
    if (typeof value === 'string') {
      // Use a transparent pixel for empty strings
      if (!value) {
        processedUniforms[key] = getEmptyPixel();
        return;
      }

      // Make sure the provided string is a valid URL or just skip trying to set this uniform entirely
      if (!isValidUrl(value)) {
        console.warn(`Uniform "${key}" has invalid URL "${value}". Skipping image loading.`);
        return;
      }

      const imagePromise = new Promise<void>((resolve, reject) => {
        const img = new Image();
        if (isExternalUrl(value)) {
          img.crossOrigin = 'anonymous';
        }
        img.onload = () => {
          setMinImageSize(img);
          processedUniforms[key] = img;
          resolve();
        };
        img.onerror = () => {
          console.error(`Could not set uniforms. Failed to load image at ${value}`);
          reject();
        };
        img.src = value;
      });

      imageLoadPromises.push(imagePromise);
    } else if (value instanceof HTMLImageElement) {
      setMinImageSize(value);
      processedUniforms[key] = value;
    } else {
      processedUniforms[key] = value;
    }
  });

  await Promise.all(imageLoadPromises);
  return processedUniforms;
}

