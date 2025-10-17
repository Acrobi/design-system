/**
 * Theme Utilities - Helper functions for theme management
 *
 * Updated for Tailwind CSS v4 with hex color support.
 * This file provides utilities for working with the updated design system
 * that uses hex colors and proper theme management.
 */
export declare const generateSecondaryColorSuggestions: () => never[];
interface ThemeRecipe {
    '--background': string;
    '--foreground': string;
    '--card': string;
    '--card-foreground': string;
    '--popover': string;
    '--popover-foreground': string;
    '--primary': string;
    '--primary-foreground': string;
    '--secondary': string;
    '--secondary-foreground': string;
    '--muted': string;
    '--muted-foreground': string;
    '--accent': string;
    '--accent-foreground': string;
    '--destructive': string;
    '--destructive-foreground': string;
    '--border': string;
    '--input': string;
    '--ring': string;
    '--radius': string;
}
interface GeneratedTheme {
    light: ThemeRecipe;
    dark: ThemeRecipe;
}
export declare function generateThemeFromColors({ primary, secondary, tinted }: {
    primary: string;
    secondary?: string;
    tinted: boolean;
}): GeneratedTheme;
export type Theme = 'light' | 'dark' | 'system';
export interface ColorPalette {
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    destructive: string;
    background: string;
    foreground: string;
    card: string;
    border: string;
    input: string;
    ring: string;
}
/**
 * Get the current theme
 */
export declare function getTheme(): Theme;
/**
 * Set the theme
 */
export declare function setTheme(theme: Theme): void;
/**
 * Toggle between light and dark themes
 */
export declare function toggleTheme(): void;
/**
 * Initialize theme from localStorage or system preference
 */
export declare function initializeTheme(): void;
/**
 * Get computed color value from CSS variable (hex format)
 */
export declare function getComputedColor(variableName: string): string;
/**
 * Get current theme colors (hex format)
 */
export declare function getCurrentThemeColors(): ColorPalette;
/**
 * Check if color is light (for text contrast) - works with hex
 */
export declare function isLightColor(hexColor: string): boolean;
/**
 * Generate accessible text color based on background (hex format)
 */
export declare function getContrastColor(backgroundColor: string): string;
/**
 * Color utility class for hex color operations (Tailwind v4 compatible)
 */
export declare class ColorUtils {
    /**
     * Convert hex to RGB
     */
    static hexToRgb(hex: string): {
        r: number;
        g: number;
        b: number;
    } | null;
    /**
     * Convert RGB to hex
     */
    static rgbToHex(r: number, g: number, b: number): string;
    /**
     * Get color brightness value (hex format)
     */
    static getBrightness(hex: string): number;
    /**
     * Check if two colors have sufficient contrast
     */
    static hasContrast(color1: string, color2: string, ratio?: number): boolean;
    /**
     * Validate hex color format
     */
    static isValidHex(hex: string): boolean;
    /**
     * Ensure color is in hex format for Tailwind v4
     */
    static ensureHex(color: string): string;
}
/**
 * Theme context value for React Context
 */
export interface ThemeContextValue {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    colors: ColorPalette;
    isDark: boolean;
}
/**
 * Hook for theme management (if using React Context)
 */
export declare function useThemeHook(theme: Theme, setTheme: (theme: Theme) => void): ThemeContextValue;
/**
 * CSS custom property names for all color tokens (v4 compatible)
 */
export declare const CSS_VARIABLES: {
    readonly BACKGROUND: "--background";
    readonly FOREGROUND: "--foreground";
    readonly PRIMARY: "--primary";
    readonly PRIMARY_FOREGROUND: "--primary-foreground";
    readonly SECONDARY: "--secondary";
    readonly SECONDARY_FOREGROUND: "--secondary-foreground";
    readonly ACCENT: "--accent";
    readonly ACCENT_FOREGROUND: "--accent-foreground";
    readonly MUTED: "--muted";
    readonly MUTED_FOREGROUND: "--muted-foreground";
    readonly DESTRUCTIVE: "--destructive";
    readonly DESTRUCTIVE_FOREGROUND: "--destructive-foreground";
    readonly CARD: "--card";
    readonly CARD_FOREGROUND: "--card-foreground";
    readonly POPOVER: "--popover";
    readonly POPOVER_FOREGROUND: "--popover-foreground";
    readonly BORDER: "--border";
    readonly INPUT: "--input";
    readonly RING: "--ring";
    readonly CHART_1: "--chart-1";
    readonly CHART_2: "--chart-2";
    readonly CHART_3: "--chart-3";
    readonly CHART_4: "--chart-4";
    readonly CHART_5: "--chart-5";
};
/**
 * Validate that all theme colors are in hex format
 */
export declare function validateThemeColors(): boolean;
/**
 * Get theme compatibility report
 */
export declare function getThemeCompatibilityReport(): {
    isCompatible: boolean;
    issues: string[];
    recommendations: string[];
};
export {};
//# sourceMappingURL=theme-utils.d.ts.map