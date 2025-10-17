/** @type {import('tailwindcss').Config} */
// ===================================
// ⚙️ TAILWIND CSS CONFIGURATION - v4 SEMANTIC TOKENS
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This config uses Tailwind CSS v4 with @theme block in CSS
// - NO hard-coded values in this config - ALL values use semantic tokens
// - The @theme block in tailwind.css handles ALL configuration
// - DO NOT add any hard-coded colors, spacing, or typography values
// - ALWAYS reference semantic CSS variables
// ===================================

module.exports = {
  // 🚨 CRITICAL: Enable class-based dark mode for JavaScript toggle functionality
  darkMode: ['class'],

  // 🚨 DO NOT modify this content pattern unless adding new file types
  content: ["./src/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],

  // ===================================
  // 🎨 SEMANTIC TOKEN MAPPINGS
  // ===================================
  // 🚨 CRITICAL: NO hard-coded values allowed
  // All values reference CSS variables defined in @theme block
  // ===================================
  theme: {
    // Container configuration - uses semantic spacing tokens
    container: {
      center: true,
      padding: "var(--space-6)",
      screens: {
        "2xl": "var(--container-2xl)"
      }
    },

    extend: {
      // ===================================
      // 🎨 COLOR SYSTEM - SEMANTIC TOKENS ONLY
      // ===================================
      // 🚨 CRITICAL: NO hard-coded colors
      // All colors reference semantic tokens from @theme block
      // ===================================
      colors: {
        // Semantic color tokens - reference @theme definitions
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Primary semantic colors
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },

        // Secondary semantic colors
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },

        // Destructive semantic colors
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },

        // Muted semantic colors
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },

        // Accent semantic colors
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },

        // Card semantic colors
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },

        // Popover semantic colors
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },

        // System status colors - semantic only
        success: {
          DEFAULT: "var(--success)",
          foreground: "var(--success-foreground)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "var(--warning-foreground)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
        },

        // Content colors - semantic hierarchy
        "content-primary": "var(--content-primary)",
        "content-secondary": "var(--content-secondary)",
        "content-tertiary": "var(--content-tertiary)",
        "content-disabled": "var(--content-disabled)",
      },

      // ===================================
      // 🔲 BORDER RADIUS - SEMANTIC TOKENS
      // ===================================
      // 🚨 CRITICAL: NO hard-coded values
      // All radius values reference semantic tokens
      // ===================================
      borderRadius: {
        none: "var(--radius-none)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-default)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },

      // ===================================
      // 📏 SPACING SYSTEM - SEMANTIC TOKENS
      // ===================================
      // 🚨 CRITICAL: NO hard-coded values
      // All spacing values reference semantic tokens
      // ===================================
      spacing: {
        '0': 'var(--space-0)',
        'px': 'var(--space-px)',
        '0.5': 'var(--space-0-5)',
        '1': 'var(--space-1)',
        '1.5': 'var(--space-1-5)',
        '2': 'var(--space-2)',
        '2.5': 'var(--space-2-5)',
        '3': 'var(--space-3)',
        '3.5': 'var(--space-3-5)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '7': 'var(--space-7)',
        '8': 'var(--space-8)',
        '9': 'var(--space-9)',
        '10': 'var(--space-10)',
        '11': 'var(--space-11)',
        '12': 'var(--space-12)',
        '14': 'var(--space-14)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '28': 'var(--space-28)',
        '32': 'var(--space-32)',
        '36': 'var(--space-36)',
        '40': 'var(--space-40)',
        '44': 'var(--space-44)',
        '48': 'var(--space-48)',
        '52': 'var(--space-52)',
        '56': 'var(--space-56)',
        '60': 'var(--space-60)',
        '64': 'var(--space-64)',
        '72': 'var(--space-72)',
        '80': 'var(--space-80)',
        '96': 'var(--space-96)',
      },

      // ===================================
      // 📝 TYPOGRAPHY SYSTEM - SEMANTIC TOKENS
      // ===================================
      // 🚨 CRITICAL: NO hard-coded values
      // All typography values reference semantic tokens
      // ===================================
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
      },

      fontSize: {
        // Text scale - semantic fluid typography
        'xs': ['var(--text-xs)', { lineHeight: 'var(--leading-xs)' }],
        'sm': ['var(--text-sm)', { lineHeight: 'var(--leading-sm)' }],
        'base': ['var(--text-base)', { lineHeight: 'var(--leading-base)' }],
        'lg': ['var(--text-lg)', { lineHeight: 'var(--leading-lg)' }],
        'xl': ['var(--text-xl)', { lineHeight: 'var(--leading-xl)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-2xl)' }],
        '3xl': ['var(--text-3xl)', { lineHeight: 'var(--leading-3xl)' }],
        '4xl': ['var(--text-4xl)', { lineHeight: 'var(--leading-4xl)' }],
        '5xl': ['var(--text-5xl)', { lineHeight: 'var(--leading-5xl)' }],
        '6xl': ['var(--text-6xl)', { lineHeight: 'var(--leading-6xl)' }],

        // Display scale - semantic headings
        'display-xs': ['var(--text-display-xs)', { lineHeight: 'var(--leading-display-xs)' }],
        'display-sm': ['var(--text-display-sm)', { lineHeight: 'var(--leading-display-sm)' }],
        'display-md': ['var(--text-display-md)', { lineHeight: 'var(--leading-display-md)' }],
        'display-lg': ['var(--text-display-lg)', { lineHeight: 'var(--leading-display-lg)' }],
        'display-xl': ['var(--text-display-xl)', { lineHeight: 'var(--leading-display-xl)' }],
        'display-2xl': ['var(--text-display-2xl)', { lineHeight: 'var(--leading-display-2xl)' }],
      },

      fontWeight: {
        thin: 'var(--font-weight-thin)',
        extralight: 'var(--font-weight-extralight)',
        light: 'var(--font-weight-light)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
        extrabold: 'var(--font-weight-extrabold)',
        black: 'var(--font-weight-black)',
      },

      letterSpacing: {
        tighter: 'var(--letter-spacing-tighter)',
        tight: 'var(--letter-spacing-tight)',
        normal: 'var(--letter-spacing-normal)',
        wide: 'var(--letter-spacing-wide)',
        wider: 'var(--letter-spacing-wider)',
        widest: 'var(--letter-spacing-widest)',
      },

      // ===================================
      // 🌟 SHADOW SYSTEM - SEMANTIC TOKENS
      // ===================================
      // 🚨 CRITICAL: NO hard-coded values
      // All shadows reference semantic tokens
      // ===================================
      boxShadow: {
        none: 'var(--shadow-none)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-default)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        '3xl': 'var(--shadow-3xl)',
        inner: 'var(--shadow-inner)',

        // Semantic shadows for specific contexts
        'interactive': 'var(--shadow-interactive)',
        'elevated': 'var(--shadow-elevated)',
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
      },

      // ===================================
      // 🎬 ANIMATION KEYFRAMES - SEMANTIC
      // ===================================
      // 🚨 CRITICAL: NO hard-coded values
      // All animations reference semantic timing functions
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
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.95)", opacity: "0" },
        },
      },

      // ===================================
      // ⚡ ANIMATION UTILITIES - SEMANTIC
      // ===================================
      // 🚨 CRITICAL: NO hard-coded values
      // All durations and easing reference semantic tokens
      // ===================================
      animation: {
        "accordion-down": "accordion-down var(--duration-fast) var(--easing-default)",
        "accordion-up": "accordion-up var(--duration-fast) var(--easing-default)",
        "fade-in": "fade-in var(--duration-base) var(--easing-default)",
        "fade-out": "fade-out var(--duration-base) var(--easing-default)",
        "slide-in-from-top": "slide-in-from-top var(--duration-base) var(--easing-out)",
        "slide-in-from-bottom": "slide-in-from-bottom var(--duration-base) var(--easing-out)",
        "slide-in-from-left": "slide-in-from-left var(--duration-base) var(--easing-out)",
        "slide-in-from-right": "slide-in-from-right var(--duration-base) var(--easing-out)",
        "scale-in": "scale-in var(--duration-fast) var(--easing-out)",
        "scale-out": "scale-out var(--duration-fast) var(--easing-in)",

        // Semantic animation durations
        "spin-slow": "spin var(--duration-slow) linear infinite",
        "spin-fast": "spin var(--duration-fast) linear infinite",
        "pulse-slow": "pulse var(--duration-slow) var(--easing-in-out) infinite",
        "pulse-fast": "pulse var(--duration-fast) var(--easing-in-out) infinite",
      },

      // ===================================
      // 📐 OTHER SEMANTIC TOKENS
      // ===================================
      // 🚨 CRITICAL: NO hard-coded values
      // All values reference semantic tokens
      // ===================================
      zIndex: {
        hide: 'var(--z-hide)',
        auto: 'var(--z-auto)',
        base: 'var(--z-base)',
        docked: 'var(--z-docked)',
        dropdown: 'var(--z-dropdown)',
        sticky: 'var(--z-sticky)',
        banner: 'var(--z-banner)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        popover: 'var(--z-popover)',
        skipLink: 'var(--z-skip-link)',
        toast: 'var(--z-toast)',
        tooltip: 'var(--z-tooltip)',
      },

      maxWidth: {
        none: 'var(--max-width-none)',
        xs: 'var(--max-width-xs)',
        sm: 'var(--max-width-sm)',
        md: 'var(--max-width-md)',
        lg: 'var(--max-width-lg)',
        xl: 'var(--max-width-xl)',
        '2xl': 'var(--max-width-2xl)',
        '3xl': 'var(--max-width-3xl)',
        '4xl': 'var(--max-width-4xl)',
        '5xl': 'var(--max-width-5xl)',
        '6xl': 'var(--max-width-6xl)',
        '7xl': 'var(--max-width-7xl)',
        full: 'var(--max-width-full)',
        'prose': 'var(--max-width-prose)',
        'screen-sm': 'var(--max-width-screen-sm)',
        'screen-md': 'var(--max-width-screen-md)',
        'screen-lg': 'var(--max-width-screen-lg)',
        'screen-xl': 'var(--max-width-screen-xl)',
        'screen-2xl': 'var(--max-width-screen-2xl)',
      },
    },
  },

  // ===================================
  // 🔌 TAILWIND PLUGINS
  // ===================================
  // 🚨 AI AGENT GUIDANCE:
  // - Plugins extend Tailwind functionality
  // - DO NOT remove tailwindcss-animate - essential for Radix UI
  // - Add new plugins only if they integrate with the design system
  // ===================================
  plugins: [require("tailwindcss-animate")],
}

