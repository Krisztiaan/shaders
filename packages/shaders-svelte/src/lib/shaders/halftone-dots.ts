import { defaultObjectSizing, type HalftoneDotsParams, type ImageShaderPreset } from '@paper-design/shaders';

export type HalftoneDotsPreset = ImageShaderPreset<HalftoneDotsParams>;

export const defaultPreset: HalftoneDotsPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    colorBack: '#f2f1e8',
    colorFront: '#2b2b2b',
    size: 0.5,
    radius: 1.25,
    contrast: 0.4,
    originalColors: false,
    inverted: false,
    grainMixer: 0.2,
    grainOverlay: 0.2,
    grainSize: 0.5,
    grid: 'hex',
    type: 'gooey',
  },
};

export const ledPreset: HalftoneDotsPreset = {
  name: 'LED screen',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    colorBack: '#000000',
    colorFront: '#29ff7b',
    size: 0.5,
    radius: 1.5,
    contrast: 0.3,
    originalColors: false,
    inverted: false,
    grainMixer: 0,
    grainOverlay: 0,
    grainSize: 0.5,
    grid: 'square',
    type: 'soft',
  },
};

export const netPreset: HalftoneDotsPreset = {
  name: 'Mosaic',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    colorBack: '#000000',
    colorFront: '#b2aeae',
    size: 0.6,
    radius: 2,
    contrast: 0.01,
    originalColors: true,
    inverted: false,
    grainMixer: 0,
    grainOverlay: 0,
    grainSize: 0.5,
    grid: 'hex',
    type: 'classic',
  },
};

export const roundAndSquarePreset: HalftoneDotsPreset = {
  name: 'Round and square',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    colorBack: '#141414',
    colorFront: '#ff8000',
    size: 0.8,
    radius: 1,
    contrast: 1,
    originalColors: false,
    inverted: true,
    grainMixer: 0.05,
    grainOverlay: 0.3,
    grainSize: 0.5,
    grid: 'square',
    type: 'holes',
  },
};

export const halftoneDotsPresets: HalftoneDotsPreset[] = [defaultPreset, ledPreset, netPreset, roundAndSquarePreset];
