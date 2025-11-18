import { createConfig } from '../../shared/rollup.base.config.js';

export default createConfig('@acrobi/design-icons', [
  'lucide-react',
  'clsx',
  'tailwind-merge',
]);
