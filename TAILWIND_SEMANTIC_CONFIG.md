# Tailwind CSS v4 Semantic Token Configuration

## Overview

This design system has been configured to use **semantic tokens exclusively** with Tailwind CSS v4. This ensures complete theme consistency and maintainability across all components.

## 🏗️ Configuration Architecture

### Golden Rule
**NO hard-coded values** anywhere in the configuration. All values reference semantic CSS variables.

### Token Hierarchy
```
Primitive Tokens → Semantic Tokens → Tailwind Utilities → Components
```

## 📁 File Structure

```
design-system/
├── tailwind.config.js          # Tailwind configuration with semantic references
├── src/
│   ├── styles/
│   │   └── tailwind.css        # @theme block + semantic token definitions
│   └── examples/
│       └── semantic-integration.tsx  # Component examples
└── package.json                # Tailwind v4 dependencies
```

## 🎨 Color System

### Semantic Color Tokens
All colors are defined semantically and reference the design token system:

```css
/* Core UI Colors */
--background: #ffffff;           /* Main background */
--foreground: var(--n900);       /* Primary text */
--primary: var(--p600);          /* Primary actions */
--secondary: var(--n100);        /* Secondary backgrounds */
--muted: var(--n100);           /* Muted elements */
--accent: var(--n100);          /* Accent highlights */
--destructive: var(--red-500);   /* Destructive actions */

/* System Status Colors */
--success: var(--green-600);     /* Success states */
--warning: var(--orange-600);    /* Warning states */
--info: var(--blue-600);        /* Information states */

/* Content Hierarchy */
--content-primary: var(--n900);   /* Primary content */
--content-secondary: var(--n700); /* Secondary content */
--content-tertiary: var(--n500);  /* Tertiary content */
--content-disabled: var(--n300);  /* Disabled content */
```

### Dark Mode Support
Dark mode overrides maintain semantic meaning:

```css
.dark {
  --background: var(--n950);     /* Dark background */
  --foreground: var(--n50);      /* Light text */
  --primary: var(--p400);        /* Adjusted primary */
  /* ... other semantic overrides */
}
```

## 📏 Spacing System

### Semantic Spacing Scale
All spacing values reference semantic tokens:

```css
/* Semantic spacing tokens */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;
/* ... complete spacing scale */
```

## 📝 Typography System

### Fluid Typography
Responsive text sizes using `clamp()`:

```css
/* Fluid text scales */
--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
/* ... complete typography scale */
```

### Semantic Font Weights
```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## 🔲 Border Radius System

### Semantic Radius Tokens
```css
--radius-xs: 0.125rem;
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-2xl: 1.5rem;
--radius-full: 9999px;
```

## 🌟 Shadow System

### Semantic Shadow Hierarchy
```css
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

/* Context-specific shadows */
--shadow-interactive: var(--shadow-md);
--shadow-elevated: var(--shadow-lg);
--shadow-card: var(--shadow-sm);
--shadow-modal: var(--shadow-xl);
```

## ⏱️ Animation System

### Semantic Timing
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;

--easing-in: cubic-bezier(0.4, 0, 1, 1);
--easing-out: cubic-bezier(0, 0, 0.2, 1);
--easing-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

## 🎯 Usage Guidelines

### Component Development
1. **Always** use semantic Tailwind classes
2. **Never** use hard-coded values
3. **Always** prefer semantic colors over direct color values
4. **Use** semantic spacing and typography tokens

### ✅ Correct Usage
```tsx
// Good - Uses semantic tokens
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
  Primary Button
</button>

<div className="text-content-primary text-base leading-normal">
  Primary content text
</div>
```

### ❌ Incorrect Usage
```tsx
// Bad - Hard-coded values
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
  Primary Button
</button>

<div className="text-foreground text-base leading-normal">
  Primary content text
</div>
```

## 🔄 Theme Switching

### Implementation
```tsx
// Theme toggler example
const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
};
```

### Client Theming
Override semantic tokens for client-specific themes:

```css
.theme-client-a {
  --primary: #custom-color;
  --secondary: #custom-secondary;
}
```

## 🛠️ Development Workflow

### Adding New Tokens
1. Define primitive tokens in `:root`
2. Map to semantic tokens in `:root`
3. Add to `@theme` block in `tailwind.css`
4. Reference in `tailwind.config.js`

### Example: Adding New Color
```css
/* 1. Primitive token */
--brand-primary: #custom-color;

/* 2. Semantic mapping */
--primary: var(--brand-primary);

/* 3. @theme mapping */
@theme {
  --color-primary: var(--primary);
}

/* 4. Tailwind config reference */
colors: {
  primary: "var(--primary)",
}
```

## 📋 Validation Checklist

### Configuration Validation
- [ ] No hard-coded values in `tailwind.config.js`
- [ ] All colors reference semantic tokens
- [ ] All spacing uses semantic tokens
- [ ] All typography uses semantic tokens
- [ ] Dark mode overrides maintain semantics
- [ ] All animations use semantic timing

### Component Validation
- [ ] Components use semantic color classes
- [ ] Components use semantic spacing classes
- [ ] Components use semantic typography classes
- [ ] No hard-coded values in component styles
- [ ] Proper theme switching functionality

## 🔍 Troubleshooting

### Common Issues

**Issue: Classes not applying**
- Ensure `tailwind.css` is imported in your main CSS file
- Check that `@theme` block is properly configured

**Issue: Colors not working in dark mode**
- Verify `.dark` class is applied to `html` element
- Check semantic token overrides in dark mode section

**Issue: Typography not scaling**
- Ensure fluid typography `clamp()` functions are correct
- Check that font-size tokens are properly defined

### Debug Commands
```bash
# Build the design system
npm run build

# Check generated CSS
npm run build:lib

# Lint the codebase
npm run lint
```

## 📚 Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Design Token Best Practices](https://designsystems.design/what-are-design-tokens/)
- [Semantic Color Systems](https://material.io/design/color/the-color-system.html)

---

**Remember**: The golden rule is **NO hard-coded values**. Always reference semantic tokens for maintainable and consistent theming.