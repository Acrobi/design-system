/**
 * Rollup Configuration for @acrobi/design-system
 *
 * This configuration builds the design system for distribution as an NPM package.
 * It supports multiple export formats: CommonJS, ES Modules, and TypeScript declarations.
 */

import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';

const external = [
  // React and related
  'react',
  'react-dom',
  'react/jsx-runtime',

  // Radix UI components
  '@radix-ui/react-slot',
  '@radix-ui/react-label',

  // Utility libraries
  'clsx',
  'tailwind-merge',
  'class-variance-authority',
  'lucide-react',
  'color2k',

  // Next.js (peer dependencies for consumers)
  'next',

  // CSS and styling
  'tailwindcss-animate',
  'tw-animate-css',

  // Validation
  'zod'
];

const plugins = [
  resolve({
    preferBuiltins: false,
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false, // We handle declarations separately
  }),
];

export default [
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },

  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins,
  },

  // TypeScript declaration files
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
      }),
    ],
  },

  // Additional entry points for tree-shaking support
  {
    input: 'src/components/index.build.ts',
    output: {
      file: 'dist/components.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },

  {
    input: 'src/components/index.build.ts',
    output: {
      file: 'dist/components.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins,
  },

  {
    input: 'src/components/index.build.ts',
    output: {
      file: 'dist/components.d.ts',
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
      }),
    ],
  },

  // Utilities bundle
  {
    input: 'src/lib/utils.ts',
    output: {
      file: 'dist/utils.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    external,
    plugins,
  },

  {
    input: 'src/lib/utils.ts',
    output: {
      file: 'dist/utils.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins,
  },

  {
    input: 'src/lib/utils.ts',
    output: {
      file: 'dist/utils.d.ts',
      format: 'esm',
    },
    external,
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
      }),
    ],
  },
];