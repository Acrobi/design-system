/**
 * Design Token Types
 *
 * Type definitions for the three-tier token architecture:
 * - Tier 1: Primitive tokens (raw OKLCH values)
 * - Tier 2: Semantic tokens (purposeful mappings)
 */

// Primitive Color Scales
export type GrayScale = 0 | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

// Primitive Color Palettes
export type PrimitiveGray = `--gray-${GrayScale}`;
export type PrimitiveBlue = `--blue-${ColorScale}`;
export type PrimitiveRed = `--red-${ColorScale}`;
export type PrimitiveGreen = `--green-${ColorScale}`;
export type PrimitiveYellow = `--yellow-${ColorScale}`;
export type PrimitiveOrange = `--orange-${ColorScale}`;
export type PrimitivePurple = `--purple-${ColorScale}`;

// All Primitive Color Tokens
export type PrimitiveColorToken =
  | PrimitiveGray
  | PrimitiveBlue
  | PrimitiveRed
  | PrimitiveGreen
  | PrimitiveYellow
  | PrimitiveOrange
  | PrimitivePurple;

// Primitive Radius Tokens
export type PrimitiveRadiusToken =
  | '--radius-sm'
  | '--radius-md'
  | '--radius-lg'
  | '--radius-full';

// All Primitive Tokens
export type PrimitiveToken = PrimitiveColorToken | PrimitiveRadiusToken;

// Semantic Color Tokens
export type SemanticColorToken =
  | '--background'
  | '--foreground'
  | '--card'
  | '--card-foreground'
  | '--popover'
  | '--popover-foreground'
  | '--primary'
  | '--primary-foreground'
  | '--secondary'
  | '--secondary-foreground'
  | '--muted'
  | '--muted-foreground'
  | '--accent'
  | '--accent-foreground'
  | '--destructive'
  | '--destructive-foreground'
  | '--border'
  | '--input'
  | '--ring'
  | '--success'
  | '--success-foreground'
  | '--warning'
  | '--warning-foreground'
  | '--info'
  | '--info-foreground';

// Semantic Radius Tokens
export type SemanticRadiusToken = '--radius';

// All Semantic Tokens
export type SemanticToken = SemanticColorToken | SemanticRadiusToken;

// Theme Configuration
export interface ThemeConfig {
  name: string;
  colors: {
    light: Record<SemanticColorToken, string>;
    dark: Record<SemanticColorToken, string>;
  };
  radius?: string;
}

// Available Themes
export type ThemeName =
  | 'default'
  | 'base'
  | 'blue'
  | 'purple'
  | 'green'
  | 'red'
  | 'orange';

// Token Value (CSS Variable Reference)
export type TokenValue = `var(${PrimitiveToken})` | string;

// CSS Variable Map
export interface CSSVariables {
  [key: string]: string;
}

/**
 * Utility type to ensure a token value is a valid CSS variable reference
 */
export type CSSVarReference<T extends string = string> = `var(${T})`;

/**
 * Helper to create a CSS variable reference
 */
export function cssVar(token: PrimitiveToken | SemanticToken): string {
  return `var(${token})`;
}

/**
 * Token Categories for validation
 */
export const TOKEN_CATEGORIES = {
  PRIMITIVE_GRAY: 'primitive-gray',
  PRIMITIVE_BLUE: 'primitive-blue',
  PRIMITIVE_RED: 'primitive-red',
  PRIMITIVE_GREEN: 'primitive-green',
  PRIMITIVE_YELLOW: 'primitive-yellow',
  PRIMITIVE_ORANGE: 'primitive-orange',
  PRIMITIVE_PURPLE: 'primitive-purple',
  PRIMITIVE_RADIUS: 'primitive-radius',
  SEMANTIC_COLOR: 'semantic-color',
  SEMANTIC_RADIUS: 'semantic-radius',
} as const;

export type TokenCategory = typeof TOKEN_CATEGORIES[keyof typeof TOKEN_CATEGORIES];
