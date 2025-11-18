# Acrobi Design System Packages

This directory contains the modular package architecture for the Acrobi Design System.

## 📦 Package Overview

### Core Packages

#### 1. @acrobi/design-tokens
**Foundation Layer** - Tier 1 & 2 design tokens

- Contains primitive tokens (raw OKLCH values)
- Contains semantic tokens (purposeful mappings)
- Zero dependencies
- Framework agnostic
- Size: < 100 KB

**Status**: ✅ Complete & Building

#### 2. @acrobi/design-primitives
**Component Layer** - Atomic UI components

- Button, Input, Label, Textarea, Checkbox, Switch
- Depends on @acrobi/design-tokens
- Includes CVA variants and utilities
- Size: ~200 KB

**Status**: ✅ Complete & Building

#### 3. @acrobi/design-icons
**Icon System** - Metaphor-based icon components

- Icon component with metaphor naming
- Lucide React integration
- Icon maps and utilities
- Size: ~150 KB

**Status**: ✅ Complete & Building

#### 4. @acrobi/design-system
**Meta Package** - Complete design system

- Re-exports all sub-packages
- Provides backward compatibility
- Single import for all components
- Tree-shakeable

**Status**: ✅ Complete & Building

## 🏗️ Architecture

```
@acrobi/design-system (Meta)
├── depends on ↓
├── @acrobi/design-primitives
│   └── depends on → @acrobi/design-tokens
├── @acrobi/design-icons
└── @acrobi/design-tokens (Foundation)
```

## 📖 Usage

### Install Individual Packages

```bash
# Install only what you need
pnpm add @acrobi/design-tokens
pnpm add @acrobi/design-primitives
```

### Install Complete System

```bash
# Install everything
pnpm add @acrobi/design-system
```

### Import Examples

```typescript
// From individual packages
import { Button } from '@acrobi/design-primitives';
import { Icon } from '@acrobi/design-icons';
import type { SemanticToken } from '@acrobi/design-tokens';

// From meta-package (backward compatible)
import { Button, Icon } from '@acrobi/design-system';
```

## 🛠️ Development

### Building Packages

Build all packages in order:

```bash
cd packages/tokens && pnpm build
cd ../primitives && pnpm build
cd ../icons && pnpm build
cd ../design-system && pnpm build
```

Or build from root:

```bash
pnpm -r build
```

### Testing

```bash
# Test individual package
cd packages/primitives && pnpm test

# Test all packages
pnpm -r test
```

## 📊 Package Status

| Package | Version | Status | Build | Size |
|---------|---------|--------|-------|------|
| @acrobi/design-tokens | 1.0.0 | ✅ Complete | ✅ Passing | < 100 KB |
| @acrobi/design-primitives | 1.0.0 | ✅ Complete | ✅ Passing | ~200 KB |
| @acrobi/design-icons | 1.0.0 | ✅ Complete | ✅ Passing | ~150 KB |
| @acrobi/design-system | 1.0.0 | ✅ Complete | ✅ Passing | Tree-shakeable |

## 🎯 Migration Status

### Completed

- ✅ Phase 1: Monorepo structure setup
- ✅ Phase 2: Tokens package migration
- ✅ Phase 3: Primitives package migration
- ✅ Phase 4: Icons package migration
- ✅ Phase 5: Meta-package creation
- ✅ All packages building successfully

### Future Packages

The following packages are planned but not yet implemented:

- @acrobi/design-composites - Complex components (Card, Dialog, etc.)
- @acrobi/design-sensory - Sensory feedback system (Acrobi Extension)
- @acrobi/design-themes - Pre-built theme packages
- @acrobi/design-cli - Theme management CLI

## 📚 Documentation

Each package includes:

- `README.md` - Package-specific documentation
- `package.json` - Package metadata and dependencies
- TypeScript definitions in `dist/index.d.ts`

## 🔗 Links

- [Migration Plan](../Package-Migration.md)
- [Three-Tier Architecture](../THREE-TIER-ARCHITECTURE.md)
- [Package Integration Guide](../doc/PACKAGE_INTEGRATION_GUIDE.md)

## 📝 Notes

- All packages use workspace protocol for internal dependencies
- Packages follow semantic versioning
- All packages are tree-shakeable with proper `sideEffects` configuration
- TypeScript support included in all packages
