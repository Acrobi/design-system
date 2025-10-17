/**
 * Acrobi Design System - Core Library Exports
 *
 * This module exports all core utilities, types, and architectural systems.
 */

// Core utilities
export * from './utils';

// Architectural Standards
export type * from './types';
export type * from './variants';
export * from './controller';

// Export architectural metadata for compliance checking
export type { ArchitecturalMetadata } from './types';

// Export validation utilities
export { validateArchitecturalCompliance } from './variants';

// Export size primitive utilities
export {
  getSizeClass,
  getResponsiveSizeClasses,
  sizeMappings,
  iconSizeMappings
} from './variants';

// Export controller hooks
export {
  useController,
  useButtonController,
  useFormController,
  useThemeController,
  useListController,
  createController
} from './controller';

// Note: theme-utils has duplicate function implementations, exclude for now
// Note: assets has type issues, exclude for now