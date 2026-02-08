import { defaultObjectSizing, type RainParams, type ShaderPreset } from '@paper-design/shaders';

export type RainPreset = ShaderPreset<RainParams>;

export const defaultPreset: RainPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#00000000',
    colors: ['#b7e8ff', '#ffffff'],
    density: 0.65,
    angle: -22,
    length: 0.55,
    thickness: 0.55,
    speedMultiplier: 1,
  },
};

export const stormPreset: RainPreset = {
  name: 'Storm',
  params: {
    ...defaultObjectSizing,
    speed: 1.15,
    frame: 0,
    colorBack: '#00000000',
    colors: ['#ffffff', '#9bd4ff', '#6aa8ff'],
    density: 0.95,
    angle: -35,
    length: 0.7,
    thickness: 0.42,
    speedMultiplier: 1.3,
  },
};

export const drizzlePreset: RainPreset = {
  name: 'Drizzle',
  params: {
    ...defaultObjectSizing,
    speed: 0.85,
    frame: 0,
    colorBack: '#00000000',
    colors: ['#ffffff'],
    density: 0.35,
    angle: -15,
    length: 0.4,
    thickness: 0.7,
    speedMultiplier: 0.75,
  },
};

export const rainPresets: RainPreset[] = [defaultPreset, stormPreset, drizzlePreset];

