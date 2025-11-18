import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from 'rollup-plugin-dts';

export function createConfig(packageName, external = []) {
  const input = 'src/index.ts';
  const defaultExternal = [
    'react',
    'react-dom',
    'react/jsx-runtime',
    ...external
  ];

  return [
    // ESM and CJS builds
    {
      input,
      output: [
        {
          file: 'dist/index.js',
          format: 'cjs',
          sourcemap: true,
          exports: 'named',
        },
        {
          file: 'dist/index.esm.js',
          format: 'esm',
          sourcemap: true,
        },
      ],
      external: defaultExternal,
      plugins: [
        resolve(),
        commonjs(),
        typescript({
          tsconfig: './tsconfig.json',
          declaration: false,
        }),
      ],
    },
    // Type definitions
    {
      input,
      output: {
        file: 'dist/index.d.ts',
        format: 'esm',
      },
      external: defaultExternal,
      plugins: [dts()],
    },
  ];
}
