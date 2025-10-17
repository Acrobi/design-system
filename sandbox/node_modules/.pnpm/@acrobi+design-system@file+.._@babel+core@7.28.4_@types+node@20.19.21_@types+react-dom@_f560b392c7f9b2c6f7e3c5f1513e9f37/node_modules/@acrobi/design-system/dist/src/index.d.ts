/**
 * Acrobi Design System - Main Entry Point
 *
 * This file exports all components, utilities, and styles from the Acrobi Design System.
 * The design system is built on CSS variables for complete theming flexibility.
 *
 * Core Principles:
 * - No hard-coded style values in components
 * - All styling sourced from CSS variables
 * - Semantic tokens for consistent theming
 * - Full light/dark mode support
 * - Component-first architecture with CVA variants
 */
export * from './components/index.build';
export { cn } from './lib/utils';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
export { Input } from './components/ui/input';
export { Label } from './components/ui/label';
export { Textarea } from './components/ui/textarea';
export { SensoryProvider } from './components/ui/sensory-provider';
export { ThemeSelector } from './components/ui/theme-selector';
export { ThemeSelectorCompact } from './components/ui/theme-selector-compact';
export { Icon } from './components/ui/icon';
export { Spinner } from './components/ui/spinner';
export * from './lib/assets';
export type { Asset } from './lib/assets';
export type { ButtonProps } from './components/ui/button';
export type { InputProps } from './components/ui/input';
export type { LabelProps } from './components/ui/label';
export type { TextareaProps } from './components/ui/textarea';
export declare const DESIGN_SYSTEM_VERSION = "1.0.0";
/**
 * Design System Metadata
 */
export declare const DESIGN_SYSTEM_INFO: {
    readonly name: "@acrobi/design-system";
    readonly version: "1.0.0";
    readonly description: "The official design system for Acrobi applications with semantic token support";
    readonly principles: readonly ["No hard-coded style values", "CSS variables for all styling", "Semantic token architecture", "Full theme support", "Component-first design"];
};
//# sourceMappingURL=index.d.ts.map