import { defaultObjectSizing, type GodRaysParams, type ShaderPreset } from '@paper-design/shaders';

export type GodRaysPreset = ShaderPreset<GodRaysParams>;

export const defaultPreset: GodRaysPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    offsetX: 0,
    offsetY: -0.55,
    colorBack: '#000000',
    colorBloom: '#0000ff',
    colors: ['#a600ff6e', '#6200fff0', '#ffffff', '#33fff5'],
    density: 0.3,
    spotty: 0.3,
    midIntensity: 0.4,
    midSize: 0.2,
    intensity: 0.8,
    bloom: 0.4,
    speed: 0.75,
    frame: 0,
  },
};

export const warpPreset: GodRaysPreset = {
  name: 'Warp',
  params: {
    ...defaultObjectSizing,
    colorBack: '#000000',
    colorBloom: '#222288',
    colors: ['#ff47d4', '#ff8c00', '#ffffff'],
    density: 0.45,
    spotty: 0.15,
    midIntensity: 0.4,
    midSize: 0.33,
    intensity: 0.79,
    bloom: 0.4,
    speed: 2,
    frame: 0,
  },
};

export const linearPreset: GodRaysPreset = {
  name: 'Linear',
  params: {
    ...defaultObjectSizing,
    offsetX: 0.2,
    offsetY: -0.8,
    colorBack: '#000000',
    colorBloom: '#eeeeee',
    colors: ['#ffffff1f', '#ffffff3d', '#ffffff29'],
    density: 0.41,
    spotty: 0.25,
    midSize: 0.1,
    midIntensity: 0.75,
    intensity: 0.79,
    bloom: 1,
    speed: 0.5,
    frame: 0,
  },
};

export const etherPreset: GodRaysPreset = {
  name: 'Ether',
  params: {
    ...defaultObjectSizing,
    offsetX: -0.6,
    colorBack: '#090f1d',
    colorBloom: '#ffffff',
    colors: ['#148effa6', '#c4dffebe', '#232a47'],
    density: 0.03,
    spotty: 0.77,
    midSize: 0.1,
    midIntensity: 0.6,
    intensity: 0.6,
    bloom: 0.6,
    speed: 1,
    frame: 0,
  },
};

export const godRaysPresets: GodRaysPreset[] = [defaultPreset, warpPreset, linearPreset, etherPreset];

