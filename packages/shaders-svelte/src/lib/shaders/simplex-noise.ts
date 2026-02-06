import { defaultPatternSizing, type ShaderPreset, type SimplexNoiseParams } from '@paper-design/shaders';

export type SimplexNoisePreset = ShaderPreset<SimplexNoiseParams>;

export const defaultPreset: SimplexNoisePreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    scale: 0.6,
    speed: 0.5,
    frame: 0,
    colors: ['#4449CF', '#FFD1E0', '#F94446', '#FFD36B', '#FFFFFF'],
    stepsPerColor: 2,
    softness: 0,
  },
};

export const bubblegumPreset: SimplexNoisePreset = {
  name: 'Bubblegum',
  params: {
    ...defaultPatternSizing,
    speed: 2,
    frame: 0,
    colors: ['#ffffff', '#ff9e9e', '#5f57ff', '#00f7ff'],
    stepsPerColor: 1,
    softness: 1.0,
    scale: 1.6,
  },
};

export const spotsPreset: SimplexNoisePreset = {
  name: 'Spots',
  params: {
    ...defaultPatternSizing,
    speed: 0.6,
    frame: 0,
    colors: ['#ff7b00', '#f9ffeb', '#320d82'],
    stepsPerColor: 1,
    softness: 0.0,
    scale: 1.0,
  },
};

export const firstContactPreset: SimplexNoisePreset = {
  name: 'First contact',
  params: {
    ...defaultPatternSizing,
    speed: 2,
    frame: 0,
    colors: ['#e8cce6', '#120d22', '#442c44', '#e6baba', '#fff5f5'],
    stepsPerColor: 2,
    softness: 0.0,
    scale: 0.2,
  },
};

export const simplexNoisePresets: SimplexNoisePreset[] = [
  defaultPreset,
  spotsPreset,
  firstContactPreset,
  bubblegumPreset,
];
