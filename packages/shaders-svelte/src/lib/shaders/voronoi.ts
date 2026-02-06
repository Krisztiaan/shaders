import { defaultPatternSizing, type ShaderPreset, type VoronoiParams } from '@paper-design/shaders';

export type VoronoiPreset = ShaderPreset<VoronoiParams>;

export const defaultPreset: VoronoiPreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    speed: 0.5,
    frame: 0,
    colors: ['#ff8247', '#ffe53d'],
    stepsPerColor: 3,
    colorGlow: '#ffffff',
    colorGap: '#2e0000',
    distortion: 0.4,
    gap: 0.04,
    glow: 0,
    scale: 0.5,
  },
};

export const cellsPreset: VoronoiPreset = {
  name: 'Cells',
  params: {
    ...defaultPatternSizing,
    scale: 0.5,
    speed: 0.5,
    frame: 0,
    colors: ['#ffffff'],
    stepsPerColor: 1,
    colorGlow: '#ffffff',
    colorGap: '#000000',
    distortion: 0.5,
    gap: 0.03,
    glow: 0.8,
  },
};

export const bubblesPreset: VoronoiPreset = {
  name: 'Bubbles',
  params: {
    ...defaultPatternSizing,
    scale: 0.75,
    speed: 0.5,
    frame: 0,
    colors: ['#83c9fb'],
    stepsPerColor: 1,
    colorGlow: '#ffffff',
    colorGap: '#ffffff',
    distortion: 0.4,
    gap: 0,
    glow: 1,
  },
};

export const lightsPreset: VoronoiPreset = {
  name: 'Lights',
  params: {
    ...defaultPatternSizing,
    scale: 3.3,
    speed: 0.5,
    frame: 0,
    colors: ['#fffffffc', '#bbff00', '#00ffff'],
    colorGlow: '#ff00d0',
    colorGap: '#ff00d0',
    stepsPerColor: 2,
    distortion: 0.38,
    gap: 0.0,
    glow: 1.0,
  },
};

export const voronoiPresets: VoronoiPreset[] = [defaultPreset, lightsPreset, cellsPreset, bubblesPreset];

