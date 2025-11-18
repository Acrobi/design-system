# Package Migration Plan
**Acrobi Design System → Multi-Package Architecture**

**Version:** 1.0.0
**Last Updated:** November 18, 2024
**Status:** Planning Phase

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Target Package Architecture](#target-package-architecture)
4. [Package Breakdown Strategy](#package-breakdown-strategy)
5. [Acrobi Framework Integration](#acrobi-framework-integration)
6. [Migration Phases](#migration-phases)
7. [Package Specifications](#package-specifications)
8. [Dependencies & Peer Dependencies](#dependencies--peer-dependencies)
9. [Build & Distribution](#build--distribution)
10. [Testing Strategy](#testing-strategy)
11. [Publishing & Versioning](#publishing--versioning)
12. [Migration Risks & Mitigation](#migration-risks--mitigation)
13. [Success Criteria](#success-criteria)

---

## Executive Summary

### Migration Goals

Transform the monolithic `@acrobi/design-system` repository into a modular, multi-package architecture that:

1. **Enables Independent Development** - Each package can be developed, tested, and released independently
2. **Improves Tree Shaking** - Consumers only import what they need
3. **Supports Acrobi Framework Integration** - Packages can be used as Acrobi extensions with hooks and shell implementations
4. **Maintains Backward Compatibility** - Existing consumers continue to work with minimal changes
5. **Reduces Bundle Sizes** - Smaller, more focused packages for better performance
6. **Enables Ecosystem Growth** - Community can contribute packages that integrate seamlessly

### Target Package Structure

```
@acrobi/design-tokens      # Tier 1 & 2: Primitives + Semantic tokens
@acrobi/design-primitives  # Tier 3: Base components (Button, Input, Label)
@acrobi/design-composites  # Tier 3: Composite components (Card, Dialog, etc.)
@acrobi/design-system      # Meta-package that re-exports all packages
@acrobi/design-cli         # CLI tool for theme management
@acrobi/design-icons       # Icon system and metaphors
@acrobi/design-sensory     # Sensory feedback system
@acrobi/design-themes      # Pre-built theme packages
```

---

## Current State Analysis

### Repository Structure

```
design-system/
├── src/
│   ├── components/
│   │   ├── ui/              # 15+ UI components
│   │   └── index.build.ts   # Component exports
│   ├── lib/
│   │   ├── utils.ts         # Utilities (cn, etc.)
│   │   └── assets.ts        # Theme asset management
│   ├── styles/
│   │   ├── primitives.css   # Tier 1: Raw OKLCH values
│   │   └── theme-default.css # Tier 2: Semantic mappings
│   ├── themes/              # Pre-built theme CSS files
│   └── index.ts             # Main entry point
├── cli/
│   └── index.js             # Theme management CLI
├── tests/                   # 15+ test files
├── package.json             # Single package config
└── dist/                    # Build output
```

### Key Components Inventory

**Primitive Components** (12):
- Button, Input, Label, Textarea, Card, Icon, Spinner

**Composite Components** (8):
- ThemeSelector, ThemeSelectorCompact, SensoryProvider

**Utilities** (5):
- cn (classname merger)
- Asset management
- Theme utilities

**CLI Tools** (1):
- Theme creation and validation

**Tokens** (2 files):
- primitives.css (Tier 1)
- theme-default.css (Tier 2)

### Current Dependencies

**Runtime:**
- React 19.1.0
- Tailwind CSS 4.1.11
- Radix UI primitives
- lucide-react (icons)
- CVA (variants)
- zustand (state)

**Build:**
- TypeScript 5.9.2
- Rollup 4.22.4
- Next.js 15.5.2 (dev environment)

### Current Package Size

```bash
# Estimated sizes (need actual measurement)
Total Package: ~2-3 MB
Components: ~500 KB
Tokens: ~50 KB
CLI: ~100 KB
Types: ~200 KB
```

---

## Target Package Architecture

### Package Hierarchy

```
┌─────────────────────────────────────────┐
│     @acrobi/design-system (Meta)        │
│  Re-exports all packages for easy use   │
└─────────────────────────────────────────┘
          ↓ depends on ↓
┌─────────────────────────────────────────┐
│  @acrobi/design-primitives              │
│  @acrobi/design-composites              │
│  @acrobi/design-icons                   │
│  @acrobi/design-sensory                 │
│  @acrobi/design-themes                  │
└─────────────────────────────────────────┘
          ↓ depends on ↓
┌─────────────────────────────────────────┐
│      @acrobi/design-tokens              │
│  Foundation layer - no dependencies     │
└─────────────────────────────────────────┘
```

### Design Principles

1. **Dependency Flow**: Always downward, never circular
2. **Single Responsibility**: Each package has one clear purpose
3. **Zero Duplication**: Shared code lives in the lowest common package
4. **Type Safety**: Full TypeScript support in all packages
5. **Tree Shakeable**: ES modules with proper sideEffects configuration
6. **Framework Agnostic Base**: Tokens package works anywhere (Vue, Svelte, Angular)

---

## Package Breakdown Strategy

### 1. @acrobi/design-tokens

**Purpose**: Foundation layer containing all design tokens

**Contents**:
- `primitives.css` - Tier 1 OKLCH values
- `theme-default.css` - Tier 2 semantic mappings
- `theme-blue.css`, `theme-purple.css`, etc.
- TypeScript token definitions
- Token validation utilities

**Exports**:
```typescript
// CSS files
import '@acrobi/design-tokens/primitives.css';
import '@acrobi/design-tokens/themes/default.css';

// TypeScript types
import type { PrimitiveToken, SemanticToken } from '@acrobi/design-tokens';
```

**Dependencies**: None (zero dependencies)

**Size Target**: < 100 KB

**Acrobi Integration**: Level 1 (Basic Package)

---

### 2. @acrobi/design-primitives

**Purpose**: Core UI primitives (atomic components)

**Contents**:
- Button component
- Input component
- Label component
- Textarea component
- Checkbox component
- Radio component
- Switch component
- Slider component

**Exports**:
```typescript
import { Button, Input, Label } from '@acrobi/design-primitives';
```

**Dependencies**:
- @acrobi/design-tokens (peer)
- @radix-ui/react-* (specific primitives)
- react (peer)

**Size Target**: < 200 KB

**Acrobi Integration**: Level 1 (Basic Package)

---

### 3. @acrobi/design-composites

**Purpose**: Complex components built from primitives

**Contents**:
- Card (+ CardHeader, CardContent, etc.)
- Dialog
- Dropdown
- Popover
- Tabs
- Accordion
- Toast
- Sheet

**Exports**:
```typescript
import { Card, Dialog, Tabs } from '@acrobi/design-composites';
```

**Dependencies**:
- @acrobi/design-tokens (peer)
- @acrobi/design-primitives (peer)
- @radix-ui/react-* (specific composites)
- react (peer)

**Size Target**: < 300 KB

**Acrobi Integration**: Level 1 (Basic Package)

---

### 4. @acrobi/design-icons

**Purpose**: Icon metaphor system and components

**Contents**:
- Icon component
- Icon metaphor definitions
- Icon maps (Lucide, custom)
- Icon utilities

**Exports**:
```typescript
import { Icon } from '@acrobi/design-icons';
import type { IconMetaphor } from '@acrobi/design-icons';

<Icon name="add" size="md" />
```

**Dependencies**:
- lucide-react (peer)
- react (peer)

**Size Target**: < 150 KB

**Acrobi Integration**: Level 1 (Basic Package)

---

### 5. @acrobi/design-sensory

**Purpose**: Sensory feedback system (haptics, sounds, animations)

**Contents**:
- SensoryProvider component
- useSensoryFeedback hook
- Haptic feedback utilities
- Sound effect system
- Animation presets

**Exports**:
```typescript
import { SensoryProvider, useSensoryFeedback } from '@acrobi/design-sensory';

function App() {
  return (
    <SensoryProvider>
      <YourApp />
    </SensoryProvider>
  );
}
```

**Dependencies**:
- react (peer)

**Size Target**: < 50 KB

**Acrobi Integration**: Level 2 (Acrobi Extension)
- Hooks into application lifecycle
- Can register custom sensory feedback patterns
- Extensible via Acrobi hook system

---

### 6. @acrobi/design-themes

**Purpose**: Pre-built theme packages for easy adoption

**Contents**:
- Individual theme packages:
  - `@acrobi/design-themes/default`
  - `@acrobi/design-themes/blue`
  - `@acrobi/design-themes/purple`
  - `@acrobi/design-themes/green`
  - `@acrobi/design-themes/red`
  - `@acrobi/design-themes/custom`
- Theme JSON configurations
- Theme TypeScript definitions

**Exports**:
```typescript
import '@acrobi/design-themes/blue';
// or
import { blueTheme } from '@acrobi/design-themes';
```

**Dependencies**:
- @acrobi/design-tokens (peer)

**Size Target**: < 100 KB (per theme ~20 KB)

**Acrobi Integration**: Level 1 (Basic Package)

---

### 7. @acrobi/design-cli

**Purpose**: Command-line tools for theme management

**Contents**:
- Theme creation commands
- Theme validation
- Token generation
- Theme export/import

**Exports**:
```bash
npx @acrobi/design-cli create-theme my-theme --color #ff6b6b
npx @acrobi/design-cli validate-theme my-theme
npx @acrobi/design-cli export-theme my-theme
```

**Dependencies**:
- chalk
- commander
- inquirer
- @acrobi/design-tokens (for validation)

**Size Target**: < 500 KB

**Acrobi Integration**: Level 1 (Basic Package)

---

### 8. @acrobi/design-system (Meta Package)

**Purpose**: Convenience package that re-exports everything

**Contents**:
- Re-exports all components
- Re-exports all utilities
- Pre-bundles common use cases
- Provides unified types

**Exports**:
```typescript
// Everything available from one import
import { Button, Card, Icon, useSensoryFeedback } from '@acrobi/design-system';
```

**Dependencies**:
- All other @acrobi/design-* packages

**Size Target**: Depends on what's imported (tree-shakeable)

**Acrobi Integration**: Level 1 (Basic Package)

**Migration Note**: This package maintains backward compatibility for existing users.

---

## Acrobi Framework Integration

### Level 1: Basic Package Integration

All packages support Level 1 integration by default:

**Requirements Met**:
- ✅ Valid `package.json` with semantic versioning
- ✅ Clear description (10-500 characters)
- ✅ MIT license specified
- ✅ Keywords for searchability
- ✅ README.md documentation
- ✅ Proper `.tgz` package format

**Example package.json**:
```json
{
  "name": "@acrobi/design-primitives",
  "version": "1.0.0",
  "description": "Core UI primitive components for Acrobi Design System",
  "license": "MIT",
  "keywords": ["acrobi", "design-system", "react", "components", "ui"],
  "author": {
    "name": "Brian Porter",
    "email": "brian@acrobi.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/Acrobi/design-system"
  }
}
```

### Level 2: Acrobi Extension Integration

Select packages can be enhanced as Acrobi Extensions:

#### @acrobi/design-sensory (Extension)

**acrobi.json**:
```json
{
  "id": "acrobi.design-sensory",
  "name": "Design System Sensory Feedback",
  "version": "1.0.0",
  "description": "Sensory feedback system with haptics and sound effects",
  "author": {
    "name": "Brian Porter",
    "email": "brian@acrobi.com"
  },
  "license": {
    "type": "MIT",
    "url": "https://opensource.org/licenses/MIT"
  },
  "category": "ui-component",
  "keywords": ["sensory", "feedback", "haptics", "accessibility"],
  "main": "./dist/extension.js",
  "types": "./dist/extension.d.ts",
  "coreVersion": ">=0.1.0",
  "capabilities": [
    {
      "id": "sensory.feedback",
      "name": "Sensory Feedback Provider",
      "description": "Provides haptic and audio feedback for UI interactions",
      "version": "1.0.0"
    }
  ],
  "configSchema": {
    "type": "object",
    "properties": {
      "enabled": {
        "type": "boolean",
        "default": true,
        "description": "Enable sensory feedback"
      },
      "hapticsEnabled": {
        "type": "boolean",
        "default": true,
        "description": "Enable haptic feedback"
      },
      "soundsEnabled": {
        "type": "boolean",
        "default": false,
        "description": "Enable sound effects"
      }
    }
  }
}
```

**Extension Entry Point** (`extension.ts`):
```typescript
import { ExtensionContext } from '@acrobi/core';
import { SensoryProvider } from './sensory-provider';

export async function activate(context: ExtensionContext): Promise<void> {
  // Register hooks for UI interactions
  context.hooks.addAction('ui:button:click', async (event) => {
    if (context.config.hapticsEnabled) {
      navigator.vibrate?.(10); // Haptic feedback
    }
    if (context.config.soundsEnabled) {
      playSound('click');
    }
  });

  context.hooks.addAction('ui:error', async (error) => {
    if (context.config.hapticsEnabled) {
      navigator.vibrate?.([100, 50, 100]); // Error pattern
    }
  });

  context.logger.info('Sensory feedback extension activated');
}

export async function deactivate(): Promise<void> {
  // Cleanup
}
```

#### @acrobi/design-themes (Potential Extension)

**Use Case**: Dynamic theme loading and management via Acrobi hooks

**Extension Features**:
- Hook into `app:init` to load saved theme
- Hook into `user:updated` to sync theme preferences
- Provide theme switching via Acrobi dashboard
- Store theme preferences in user settings

**acrobi.json**:
```json
{
  "id": "acrobi.design-themes",
  "name": "Design System Theme Manager",
  "version": "1.0.0",
  "category": "ui-component",
  "main": "./dist/extension.js",
  "capabilities": [
    {
      "id": "theme.provider",
      "name": "Theme Provider",
      "description": "Manages application theming with 6+ built-in themes"
    }
  ]
}
```

### Hook Integration Points

**Available for Design System**:

1. **User Lifecycle Hooks**:
   - `user:created` → Set default theme for new users
   - `user:updated` → Sync theme preference changes

2. **Application Lifecycle Hooks**:
   - `app:init` → Initialize theme from storage
   - `app:ready` → Apply theme to document

3. **Custom Hooks** (Design System specific):
   - `theme:changed` (action) → Notify when theme changes
   - `theme:validate` (filter) → Validate custom themes
   - `sensory:feedback` (action) → Trigger sensory feedback

**Example Usage**:
```typescript
// In a consuming Acrobi extension
context.hooks.addAction('theme:changed', async (theme) => {
  await saveUserPreference('theme', theme);
  analytics.track('Theme Changed', { theme });
});
```

---

## Migration Phases

### Phase 1: Repository Restructuring (Week 1-2)

**Goal**: Prepare repository for multi-package architecture

**Tasks**:

1. **Create Monorepo Structure**
   ```
   design-system/
   ├── packages/
   │   ├── tokens/
   │   ├── primitives/
   │   ├── composites/
   │   ├── icons/
   │   ├── sensory/
   │   ├── themes/
   │   ├── cli/
   │   └── design-system/
   ├── shared/
   │   ├── tsconfig.base.json
   │   └── rollup.base.config.js
   └── package.json (workspace root)
   ```

2. **Setup Workspace Configuration**
   - Configure pnpm workspaces
   - Setup shared TypeScript config
   - Setup shared build configuration
   - Configure lerna or nx for task orchestration

3. **Create Package Scaffolding**
   - Generate package.json for each package
   - Setup build scripts
   - Create initial directory structures

**Deliverables**:
- [ ] Monorepo structure in place
- [ ] Workspace configuration working
- [ ] All packages scaffolded
- [ ] Build system configured

---

### Phase 2: Token Package Migration (Week 2-3)

**Goal**: Extract design tokens into standalone package

**Tasks**:

1. **Create @acrobi/design-tokens Package**
   - Move `src/styles/primitives.css`
   - Move `src/styles/theme-default.css`
   - Move all `src/themes/*.css` files
   - Create TypeScript type definitions

2. **Package Structure**:
   ```
   packages/tokens/
   ├── src/
   │   ├── primitives.css
   │   ├── themes/
   │   │   ├── default.css
   │   │   ├── blue.css
   │   │   ├── purple.css
   │   │   └── ...
   │   ├── index.ts
   │   └── types.ts
   ├── package.json
   ├── tsconfig.json
   └── README.md
   ```

3. **Build Configuration**
   - CSS bundling
   - Type generation
   - Minification

4. **Testing**
   - Token validation tests
   - CSS parsing tests
   - Type checking tests

**Deliverables**:
- [ ] @acrobi/design-tokens package published internally
- [ ] Documentation complete
- [ ] Tests passing
- [ ] Types generated

---

### Phase 3: Primitives Package Migration (Week 3-4)

**Goal**: Extract primitive components

**Tasks**:

1. **Create @acrobi/design-primitives Package**
   - Move Button component
   - Move Input component
   - Move Label component
   - Move Textarea component
   - Move base utility functions (cn)

2. **Update Imports**
   - Change to use @acrobi/design-tokens
   - Update all internal imports

3. **Package Structure**:
   ```
   packages/primitives/
   ├── src/
   │   ├── button/
   │   │   ├── button.tsx
   │   │   ├── button.test.tsx
   │   │   └── index.ts
   │   ├── input/
   │   ├── label/
   │   ├── textarea/
   │   ├── lib/
   │   │   └── utils.ts
   │   └── index.ts
   ├── package.json
   └── README.md
   ```

4. **Testing**
   - Component unit tests
   - Integration tests with tokens
   - Visual regression tests

**Deliverables**:
- [ ] @acrobi/design-primitives package complete
- [ ] All tests migrated and passing
- [ ] Storybook/demo pages working
- [ ] Documentation complete

---

### Phase 4: Composites Package Migration (Week 4-5)

**Goal**: Extract composite components

**Tasks**:

1. **Create @acrobi/design-composites Package**
   - Move Card component
   - Move Dialog component
   - Move other composite components
   - Setup dependencies on primitives

2. **Package Structure**:
   ```
   packages/composites/
   ├── src/
   │   ├── card/
   │   ├── dialog/
   │   ├── tabs/
   │   └── index.ts
   ├── package.json
   └── README.md
   ```

**Deliverables**:
- [ ] @acrobi/design-composites package complete
- [ ] Tests passing
- [ ] Documentation complete

---

### Phase 5: Supporting Packages (Week 5-6)

**Goal**: Migrate icons, sensory, themes packages

**Tasks**:

1. **@acrobi/design-icons**
   - Extract icon system
   - Setup icon metaphor exports
   - Configure Lucide integration

2. **@acrobi/design-sensory**
   - Extract sensory provider
   - Create extension entry point
   - Add acrobi.json manifest
   - Implement hook integrations

3. **@acrobi/design-themes**
   - Package individual themes
   - Create theme management utilities
   - Setup theme exports

**Deliverables**:
- [ ] All three packages complete
- [ ] @acrobi/design-sensory has Acrobi extension support
- [ ] Tests passing
- [ ] Documentation complete

---

### Phase 6: CLI Package Migration (Week 6)

**Goal**: Extract and enhance CLI tool

**Tasks**:

1. **Create @acrobi/design-cli Package**
   - Move cli/index.js
   - Enhance with new commands
   - Update to use @acrobi/design-tokens

2. **New Features**:
   - Package scaffolding commands
   - Component generation
   - Theme validation for Acrobi extensions

**Deliverables**:
- [ ] @acrobi/design-cli package complete
- [ ] CLI functional and tested
- [ ] Documentation complete

---

### Phase 7: Meta Package Creation (Week 7)

**Goal**: Create unified @acrobi/design-system package

**Tasks**:

1. **Create Meta Package**
   - Re-export all packages
   - Maintain backward compatibility
   - Setup proper tree shaking

2. **Package Structure**:
   ```
   packages/design-system/
   ├── src/
   │   └── index.ts  # Re-exports all packages
   ├── package.json
   └── README.md
   ```

3. **Backward Compatibility Testing**
   - Test existing consumer code
   - Verify no breaking changes
   - Update migration guide

**Deliverables**:
- [ ] @acrobi/design-system meta package complete
- [ ] Backward compatibility verified
- [ ] Migration guide published

---

### Phase 8: Publishing & Documentation (Week 8)

**Goal**: Publish all packages and complete documentation

**Tasks**:

1. **Package Publishing**
   - Publish to npm registry
   - Setup CI/CD for automated publishing
   - Configure changesets for versioning

2. **Documentation**
   - Update all READMEs
   - Create migration guides
   - Update examples
   - Create Acrobi integration guide

3. **Acrobi Framework Upload**
   - Package @acrobi/design-sensory as Acrobi extension
   - Upload to Acrobi framework registry
   - Submit for verification

**Deliverables**:
- [ ] All packages published to npm
- [ ] Documentation complete
- [ ] Acrobi extension uploaded and verified
- [ ] Migration guide published

---

## Package Specifications

### File Structure Template

Each package follows this structure:

```
packages/[package-name]/
├── src/
│   ├── index.ts              # Main entry point
│   ├── [component]/
│   │   ├── [component].tsx   # Component implementation
│   │   ├── [component].test.tsx
│   │   └── index.ts
│   └── lib/
│       └── utils.ts          # Package-specific utilities
├── dist/                     # Build output (gitignored)
│   ├── index.js              # CommonJS build
│   ├── index.esm.js          # ES modules build
│   └── index.d.ts            # TypeScript definitions
├── package.json
├── tsconfig.json
├── rollup.config.js          # Or tsup config
├── README.md
├── CHANGELOG.md
└── LICENSE
```

### package.json Template

```json
{
  "name": "@acrobi/design-[package]",
  "version": "1.0.0",
  "description": "[Package description]",
  "author": "Brian Porter",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Acrobi/design-system",
    "directory": "packages/[package]"
  },
  "keywords": [
    "acrobi",
    "design-system",
    "react",
    "typescript",
    "ui"
  ],
  "main": "./dist/index.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./package.json": "./package.json"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "sideEffects": false,
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup -c -w",
    "test": "jest",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "@acrobi/design-tokens": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.2",
    "rollup": "^4.22.4",
    "typescript": "^5.9.2"
  }
}
```

### TypeScript Configuration

**Shared Base Config** (`shared/tsconfig.base.json`):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "forceConsistentCasingInFileNames": true
  },
  "exclude": ["node_modules", "dist"]
}
```

**Package Config** (`packages/[package]/tsconfig.json`):
```json
{
  "extends": "../../shared/tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "references": [
    { "path": "../tokens" }
  ]
}
```

---

## Dependencies & Peer Dependencies

### Dependency Strategy

**Rules**:
1. **Peer Dependencies**: React, React-DOM, @acrobi/design-tokens
2. **Regular Dependencies**: Package-specific libraries
3. **Dev Dependencies**: Build tools, testing libraries

### Dependency Matrix

| Package | Peer Deps | Dependencies | Dev Deps |
|---------|-----------|--------------|----------|
| **tokens** | None | None | TypeScript, Rollup |
| **primitives** | react, tokens | @radix-ui/*, CVA, clsx | TypeScript, Rollup, Jest |
| **composites** | react, tokens, primitives | @radix-ui/*, CVA | TypeScript, Rollup, Jest |
| **icons** | react | lucide-react | TypeScript, Rollup |
| **sensory** | react | None | TypeScript, Rollup |
| **themes** | tokens | None | TypeScript |
| **cli** | None | chalk, commander, inquirer | TypeScript, Jest |
| **design-system** | react | All other packages | None |

### Version Pinning Strategy

```json
{
  "peerDependencies": {
    "react": ">=18.0.0",           // Allow any React 18+
    "@acrobi/design-tokens": "^1.0.0"  // Same major version
  },
  "dependencies": {
    "@radix-ui/react-label": "^2.1.7",  // Minor version compatible
    "class-variance-authority": "^0.7.1"
  }
}
```

---

## Build & Distribution

### Build Tools

**Primary**: Rollup for all packages
**Alternative**: tsup for simpler packages

### Rollup Configuration

**Shared Base Config** (`shared/rollup.base.config.js`):
```javascript
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from 'rollup-plugin-dts';

export function createConfig(packageName, external = []) {
  const input = 'src/index.ts';

  return [
    // ESM and CJS builds
    {
      input,
      output: [
        {
          file: 'dist/index.js',
          format: 'cjs',
          sourcemap: true,
        },
        {
          file: 'dist/index.esm.js',
          format: 'esm',
          sourcemap: true,
        },
      ],
      external: ['react', 'react-dom', ...external],
      plugins: [
        resolve(),
        commonjs(),
        typescript({
          tsconfig: './tsconfig.json',
          declaration: false,
        }),
      ],
    },
    // Type definitions
    {
      input,
      output: {
        file: 'dist/index.d.ts',
        format: 'esm',
      },
      plugins: [dts()],
    },
  ];
}
```

### Package-Specific Configs

**tokens** package (CSS + types):
```javascript
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    { file: 'dist/index.js', format: 'esm' }
  ],
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
    typescript(),
  ],
};
```

### Build Scripts

**Root package.json**:
```json
{
  "scripts": {
    "build": "pnpm -r build",
    "build:tokens": "pnpm --filter @acrobi/design-tokens build",
    "build:primitives": "pnpm --filter @acrobi/design-primitives build",
    "test": "pnpm -r test",
    "publish:all": "pnpm -r publish"
  }
}
```

### Bundle Size Optimization

**Techniques**:
1. Tree shaking via ES modules
2. Proper `sideEffects` configuration
3. Code splitting for large packages
4. Minification in production builds
5. External dependencies via peer deps

**Size Targets**:
- tokens: < 100 KB
- primitives: < 200 KB
- composites: < 300 KB
- icons: < 150 KB
- sensory: < 50 KB
- themes: < 100 KB total
- cli: < 500 KB

---

## Testing Strategy

### Test Infrastructure

**Framework**: Jest + React Testing Library

**Shared Jest Config** (`shared/jest.config.js`):
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@acrobi/design-tokens$': '<rootDir>/../tokens/src',
    '\\.(css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/../../shared/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
```

### Test Categories

1. **Unit Tests**: Individual component functionality
2. **Integration Tests**: Cross-package interactions
3. **Visual Regression Tests**: Component appearance
4. **Accessibility Tests**: WCAG compliance
5. **Performance Tests**: Bundle size, render performance

### Test Plan by Package

**@acrobi/design-tokens**:
- CSS parsing validation
- Token value format verification
- Dark mode mappings correctness
- Type definition accuracy

**@acrobi/design-primitives**:
- Component rendering
- Prop validation
- Event handling
- Accessibility (a11y)
- Variant testing

**@acrobi/design-composites**:
- Composite component behavior
- Integration with primitives
- Complex interactions
- Accessibility

**@acrobi/design-icons**:
- Icon metaphor mappings
- Icon rendering
- Size variants

**@acrobi/design-sensory**:
- Provider context
- Hook functionality
- Extension activation
- Acrobi hook integration

**@acrobi/design-cli**:
- Command execution
- Theme generation
- File operations
- Validation logic

### CI/CD Testing

**GitHub Actions Workflow**:
```yaml
name: Test & Build

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm test
      - run: pnpm build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## Publishing & Versioning

### Versioning Strategy

**Tool**: Changesets

**Workflow**:
1. Developer creates changeset: `pnpm changeset`
2. Describes changes: major, minor, or patch
3. CI validates changes
4. On merge to main: Changesets creates release PR
5. Merge release PR: Automated publish to npm

### Changeset Configuration

**`.changeset/config.json`**:
```json
{
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [
    ["@acrobi/design-tokens", "@acrobi/design-primitives", "@acrobi/design-composites"]
  ],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### Publishing Flow

**Manual Process**:
```bash
# 1. Create changeset
pnpm changeset

# 2. Version packages
pnpm changeset version

# 3. Build all packages
pnpm build

# 4. Publish
pnpm changeset publish

# 5. Push tags
git push --follow-tags
```

**Automated via CI**:
```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install
      - run: pnpm build

      - name: Create Release PR or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Package Versioning Policy

**Initial Release**: All packages start at `1.0.0`

**Linked Packages**: Core packages (tokens, primitives, composites) share version numbers

**Independent Packages**: Icons, sensory, themes, CLI have independent versions

**Acrobi Framework**: Extensions uploaded separately to Acrobi registry

---

## Migration Risks & Mitigation

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking changes for consumers | High | High | Maintain meta-package for backward compatibility |
| Circular dependencies | Medium | High | Strict dependency graph, automated checks |
| Version conflicts | Medium | Medium | Use peer dependencies, semantic versioning |
| Increased complexity | High | Medium | Clear documentation, tooling automation |
| Bundle size increase | Low | Medium | Tree shaking, proper externals configuration |
| Publishing coordination | Medium | Low | Automated CI/CD with changesets |
| Lost functionality | Low | High | Comprehensive test migration |
| Acrobi integration issues | Medium | Medium | Thorough testing, staged rollout |

### Mitigation Strategies

**1. Backward Compatibility**
```typescript
// In @acrobi/design-system meta package
export * from '@acrobi/design-primitives';
export * from '@acrobi/design-composites';
// etc... maintains existing import paths
```

**2. Dependency Graph Validation**
```bash
# Add to CI
pnpm list --depth=Infinity | grep -i circular
# Fails if circular dependencies detected
```

**3. Automated Testing**
- Run full test suite on every commit
- Require 70%+ code coverage
- Visual regression tests before release

**4. Gradual Migration**
- Publish all packages as `1.0.0-beta.x` first
- Gather feedback from early adopters
- Fix issues before stable `1.0.0` release

**5. Rollback Plan**
- Tag current monolithic version as `stable`
- Maintain a `legacy` branch
- Document rollback procedure

---

## Success Criteria

### Technical Metrics

**Package Quality**:
- [ ] All packages build successfully
- [ ] TypeScript compilation with zero errors
- [ ] Test coverage > 70% for all packages
- [ ] Zero circular dependencies
- [ ] Bundle sizes within targets

**Performance**:
- [ ] Tree shaking verified (only imported code in bundle)
- [ ] No runtime performance regression
- [ ] Build times < 5 minutes for all packages
- [ ] Individual package install < 30 seconds

**Compatibility**:
- [ ] Meta-package maintains 100% backward compatibility
- [ ] Existing projects work with zero changes
- [ ] All peer dependencies resolve correctly

### Functional Metrics

**Developer Experience**:
- [ ] All packages published to npm
- [ ] Documentation complete for each package
- [ ] Migration guide available
- [ ] Working examples for each package
- [ ] CLI functional and tested

**Acrobi Integration**:
- [ ] @acrobi/design-sensory uploaded to Acrobi registry
- [ ] Extension activated successfully
- [ ] Hooks working as expected
- [ ] Configuration schema validated

**Community**:
- [ ] Positive feedback from beta testers
- [ ] No critical bugs reported
- [ ] Active usage metrics (downloads, stars)

### Timeline

**Total Duration**: 8 weeks

**Key Milestones**:
- Week 2: Monorepo structure complete
- Week 3: Tokens package published
- Week 4: Primitives package published
- Week 5: Composites package published
- Week 6: Supporting packages published
- Week 7: Meta package and backward compatibility verified
- Week 8: Full release and documentation complete

---

## Next Steps

### Immediate Actions (Week 1)

1. **Review & Approval**
   - [ ] Review this migration plan with stakeholders
   - [ ] Get approval to proceed
   - [ ] Allocate development resources

2. **Environment Setup**
   - [ ] Create feature branch: `feat/package-migration`
   - [ ] Setup pnpm workspace
   - [ ] Configure CI/CD pipelines

3. **Communication**
   - [ ] Notify existing consumers of upcoming changes
   - [ ] Create RFC (Request for Comments) document
   - [ ] Setup feedback channels

4. **Begin Phase 1**
   - [ ] Start repository restructuring
   - [ ] Create monorepo scaffolding
   - [ ] Setup shared configurations

### Long-term Considerations

**Post-Migration**:
- Establish package maintenance rotation
- Create contribution guidelines for each package
- Setup automated dependency updates (Dependabot)
- Monitor package download metrics
- Gather community feedback for v2 planning

**Acrobi Ecosystem Growth**:
- Encourage community extensions
- Create extension template
- Build extension marketplace
- Provide extension development docs

---

## Appendix

### A. Workspace Configuration

**pnpm-workspace.yaml**:
```yaml
packages:
  - 'packages/*'
```

**Root package.json**:
```json
{
  "name": "@acrobi/design-system-monorepo",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "clean": "pnpm -r clean",
    "changeset": "changeset",
    "version": "changeset version",
    "publish": "pnpm build && changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.26.0",
    "pnpm": "^8.0.0"
  }
}
```

### B. CI/CD Pipeline

**Complete Workflow** (`.github/workflows/ci.yml`):
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test & Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint
        run: pnpm lint

      - name: Type check
        run: pnpm typecheck

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  release:
    name: Release
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install --frozen-lockfile
      - run: pnpm build

      - name: Create Release PR or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm publish -r
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### C. Package Template Generator

**CLI Command**:
```bash
# Future enhancement to @acrobi/design-cli
npx @acrobi/design-cli create-package <name>
```

**Template Structure**:
```
packages/[name]/
├── src/
│   └── index.ts
├── package.json (pre-filled)
├── tsconfig.json (extends shared)
├── rollup.config.js (extends shared)
├── README.md (template)
└── CHANGELOG.md
```

### D. Dependency Update Strategy

**Automated Updates**: Dependabot configured

**Review Process**:
1. Dependabot creates PR
2. CI runs tests
3. Review changes
4. Merge if tests pass
5. Create changeset for patch version

**Critical Security Updates**:
- Immediate review and merge
- Expedited release process

---

**Document Status**: Planning Phase
**Next Review**: After Phase 1 completion
**Maintained By**: Design System Team
**Questions/Feedback**: Create issue in GitHub repository
