import { DitheringTypes, defaultObjectSizing, type ImageDitheringParams, type ImageShaderPreset } from '@paper-design/shaders';

export type ImageDitheringPreset = ImageShaderPreset<ImageDitheringParams>;

export const defaultPreset: ImageDitheringPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    colorFront: '#94ffaf',
    colorBack: '#000c38',
    colorHighlight: '#eaff94',
    type: '8x8',
    size: 2,
    colorSteps: 2,
    originalColors: false,
    inverted: false,
  },
} as const;

export const retroPreset: ImageDitheringPreset = {
  name: 'Retro',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    colorFront: '#eeeeee',
    colorBack: '#5452ff',
    colorHighlight: '#eeeeee',
    type: '2x2',
    size: 3,
    colorSteps: 1,
    originalColors: true,
    inverted: false,
  },
} as const;

export const noisePreset: ImageDitheringPreset = {
  name: 'Noise',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    colorFront: '#a2997c',
    colorBack: '#000000',
    colorHighlight: '#ededed',
    type: 'random',
    size: 1,
    colorSteps: 1,
    originalColors: false,
    inverted: false,
  },
} as const;

export const naturalPreset: ImageDitheringPreset = {
  name: 'Natural',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    colorFront: '#ffffff',
    colorBack: '#000000',
    colorHighlight: '#ffffff',
    type: '8x8',
    size: 2,
    colorSteps: 5,
    originalColors: true,
    inverted: false,
  },
} as const;

export const imageDitheringPresets: ImageDitheringPreset[] = [defaultPreset, noisePreset, retroPreset, naturalPreset];

