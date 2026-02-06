import { defaultObjectSizing, type ImageShaderPreset, type PaperTextureParams } from '@paper-design/shaders';

export type PaperTexturePreset = ImageShaderPreset<PaperTextureParams>;

export const defaultPreset: PaperTexturePreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    scale: 0.6,
    speed: 0,
    frame: 0,
    colorFront: '#9fadbc',
    colorBack: '#ffffff',
    contrast: 0.3,
    roughness: 0.4,
    fiber: 0.3,
    fiberSize: 0.2,
    crumples: 0.3,
    crumpleSize: 0.35,
    folds: 0.65,
    foldCount: 5,
    fade: 0,
    drops: 0.2,
    seed: 5.8,
  },
};

export const abstractPreset: PaperTexturePreset = {
  name: 'Abstract',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    scale: 0.6,
    colorFront: '#00eeff',
    colorBack: '#ff0a81',
    contrast: 0.85,
    roughness: 0,
    fiber: 0.1,
    fiberSize: 0.2,
    crumples: 0,
    crumpleSize: 0.3,
    folds: 1,
    foldCount: 3,
    fade: 0,
    drops: 0.2,
    seed: 2.2,
  },
};

export const cardboardPreset: PaperTexturePreset = {
  name: 'Cardboard',
  params: {
    ...defaultObjectSizing,
    fit: 'cover',
    speed: 0,
    frame: 0,
    scale: 0.6,
    colorFront: '#c7b89e',
    colorBack: '#999180',
    contrast: 0.4,
    roughness: 0,
    fiber: 0.35,
    fiberSize: 0.14,
    crumples: 0.7,
    crumpleSize: 0.1,
    folds: 0,
    foldCount: 1,
    fade: 0,
    drops: 0.1,
    seed: 1.6,
  },
};

export const detailsPreset: PaperTexturePreset = {
  name: 'Details',
  params: {
    ...defaultObjectSizing,
    speed: 0,
    frame: 0,
    fit: 'cover',
    scale: 3,
    colorFront: '#00000000',
    colorBack: '#00000000',
    contrast: 0,
    roughness: 1,
    fiber: 0.27,
    fiberSize: 0.22,
    crumples: 1,
    crumpleSize: 0.5,
    folds: 1,
    foldCount: 15,
    fade: 0,
    drops: 0,
    seed: 6,
  },
};

export const paperTexturePresets: PaperTexturePreset[] = [
  defaultPreset,
  cardboardPreset,
  abstractPreset,
  detailsPreset,
] as const;

