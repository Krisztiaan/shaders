import { defaultPatternSizing, type PerlinNoiseParams, type ShaderPreset } from '@paper-design/shaders';

export type PerlinNoisePreset = ShaderPreset<PerlinNoiseParams>;

export const defaultPreset: PerlinNoisePreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    speed: 0.5,
    frame: 0,
    colorBack: '#632ad5',
    colorFront: '#fccff7',
    proportion: 0.35,
    softness: 0.1,
    octaveCount: 1,
    persistence: 1,
    lacunarity: 1.5,
  },
};

export const nintendoWaterPreset: PerlinNoisePreset = {
  name: 'Nintendo Water',
  params: {
    ...defaultPatternSizing,
    scale: 1 / 0.2,
    speed: 0.4,
    frame: 0,
    colorBack: '#2d69d4',
    colorFront: '#d1eefc',
    proportion: 0.42,
    softness: 0,
    octaveCount: 2,
    persistence: 0.55,
    lacunarity: 1.8,
  },
};

export const mossPreset: PerlinNoisePreset = {
  name: 'Moss',
  params: {
    ...defaultPatternSizing,
    scale: 1 / 0.15,
    speed: 0.02,
    frame: 0,
    colorBack: '#05ff4a',
    colorFront: '#262626',
    proportion: 0.65,
    softness: 0.35,
    octaveCount: 6,
    persistence: 1,
    lacunarity: 2.55,
  },
};

export const wormsPreset: PerlinNoisePreset = {
  name: 'Worms',
  params: {
    ...defaultPatternSizing,
    scale: 0.9,
    speed: 0,
    frame: 0,
    colorBack: '#ffffff00',
    colorFront: '#595959',
    proportion: 0.5,
    softness: 0,
    octaveCount: 1,
    persistence: 1,
    lacunarity: 1.5,
  },
};

export const perlinNoisePresets: PerlinNoisePreset[] = [defaultPreset, nintendoWaterPreset, mossPreset, wormsPreset];

