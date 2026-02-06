import { defaultObjectSizing, type MetaballsParams, type ShaderPreset } from '@paper-design/shaders';

export type MetaballsPreset = ShaderPreset<MetaballsParams>;

export const defaultPreset: MetaballsPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    scale: 1,
    speed: 1,
    frame: 0,
    colorBack: '#000000',
    colors: ['#6e33cc', '#ff5500', '#ffc105', '#ffc800', '#f585ff'],
    count: 10,
    size: 0.83,
  },
};

export const inkDropsPreset: MetaballsPreset = {
  name: 'Ink Drops',
  params: {
    ...defaultObjectSizing,
    scale: 1,
    speed: 2,
    frame: 0,
    colorBack: '#ffffff00',
    colors: ['#000000'],
    count: 18,
    size: 0.1,
  },
};

export const backgroundPreset: MetaballsPreset = {
  name: 'Background',
  params: {
    ...defaultObjectSizing,
    speed: 0.5,
    frame: 0,
    colors: ['#ae00ff', '#00ff95', '#ffc105'],
    colorBack: '#2a273f',
    count: 13,
    size: 0.81,
    scale: 4.0,
    rotation: 0,
    offsetX: -0.3,
  },
};

export const solarPreset: MetaballsPreset = {
  name: 'Solar',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colors: ['#ffc800', '#ff5500', '#ffc105'],
    colorBack: '#102f84',
    count: 7,
    size: 0.75,
    scale: 1,
  },
};

export const metaballsPresets: MetaballsPreset[] = [defaultPreset, inkDropsPreset, solarPreset, backgroundPreset];
