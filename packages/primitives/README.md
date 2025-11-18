# @acrobi/design-primitives

Core primitive UI components for the Acrobi Design System.

## Overview

This package contains foundational, atomic UI components (Tier 3 of the three-tier architecture). These components consume semantic tokens from `@acrobi/design-tokens` and provide the building blocks for more complex interfaces.

## Installation

```bash
npm install @acrobi/design-primitives @acrobi/design-tokens
# or
pnpm add @acrobi/design-primitives @acrobi/design-tokens
# or
yarn add @acrobi/design-primitives @acrobi/design-tokens
```

### Peer Dependencies

This package requires:
- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `@acrobi/design-tokens` ^1.0.0

## Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@acrobi/design-primitives';

function App() {
  return (
    <>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="destructive">Destructive Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="ghost">Ghost Button</Button>
      <Button size="sm">Small Button</Button>
      <Button size="lg">Large Button</Button>
    </>
  );
}
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- All standard HTML button attributes

### Input

Form input component with validation support.

```tsx
import { Input } from '@acrobi/design-primitives';

function App() {
  return (
    <Input
      type="email"
      placeholder="Enter your email"
      className="w-full"
    />
  );
}
```

### Label

Accessible label component for form fields.

```tsx
import { Label, Input } from '@acrobi/design-primitives';

function App() {
  return (
    <div>
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" />
    </div>
  );
}
```

### Textarea

Multi-line text input component.

```tsx
import { Textarea } from '@acrobi/design-primitives';

function App() {
  return (
    <Textarea
      placeholder="Enter your message"
      rows={5}
    />
  );
}
```

### Checkbox

Checkbox component with indeterminate state support.

```tsx
import { Checkbox, Label } from '@acrobi/design-primitives';

function App() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
```

### Switch

Toggle switch component.

```tsx
import { Switch, Label } from '@acrobi/design-primitives';

function App() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
```

## Utilities

### cn (className merger)

Utility function to merge Tailwind CSS classes with proper precedence.

```tsx
import { cn } from '@acrobi/design-primitives';

const classes = cn(
  'base-class',
  condition && 'conditional-class',
  'override-class'
);
```

## Theming

All components use semantic tokens from `@acrobi/design-tokens`. To theme components:

1. Import tokens CSS:

```css
@import '@acrobi/design-tokens/primitives.css';
@import '@acrobi/design-tokens/themes/default.css';
```

2. Components automatically respond to theme changes through CSS variables.

## TypeScript

Full TypeScript support with exported types:

```tsx
import type { ButtonProps, InputProps, LabelProps } from '@acrobi/design-primitives';
```

## Package Info

- **Version**: 1.0.0
- **License**: MIT
- **Repository**: [Acrobi/design-system](https://github.com/Acrobi/design-system)

## Related Packages

- `@acrobi/design-tokens` - Foundation design tokens
- `@acrobi/design-composites` - Complex composite components
- `@acrobi/design-system` - Complete design system (meta-package)
