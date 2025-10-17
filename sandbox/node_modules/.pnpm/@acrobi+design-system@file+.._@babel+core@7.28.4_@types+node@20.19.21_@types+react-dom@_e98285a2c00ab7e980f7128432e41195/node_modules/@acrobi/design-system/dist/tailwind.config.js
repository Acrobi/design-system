"use strict";
/** @type {import('tailwindcss').Config} */
// ===================================
// ⚙️ TAILWIND CSS CONFIGURATION - v4 COMPATIBLE
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This config is updated for Tailwind CSS v4 with hex color support
// - The @theme block in globals.css handles most color configuration
// - DO NOT modify the color format - now uses direct hex values via CSS variables
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
            // 🎨 COLOR SYSTEM - SEMANTIC TOKENS (v4 Compatible)
            // ===================================
            // 🚨 AI AGENT GUIDANCE:
            // - These map CSS custom properties to Tailwind utilities
            // - Now uses direct hex values from @theme block in globals.css
            // - DO NOT use hard-coded colors - always reference CSS variables
            // - DO NOT modify the variable names - they must match globals.css
            // - Add new colors only if adding new semantic tokens to globals.css
            // ===================================
            colors: {
                // Semantic color tokens - map to globals.css definitions
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                // Primary colors with foreground variants
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "var(--primary-foreground)",
                },
                // Secondary colors with foreground variants
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "var(--secondary-foreground)",
                },
                // Destructive colors for errors/danger
                destructive: {
                    DEFAULT: "var(--destructive)",
                    foreground: "var(--destructive-foreground)",
                },
                // Muted colors for subtle UI elements
                muted: {
                    DEFAULT: "var(--muted)",
                    foreground: "var(--muted-foreground)",
                },
                // Accent colors for highlights
                accent: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                // Card colors for containers
                card: {
                    DEFAULT: "var(--card)",
                    foreground: "var(--card-foreground)",
                },
                // Popover colors for dropdowns/overlays
                popover: {
                    DEFAULT: "var(--popover)",
                    foreground: "var(--popover-foreground)",
                },
                // Include direct access to raw color tokens
                // These now reference the @theme block definitions in globals.css
                'gray-50': 'var(--color-gray-50)',
                'gray-100': 'var(--color-gray-100)',
                'gray-200': 'var(--color-gray-200)',
                'gray-300': 'var(--color-gray-300)',
                'gray-400': 'var(--color-gray-400)',
                'gray-500': 'var(--color-gray-500)',
                'gray-600': 'var(--color-gray-600)',
                'gray-700': 'var(--color-gray-700)',
                'gray-800': 'var(--color-gray-800)',
                'gray-900': 'var(--color-gray-900)',
                'gray-950': 'var(--color-gray-950)',
                'blue-50': 'var(--color-blue-50)',
                'blue-100': 'var(--color-blue-100)',
                'blue-200': 'var(--color-blue-200)',
                'blue-300': 'var(--color-blue-300)',
                'blue-400': 'var(--color-blue-400)',
                'blue-500': 'var(--color-blue-500)',
                'blue-600': 'var(--color-blue-600)',
                'blue-700': 'var(--color-blue-700)',
                'blue-800': 'var(--color-blue-800)',
                'blue-900': 'var(--color-blue-900)',
                'blue-950': 'var(--color-blue-950)',
                'purple-50': 'var(--color-purple-50)',
                'purple-100': 'var(--color-purple-100)',
                'purple-200': 'var(--color-purple-200)',
                'purple-300': 'var(--color-purple-300)',
                'purple-400': 'var(--color-purple-400)',
                'purple-500': 'var(--color-purple-500)',
                'purple-600': 'var(--color-purple-600)',
                'purple-700': 'var(--color-purple-700)',
                'purple-800': 'var(--color-purple-800)',
                'purple-900': 'var(--color-purple-900)',
                'purple-950': 'var(--color-purple-950)',
                'green-50': 'var(--color-green-50)',
                'green-100': 'var(--color-green-100)',
                'green-200': 'var(--color-green-200)',
                'green-300': 'var(--color-green-300)',
                'green-400': 'var(--color-green-400)',
                'green-500': 'var(--color-green-500)',
                'green-600': 'var(--color-green-600)',
                'green-700': 'var(--color-green-700)',
                'green-800': 'var(--color-green-800)',
                'green-900': 'var(--color-green-900)',
                'green-950': 'var(--color-green-950)',
                'red-50': 'var(--color-red-50)',
                'red-100': 'var(--color-red-100)',
                'red-200': 'var(--color-red-200)',
                'red-300': 'var(--color-red-300)',
                'red-400': 'var(--color-red-400)',
                'red-500': 'var(--color-red-500)',
                'red-600': 'var(--color-red-600)',
                'red-700': 'var(--color-red-700)',
                'red-800': 'var(--color-red-800)',
                'red-900': 'var(--color-red-900)',
                'red-950': 'var(--color-red-950)',
                'orange-50': 'var(--color-orange-50)',
                'orange-100': 'var(--color-orange-100)',
                'orange-200': 'var(--color-orange-200)',
                'orange-300': 'var(--color-orange-300)',
                'orange-400': 'var(--color-orange-400)',
                'orange-500': 'var(--color-orange-500)',
                'orange-600': 'var(--color-orange-600)',
                'orange-700': 'var(--color-orange-700)',
                'orange-800': 'var(--color-orange-800)',
                'orange-900': 'var(--color-orange-900)',
                'orange-950': 'var(--color-orange-950)',
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
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
                sm: "var(--radius-sm)",
                xs: "var(--radius-1)",
                DEFAULT: "var(--radius-2)",
                xl: "var(--radius-8)",
                "2xl": "var(--radius-12)",
                "3xl": "var(--radius-16)",
                full: "var(--radius-full)",
            },
            // ===================================
            // 📏 SPACING SYSTEM
            // ===================================
            spacing: {
                '0': 'var(--space-0)',
                '1': 'var(--space-1)',
                '2': 'var(--space-2)',
                '3': 'var(--space-3)',
                '4': 'var(--space-4)',
                '5': 'var(--space-5)',
                '6': 'var(--space-6)',
                '8': 'var(--space-8)',
                '10': 'var(--space-10)',
                '12': 'var(--space-12)',
                '16': 'var(--space-16)',
                '20': 'var(--space-20)',
                '24': 'var(--space-24)',
                '32': 'var(--space-32)',
            },
            // ===================================
            // 📝 TYPOGRAPHY SYSTEM
            // ===================================
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-mono)'],
            },
            fontSize: {
                xs: ['var(--text-xs)', { lineHeight: '1.5' }],
                sm: ['var(--text-sm)', { lineHeight: '1.5' }],
                base: ['var(--text-base)', { lineHeight: '1.6' }],
                lg: ['var(--text-lg)', { lineHeight: '1.6' }],
                xl: ['var(--text-xl)', { lineHeight: '1.6' }],
                '2xl': ['var(--text-2xl)', { lineHeight: '1.4' }],
                '3xl': ['var(--text-3xl)', { lineHeight: '1.3' }],
                '4xl': ['var(--text-4xl)', { lineHeight: '1.2' }],
            },
            // ===================================
            // 🌟 SHADOW SYSTEM
            // ===================================
            boxShadow: {
                sm: 'var(--shadow-sm)',
                DEFAULT: 'var(--shadow)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
                '2xl': 'var(--shadow-2xl)',
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
};
// ===================================
// 📚 CONFIGURATION ARCHITECTURE NOTES - TAILWIND v4
// ===================================
// 🚨 AI AGENT GUIDANCE:
//
// COLOR SYSTEM ARCHITECTURE (Updated for v4):
// 1. globals.css defines primitive hex tokens (--p50, --n100, etc.)
// 2. globals.css @theme block maps hex values to Tailwind utilities
// 3. This config maps @theme variables to component utilities
// 4. Components use Tailwind utilities (never hard-coded colors)
//
// TOKEN HIERARCHY (v4):
// - Primitive hex tokens (--p50: #faf5ff) → @theme mappings → Utilities (bg-primary)
// - DO NOT skip this hierarchy - it breaks the theming system
//
// HEX FORMAT CONVERSIONS:
// - All HSL values converted to hex for Tailwind v4 compatibility
// - Primary purple: HSL 270° 83% 61% → #9333ea
// - Neutral grays: HSL converted to appropriate hex values
// - Semantic tokens use direct hex values in :root and .dark
//
// MODIFICATION GUIDELINES:
// ✅ ADD: New semantic tokens (follow existing pattern)
// ✅ ADD: New animations (use keyframes + animation utilities)
// ✅ UPDATE: Border radius system (update tokens + config)
// ✅ UPDATE: Colors must use hex format in @theme block
//
// ❌ DO NOT: Add hard-coded colors
// ❌ DO NOT: Use HSL format in @theme block (v4 requires hex)
// ❌ DO NOT: Remove color variable references
// ❌ DO NOT: Modify darkMode configuration
//
// CLIENT THEMING:
// - Client themes override semantic tokens in globals.css
// - This config automatically picks up those changes via @theme
// - No config modifications needed for client theming
//
// TAILWIND v4 COMPATIBILITY:
// - @theme block in globals.css handles primary color configuration
// - This config references @theme variables with var(--color-*) prefix
// - All color values are now hex format for v4 compatibility
// ===================================
//# sourceMappingURL=tailwind.config.js.map