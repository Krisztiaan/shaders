import { defaultObjectSizing, type HeatmapParams, type ImageShaderPreset } from '@paper-design/shaders';

export type HeatmapPreset = ImageShaderPreset<HeatmapParams>;

export const defaultPreset: HeatmapPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    scale: 0.75,
    speed: 1,
    frame: 0,
    contour: 0.5,
    angle: 0,
    noise: 0,
    innerGlow: 0.5,
    outerGlow: 0.5,
    colorBack: '#000000',
    colors: ['#11206a', '#1f3ba2', '#2f63e7', '#6bd7ff', '#ffe679', '#ff991e', '#ff4c00'],
  },
} as const satisfies HeatmapPreset;

export const sepiaPreset: HeatmapPreset = {
  name: 'Sepia',
  params: {
    ...defaultObjectSizing,
    scale: 0.75,
    speed: 0.5,
    frame: 0,
    contour: 0.5,
    angle: 0,
    noise: 0.75,
    innerGlow: 0.5,
    outerGlow: 0.5,
    colorBack: '#000000',
    colors: ['#997F45', '#ffffff'],
  },
} as const satisfies HeatmapPreset;

export const heatmapPresets: HeatmapPreset[] = [defaultPreset, sepiaPreset];

