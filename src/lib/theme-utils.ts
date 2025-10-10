import { parseToRgba, toHex } from 'color2k';

// ===================================
// 🎨 THEME UTILITIES CONFIGURATION
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This file provides utilities for dynamic theme generation
// - DO NOT modify unless fixing color generation bugs
// - Uses color2k for color space conversions
// - Follows the established 3-tier token system
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
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
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

export const generateSecondaryColorSuggestions = (_baseColor: string) => {
  // This is a placeholder for future functionality
  // Parameter is prefixed with underscore to indicate intentional non-use
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
  return luminance > 0.5 ? '#000000' : '#ffffff';
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
    '--destructive': '#ef4444',
    '--destructive-foreground': '#ffffff',
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
    '--destructive': '#dc2626',
    '--destructive-foreground': '#ffffff',
    '--border': nPaletteDark[3],
    '--input': nPaletteDark[3],
    '--ring': pPaletteDark[5],
    '--radius': '0.5rem',
  };

  return { light: lightRecipe, dark: darkRecipe };
}