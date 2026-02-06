import { defaultPatternSizing, type DotGridParams, type ShaderPreset } from '@paper-design/shaders';

export type DotGridPreset = ShaderPreset<DotGridParams>;

export const defaultPreset: DotGridPreset = {
  name: 'Default',
  params: {
    ...defaultPatternSizing,
    colorBack: '#000000',
    colorFill: '#ffffff',
    colorStroke: '#ffaa00',
    size: 2,
    gapX: 32,
    gapY: 32,
    strokeWidth: 0,
    sizeRange: 0,
    opacityRange: 0,
    shape: 'circle',
  },
};

export const trianglesPreset: DotGridPreset = {
  name: 'Triangles',
  params: {
    ...defaultPatternSizing,
    colorBack: '#ffffff',
    colorFill: '#ffffff',
    colorStroke: '#808080',
    size: 5,
    gapX: 32,
    gapY: 32,
    strokeWidth: 1,
    sizeRange: 0,
    opacityRange: 0,
    shape: 'triangle',
  },
};

export const treeLinePreset: DotGridPreset = {
  name: 'Tree line',
  params: {
    ...defaultPatternSizing,
    colorBack: '#f4fce7',
    colorFill: '#052e19',
    colorStroke: '#000000',
    size: 8,
    gapX: 20,
    gapY: 90,
    strokeWidth: 0,
    sizeRange: 1,
    opacityRange: 0.6,
    shape: 'circle',
  },
};

export const wallpaperPreset: DotGridPreset = {
  name: 'Wallpaper',
  params: {
    ...defaultPatternSizing,
    colorBack: '#204030',
    colorFill: '#000000',
    colorStroke: '#bd955b',
    size: 9,
    gapX: 32,
    gapY: 32,
    strokeWidth: 1,
    sizeRange: 0,
    opacityRange: 0,
    shape: 'diamond',
  },
};

export const dotGridPresets: DotGridPreset[] = [defaultPreset, trianglesPreset, treeLinePreset, wallpaperPreset];

