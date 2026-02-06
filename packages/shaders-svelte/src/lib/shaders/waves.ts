import { defaultPatternSizing, type ShaderPreset, type WavesParams } from '@paper-design/shaders';

export type WavesPreset = ShaderPreset<WavesParams>;

export const defaultPreset: WavesPreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    scale: 0.6,
    colorFront: '#ffbb00',
    colorBack: '#000000',
    shape: 0,
    frequency: 0.5,
    amplitude: 0.5,
    spacing: 1.2,
    proportion: 0.1,
    softness: 0,
  },
};

export const groovyPreset: WavesPreset = {
  name: 'Groovy',
  params: {
    ...defaultPatternSizing,
    scale: 5,
    rotation: 90,
    colorFront: '#fcfcee',
    colorBack: '#ff896b',
    shape: 3,
    frequency: 0.2,
    amplitude: 0.25,
    spacing: 1.17,
    proportion: 0.57,
    softness: 0,
  },
};

export const tangledUpPreset: WavesPreset = {
  name: 'Tangled up',
  params: {
    ...defaultPatternSizing,
    scale: 0.5,
    rotation: 0,
    colorFront: '#133a41',
    colorBack: '#c2d8b6',
    shape: 2.07,
    frequency: 0.44,
    amplitude: 0.57,
    spacing: 1.05,
    proportion: 0.75,
    softness: 0,
  },
};

export const waveRidePreset: WavesPreset = {
  name: 'Ride the wave',
  params: {
    ...defaultPatternSizing,
    scale: 1.7,
    rotation: 0,
    colorFront: '#fdffe6',
    colorBack: '#1f1f1f',
    shape: 2.25,
    frequency: 0.2,
    amplitude: 1,
    spacing: 1.25,
    proportion: 1,
    softness: 0,
  },
};

export const wavesPresets: WavesPreset[] = [defaultPreset, groovyPreset, tangledUpPreset, waveRidePreset];
