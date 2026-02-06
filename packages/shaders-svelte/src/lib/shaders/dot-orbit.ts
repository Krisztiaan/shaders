import { defaultPatternSizing, type DotOrbitParams, type ShaderPreset } from '@paper-design/shaders';

export type DotOrbitPreset = ShaderPreset<DotOrbitParams>;

export const defaultPreset: DotOrbitPreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    speed: 1.5,
    frame: 0,
    colorBack: '#000000',
    colors: ['#ffc96b', '#ff6200', '#ff2f00', '#421100', '#1a0000'],
    size: 1,
    sizeRange: 0,
    spreading: 1,
    stepsPerColor: 4,
  },
};

export const shinePreset: DotOrbitPreset = {
  name: 'Shine',
  params: {
    ...defaultPatternSizing,
    speed: 0.1,
    frame: 0,
    colors: ['#ffffff', '#006aff', '#fff675'],
    colorBack: '#000000',
    stepsPerColor: 4,
    size: 0.3,
    sizeRange: 0.2,
    spreading: 1,
    scale: 0.4,
  },
};

export const bubblesPreset: DotOrbitPreset = {
  name: 'Bubbles',
  params: {
    ...defaultPatternSizing,
    speed: 0.4,
    frame: 0,
    colors: ['#D0D2D5'],
    colorBack: '#989CA4',
    stepsPerColor: 2,
    size: 0.9,
    sizeRange: 0.7,
    spreading: 1.0,
    scale: 1.64,
  },
};

export const hallucinatoryPreset: DotOrbitPreset = {
  name: 'Hallucinatory',
  params: {
    ...defaultPatternSizing,
    speed: 5,
    frame: 0,
    colors: ['#000000'],
    colorBack: '#ffe500',
    stepsPerColor: 2,
    size: 0.65,
    sizeRange: 0,
    spreading: 0.3,
    scale: 0.5,
  },
};

export const dotOrbitPresets: DotOrbitPreset[] = [defaultPreset, bubblesPreset, shinePreset, hallucinatoryPreset];

