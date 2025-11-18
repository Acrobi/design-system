import { createConfig } from '../../shared/rollup.base.config.js';

export default createConfig('@acrobi/design-themes', [
  'clsx',
  'tailwind-merge',
  'zustand',
]);
