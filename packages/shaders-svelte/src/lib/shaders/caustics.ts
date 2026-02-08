import { defaultObjectSizing, type CausticsParams, type ShaderPreset } from '@paper-design/shaders';

export type CausticsPreset = ShaderPreset<CausticsParams>;

export const defaultPreset: CausticsPreset = {
  name: 'Pool',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#062038',
    colors: ['#ffffff', '#69d2ff', '#00fff0'],
    size: 1.05,
    distortion: 0.45,
    thickness: 0.22,
    contrast: 0.8,
    intensity: 1.15,
    glow: 0.55,
  },
};

export const sunlightPreset: CausticsPreset = {
  name: 'Sunlight',
  params: {
    ...defaultObjectSizing,
    speed: 0.8,
    frame: 0,
    colorBack: '#2a1d0e',
    colors: ['#fff9e6', '#ffd28a', '#ffffff'],
    size: 0.95,
    distortion: 0.35,
    thickness: 0.35,
    contrast: 0.7,
    intensity: 1.2,
    glow: 0.55,
  },
};

export const neonPreset: CausticsPreset = {
  name: 'Neon',
  params: {
    ...defaultObjectSizing,
    speed: 1.2,
    frame: 0,
    colorBack: '#05000f',
    colors: ['#00ffff', '#ff00ff', '#7c4dff', '#ffffff'],
    size: 1.25,
    distortion: 0.6,
    thickness: 0.22,
    contrast: 0.9,
    intensity: 1.15,
    glow: 0.7,
  },
};

export const causticsPresets: CausticsPreset[] = [defaultPreset, sunlightPreset, neonPreset];
