import { defaultObjectSizing, type ColorPanelsParams, type ShaderPreset } from '@paper-design/shaders';

export type ColorPanelsPreset = ShaderPreset<ColorPanelsParams>;

export const defaultPreset: ColorPanelsPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    speed: 0.5,
    frame: 0,
    colors: ['#ff9d00', '#fd4f30', '#809bff', '#6d2eff', '#333aff', '#f15cff', '#ffd557'],
    colorBack: '#000000',
    angle1: 0,
    angle2: 0,
    length: 1.1,
    edges: false,
    blur: 0,
    fadeIn: 1,
    fadeOut: 0.3,
    gradient: 0,
    density: 3,
    scale: 0.8,
  },
};

export const glassPreset: ColorPanelsPreset = {
  name: 'Glass',
  params: {
    ...defaultObjectSizing,
    rotation: 112,
    speed: 1,
    frame: 0,
    colors: ['#00cfff', '#ff2d55', '#34c759', '#af52de'],
    colorBack: '#ffffff00',
    angle1: 0.3,
    angle2: 0.3,
    length: 1,
    edges: true,
    blur: 0.25,
    fadeIn: 0.85,
    fadeOut: 0.3,
    gradient: 0,
    density: 1.6,
  },
};

export const gradientPreset: ColorPanelsPreset = {
  name: 'Gradient',
  params: {
    ...defaultObjectSizing,
    speed: 0.5,
    frame: 0,
    colors: ['#f2ff00', '#00000000', '#00000000', '#5a0283', '#005eff'],
    colorBack: '#8ffff2',
    angle1: 0.4,
    angle2: 0.4,
    length: 3,
    edges: false,
    blur: 0.5,
    fadeIn: 1.0,
    fadeOut: 0.39,
    gradient: 0.78,
    density: 1.65,
    scale: 1.72,
    rotation: 270,
    offsetX: 0.18,
  },
};

export const openingPreset: ColorPanelsPreset = {
  name: 'Opening',
  params: {
    ...defaultObjectSizing,
    speed: 2.0,
    frame: 0,
    colors: ['#00ffff'],
    colorBack: '#570044',
    angle1: -1.0,
    angle2: -1.0,
    length: 0.52,
    edges: false,
    blur: 0.0,
    fadeIn: 0.0,
    fadeOut: 1.0,
    gradient: 0.0,
    density: 2.21,
    scale: 2.32,
    rotation: 360,
    offsetX: -0.3,
    offsetY: 0.6,
  },
};

export const colorPanelsPresets: ColorPanelsPreset[] = [defaultPreset, glassPreset, gradientPreset, openingPreset];

