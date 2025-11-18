/**
 * @acrobi/design-cli
 *
 * Command-line tools for the Acrobi Design System
 * Provides theme management and other utilities
 */

// Export logger for programmatic use
export { logger } from './lib/logger';

// Export command factories
export { createThemeCommand } from './commands/theme';

/**
 * Package metadata
 */
export const PACKAGE_INFO = {
  name: '@acrobi/design-cli',
  version: '1.0.0',
  description: 'Command-line tools for the Acrobi Design System',
  tier: 3,
} as const;
