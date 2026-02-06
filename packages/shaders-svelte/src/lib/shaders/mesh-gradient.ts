import { defaultObjectSizing, type MeshGradientParams, type ShaderPreset } from '@paper-design/shaders';

export type MeshGradientPreset = ShaderPreset<MeshGradientParams>;

export const defaultPreset: MeshGradientPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colors: ['#e0eaff', '#241d9a', '#f75092', '#9f50d3'],
    distortion: 0.8,
    swirl: 0.1,
    grainMixer: 0,
    grainOverlay: 0,
  },
};

export const purplePreset: MeshGradientPreset = {
  name: 'Purple',
  params: {
    ...defaultObjectSizing,
    speed: 0.6,
    frame: 0,
    colors: ['#aaa7d7', '#3c2b8e'],
    distortion: 1,
    swirl: 1,
    grainMixer: 0,
    grainOverlay: 0,
  },
};

export const beachPreset: MeshGradientPreset = {
  name: 'Beach',
  params: {
    ...defaultObjectSizing,
    speed: 0.1,
    frame: 0,
    colors: ['#bcecf6', '#00aaff', '#00f7ff', '#ffd447'],
    distortion: 0.8,
    swirl: 0.35,
    grainMixer: 0,
    grainOverlay: 0,
  },
};

export const inkPreset: MeshGradientPreset = {
  name: 'Ink',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colors: ['#ffffff', '#000000'],
    distortion: 1,
    swirl: 0.2,
    rotation: 90,
    grainMixer: 0,
    grainOverlay: 0,
  },
};

export const meshGradientPresets: MeshGradientPreset[] = [defaultPreset, inkPreset, purplePreset, beachPreset];

