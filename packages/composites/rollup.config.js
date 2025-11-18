import { createConfig } from '../../shared/rollup.base.config.js';

export default createConfig('@acrobi/design-composites', [
  '@radix-ui/react-alert-dialog',
  '@radix-ui/react-dialog',
  '@radix-ui/react-select',
  '@radix-ui/react-tabs',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
]);
