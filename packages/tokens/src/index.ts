/**
 * @acrobi/design-tokens
 *
 * Foundation design tokens for the Acrobi Design System
 * Based on a three-tier token architecture:
 * - Tier 1: Primitive tokens (raw OKLCH values) - primitives.css
 * - Tier 2: Semantic tokens (purposeful mappings) - themes/*.css
 * - Tier 3: Components consume semantic tokens only
 */

// Export types
export type {
  PrimitiveToken,
  PrimitiveColorToken,
  PrimitiveRadiusToken,
  PrimitiveGray,
  PrimitiveBlue,
  PrimitiveRed,
  PrimitiveGreen,
  PrimitiveYellow,
  PrimitiveOrange,
  PrimitivePurple,
  SemanticToken,
  SemanticColorToken,
  SemanticRadiusToken,
  ThemeConfig,
  ThemeName,
  TokenValue,
  CSSVariables,
  CSSVarReference,
  TokenCategory,
  GrayScale,
  ColorScale,
} from './types';

export { cssVar, TOKEN_CATEGORIES } from './types';

// CSS Imports
// These are imported by consuming applications, not bundled with the package
// Import primitives: import '@acrobi/design-tokens/primitives.css';
// Import theme: import '@acrobi/design-tokens/themes/default.css';

/**
 * Available theme names
 */
export const AVAILABLE_THEMES = [
  'default',
  'base',
  'blue',
  'purple',
  'green',
  'red',
  'orange',
] as const;

/**
 * Package metadata
 */
export const PACKAGE_INFO = {
  name: '@acrobi/design-tokens',
  version: '1.0.0',
  description: 'Foundation design tokens for the Acrobi Design System',
  tier: 1,
} as const;
