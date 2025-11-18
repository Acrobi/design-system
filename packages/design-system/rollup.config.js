import { createConfig } from '../../shared/rollup.base.config.js';

export default createConfig('@acrobi/design-system', [
  '@acrobi/design-tokens',
  '@acrobi/design-primitives',
  '@acrobi/design-icons',
]);
