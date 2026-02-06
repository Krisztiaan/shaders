import { defaultObjectSizing, type ShaderPreset, type StaticRadialGradientParams } from '@paper-design/shaders';

export type StaticRadialGradientPreset = ShaderPreset<StaticRadialGradientParams>;

export const defaultPreset: StaticRadialGradientPreset = {
  name: 'Default',
  params: {
    ...defaultObjectSizing,
    scale: 1,
    speed: 0,
    frame: 0,
    colorBack: '#000000',
    colors: ['#00bbff', '#00ffe1', '#ffffff'],
    radius: 0.8,
    focalDistance: 0.99,
    focalAngle: 0,
    falloff: 0.24,
    mixing: 0.5,
    distortion: 0.0,
    distortionShift: 0,
    distortionFreq: 12,
    grainMixer: 0.0,
    grainOverlay: 0.0,
  },
};

export const crossSectionPreset: StaticRadialGradientPreset = {
  name: 'Cross Section',
  params: {
    ...defaultObjectSizing,
    scale: 1,
    speed: 0,
    frame: 0,
    colorBack: '#3d348b',
    colors: ['#7678ed', '#f7b801', '#f18701', '#37a066'],
    radius: 1,
    focalDistance: 0,
    focalAngle: 0,
    falloff: 0,
    mixing: 0,
    distortion: 1,
    distortionShift: 0,
    distortionFreq: 12,
    grainMixer: 0,
    grainOverlay: 0,
  },
};

export const radialPreset: StaticRadialGradientPreset = {
  name: 'Radial',
  params: {
    ...defaultObjectSizing,
    scale: 1,
    speed: 0,
    frame: 0,
    colorBack: '#264653',
    colors: ['#9c2b2b', '#f4a261', '#ffffff'],
    radius: 1,
    focalDistance: 0,
    focalAngle: 0,
    falloff: 0,
    mixing: 1,
    distortion: 0,
    distortionShift: 0,
    distortionFreq: 12,
    grainMixer: 0,
    grainOverlay: 0,
  },
};

export const loFiPreset: StaticRadialGradientPreset = {
  name: 'Lo-Fi',
  params: {
    ...defaultObjectSizing,
    speed: 0,
    frame: 0,
    colorBack: '#2e1f27',
    colors: ['#d72638', '#3f88c5', '#f49d37'],
    radius: 1,
    focalDistance: 0,
    focalAngle: 0,
    falloff: 0.9,
    mixing: 0.7,
    distortion: 0,
    distortionShift: 0,
    distortionFreq: 12,
    grainMixer: 1,
    grainOverlay: 0.5,
  },
};

export const staticRadialGradientPresets: StaticRadialGradientPreset[] = [
  defaultPreset,
  loFiPreset,
  crossSectionPreset,
  radialPreset,
];

