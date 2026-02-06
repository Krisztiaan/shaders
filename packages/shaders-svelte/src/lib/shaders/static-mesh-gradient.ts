import { defaultObjectSizing, type ShaderPreset, type StaticMeshGradientParams } from '@paper-design/shaders';

export type StaticMeshGradientPreset = ShaderPreset<StaticMeshGradientParams>;

export const defaultPreset: StaticMeshGradientPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    rotation: 270,
    speed: 0,
    frame: 0,
    colors: ['#ffad0a', '#6200ff', '#e2a3ff', '#ff99fd'],
    positions: 2,
    waveX: 1.0,
    waveXShift: 0.6,
    waveY: 1.0,
    waveYShift: 0.21,
    mixing: 0.93,
    grainMixer: 0.0,
    grainOverlay: 0.0,
  },
};

export const seaPreset: StaticMeshGradientPreset = {
  name: 'Sea',
  params: {
    ...defaultObjectSizing,
    speed: 0,
    frame: 0,
    colors: ['#013b65', '#03738c', '#a3d3ff', '#f2faef'],
    positions: 0,
    waveX: 0.53,
    waveXShift: 0.0,
    waveY: 0.95,
    waveYShift: 0.64,
    mixing: 0.5,
    grainMixer: 0.0,
    grainOverlay: 0.0,
  },
};

export const sixtiesPreset: StaticMeshGradientPreset = {
  name: '1960s',
  params: {
    ...defaultObjectSizing,
    speed: 0,
    frame: 0,
    colors: ['#000000', '#082400', '#b1aa91', '#8e8c15'],
    positions: 42,
    waveX: 0.45,
    waveXShift: 0.0,
    waveY: 1.0,
    waveYShift: 0.0,
    mixing: 0.0,
    grainMixer: 0.37,
    grainOverlay: 0.78,
  },
};

export const sunsetPreset: StaticMeshGradientPreset = {
  name: 'Sunset',
  params: {
    ...defaultObjectSizing,
    speed: 0,
    frame: 0,
    colors: ['#264653', '#9c2b2b', '#f4a261', '#ffffff'],
    positions: 0,
    waveX: 0.6,
    waveXShift: 0.7,
    waveY: 0.7,
    waveYShift: 0.7,
    mixing: 0.5,
    grainMixer: 0,
    grainOverlay: 0,
  },
};

export const staticMeshGradientPresets: StaticMeshGradientPreset[] = [
  defaultPreset,
  sixtiesPreset,
  sunsetPreset,
  seaPreset,
];

