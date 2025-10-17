# Three-Tier Design Token Architecture

## 🏗️ Architecture Overview

This design system implements a proper three-tier design token architecture that separates concerns and enables scalable theming. The architecture consists of:

- **Tier 1: Primitive Design Tokens** - Raw, context-less values
- **Tier 2: Semantic Design Tokens** - Purposeful variables with meaning
- **Tier 3: Components** - UI elements consuming semantic tokens only

## 📁 File Structure

```
src/styles/
├── primitives.css       # Tier 1: Raw OKLCH values
├── theme-default.css   # Tier 2: Semantic mappings + dark mode
└── globals.css         # Imports + utility classes
```

## 🎯 Tier 1: Primitive Design Tokens (`primitives.css`)

**Purpose**: Raw, context-less design values that never change purpose.

**Characteristics**:
- OKLCH format for perceptual consistency
- No semantic meaning
- NEVER used directly in components
- Referenced only by Tier 2 semantic tokens

**Example**:
```css
:root {
  /* Neutral Palette */
  --gray-0:   oklch(0.99 0 0);
  --gray-500: oklch(0.65 0 0);
  --gray-900: oklch(0.25 0 0);

  /* Blue Palette */
  --blue-500: oklch(0.62 0.22 230);
  --blue-600: oklch(0.55 0.24 230);
  --blue-900: oklch(0.35 0.22 230);

  /* Red Palette */
  --red-500: oklch(0.68 0.24 25);
  --red-600: oklch(0.61 0.26 25);

  /* Other primitives */
  --radius-md: 0.5rem;
}
```

## 🎨 Tier 2: Semantic Design Tokens (`theme-default.css`)

**Purpose**: Gives primitives purpose and handles theming.

**Characteristics**:
- Maps primitives to semantic concepts (primary, background, etc.)
- Contains the ONLY `.dark` selector for dark mode
- Bridges primitives to component usage
- Includes `@theme` block for Tailwind CSS v4 integration

**Example**:
```css
/* Light Mode */
:root {
  --background:    var(--gray-0);      /* Light background */
  --foreground:    var(--gray-950);    /* Light text */
  --primary:       var(--blue-900);    /* Light primary */
  --destructive:   var(--red-600);     /* Light destructive */
  --radius:        var(--radius-md);
}

/* Dark Mode - ONLY place .dark selector exists */
.dark {
  --background:    var(--gray-950);    /* Dark background */
  --foreground:    var(--gray-50);     /* Dark text */
  --primary:       var(--blue-500);    /* Dark primary */
  --destructive:   var(--red-500);     /* Dark destructive */
}

/* Tailwind CSS v4 Bridge */
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-destructive: var(--destructive);
  --radius-lg: var(--radius);
}
```

## 🧩 Tier 3: Components

**Purpose**: UI elements that consume ONLY semantic tokens.

**Rules**:
- NEVER reference primitive tokens directly
- ALWAYS use semantic tokens from Tier 2
- Use Tailwind utility classes that map to semantic tokens

**Example**:
```tsx
// ✅ CORRECT: Uses semantic tokens
<button className="bg-primary text-primary-foreground border-border">
  Button
</button>

// ❌ WRONG: Uses primitive tokens directly
<button style={{ backgroundColor: 'var(--blue-600)' }}>
  Button
</button>
```

## 🔄 Data Flow

```
Tier 1 (Primitives)     Tier 2 (Semantics)     Tier 3 (Components)
├── --blue-900          ─── maps to ───>        ├── --primary
├── --gray-0            ─── maps to ───>        ├── --background
├── --radius-md         ─── maps to ───>        ├── --radius
└── (OKLCH values)       (semantic meaning)      (component usage)
```

## 🌙 Dark Mode Implementation

Dark mode is handled **ONLY** in Tier 2:

1. **Primitive values never change** - `--blue-900` is always the same OKLCH value
2. **Semantic mappings change** - `--primary` points to different primitives
3. **Components automatically update** - they use semantic tokens

**Example Flow**:
```
Light Mode:  --primary → var(--blue-900) → dark blue
Dark Mode:   --primary → var(--blue-500) → bright blue
```

## 🎨 Theme Switching

To create new themes, create new files following the pattern:

```
theme-brand-a.css    # Different semantic mappings
theme-brand-b.css    # Different semantic mappings
```

Each theme file contains the same semantic variable names but maps them to different primitives.

## 📋 Validation Checklist

### ✅ Correct Implementation
- [ ] Tier 1 contains only OKLCH values
- [ ] Tier 1 never referenced directly in components
- [ ] Tier 2 contains only `var()` references to Tier 1
- [ ] Only one `.dark` selector exists (in Tier 2)
- [ ] Components use only semantic tokens
- [ ] `@theme` block bridges semantic tokens to Tailwind

### ❌ Common Mistakes
- [ ] Using primitive tokens in components
- [ ] Hard-coding colors anywhere
- [ ] Multiple `.dark` selectors
- [ ] Raw values in semantic layer
- [ ] Bypassing the token system

## 🧪 Testing

Visit `/token-debug` to validate the architecture:

1. **Tier 1**: Shows OKLCH format values
2. **Tier 2**: Shows `var()` references to primitives
3. **Tier 3**: Shows same values as Tier 2 (correct flow)
4. **Dark Mode**: Switches Tier 2 values while Tier 1 remains unchanged
5. **Theme Switching**: Works across all three tiers correctly

### 🔄 Real-time Monitoring

The token-debug page includes real-time monitoring features:

- **Auto-refresh**: Monitors CSS variables every 500ms
- **Change Detection**: Highlights recently changed variables with colored indicators
- **Change History**: Shows recent changes with before/after values
- **Manual Control**: Pause/resume monitoring or force refresh
- **Visual Indicators**: Purple dots for primitives, blue for semantics, green for computed values

### 📝 Testing Semantic Changes

To test real-time updates:

1. Open `/token-debug` in your browser
2. Edit `theme-default.css` (semantic tier)
3. Save the file - changes should appear within 500ms
4. Look for blue dots highlighting changed semantic variables
5. Check the "Recent Changes" section for detailed before/after values

**Example Test**: Change `--primary: var(--gray-950);` to `--primary: var(--blue-900);` in `theme-default.css` and watch the real-time updates.

## 🚀 Benefits

1. **Scalability**: Easy to create new themes by changing Tier 2 mappings
2. **Consistency**: Components always use semantic tokens
3. **Maintainability**: Clear separation of concerns
4. **Accessibility**: Dark mode handled systematically
5. **Performance**: No runtime calculations, just CSS variable resolution

## 📖 Usage Guidelines

### For Designers
- Work with Tier 2 semantic tokens when designing components
- Create new themes by mapping primitives to different semantic values
- Never reference primitive tokens directly

### For Developers
- Use only Tailwind utility classes that map to semantic tokens
- Never use `var(--primitive-name)` in components
- Always use semantic classes like `bg-primary`, `text-foreground`

### For Theming
- Create new theme files following the `theme-*.css` pattern
- Maintain the same semantic variable names across all themes
- Test theme switching with the token-debug page