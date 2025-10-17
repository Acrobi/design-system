/**
 * Theme Utilities - Helper functions for theme management
 *
 * Updated for Tailwind CSS v4 with hex color support.
 * This file provides utilities for working with the updated design system
 * that uses hex colors and proper theme management.
 */

import { parseToRgba, toHex } from 'color2k';

// ===================================
// 🎨 THEME UTILITIES CONFIGURATION - TAILWIND v4
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This file provides utilities for dynamic theme generation and management
// - Updated for Tailwind CSS v4 hex color compatibility
// - Uses color2k for color space conversions
// - Follows the established 3-tier token system with hex values
// - Includes theme management functions for light/dark mode
// ===================================

// Ramps define the saturation and lightness steps for palettes
const pRamp = [
  { s: 0.16, l: 0.97 }, { s: 0.20, l: 0.94 }, { s: 0.25, l: 0.89 },
  { s: 0.35, l: 0.83 }, { s: 0.50, l: 0.75 }, { s: 0.70, l: 0.65 },
  { s: 0.75, l: 0.55 }, { s: 0.80, l: 0.45 }, { s: 0.85, l: 0.35 },
  { s: 0.90, l: 0.25 }, { s: 0.95, l: 0.15 }
];

const nRamp = [
  { s: 0.0, l: 1.0 }, { s: 0.005, l: 0.985 }, { s: 0.006, l: 0.97 },
  { s: 0.01, l: 0.922 }, { s: 0.015, l: 0.843 }, { s: 0.02, l: 0.708 },
  { s: 0.023, l: 0.556 }, { s: 0.025, l: 0.439 }, { s: 0.025, l: 0.371 },
  { s: 0.022, l: 0.269 }, { s: 0.018, l: 0.205 }, { s: 0.015, l: 0.145 }
];

// ===================================
// 🎨 PALETTE GENERATION
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - Generates color palettes from base colors
// - DO NOT modify the generation logic
// - Uses proper color space conversions
// ===================================

function hslToHex(h: number, s: number, l: number): string {
  // Convert HSL to RGB manually
  const sNorm = s / 100;
  const lNorm = l / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lNorm - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return toHex(`rgba(${r}, ${g}, ${b}, 1)`);
}

function generatePalette(baseColor: string, ramp: { s: number, l: number }[], tinted: boolean): string[] {
  const rgba = parseToRgba(baseColor);
  const r = rgba[0] / 255;
  const g = rgba[1] / 255;
  const b = rgba[2] / 255;

  // Convert RGB to HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  h = Math.round(h * 360);

  return ramp.map(step => {
    return hslToHex(tinted ? h : 0, tinted ? step.s * 100 : 0, step.l * 100);
  });
}

// ===================================
// 🎨 SECONDARY COLOR SUGGESTIONS
// ===================================

export const generateSecondaryColorSuggestions = () => {
  // This is a placeholder for future functionality
  // Removed unused parameter to satisfy linter
  return [];
};

// ===================================
// 🎨 THEME GENERATION FUNCTION
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - Generates complete theme objects from base colors
// - Returns properly typed theme objects
// - Auto-generates foreground colors for accessibility
// ===================================

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

function getContrastColor(hexColor: string): string {
  // Simple contrast calculation - could be enhanced
  const rgba = parseToRgba(hexColor);
  const r = rgba[0] / 255;
  const g = rgba[1] / 255;
  const b = rgba[2] / 255;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 0.5 ? 'var(--n950)' : 'var(--n50)';
}

