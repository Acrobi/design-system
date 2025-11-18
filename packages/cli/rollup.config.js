import { createConfig } from '../../shared/rollup.base.config.js';

// Create configs for both the library and CLI entry points
const configs = [];

// Library config (index.ts)
configs.push(...createConfig('@acrobi/design-cli', [
  'commander',
  'chalk',
  'picocolors'
]));

// CLI binary config (cli.ts)
configs.push({
  input: 'src/cli.ts',
  output: {
    file: 'dist/cli.js',
    format: 'esm',
    banner: '#!/usr/bin/env node',
    sourcemap: true
  },
  external: [
    'commander',
    'chalk',
    'picocolors',
    '@acrobi/design-tokens',
    '@acrobi/design-themes'
  ],
  plugins: configs[0].plugins
});

export default configs;
