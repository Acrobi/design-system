/**
 * Architectural Standards: Component Types & Interfaces
 *
 * This file defines the core types and interfaces for the Acrobi Design System
 * following strict architectural standards with no hard-coded styles.
 */

// Core size primitive system following the 5-point scale
export type SizePrimitive = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Extended size system for components that need more granularity
export type ExtendedSizePrimitive = SizePrimitive | '2xs' | '2xl' | '3xl';

// Component naming convention types
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
export type LabelVariant = 'default' | 'required' | 'optional' | 'error';
export type IconVariant = 'default' | 'button' | 'input' | 'standalone';

// Component API naming conventions
export interface ButtonAPI {
  btnVariant?: ButtonVariant;
  btnSize?: SizePrimitive;
  btnDisabled?: boolean;
  btnLoading?: boolean;
  btnLeftIcon?: string;
  btnRightIcon?: string;
}

export interface LabelAPI {
  lblVariant?: LabelVariant;
  lblSize?: SizePrimitive;
  lblRequired?: boolean;
  lblOptional?: boolean;
  lblError?: boolean;
}

export interface IconAPI {
  icnVariant?: IconVariant;
  icnSize?: SizePrimitive;
  icnRotated?: boolean;
  icnAnimated?: boolean;
}

// Controller pattern interfaces
export interface ComponentController<T = any> {
  state: T;
  actions: {
    update: (updates: Partial<T>) => void;
    reset: () => void;
  };
  hooks: {
    onChange?: (state: T) => void;
    onValidate?: (state: T) => boolean;
  };
}

// Size mapping interface for consistent spacing
export interface SizeMapping {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

// Component variant configuration interface
export interface VariantConfig<T = string> {
  [key: string]: T;
}

// Architectural compliance metadata
export interface ArchitecturalMetadata {
  componentType: 'atomic' | 'molecular' | 'organism' | 'template' | 'page';
  hasHardcodedStyles: boolean;
  followsNamingConvention: boolean;
  usesSizePrimitives: boolean;
  hasControllerPattern: boolean;
  lastReviewed: Date;
}