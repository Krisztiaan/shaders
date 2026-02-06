import type { ShaderMountProps } from './shader-mount.js';

export type ShaderComponentProps = Omit<ShaderMountProps, 'fragmentShader' | 'uniforms'>;

