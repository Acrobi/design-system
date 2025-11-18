/**
 * @acrobi/design-icons
 *
 * Icon system with metaphor-based naming for the Acrobi Design System
 */

// Export Icon component
export { Icon } from './icon';
export type { IconProps } from './icon';

// Export icon metaphors and types
export { iconMetaphors } from './lib/icon-metaphors';
export type { IconMetaphor } from './lib/icon-metaphors';

// Export icon maps
export { lucideMap } from './lib/icon-maps/lucide.map';

// Export utilities
export { cn } from './lib/utils';

/**
 * Package metadata
 */
export const PACKAGE_INFO = {
  name: '@acrobi/design-icons',
  version: '1.0.0',
  description: 'Icon system with metaphor-based naming for the Acrobi Design System',
  tier: 3,
} as const;
