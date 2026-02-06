import { defaultObjectSizing, type ShaderPreset, type SmokeRingParams } from '@paper-design/shaders';

export type SmokeRingPreset = ShaderPreset<SmokeRingParams>;

export const defaultPreset: SmokeRingPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    speed: 0.5,
    frame: 0,
    colorBack: '#000000',
    colors: ['#ffffff'],
    noiseScale: 3,
    noiseIterations: 8,
    radius: 0.25,
    thickness: 0.65,
    innerShape: 0.7,
    scale: 0.8,
  },
};

export const solarPreset: SmokeRingPreset = {
  name: 'Solar',
  params: {
    ...defaultObjectSizing,
    speed: 1,
    frame: 0,
    colorBack: '#000000',
    colors: ['#ffffff', '#ffca0a', '#fc6203', '#fc620366'],
    noiseScale: 2,
    noiseIterations: 3,
    radius: 0.4,
    thickness: 0.8,
    innerShape: 4,
    scale: 2,
    offsetY: 1,
  },
};

export const linePreset: SmokeRingPreset = {
  name: 'Line',
  params: {
    ...defaultObjectSizing,
    frame: 0,
    colorBack: '#000000',
    colors: ['#4540a4', '#1fe8ff'],
    noiseScale: 1.1,
    noiseIterations: 2,
    radius: 0.38,
    thickness: 0.01,
    innerShape: 0.88,
    speed: 4,
  },
};

export const cloudPreset: SmokeRingPreset = {
  name: 'Cloud',
  params: {
    ...defaultObjectSizing,
    frame: 0,
    colorBack: '#81ADEC',
    colors: ['#ffffff'],
    noiseScale: 3,
    noiseIterations: 10,
    radius: 0.5,
    thickness: 0.65,
    innerShape: 0.85,
    speed: 0.5,
    scale: 2.5,
  },
};

export const smokeRingPresets: SmokeRingPreset[] = [defaultPreset, linePreset, solarPreset, cloudPreset];
