import { defaultPatternSizing, type ShaderPreset, type SpiralParams } from '@paper-design/shaders';

export type SpiralPreset = ShaderPreset<SpiralParams>;

export const defaultPreset: SpiralPreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    scale: 1,
    colorBack: '#001429',
    colorFront: '#79D1FF',
    density: 1,
    distortion: 0,
    strokeWidth: 0.5,
    strokeTaper: 0,
    strokeCap: 0,
    noise: 0,
    noiseFrequency: 0,
    softness: 0,
    speed: 1,
    frame: 0,
  },
};

export const dropletPreset: SpiralPreset = {
  name: 'Droplet',
  params: {
    ...defaultPatternSizing,
    colorBack: '#effafe',
    colorFront: '#bf40a0',
    density: 0.9,
    distortion: 0,
    strokeWidth: 0.75,
    strokeTaper: 0.18,
    strokeCap: 1,
    noise: 0.74,
    noiseFrequency: 0.33,
    softness: 0.02,
    speed: 1,
    frame: 0,
  },
};

export const junglePreset: SpiralPreset = {
  name: 'Jungle',
  params: {
    ...defaultPatternSizing,
    scale: 1.3,
    density: 0.5,
    colorBack: '#a0ef2a',
    colorFront: '#288b18',
    distortion: 0,
    strokeWidth: 0.5,
    strokeTaper: 0,
    strokeCap: 0,
    noise: 1,
    noiseFrequency: 0.25,
    softness: 0,
    speed: 0.75,
    frame: 0,
  },
};

export const swirlPreset: SpiralPreset = {
  name: 'Swirl',
  params: {
    ...defaultPatternSizing,
    scale: 0.45,
    colorBack: '#b3e6d9',
    colorFront: '#1a2b4d',
    density: 0.2,
    distortion: 0,
    strokeWidth: 0.5,
    strokeTaper: 0,
    strokeCap: 0,
    noise: 0,
    noiseFrequency: 0.3,
    softness: 0.5,
    speed: 1,
    frame: 0,
  },
};

export const spiralPresets: SpiralPreset[] = [defaultPreset, junglePreset, dropletPreset, swirlPreset];

