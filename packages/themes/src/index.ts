/**
 * @acrobi/design-themes
 *
 * Theme management and selection components for the Acrobi Design System
 * Provides theme provider, selectors, and utilities
 */

// Export theme provider
export { ThemeProvider, useTheme } from './theme-provider';

// Export theme selectors
export { ThemeSelector } from './theme-selector';
export { ThemeSelectorCompact } from './theme-selector';

// Export utilities
export { cn } from './lib/utils';
export { useTokenStore } from './lib/store';
export * from './lib/theme-utils';

/**
 * Package metadata
 */
export const PACKAGE_INFO = {
  name: '@acrobi/design-themes',
  version: '1.0.0',
  description: 'Theme management and selection for the Acrobi Design System',
  tier: 3,
} as const;
