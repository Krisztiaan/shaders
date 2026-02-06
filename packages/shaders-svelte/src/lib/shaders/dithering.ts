import { defaultObjectSizing, defaultPatternSizing, type DitheringParams, type ShaderPreset } from '@paper-design/shaders';

export type DitheringPreset = ShaderPreset<DitheringParams>;

export const defaultPreset: DitheringPreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    speed: 1,
    frame: 0,
    scale: 0.6,
    colorBack: '#000000',
    colorFront: '#00b2ff',
    shape: 'sphere',
    type: '4x4',
    size: 2,
  },
} as const;

export const sinePreset: DitheringPreset = {
  name: 'Sine Wave',
  params: {
    ...defaultPatternSizing,
    speed: 1,
    frame: 0,
    colorBack: '#730d54',
    colorFront: '#00becc',
    shape: 'wave',
    type: '4x4',
    size: 11,
    scale: 1.2,
  },
} as const;

export const bugsPreset: DitheringPreset = {
  name: 'Bugs',
  params: {
    ...defaultPatternSizing,
    speed: 1,
    frame: 0,
    colorBack: '#000000',
    colorFront: '#008000',
    shape: 'dots',
    type: 'random',
    size: 9,
  },
} as const;

export const ripplePreset: DitheringPreset = {
  name: 'Ripple',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#603520',
    colorFront: '#c67953',
    shape: 'ripple',
    type: '2x2',
    size: 3,
  },
} as const;

export const swirlPreset: DitheringPreset = {
  name: 'Swirl',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#00000000',
    colorFront: '#47a8e1',
    shape: 'swirl',
    type: '8x8',
    size: 2,
  },
} as const;

export const warpPreset: DitheringPreset = {
  name: 'Warp',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#301c2a',
    colorFront: '#56ae6c',
    shape: 'warp',
    type: '4x4',
    size: 2.5,
  },
} as const;

export const ditheringPresets: DitheringPreset[] = [
  defaultPreset,
  warpPreset,
  sinePreset,
  ripplePreset,
  bugsPreset,
  swirlPreset,
];
