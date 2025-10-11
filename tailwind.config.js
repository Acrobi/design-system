/** @type {import('tailwindcss').Config} */
// ===================================
// ⚙️ TAILWIND CSS CONFIGURATION
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This config bridges CSS custom properties to Tailwind utilities
// - DO NOT modify the color format - must be HSL with CSS variables
// - DO NOT add hard-coded colors - use semantic tokens from globals.css
// - DO NOT change the darkMode configuration - .class is required
// - ALWAYS reference semantic tokens (--primary, --background, etc.)
// ===================================

module.exports = {
  // 🚨 DO NOT modify this darkMode configuration - .class is required for our system
  darkMode: ["class"],

  // 🚨 DO NOT modify this content pattern unless adding new file types
  content: ["./src/**/*.{ts,tsx}"],

  theme: {
    // Container configuration - 🚨 DO NOT modify without understanding container system
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },

    extend: {
      // ===================================
      // 🎨 COLOR SYSTEM - SEMANTIC TOKENS
      // ===================================
      // 🚨 AI AGENT GUIDANCE:
      // - These map CSS custom properties to Tailwind utilities
      // - DO NOT change the hsl() format - it's required for CSS variables
      // - DO NOT use hard-coded colors - always reference CSS variables
      // - DO NOT modify the variable names - they must match globals.css
      // - Add new colors only if adding new semantic tokens to globals.css
      // ===================================
      colors: {
        // Semantic color tokens - map to globals.css definitions
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",

        // Primary colors with foreground variants
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },

        // Secondary colors with foreground variants
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },

        // Destructive colors for errors/danger
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },

        // Muted colors for subtle UI elements
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },

        // Accent colors for highlights
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },

        // Card colors for containers
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },

        // Popover colors for dropdowns/overlays
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
      },

      // ===================================
      // 🔲 BORDER RADIUS SYSTEM
      // ===================================
      // 🚨 AI AGENT GUIDANCE:
      // - This provides consistent border radius values
      // - DO NOT modify unless updating the entire radius system
      // - These values reference the semantic radius tokens from globals.css
      // ===================================
      borderRadius: {
        lg: "var(--radius)",                    // Large radius (default)
        md: "calc(var(--radius) - 2px)",       // Medium radius
        sm: "calc(var(--radius) - 4px)",       // Small radius
      },

      // ===================================
      // 🎬 ANIMATION KEYFRAMES
      // ===================================
      // 🚨 AI AGENT GUIDANCE:
      // - These define reusable animation sequences
      // - DO NOT modify unless adding new animation patterns
      // - Follow the naming convention (animate-name)
      // ===================================
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },

      // ===================================
      // ⚡ ANIMATION UTILITIES
      // ===================================
      // 🚨 AI AGENT GUIDANCE:
      // - These map keyframes to utility classes
      // - DO NOT modify unless updating animation system
      // - Use consistent duration and easing patterns
      // ===================================
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
      },
    },
  },

  // ===================================
  // 🔌 TAILWIND PLUGINS
  // ===================================
  // 🚨 AI AGENT GUIDANCE:
  // - Plugins extend Tailwind functionality
  // - DO NOT remove tailwindcss-animate - it's essential for Radix UI
  // - Add new plugins only if they integrate with the design system
  // ===================================
  plugins: [require("tailwindcss-animate")],
}

// ===================================
// 📚 CONFIGURATION ARCHITECTURE NOTES
// ===================================
// 🚨 AI AGENT GUIDANCE:
//
// COLOR SYSTEM ARCHITECTURE:
// 1. globals.css defines semantic tokens (--primary, --background, etc.)
// 2. This config maps tokens to Tailwind utilities (bg-primary, text-background)
// 3. Components use Tailwind utilities (never hard-coded colors)
//
// TOKEN HIERARCHY:
// - Primitive tokens (--p50, --n100) → Semantic tokens (--primary) → Utilities (bg-primary)
// - DO NOT skip this hierarchy - it breaks the theming system
//
// MODIFICATION GUIDELINES:
// ✅ ADD: New semantic tokens (follow existing pattern)
// ✅ ADD: New animations (use keyframes + animation utilities)
// ✅ UPDATE: Border radius system (update tokens + config)
//
// ❌ DO NOT: Add hard-coded colors
// ❌ DO NOT: Change HSL format
// ❌ DO NOT: Remove color variable references
// ❌ DO NOT: Modify darkMode configuration
//
// CLIENT THEMING:
// - Client themes override semantic tokens in globals.css
// - This config automatically picks up those changes
// - No config modifications needed for client theming
// ===================================