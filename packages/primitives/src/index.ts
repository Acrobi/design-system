/**
 * @acrobi/design-primitives
 *
 * Core primitive UI components for the Acrobi Design System
 * Tier 3 components that consume semantic tokens from @acrobi/design-tokens
 */

// Export utilities
export { cn } from './lib/utils';

// Export Button
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

// Export Input
export { Input } from './input';
export type { InputProps } from './input';

// Export Label
export { Label } from './label';
export type { LabelProps } from './label';

// Export Textarea
export { Textarea } from './textarea';
export type { TextareaProps } from './textarea';

// Export Checkbox
export { Checkbox } from './checkbox';
export type { CheckboxProps } from './checkbox';

// Export Switch
export { Switch } from './switch';
export type { SwitchProps } from './switch';

/**
 * Package metadata
 */
export const PACKAGE_INFO = {
  name: '@acrobi/design-primitives',
  version: '1.0.0',
  description: 'Core primitive UI components for the Acrobi Design System',
  tier: 3,
} as const;
