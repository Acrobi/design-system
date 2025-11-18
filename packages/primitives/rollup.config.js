import { createConfig } from '../../shared/rollup.base.config.js';

export default createConfig('@acrobi/design-primitives', [
  '@radix-ui/react-checkbox',
  '@radix-ui/react-label',
  '@radix-ui/react-slot',
  '@radix-ui/react-switch',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
]);
