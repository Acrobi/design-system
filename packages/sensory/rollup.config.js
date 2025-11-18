import { createConfig } from '../../shared/rollup.base.config.js';

// Create configs for both entry points
const mainConfig = createConfig('@acrobi/design-sensory', []);
const extensionConfig = createConfig('@acrobi/design-sensory', []);

// Update inputs
mainConfig[0].input = 'src/index.ts';
mainConfig[1].input = 'src/index.ts';

extensionConfig[0].input = 'src/extension.ts';
extensionConfig[0].output = [
  {
    file: 'dist/extension.js',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
  },
  {
    file: 'dist/extension.esm.js',
    format: 'esm',
    sourcemap: true,
  },
];
extensionConfig[1].input = 'src/extension.ts';
extensionConfig[1].output = {
  file: 'dist/extension.d.ts',
  format: 'esm',
};

export default [...mainConfig, ...extensionConfig];
