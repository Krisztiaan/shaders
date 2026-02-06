import { defaultObjectSizing, type ImageShaderPreset, type LiquidMetalParams } from '@paper-design/shaders';

export type LiquidMetalPreset = ImageShaderPreset<LiquidMetalParams>;

export const defaultPreset: LiquidMetalPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    scale: 0.6,
    speed: 1,
    frame: 0,
    colorBack: '#AAAAAC',
    colorTint: '#ffffff',
    distortion: 0.07,
    repetition: 2.0,
    shiftRed: 0.3,
    shiftBlue: 0.3,
    contour: 0.4,
    softness: 0.1,
    angle: 70,
    shape: 'diamond',
  },
};

export const noirPreset: LiquidMetalPreset = {
  name: 'Noir',
  params: {
    ...defaultObjectSizing,
    scale: 0.6,
    speed: 1,
    frame: 0,
    colorBack: '#000000',
    colorTint: '#606060',
    softness: 0.45,
    repetition: 1.5,
    shiftRed: 0,
    shiftBlue: 0,
    distortion: 0,
    contour: 0,
    angle: 90,
    shape: 'diamond',
  },
};

export const fullScreenPreset: LiquidMetalPreset = {
  name: 'Backdrop',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    scale: 1.5,
    colorBack: '#AAAAAC',
    colorTint: '#ffffff',
    softness: 0.05,
    repetition: 1.5,
    shiftRed: 0.3,
    shiftBlue: 0.3,
    distortion: 0.1,
    contour: 0.4,
    shape: 'none',
    angle: 90,
    worldWidth: 0,
    worldHeight: 0,
  },
};

export const stripesPreset: LiquidMetalPreset = {
  name: 'Stripes',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    scale: 0.6,
    colorBack: '#000000',
    colorTint: '#2c5d72',
    softness: 0.8,
    repetition: 6,
    shiftRed: 1,
    shiftBlue: -1,
    distortion: 0.4,
    contour: 0.4,
    shape: 'circle',
    angle: 0,
  },
};

export const liquidMetalPresets: LiquidMetalPreset[] = [defaultPreset, noirPreset, fullScreenPreset, stripesPreset];

