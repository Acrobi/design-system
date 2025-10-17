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
// Export all components from build index
export * from './components/index.build';
// Export core utilities
export { cn } from './lib/utils';
// Export additional UI components not in build index
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
export { Input } from './components/ui/input';
export { Label } from './components/ui/label';
export { Textarea } from './components/ui/textarea';
export { SensoryProvider } from './components/ui/sensory-provider';
export { ThemeSelector } from './components/ui/theme-selector';
export { ThemeSelectorCompact } from './components/ui/theme-selector-compact';
export { Icon } from './components/ui/icon';
// export { Icons } from './components/ui/icons';
export { Spinner } from './components/ui/spinner';
// Export theme management
export * from './lib/assets';
// Export theme types
// export type { Theme, ThemeColors, ThemeProviderProps } from './components/ui/theme-provider';
// export type { SensoryFeedbackProps } from './components/ui/sensory-provider';
// Version information
export const DESIGN_SYSTEM_VERSION = '1.0.0';
/**
 * Design System Metadata
 */
export const DESIGN_SYSTEM_INFO = {
    name: '@acrobi/design-system',
    version: '1.0.0',
    description: 'The official design system for Acrobi applications with semantic token support',
    principles: [
        'No hard-coded style values',
        'CSS variables for all styling',
        'Semantic token architecture',
        'Full theme support',
        'Component-first design'
    ]
};
//# sourceMappingURL=index.js.map