import { defaultPatternSizing, type NeuroNoiseParams, type ShaderPreset } from '@paper-design/shaders';

export type NeuroNoisePreset = ShaderPreset<NeuroNoiseParams>;

export const defaultPreset: NeuroNoisePreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    speed: 1,
    frame: 0,
    colorFront: '#ffffff',
    colorMid: '#47a6ff',
    colorBack: '#000000',
    brightness: 0.05,
    contrast: 0.3,
  },
};

export const sensationPreset: NeuroNoisePreset = {
  name: 'Sensation',
  params: {
    ...defaultPatternSizing,
    speed: 1,
    frame: 0,
    colorFront: '#00c8ff',
    colorMid: '#fbff00',
    colorBack: '#8b42ff',
    brightness: 0.19,
    contrast: 0.12,
    scale: 3,
  },
};

export const bloodstreamPreset: NeuroNoisePreset = {
  name: 'Bloodstream',
  params: {
    ...defaultPatternSizing,
    speed: 1,
    frame: 0,
    colorFront: '#ff0000',
    colorMid: '#ff0000',
    colorBack: '#ffffff',
    brightness: 0.24,
    contrast: 0.17,
    scale: 0.7,
  },
};

export const ghostPreset: NeuroNoisePreset = {
  name: 'Ghost',
  params: {
    ...defaultPatternSizing,
    speed: 1,
    frame: 0,
    colorFront: '#ffffff',
    colorMid: '#000000',
    colorBack: '#ffffff',
    brightness: 0.0,
    contrast: 1.0,
    scale: 0.55,
  },
};

export const neuroNoisePresets: NeuroNoisePreset[] = [
  defaultPreset,
  sensationPreset,
  bloodstreamPreset,
  ghostPreset,
] as const;

