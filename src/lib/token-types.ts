/**
 * Three-Tier Token System Types
 *
 * This file defines the type system for managing the three-tier architecture:
 * - Tier 1: Primitive tokens (raw values, context-less)
 * - Tier 2: Semantic tokens (purposeful aliases with themes)
 * - Tier 3: Component tokens (applied usage in components)
 */

export type TokenTier = 'primitive' | 'semantic' | 'component';
export type TokenType = 'color' | 'typography' | 'spacing' | 'shape' | 'elevation' | 'motion' | 'opacity';
export type ThemeMode = 'light' | 'dark' | 'system';

// Base token interface
export interface BaseToken {
  id: string;
  name: string;
  tier: TokenTier;
  type: TokenType;
  description?: string;
  category?: string;
  subcategory?: string;
  metadata: TokenMetadata;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  status: 'active' | 'deprecated' | 'draft';
}

// Token metadata
export interface TokenMetadata {
  author: string;
  tags: string[];
  references: string[];
  usage: TokenUsage[];
  variations: TokenVariation[];
  accessibility?: AccessibilityInfo;
}

export interface TokenUsage {
  component?: string;
  file?: string;
  line?: number;
  count: number;
}

export interface TokenVariation {
  name: string;
  value: string | number;
  condition?: string;
}

export interface AccessibilityInfo {
  contrastRatio?: number;
  wcagLevel?: 'AA' | 'AAA';
  meetsStandard?: boolean;
}

// Specific token types
export interface ColorToken extends BaseToken {
  type: 'color';
  colorSpace: 'oklch' | 'rgb' | 'hex';
  value: string;
  lightModeValue?: string;
  darkModeValue?: string;
}

export interface TypographyToken extends BaseToken {
  type: 'typography';
  value: string | number;
  unit: 'px' | 'rem' | 'em' | '%' | 'unitless';
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
}

export interface SpacingToken extends BaseToken {
  type: 'spacing';
  value: string | number;
  unit: 'px' | 'rem' | 'em' | '%' | 'vw' | 'vh';
  scale?: number;
}

export interface ShapeToken extends BaseToken {
  type: 'shape';
  value: string | number;
  unit: 'px' | 'rem' | 'em' | '%';
  property: 'border-radius' | 'border-width' | 'border-style';
}

export interface ElevationToken extends BaseToken {
  type: 'elevation';
  value: string;
  type: 'box-shadow' | 'text-shadow';
}

export interface MotionToken extends BaseToken {
  type: 'motion';
  value: string | number;
  unit: 'ms' | 's' | 'unitless';
  property: 'duration' | 'easing' | 'delay';
  cubicBezier?: [number, number, number, number];
}

export interface OpacityToken extends BaseToken {
  type: 'opacity';
  value: number;
  scale: number; // 0-1
}

// Semantic token specific
export interface SemanticToken extends BaseToken {
  tier: 'semantic';
  primitiveRef?: string; // Reference to primitive token
  lightModeValue: string;
  darkModeValue?: string;
  themeContext: 'light' | 'dark' | 'both';
  purpose: TokenPurpose;
}

export interface TokenPurpose {
  role: 'primary' | 'secondary' | 'accent' | 'surface' | 'border' | 'text' | 'interactive';
  usage: string;
  examples: string[];
}

// Component token specific
export interface ComponentToken extends BaseToken {
  tier: 'component';
  semanticRef?: string; // Reference to semantic token
  component?: string; // Which component this token applies to
  context: string; // Usage context within component
  cssProperty: string; // CSS property this token maps to
}

// Token relationships
export interface TokenRelationship {
  id: string;
  sourceTokenId: string;
  targetTokenId: string;
  relationshipType: 'references' | 'composes' | 'modifies' | 'overrides';
  condition?: string; // For conditional relationships
}

// Theme structure
export interface Theme {
  id: string;
  name: string;
  description?: string;
  mode: ThemeMode;
  tokenOverrides: TokenOverride[];
  isActive: boolean;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokenOverride {
  tokenId: string;
  value: string;
  darkModeValue?: string;
  condition?: string;
}

// Token collection for management
export interface TokenCollection {
  primitives: ColorToken[] | TypographyToken[] | SpacingToken[] | ShapeToken[] | ElevationToken[] | MotionToken[] | OpacityToken[];
  semantics: SemanticToken[];
  components: ComponentToken[];
  relationships: TokenRelationship[];
}

// Token validation
export interface TokenValidation {
  isValid: boolean;
  errors: TokenError[];
  warnings: TokenWarning[];
  suggestions: TokenSuggestion[];
}

export interface TokenError {
  type: 'naming' | 'value' | 'reference' | 'accessibility';
  message: string;
  tokenName: string;
  severity: 'error' | 'warning';
}

export interface TokenWarning {
  type: 'usage' | 'deprecation' | 'consistency';
  message: string;
  tokenName: string;
}

export interface TokenSuggestion {
  type: 'naming' | 'value' | 'accessibility';
  message: string;
  suggestedValue?: string;
  suggestedName?: string;
}

// Export token formats
export interface TokenExport {
  format: 'css' | 'scss' | 'json' | 'js' | 'xml' | 'figma' | 'sketch';
  tokens: BaseToken[];
  metadata: ExportMetadata;
}

export interface ExportMetadata {
  version: string;
  timestamp: Date;
  author: string;
  description?: string;
  framework?: string;
}

// Import token formats
export interface TokenImport {
  format: 'css' | 'scss' | 'json' | 'js' | 'figma' | 'sketch';
  data: any;
  mappingRules?: ImportMappingRule[];
}

export interface ImportMappingRule {
  pattern: RegExp;
  replacement: string;
  tier?: TokenTier;
  type?: TokenType;
}

// Token search and filtering
export interface TokenSearchCriteria {
  query?: string;
  tier?: TokenTier[];
  type?: TokenType[];
  category?: string[];
  status?: BaseToken['status'][];
  tags?: string[];
  theme?: ThemeMode[];
}

export interface TokenSearchResult {
  tokens: BaseToken[];
  totalCount: number;
  facets: SearchFacets;
}

export interface SearchFacets {
  tiers: { tier: TokenTier; count: number }[];
  types: { type: TokenType; count: number }[];
  categories: { category: string; count: number }[];
  tags: { tag: string; count: number }[];
}

// Token analytics
export interface TokenAnalytics {
  totalTokens: number;
  tokensByTier: { tier: TokenTier; count: number }[];
  tokensByType: { type: TokenType; count: number }[];
  usageStatistics: UsageStatistics;
  accessibilityCompliance: AccessibilityCompliance;
  growthMetrics: GrowthMetrics;
}

export interface UsageStatistics {
  mostUsedTokens: Array<{ token: BaseToken; usageCount: number }>;
  leastUsedTokens: Array<{ token: BaseToken; usageCount: number }>;
  unusedTokens: BaseToken[];
  componentsWithTokens: Array<{ component: string; tokenCount: number }>;
}

export interface AccessibilityCompliance {
  wcagAACompliance: number; // percentage
  wcagAAACompliance: number; // percentage
  colorContrastIssues: Array<{ token: ColorToken; issue: string }>;
  recommendations: string[];
}

export interface GrowthMetrics {
  tokensAddedThisMonth: number;
  tokensModifiedThisMonth: number;
  tokensDeprecatedThisMonth: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}