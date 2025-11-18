/**
 * @acrobi/design-sensory
 *
 * Sensory feedback system for the Acrobi Design System
 * Provides haptic and audio feedback for UI interactions
 * Acrobi Extension Level 2 - Integrates with framework hooks
 */

export { SensoryProvider, useSensoryFeedback } from './sensory-provider';

/**
 * Package metadata
 */
export const PACKAGE_INFO = {
  name: '@acrobi/design-sensory',
  version: '1.0.0',
  description: 'Sensory feedback system for the Acrobi Design System',
  tier: 'extension',
} as const;
