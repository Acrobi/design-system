# Acrobi Design System - Primitive Components

This document provides comprehensive information about all primitive UI components in the Acrobi Design System. All components strictly follow the **no hard-coded values rule** - all styling is sourced from CSS variables.

## 🎯 Core Principles

1. **No Hard-coded Values**: All components use CSS variables only
2. **Semantic Tokens**: Components use semantic tokens (e.g., `--primary`) not primitive tokens (e.g., `--p500`)
3. **Class Variance Authority**: All components use CVA for variant management
4. **Full TypeScript Support**: Comprehensive type definitions for all props
5. **Accessibility First**: Built-in ARIA support and keyboard navigation

## 🔧 Installation

```bash
npm install @acrobi/design-system
```

## 📦 Available Components

### Form Components

#### Button
Primary action component with multiple variants and sizes.

```tsx
import { Button } from '@acrobi/design-system'

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔥</Button>
```

**Props:**
- `variant`: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'warning' | 'info'
- `size`: 'default' | 'sm' | 'lg' | 'icon'
- `asChild`: boolean (for custom rendering)
- All standard HTML button attributes

#### Input
Text input field with validation states.

```tsx
import { Input } from '@acrobi/design-system'

<Input placeholder="Enter text..." />
<Input variant="outline" />
<Input error />
<Input disabled />
```

**Props:**
- `variant`: 'default' | 'destructive' | 'outline' | 'secondary'
- `size`: 'default' | 'sm' | 'lg'
- `error`: boolean
- All standard HTML input attributes

#### Textarea
Multi-line text input with resizing options.

```tsx
import { Textarea } from '@acrobi/design-system'

<Textarea placeholder="Enter longer text..." />
<Textarea resize="vertical" />
<Textarea error />
```

**Props:**
- `variant`: 'default' | 'destructive' | 'outline' | 'secondary'
- `size`: 'default' | 'sm' | 'lg'
- `resize`: 'none' | 'vertical' | 'horizontal' | 'both'
- `error`: boolean
- All standard HTML textarea attributes

#### Label
Form label with optional icon support.

```tsx
import { Label } from '@acrobi/design-system'

<Label htmlFor="email">Email Address</Label>
<Label icon="mail">With Icon</Label>
```

**Props:**
- `icon`: IconMetaphor (optional)
- All standard HTML label attributes

#### Checkbox
Checkbox input with multiple variants.

```tsx
import { Checkbox } from '@acrobi/design-system'

<Checkbox />
<Checkbox variant="secondary" />
<Checkbox size="lg" />
```

**Props:**
- `variant`: 'default' | 'destructive' | 'secondary' | 'outline'
- `size`: 'default' | 'sm' | 'lg'
- All standard Radix checkbox attributes

#### Switch
Toggle switch with multiple variants.

```tsx
import { Switch } from '@acrobi/design-system'

<Switch />
<Switch variant="success" />
<Switch size="lg" />
```

**Props:**
- `variant`: 'default' | 'destructive' | 'success' | 'warning'
- `size`: 'default' | 'sm' | 'lg'
- All standard Radix switch attributes

### Display Components

#### Card
Container component with header, content, and footer sections.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@acrobi/design-system'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Badge
Small status or label component.

```tsx
import { Badge } from '@acrobi/design-system'

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Success</Badge>
```

**Props:**
- `variant`: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
- `size`: 'default' | 'sm' | 'lg'

### Navigation Components

#### Tabs
Tab navigation component with multiple styles.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@acrobi/design-system'

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content 1
  </TabsContent>
  <TabsContent value="tab2">
    Content 2
  </TabsContent>
</Tabs>
```

**Props:**
- `variant`: 'default' | 'underline' | 'pills' | 'card'
- `size`: 'default' | 'sm' | 'lg'
- `orientation`: 'horizontal' | 'vertical'

### Overlay Components

#### Dialog
Modal dialog component with multiple sizes.

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@acrobi/design-system'

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent size="lg">
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    Dialog content
  </DialogContent>
</Dialog>
```

**Props:**
- `size`: 'default' | 'sm' | 'lg' | 'xl' | 'fullscreen'

### Feedback Components

#### Alert
Message component with multiple severity levels.

```tsx
import { Alert, AlertDescription, AlertTitle } from '@acrobi/design-system'

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong</AlertDescription>
</Alert>
```

**Pre-configured alerts:**
- `AlertDestructive`
- `AlertWarning`
- `AlertSuccess`
- `AlertInfo`

## 🎨 Theming

All components use CSS variables for theming. The theming system is split into:

### Primitive Tokens
Raw values without context (e.g., `--p500`, `--n100`)

### Semantic Tokens
Contextual aliases to primitives (e.g., `--primary`, `--background`)

### Theme Overrides
Dark mode and custom theme variations

## 📱 Responsive Design

All components support responsive design through:
- Fluid typography using `clamp()`
- Responsive spacing and sizing
- Mobile-first approach

## ♿ Accessibility

All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Reduced motion support

## 🔧 Advanced Usage

### Custom Variants
Extend component variants using CVA:

```tsx
import { cva } from 'class-variance-authority'

const customButtonVariants = cva(buttonVariants.base, {
  variants: {
    ...buttonVariants.variants,
    custom: {
      primary: "bg-brand text-white hover:bg-brand/90"
    }
  }
})
```

### Theme Customization
Override semantic tokens:

```css
:root {
  --primary: 220 90% 56%;  /* Custom brand color */
  --background: 0 0% 98%; /* Custom background */
}
```

## 🧪 Testing

Use the Foundations Demo component to test all primitives:

```tsx
import { FoundationsDemo } from '@acrobi/design-system'

function App() {
  return <FoundationsDemo />
}
```

## 📚 Additional Resources

- [CSS Variables Documentation](./styles/globals.css)
- [Theme Provider Guide](./src/components/ui/theme-provider.tsx)
- [Foundations Demo](./src/components/ui/foundations-demo.tsx)
- [Tailwind Configuration](./tailwind.config.js)

## 🚀 Migration Guide

When upgrading from previous versions:

1. Update imports: `import { Button } from '@acrobi/design-system'`
2. Remove hard-coded styles
3. Use semantic tokens instead of direct colors
4. Update variant usage as needed

## 🤝 Contributing

When adding new components:

1. Follow the no-hard-coded-values rule
2. Use CVA for variant management
3. Include comprehensive TypeScript types
4. Add proper documentation
5. Update the Foundations Demo
6. Test in both light and dark modes