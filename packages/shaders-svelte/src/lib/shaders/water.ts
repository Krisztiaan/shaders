import { defaultObjectSizing, type ImageShaderPreset, type ShaderPreset, type WaterParams } from '@paper-design/shaders';

export type WaterPreset = ImageShaderPreset<WaterParams>;
export type WaterFullPreset = ShaderPreset<WaterParams>;

export const defaultPreset: WaterPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    scale: 0.8,
    speed: 1,
    frame: 0,
    colorBack: '#909090',
    colorHighlight: '#ffffff',
    highlights: 0.07,
    layering: 0.5,
    edges: 0.8,
    waves: 0.3,
    caustic: 0.1,
    size: 1,
  },
};

export const abstractPreset: WaterPreset = {
  name: 'Abstract',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    scale: 3,
    speed: 1,
    frame: 0,
    colorBack: '#909090',
    colorHighlight: '#ffffff',
    highlights: 0,
    layering: 0,
    edges: 1,
    waves: 1,
    caustic: 0.4,
    size: 0.15,
  },
};

export const streamingPreset: WaterPreset = {
  name: 'Streaming',
  params: {
    ...defaultObjectSizing,
    fit: 'contain',
    scale: 0.4,
    speed: 2,
    frame: 0,
    colorBack: '#909090',
    colorHighlight: '#ffffff',
    highlights: 0,
    layering: 0,
    edges: 0,
    waves: 0.5,
    caustic: 0,
    size: 0.5,
  },
};

export const slowMoPreset: WaterPreset = {
  name: 'Slow-mo',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    scale: 1,
    speed: 0.1,
    frame: 0,
    colorBack: '#909090',
    colorHighlight: '#ffffff',
    highlights: 0.4,
    layering: 0,
    edges: 0,
    waves: 0,
    caustic: 0.2,
    size: 0.7,
  },
};

export const waterPresets: WaterPreset[] = [defaultPreset, slowMoPreset, abstractPreset, streamingPreset];

