import { getEmptyPixel, type ShaderMountUniforms } from '@paper-design/shaders';
import { setMinImageSize } from './set-min-image-size.js';
import type { ShaderMountUniformsInput } from './shader-mount.js';

const waitForImage = (img: HTMLImageElement): Promise<void> => {
  if (img.complete) {
    if (img.naturalWidth > 0) return Promise.resolve();
    return Promise.reject(new Error('Image failed to load'));
  }

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };

    const onLoad = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error('Failed to load image'));
    };

    img.addEventListener('load', onLoad, { once: true });
    img.addEventListener('error', onError, { once: true });
  });
};

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

      // Make sure the provided string is a valid URL or fallback to an empty pixel
      if (!isValidUrl(value)) {
        console.warn(`Uniform "${key}" has invalid URL "${value}". Skipping image loading.`);
        processedUniforms[key] = getEmptyPixel();
        return;
      }

      const imagePromise = new Promise<void>((resolve) => {
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
          processedUniforms[key] = getEmptyPixel();
          resolve();
        };
        img.src = value;
      });

      imageLoadPromises.push(imagePromise);
    } else if (value instanceof HTMLImageElement) {
      // Wait until the image is fully loaded; ShaderMount will throw if natural size isn't available yet.
      const imagePromise = waitForImage(value)
        .then(() => {
          setMinImageSize(value);
          processedUniforms[key] = value;
        })
        .catch(() => {
          processedUniforms[key] = getEmptyPixel();
        });

      imageLoadPromises.push(imagePromise);
    } else {
      processedUniforms[key] = value;
    }
  });

  await Promise.all(imageLoadPromises);
  return processedUniforms;
}
