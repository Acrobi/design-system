/**
 * @acrobi/design-system
 *
 * Complete design system meta-package that re-exports all sub-packages
 * Provides backward compatibility with the monolithic package
 */

// Re-export from @acrobi/design-tokens
export type {
  PrimitiveToken,
  SemanticToken,
  ThemeName,
  TokenValue,
  CSSVariables,
} from '@acrobi/design-tokens';

export { cssVar, AVAILABLE_THEMES } from '@acrobi/design-tokens';

// Re-export from @acrobi/design-primitives
export {
  Button,
  buttonVariants,
  Input,
  Label,
  Textarea,
  Checkbox,
  Switch,
  cn,
} from '@acrobi/design-primitives';

export type {
  ButtonProps,
  InputProps,
  LabelProps,
  TextareaProps,
  CheckboxProps,
  SwitchProps,
} from '@acrobi/design-primitives';

// Re-export from @acrobi/design-icons (when available)
export { Icon } from '@acrobi/design-icons';
export type { IconProps, IconMetaphor } from '@acrobi/design-icons';

/**
 * Package metadata
 */
export const DESIGN_SYSTEM_VERSION = '1.0.0';
export const DESIGN_SYSTEM_INFO = {
  name: '@acrobi/design-system',
  version: '1.0.0',
  description: 'The official design system for Acrobi applications',
  packages: {
    tokens: '@acrobi/design-tokens',
    primitives: '@acrobi/design-primitives',
    icons: '@acrobi/design-icons',
  },
} as const;
