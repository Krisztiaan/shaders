import { defaultObjectSizing, type AuroraParams, type ShaderPreset } from '@paper-design/shaders';

export type AuroraPreset = ShaderPreset<AuroraParams>;

export const defaultPreset: AuroraPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#000000',
    colors: ['#00ffb3', '#2f63e7', '#9f50d3'],
    intensity: 1,
    softness: 0.65,
    glow: 0.55,
    bands: 2.4,
    distortion: 0.65,
  },
};

export const greenPreset: AuroraPreset = {
  name: 'Green',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#000000',
    colors: ['#00ffb3', '#00d4ff', '#6bd7ff'],
    intensity: 1.15,
    softness: 0.7,
    glow: 0.65,
    bands: 2.1,
    distortion: 0.6,
  },
};

export const violetPreset: AuroraPreset = {
  name: 'Violet',
  params: {
    ...defaultObjectSizing,
    speed: 0.9,
    frame: 0,
    colorBack: '#000000',
    colors: ['#5a4bff', '#ff4bd8', '#00e0ff'],
    intensity: 1.05,
    softness: 0.6,
    glow: 0.6,
    bands: 2.8,
    distortion: 0.7,
  },
};

export const auroraPresets: AuroraPreset[] = [defaultPreset, greenPreset, violetPreset];

