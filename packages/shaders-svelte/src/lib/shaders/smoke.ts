import { defaultObjectSizing, type ShaderPreset, type SmokeParams } from '@paper-design/shaders';

export type SmokePreset = ShaderPreset<SmokeParams>;

export const defaultPreset: SmokePreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#0a0b0f',
    colors: ['#ffffff', '#c8d3ff', '#7a8cff'],
    size: 1.1,
    density: 0.75,
    softness: 0.7,
    turbulence: 0.7,
    detail: 0.75,
    rise: 1,
    wind: 0.15,
    intensity: 1,
  },
};

export const warmPreset: SmokePreset = {
  name: 'Warm',
  params: {
    ...defaultObjectSizing,
    speed: 0.9,
    frame: 0,
    colorBack: '#0b0907',
    colors: ['#fff4e6', '#ffd7b0', '#ff9a6e'],
    size: 1.15,
    density: 0.7,
    softness: 0.75,
    turbulence: 0.65,
    detail: 0.7,
    rise: 1.1,
    wind: 0.25,
    intensity: 1.05,
  },
};

export const inkPreset: SmokePreset = {
  name: 'Ink',
  params: {
    ...defaultObjectSizing,
    speed: 0.8,
    frame: 0,
    colorBack: '#f7f6f3',
    colors: ['#0d0d12', '#1b1d2b', '#3a3f62'],
    size: 1.05,
    density: 0.85,
    softness: 0.6,
    turbulence: 0.8,
    detail: 0.8,
    rise: 0.9,
    wind: -0.15,
    intensity: 0.9,
  },
};

export const smokePresets: SmokePreset[] = [defaultPreset, warmPreset, inkPreset];

