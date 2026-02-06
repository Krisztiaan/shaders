import { defaultObjectSizing, type ShaderPreset, type SwirlParams } from '@paper-design/shaders';

export type SwirlPreset = ShaderPreset<SwirlParams>;

export const defaultPreset: SwirlPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    speed: 0.32,
    frame: 0,
    colorBack: '#330000',
    colors: ['#ffd1d1', '#ff8a8a', '#660000'],
    bandCount: 4,
    twist: 0.1,
    center: 0.2,
    proportion: 0.5,
    softness: 0,
    noiseFrequency: 0.4,
    noise: 0.2,
  },
};

export const openingPreset: SwirlPreset = {
  name: 'Opening',
  params: {
    ...defaultObjectSizing,
    offsetX: -0.4,
    offsetY: 1,
    speed: 0.5,
    frame: 0,
    colorBack: '#ff8b61',
    colors: ['#fefff0', '#ffd8bd', '#ff8b61'],
    bandCount: 2,
    twist: 0.3,
    center: 0.2,
    proportion: 0.5,
    softness: 0,
    noiseFrequency: 0,
    noise: 0,
    scale: 1,
  },
} as const;

export const jamesBondPreset: SwirlPreset = {
  name: '007',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#E9E7DA',
    colors: ['#000000'],
    bandCount: 5,
    twist: 0.3,
    center: 0,
    proportion: 0,
    softness: 0,
    noiseFrequency: 0.5,
    noise: 0,
  },
} as const;

export const candyPreset: SwirlPreset = {
  name: 'Candy',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#ffcd66',
    colors: ['#6bbceb', '#d7b3ff', '#ff9fff'],
    bandCount: 2,
    twist: 0.15,
    center: 0.2,
    proportion: 0.5,
    softness: 1,
    noiseFrequency: 0.5,
    noise: 0,
  },
} as const;

export const swirlPresets: SwirlPreset[] = [defaultPreset, jamesBondPreset, openingPreset, candyPreset];