export function generateThemeFromColors({ primary, secondary, tinted }: { primary: string, secondary?: string, tinted: boolean }): GeneratedTheme {
  const pPalette = generatePalette(primary, pRamp, true);
  const nPalette = generatePalette(primary, nRamp, tinted);
  const sPalette = secondary ? generatePalette(secondary, pRamp, true) : pPalette;

  const lightRecipe: ThemeRecipe = {
    '--background': nPalette[1],
    '--foreground': nPalette[11],
    '--card': nPalette[1],
    '--card-foreground': nPalette[11],
    '--popover': nPalette[1],
    '--popover-foreground': nPalette[11],
    '--primary': pPalette[5],
    '--primary-foreground': getContrastColor(pPalette[5]),
    '--secondary': sPalette[5],
    '--secondary-foreground': getContrastColor(sPalette[5]),
    '--muted': nPalette[2],
    '--muted-foreground': nPalette[6],
    '--accent': nPalette[2],
    '--accent-foreground': getContrastColor(nPalette[2]),
    '--destructive': 'var(--red-500)',
    '--destructive-foreground': 'var(--n50)',
    '--border': nPalette[3],
    '--input': nPalette[3],
    '--ring': pPalette[5],
    '--radius': '0.5rem',
  };

  // Create inverted palettes for dark mode
  const pPaletteDark = [...pPalette].reverse();
  const nPaletteDark = [...nPalette].reverse();
  const sPaletteDark = secondary ? [...sPalette].reverse() : pPaletteDark;

  const darkRecipe: ThemeRecipe = {
    '--background': nPaletteDark[1],
    '--foreground': nPaletteDark[11],
    '--card': nPaletteDark[1],
    '--card-foreground': nPaletteDark[11],
    '--popover': nPaletteDark[1],
    '--popover-foreground': nPaletteDark[11],
    '--primary': pPaletteDark[5],
    '--primary-foreground': getContrastColor(pPaletteDark[5]),
    '--secondary': sPaletteDark[5],
    '--secondary-foreground': getContrastColor(sPaletteDark[5]),
    '--muted': nPaletteDark[2],
    '--muted-foreground': nPaletteDark[6],
    '--accent': nPaletteDark[2],
    '--accent-foreground': getContrastColor(nPaletteDark[2]),
    '--destructive': 'var(--red-600)',
    '--destructive-foreground': 'var(--n50)',
    '--border': nPaletteDark[3],
    '--input': nPaletteDark[3],
    '--ring': pPaletteDark[5],
    '--radius': '0.5rem',
  };

  return { light: lightRecipe, dark: darkRecipe };
}

// ===================================
// 🎨 THEME MANAGEMENT FUNCTIONS - TAILWIND v4
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - Added theme management functions for v4 compatibility
// - These functions work with the new hex-based color system
// - Provides utilities for theme switching and color access
// ===================================

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Color palette interface
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
export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'system';

  const html = document.documentElement;
  if (html.classList.contains('dark')) return 'dark';
  if (html.classList.contains('light')) return 'light';
  return 'system';
}

/**
 * Set the theme
 */
export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;

  // Remove existing theme classes
  html.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    html.classList.add(systemTheme);
  } else {
    html.classList.add(theme);
  }

  // Store preference
  localStorage.setItem('theme', theme);
}

/**
 * Toggle between light and dark themes
 */
export function toggleTheme(): void {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

/**
 * Initialize theme from localStorage or system preference
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined') return;

  const storedTheme = localStorage.getItem('theme') as Theme;
  const theme = storedTheme || 'system';
  setTheme(theme);
}

/**
 * Get computed color value from CSS variable (hex format)
 */
export function getComputedColor(variableName: string): string {
  if (typeof window === 'undefined') return '';

  const computedStyle = getComputedStyle(document.documentElement);
  return computedStyle.getPropertyValue(variableName).trim();
}

/**
 * Get current theme colors (hex format)
 */
export function getCurrentThemeColors(): ColorPalette {
  return {
    primary: getComputedColor('--primary'),
    secondary: getComputedColor('--secondary'),
    accent: getComputedColor('--accent'),
    muted: getComputedColor('--muted'),
    destructive: getComputedColor('--destructive'),
    background: getComputedColor('--background'),
    foreground: getComputedColor('--foreground'),
    card: getComputedColor('--card'),
    border: getComputedColor('--border'),
    input: getComputedColor('--input'),
    ring: getComputedColor('--ring'),
  };
}

/**
 * Check if color is light (for text contrast) - works with hex
 */
export function isLightColor(hexColor: string): boolean {
  if (!hexColor.startsWith('#')) {
    // If it's not a hex color, check if it's a CSS variable
    if (hexColor.startsWith('var(')) {
      return false; // Default to dark for CSS variables
    }
    return false;
  }

  const rgb = parseToRgba(hexColor);
  if (!rgb) return false;

  const [r, g, b] = rgb;
  const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return brightness > 155;
}

/**
 * Generate accessible text color based on background (hex format)
 */
export function getContrastColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? 'var(--n950)' : 'var(--n50)';
}

/**
 * Color utility class for hex color operations (Tailwind v4 compatible)
 */
export class ColorUtils {
  /**
   * Convert hex to RGB
   */
  static hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    if (!hex.startsWith('#')) return null;

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Convert RGB to hex
   */
  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  /**
   * Get color brightness value (hex format)
   */
  static getBrightness(hex: string): number {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return 0;

    return ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
  }

