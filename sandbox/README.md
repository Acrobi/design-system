# Acrobi Design System Playground

A Next.js testing environment for the Acrobi Design System components.

## Overview

This playground provides a development environment for testing and demonstrating Acrobi Design System components. It's set up as a separate Next.js application that imports components from the parent design system directory.

## Structure

```
Acrobi-Design-System/
├── app/
│   ├── globals.css          # Theme styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page with button examples
│   ├── card/
│   │   └── page.tsx         # Card component examples
│   └── test/
│       └── page.tsx         # Interactive testing components
├── components/
│   └── ui.tsx               # Local UI components
├── lib/
│   └── utils.ts             # Utility functions
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## Available Pages

- **Home (`/`)** - Button component variations and basic layout
- **Cards (`/card`)** - Card component examples and layouts
- **Test (`/test`)** - Interactive components with state management

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## Components

The playground includes local implementations of:

- **Button** - Multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card** - Container components with header, content, and footer
- **Utilities** - `cn` function for class name merging

## Styling

Uses Tailwind CSS with custom CSS variables for theming. The theme supports both light and dark modes with semantic color tokens.

## Notes

- This playground references the parent design system but includes local component implementations for testing
- Build system generates static pages for optimal performance
- TypeScript configuration includes path aliases for cleaner imports