// ===================================
// 📚 CONFIGURATION ARCHITECTURE NOTES - TAILWIND v4 SEMANTIC
// ===================================
// 🚨 AI AGENT GUIDANCE:
//
// GOLDEN RULE: NO hard-coded values in this configuration
//
// SEMANTIC TOKEN ARCHITECTURE:
// 1. tailwind.css @theme block defines ALL primitive tokens
// 2. tailwind.css :root defines semantic color mappings
// 3. This config references semantic tokens via CSS variables
// 4. Components use Tailwind utilities (never hard-coded values)
//
// TOKEN HIERARCHY:
// - Primitive tokens (@theme) → Semantic tokens (:root) → Utilities → Components
// - DO NOT skip this hierarchy - it breaks the theming system
//
// MODIFICATION GUIDELINES:
// ✅ ADD: New semantic token references (follow existing pattern)
// ✅ ADD: New animations (use semantic durations and easing)
// ✅ UPDATE: Token mappings (update tokens + config)
//
// ❌ DO NOT: Add hard-coded values
// ❌ DO NOT: Use numbers directly (e.g., padding: '1rem')
// ❌ DO NOT: Remove variable references
// ❌ DO NOT: Modify darkMode configuration
//
// CLIENT THEMING:
// - Client themes override semantic tokens in tailwind.css
// - This config automatically picks up those changes
// - No config modifications needed for client theming
//
// TAILWIND v4 COMPATIBILITY:
// - @theme block in tailwind.css handles primitive configuration
// - This config references semantic tokens with var(--*) syntax
// - All values must reference CSS variables, no hard-coded values
// ===================================