  /**
   * Check if two colors have sufficient contrast
   */
  static hasContrast(color1: string, color2: string, ratio: number = 4.5): boolean {
    const brightness1 = this.getBrightness(color1);
    const brightness2 = this.getBrightness(color2);

    const lighter = Math.max(brightness1, brightness2);
    const darker = Math.min(brightness1, brightness2);

    return (lighter + 5) / (darker + 5) >= ratio;
  }

  /**
   * Validate hex color format
   */
  static isValidHex(hex: string): boolean {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  }

  /**
   * Ensure color is in hex format for Tailwind v4
   */
  static ensureHex(color: string): string {
    if (this.isValidHex(color)) return color;

    // If it's a CSS variable, return as-is
    if (color.startsWith('var(')) return color;

    // Try to convert from other formats (basic implementation)
    if (color.startsWith('rgb')) {
      const rgb = parseToRgba(color);
      if (rgb) {
        return this.rgbToHex(rgb[0], rgb[1], rgb[2]);
      }
    }

    return color; // Return original if conversion fails
  }
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
export function useThemeHook(theme: Theme, setTheme: (theme: Theme) => void): ThemeContextValue {
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const colors = getCurrentThemeColors();
  const isDark = theme === 'dark';

  return {
    theme,
    setTheme,
    toggleTheme,
    colors,
    isDark,
  };
}

/**
 * CSS custom property names for all color tokens (v4 compatible)
 */
export const CSS_VARIABLES = {
  // Semantic colors
  BACKGROUND: '--background',
  FOREGROUND: '--foreground',
  PRIMARY: '--primary',
  PRIMARY_FOREGROUND: '--primary-foreground',
  SECONDARY: '--secondary',
  SECONDARY_FOREGROUND: '--secondary-foreground',
  ACCENT: '--accent',
  ACCENT_FOREGROUND: '--accent-foreground',
  MUTED: '--muted',
  MUTED_FOREGROUND: '--muted-foreground',
  DESTRUCTIVE: '--destructive',
  DESTRUCTIVE_FOREGROUND: '--destructive-foreground',
  CARD: '--card',
  CARD_FOREGROUND: '--card-foreground',
  POPOVER: '--popover',
  POPOVER_FOREGROUND: '--popover-foreground',
  BORDER: '--border',
  INPUT: '--input',
  RING: '--ring',

  // Chart colors
  CHART_1: '--chart-1',
  CHART_2: '--chart-2',
  CHART_3: '--chart-3',
  CHART_4: '--chart-4',
  CHART_5: '--chart-5',
} as const;

// ===================================
// 🎨 TAILWIND v4 COLOR VALIDATION
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - Functions to validate color format compatibility
// - Ensures all colors are hex format for v4 compatibility
// ===================================

/**
 * Validate that all theme colors are in hex format
 */
export function validateThemeColors(): boolean {
  const colors = getCurrentThemeColors();
  let allValid = true;

  Object.values(colors).forEach(color => {
    if (color && !color.startsWith('var(') && !ColorUtils.isValidHex(color)) {
      console.warn(`Invalid hex color format: ${color}`);
      allValid = false;
    }
  });

  return allValid;
}

/**
 * Get theme compatibility report
 */
export function getThemeCompatibilityReport(): {
  isCompatible: boolean;
  issues: string[];
  recommendations: string[];
} {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check if colors are in hex format
  const colors = getCurrentThemeColors();
  Object.entries(colors).forEach(([key, value]) => {
    if (value && !value.startsWith('var(') && !ColorUtils.isValidHex(value)) {
      issues.push(`Color ${key} is not in hex format: ${value}`);
    }
  });

  // Check for @theme block availability
  if (typeof window !== 'undefined') {
    const computedStyle = getComputedStyle(document.documentElement);
    const hasThemeColors = computedStyle.getPropertyValue('--color-background').trim() !== '';

    if (!hasThemeColors) {
      issues.push('@theme block colors not available');
      recommendations.push('Ensure @theme block is properly configured in globals.css');
    }
  }

  // Recommendations for v4 compatibility
  recommendations.push('Use semantic tokens in components instead of hard-coded colors');
  recommendations.push('Test theme switching in both light and dark modes');
  recommendations.push('Verify color contrast meets accessibility standards');

  return {
    isCompatible: issues.length === 0,
    issues,
    recommendations,
  };
}