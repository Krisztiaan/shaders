import { defaultObjectSizing, type FrostParams, type ShaderPreset } from '@paper-design/shaders';

export type FrostPreset = ShaderPreset<FrostParams>;

export const defaultPreset: FrostPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    speed: 0.9,
    frame: 0,
    colorBack: '#0b1320',
    colors: ['#ffffff', '#b7f0ff', '#5ba4ff'],
    coverage: 1,
    softness: 0.45,
    detail: 0.75,
    crystal: 0.85,
    intensity: 1.15,
    glow: 0.35,
  },
};

export const subtlePreset: FrostPreset = {
  name: 'Subtle',
  params: {
    ...defaultObjectSizing,
    speed: 0.6,
    frame: 0,
    colorBack: '#0a0f16',
    colors: ['#e9f3ff', '#a9d7ff'],
    coverage: 1,
    softness: 0.6,
    detail: 0.6,
    crystal: 0.6,
    intensity: 0.95,
    glow: 0.25,
  },
};

export const whitePreset: FrostPreset = {
  name: 'White',
  params: {
    ...defaultObjectSizing,
    speed: 0.7,
    frame: 0,
    colorBack: '#f8fbff',
    colors: ['#ffffff', '#d6f2ff', '#a0c7ff'],
    coverage: 1,
    softness: 0.5,
    detail: 0.7,
    crystal: 0.8,
    intensity: 0.85,
    glow: 0.2,
  },
};

export const frostPresets: FrostPreset[] = [defaultPreset, subtlePreset, whitePreset];

