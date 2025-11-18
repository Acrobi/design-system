# @acrobi/design-tokens

Foundation design tokens for the Acrobi Design System, implementing a three-tier token architecture.

## Overview

This package contains **Tier 1** (primitive tokens) and **Tier 2** (semantic tokens) of the Acrobi Design System's three-tier architecture:

- **Tier 1**: Raw OKLCH color values and primitive tokens (`primitives.css`)
- **Tier 2**: Semantic mappings that give primitives purpose (`themes/*.css`)
- **Tier 3**: Components consume semantic tokens only (not in this package)

## Installation

```bash
npm install @acrobi/design-tokens
# or
pnpm add @acrobi/design-tokens
# or
yarn add @acrobi/design-tokens
```

## Usage

### Import Primitives and Theme

```css
/* In your main CSS file */
@import '@acrobi/design-tokens/primitives.css';
@import '@acrobi/design-tokens/themes/default.css';
```

Or with JavaScript/TypeScript:

```typescript
import '@acrobi/design-tokens/primitives.css';
import '@acrobi/design-tokens/themes/default.css';
```

### Available Themes

- `default.css` - Default theme with neutral colors
- `base.css` - Base theme
- `blue.css` - Blue accent theme
- `purple.css` - Purple accent theme
- `green.css` - Green accent theme
- `red.css` - Red accent theme
- `orange.css` - Orange accent theme

### TypeScript Types

```typescript
import type { PrimitiveToken, SemanticToken, ThemeName } from '@acrobi/design-tokens';
import { cssVar, AVAILABLE_THEMES } from '@acrobi/design-tokens';

// Use types
const myToken: SemanticToken = '--primary';

// Get CSS variable reference
const primaryVar = cssVar('--primary'); // Returns: 'var(--primary)'

// Available themes
console.log(AVAILABLE_THEMES); // ['default', 'base', 'blue', ...]
```

## Token Architecture

### Primitive Tokens (Tier 1)

Raw, context-less OKLCH values. **Never use these directly in components.**

```css
:root {
  /* Gray Scale */
  --gray-0: oklch(0.99 0 0);
  --gray-500: oklch(0.65 0 0);
  --gray-950: oklch(0.15 0 0);

  /* Blue Palette */
  --blue-500: oklch(0.62 0.22 230);
  --blue-900: oklch(0.35 0.22 230);

  /* Other color palettes: red, green, yellow, orange, purple */

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

### Semantic Tokens (Tier 2)

Purpose-driven tokens that map primitives to concepts. **Use these in components.**

```css
:root {
  --background: var(--gray-0);
  --foreground: var(--gray-950);
  --primary: var(--blue-900);
  --destructive: var(--red-600);
  --radius: var(--radius-md);
}

.dark {
  --background: var(--gray-950);
  --foreground: var(--gray-50);
  --primary: var(--blue-500);
  --destructive: var(--red-500);
}
```

## Rules

### ✅ DO

- Use semantic tokens in your components
- Reference tokens via CSS variables: `var(--primary)`
- Create new themes by mapping primitives to different semantic values
- Use TypeScript types for type safety

### ❌ DON'T

- Don't use primitive tokens directly in components (e.g., `var(--blue-600)`)
- Don't hard-code color values
- Don't create multiple `.dark` selectors (only in theme files)
- Don't modify primitive token values for theming (modify semantic mappings instead)

## Dark Mode

Dark mode is handled automatically through the semantic layer:

```html
<!-- Add 'dark' class to enable dark mode -->
<html class="dark">
  <!-- Your app -->
</html>
```

The semantic tokens automatically remap to different primitive values in dark mode.

## Creating Custom Themes

Create a new theme by mapping primitive tokens to semantic tokens:

```css
/* my-theme.css */
@import '@acrobi/design-tokens/primitives.css';

:root {
  --background: var(--purple-50);
  --foreground: var(--purple-950);
  --primary: var(--purple-600);
  /* ... other semantic tokens */
}

.dark {
  --background: var(--purple-950);
  --foreground: var(--purple-50);
  --primary: var(--purple-400);
  /* ... other semantic tokens */
}
```

## Package Info

- **Version**: 1.0.0
- **License**: MIT
- **Repository**: [Acrobi/design-system](https://github.com/Acrobi/design-system)

## Related Packages

- `@acrobi/design-primitives` - Base UI components
- `@acrobi/design-composites` - Composite components
- `@acrobi/design-system` - Complete design system (meta-package)
