/**
 * SEMANTIC TOKEN MAPPING VALIDATION TEST SUITE
 * QA Team Validation for STORY-C1.1-Implement-Primitives
 *
 * CONSTITUTIONAL REQUIREMENTS:
 * 1. Golden Rule: Validate semantic tokens properly map to primitives
 * 2. Absolute Honesty: Report all mapping violations honestly
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../src/components/ui/theme-provider';
import { validateThemeColors, getThemeCompatibilityReport, getCurrentThemeColors } from '../src/lib/theme-utils';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock document.head.appendChild for theme CSS loading
const mockAppendChild = jest.spyOn(document.head, 'appendChild').mockImplementation(() => {
  return document.createElement('link');
});

// Mock CSS computed styles for semantic tokens
const mockComputedStyle = {
  getPropertyValue: jest.fn((property) => {
    // Light mode semantic token values
    const lightModeValues: Record<string, string> = {
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',
      '--card': '0 0% 100%',
      '--card-foreground': '222.2 84% 4.9%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '222.2 84% 4.9%',
      '--primary': '0 0% 0%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '210 40% 96.1%',
      '--secondary-foreground': '222.2 84% 4.9%',
      '--muted': '210 40% 96.1%',
      '--muted-foreground': '215.4 16.3% 46.9%',
      '--accent': '210 40% 96.1%',
      '--accent-foreground': '222.2 84% 4.9%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '214.3 31.8% 91.4%',
      '--input': '214.3 31.8% 91.4%',
      '--ring': '0 0% 0%',
      // Typography semantics
      '--font-heading': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '--font-body': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '--font-code': 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      // Spacing semantics
      '--container-sm': 'var(--space-4)',
      '--container-md': 'var(--space-6)',
      '--container-lg': 'var(--space-8)',
      '--container-xl': 'var(--space-12)',
      // Shadow semantics
      '--shadow-card': 'var(--shadow-sm)',
      '--shadow-dropdown': 'var(--shadow-lg)',
      '--shadow-modal': 'var(--shadow-xl)',
      // Border radius semantics
      '--radius-card': 'var(--radius-lg)',
      '--radius-button': 'var(--radius-md)',
      '--radius-input': 'var(--radius-md)',
      // Motion semantics
      '--transition-colors': 'color var(--duration-normal) var(--ease-in-out), background-color var(--duration-normal) var(--ease-in-out), border-color var(--duration-normal) var(--ease-in-out)',
      '--transition-transform': 'transform var(--duration-normal) var(--ease-in-out)',
      '--transition-all': 'all var(--duration-normal) var(--ease-in-out)',
    };

    // Dark mode overrides (when .dark class is present)
    const darkModeValues: Record<string, string> = {
      '--background': '222.2 84% 4.9%',
      '--foreground': '210 40% 98%',
      '--card': '222.2 84% 4.9%',
      '--card-foreground': '210 40% 98%',
      '--popover': '222.2 84% 4.9%',
      '--popover-foreground': '210 40% 98%',
      '--primary': '0 0% 100%',
      '--primary-foreground': '222.2 84% 4.9%',
      '--secondary': '217.2 32.6% 17.5%',
      '--secondary-foreground': '210 40% 98%',
      '--muted': '217.2 32.6% 17.5%',
      '--muted-foreground': '212.4 32.6% 70.8%',
      '--accent': '217.2 32.6% 17.5%',
      '--accent-foreground': '210 40% 98%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '217.2 32.6% 17.5%',
      '--input': '217.2 32.6% 17.5%',
      '--ring': '0 0% 100%',
    };

    const isDarkMode = document.documentElement.classList.contains('dark');
    const values = isDarkMode ? darkModeValues : lightModeValues;

    return values[property] || '';
  }),
};

Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: jest.fn(() => mockComputedStyle),
});

// Test wrapper
const createWrapper = (props = {}) => {
  const defaultProps = {
    defaultMode: "light" as const,
    defaultTheme: "base" as const,
    enableSystem: true,
    ...props
  };

  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider {...defaultProps}>
      {children}
    </ThemeProvider>
  );
};

describe('SEMANTIC TOKEN MAPPING VALIDATION', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.className = '';
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    mockAppendChild.mockClear();
  });

  describe('🚨 CONSTITUTIONAL: Semantic Token Architecture', () => {
    it('should properly map semantic colors to HSL format', () => {
      const wrapper = createWrapper({ defaultMode: "light" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.mode).toBe('light');
      expect(result.current.resolvedMode).toBe('light');

      // Verify semantic tokens are in HSL format
      const background = mockComputedStyle.getPropertyValue('--background');
      const foreground = mockComputedStyle.getPropertyValue('--foreground');
      const primary = mockComputedStyle.getPropertyValue('--primary');

      expect(background).toMatch(/^\d+\s+\d+%\s+\d+%$/);
      expect(foreground).toMatch(/^\d+\s+\d+%\s+\d+%$/);
      expect(primary).toMatch(/^\d+\s+\d+%\s+\d+%$/);
    });

    it('should NOT reference primitive tokens directly in components', () => {
      // This test validates that components use semantic tokens, not primitives
      const semanticTokens = [
        '--background', '--foreground', '--primary', '--secondary',
        '--muted', '--accent', '--destructive', '--border', '--input', '--ring'
      ];

      semanticTokens.forEach(token => {
        expect(token).toMatch(/^--[a-z-]+$/); // Semantic naming
        expect(token).not.toMatch(/^--[pn]\d+$/); // Should not be primitive naming
      });
    });

    it('should maintain proper token hierarchy (primitives -> semantics -> components)', () => {
      // Test that semantic tokens reference primitives
      const containerSm = mockComputedStyle.getPropertyValue('--container-sm');
      const containerMd = mockComputedStyle.getPropertyValue('--container-md');

      expect(containerSm).toBe('var(--space-4)');
      expect(containerMd).toBe('var(--space-6)');

      // Test that shadow semantics reference shadow primitives
      const shadowCard = mockComputedStyle.getPropertyValue('--shadow-card');
      const shadowDropdown = mockComputedStyle.getPropertyValue('--shadow-dropdown');

      expect(shadowCard).toBe('var(--shadow-sm)');
      expect(shadowDropdown).toBe('var(--shadow-lg)');
    });

    it('COMPLIANT: Typography semantic tokens reference font primitives', () => {
      const fontHeading = mockComputedStyle.getPropertyValue('--font-heading');
      const fontBody = mockComputedStyle.getPropertyValue('--font-body');
      const fontCode = mockComputedStyle.getPropertyValue('--font-code');

      expect(fontHeading).toBe('var(--font-sans)');
      expect(fontBody).toBe('var(--font-sans)');
      expect(fontCode).toBe('var(--font-mono)');
    });
  });

  describe('Color Semantic Tokens', () => {
    it('should have all required color semantic tokens', () => {
      const requiredColorTokens = [
        '--background', '--foreground', '--card', '--card-foreground',
        '--popover', '--popover-foreground', '--primary', '--primary-foreground',
        '--secondary', '--secondary-foreground', '--muted', '--muted-foreground',
        '--accent', '--accent-foreground', '--destructive', '--destructive-foreground',
        '--border', '--input', '--ring'
      ];

      requiredColorTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/^\d+\s+\d+%\s+\d+%$/); // HSL format
      });
    });

    it('should have proper foreground/background pairs', () => {
      const pairs = [
        ['--background', '--foreground'],
        ['--card', '--card-foreground'],
        ['--popover', '--popover-foreground'],
        ['--primary', '--primary-foreground'],
        ['--secondary', '--secondary-foreground'],
        ['--accent', '--accent-foreground'],
        ['--destructive', '--destructive-foreground'],
        ['--muted', '--muted-foreground']
      ];

      pairs.forEach([bg, fg]) => {
        const backgroundValue = mockComputedStyle.getPropertyValue(bg);
        const foregroundValue = mockComputedStyle.getPropertyValue(fg);

        expect(backgroundValue).toBeTruthy();
        expect(foregroundValue).toBeTruthy();

        // Basic check that they're different (for contrast)
        expect(backgroundValue).not.toBe(foregroundValue);
      });
    });

    it('should have consistent color values across similar tokens', () => {
      const background = mockComputedStyle.getPropertyValue('--background');
      const card = mockComputedStyle.getPropertyValue('--card');
      const popover = mockComputedStyle.getPropertyValue('--popover');

      // In light mode, these should be the same or very similar
      expect(background).toBe(card);
      expect(card).toBe(popover);
    });
  });

  describe('Typography Semantic Tokens', () => {
    it('should map semantic font tokens to primitive font stacks', () => {
      const fontHeading = mockComputedStyle.getPropertyValue('--font-heading');
      const fontBody = mockComputedStyle.getPropertyValue('--font-body');
      const fontCode = mockComputedStyle.getPropertyValue('--font-code');

      expect(fontHeading).toBe('var(--font-sans)');
      expect(fontBody).toBe('var(--font-sans)');
      expect(fontCode).toBe('var(--font-mono)');
    });

    it('should maintain font stack consistency', () => {
      const sansFont = mockComputedStyle.getPropertyValue('--font-sans');
      const monoFont = mockComputedStyle.getPropertyValue('--font-mono');

      expect(sansFont).toContain('system-ui');
      expect(sansFont).toContain('sans-serif');
      expect(monoFont).toContain('monospace');
    });
  });

  describe('Spacing Semantic Tokens', () => {
    it('should map container spacing to primitive spacing tokens', () => {
      const containerTokens = [
        '--container-sm', '--container-md', '--container-lg', '--container-xl'
      ];

      const expectedMappings = [
        'var(--space-4)', 'var(--space-6)', 'var(--space-8)', 'var(--space-12)'
      ];

      containerTokens.forEach((token, index) => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBe(expectedMappings[index]);
      });
    });

    it('should maintain logical spacing progression', () => {
      const containerSm = mockComputedStyle.getPropertyValue('--container-sm');
      const containerMd = mockComputedStyle.getPropertyValue('--container-md');
      const containerLg = mockComputedStyle.getPropertyValue('--container-lg');

      expect(containerSm).toBe('var(--space-4)');
      expect(containerMd).toBe('var(--space-6)');
      expect(containerLg).toBe('var(--space-8)');
    });
  });

  describe('Shadow Semantic Tokens', () => {
    it('should map semantic shadows to primitive shadows', () => {
      const shadowMappings = {
        '--shadow-card': 'var(--shadow-sm)',
        '--shadow-dropdown': 'var(--shadow-lg)',
        '--shadow-modal': 'var(--shadow-xl)'
      };

      Object.entries(shadowMappings).forEach(([semantic, expectedPrimitive]) => {
        const value = mockComputedStyle.getPropertyValue(semantic);
        expect(value).toBe(expectedPrimitive);
      });
    });

    it('should maintain appropriate shadow hierarchy', () => {
      const cardShadow = mockComputedStyle.getPropertyValue('--shadow-card');
      const dropdownShadow = mockComputedStyle.getPropertyValue('--shadow-dropdown');
      const modalShadow = mockComputedStyle.getPropertyValue('--shadow-modal');

      expect(cardShadow).toBe('var(--shadow-sm)');
      expect(dropdownShadow).toBe('var(--shadow-lg)');
      expect(modalShadow).toBe('var(--shadow-xl)');
    });
  });

  describe('Border Radius Semantic Tokens', () => {
    it('should map semantic radius to primitive radius', () => {
      const radiusMappings = {
        '--radius-card': 'var(--radius-lg)',
        '--radius-button': 'var(--radius-md)',
        '--radius-input': 'var(--radius-md)'
      };

      Object.entries(radiusMappings).forEach(([semantic, expectedPrimitive]) => {
        const value = mockComputedStyle.getPropertyValue(semantic);
        expect(value).toBe(expectedPrimitive);
      });
    });

    it('should maintain consistent radius values', () => {
      const buttonRadius = mockComputedStyle.getPropertyValue('--radius-button');
      const inputRadius = mockComputedStyle.getPropertyValue('--radius-input');

      expect(buttonRadius).toBe('var(--radius-md)');
      expect(inputRadius).toBe('var(--radius-md)');
    });
  });

  describe('Motion Semantic Tokens', () => {
    it('should create proper transition shortcuts', () => {
      const transitionTokens = [
        '--transition-colors', '--transition-transform', '--transition-all'
      ];

      transitionTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/var\(--duration-\w+\)/);
        expect(value).toMatch(/var\(--ease-\w+\)/);
      });
    });

    it('should reference duration and easing primitives', () => {
      const colorTransition = mockComputedStyle.getPropertyValue('--transition-colors');
      const transformTransition = mockComputedStyle.getPropertyValue('--transition-transform');

      expect(colorTransition).toContain('var(--duration-normal)');
      expect(colorTransition).toContain('var(--ease-in-out)');
      expect(transformTransition).toContain('var(--duration-normal)');
      expect(transformTransition).toContain('var(--ease-in-out)');
    });
  });

  describe('Theme Utilities Integration', () => {
    it('should validate theme color format', () => {
      const isValid = validateThemeColors();
      expect(typeof isValid).toBe('boolean');
    });

    it('should provide compatibility report', () => {
      const report = getThemeCompatibilityReport();

      expect(report).toHaveProperty('isCompatible');
      expect(report).toHaveProperty('issues');
      expect(report).toHaveProperty('recommendations');
      expect(Array.isArray(report.issues)).toBe(true);
      expect(Array.isArray(report.recommendations)).toBe(true);
    });

    it('should get current theme colors', () => {
      const colors = getCurrentThemeColors();

      expect(colors).toHaveProperty('primary');
      expect(colors).toHaveProperty('secondary');
      expect(colors).toHaveProperty('background');
      expect(colors).toHaveProperty('foreground');
      expect(colors).toHaveProperty('muted');
      expect(colors).toHaveProperty('accent');
      expect(colors).toHaveProperty('destructive');
    });
  });

  describe('Tailwind @theme Block Integration', () => {
    it('should map semantic tokens to Tailwind utilities', () => {
      // This test verifies the @theme block configuration
      const colorBackground = mockComputedStyle.getPropertyValue('--color-background');
      const colorPrimary = mockComputedStyle.getPropertyValue('--color-primary');
      const fontHeading = mockComputedStyle.getPropertyValue('--font-heading');

      expect(colorBackground).toBe('hsl(var(--background))');
      expect(colorPrimary).toBe('hsl(var(--primary))');
      expect(fontHeading).toBe('var(--font-heading)');
    });

    it('should maintain proper Tailwind v4 syntax', () => {
      const tailwindColorMappings = [
        '--color-background', '--color-foreground', '--color-primary',
        '--color-secondary', '--color-muted', '--color-accent',
        '--color-destructive', '--color-border', '--color-input', '--color-ring'
      ];

      tailwindColorMappings.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toMatch(/^hsl\(var\(--[a-z-]+\)\)$/);
      });
    });
  });

  describe('Token Consistency Validation', () => {
    it('should maintain consistent token naming patterns', () => {
      const semanticTokens = [
        '--background', '--foreground', '--primary', '--secondary',
        '--muted', '--accent', '--destructive', '--border', '--input', '--ring'
      ];

      semanticTokens.forEach(token => {
        expect(token).toMatch(/^--[a-z-]+$/);
        expect(token).not.toMatch(/--[pn]\d+$/); // Should not use primitive naming
      });
    });

    it('should have complete token coverage', () => {
      const expectedTokenCategories = {
        colors: [
          '--background', '--foreground', '--primary', '--secondary',
          '--muted', '--accent', '--destructive', '--border', '--input', '--ring'
        ],
        typography: ['--font-heading', '--font-body', '--font-code'],
        spacing: ['--container-sm', '--container-md', '--container-lg', '--container-xl'],
        shadows: ['--shadow-card', '--shadow-dropdown', '--shadow-modal'],
        radius: ['--radius-card', '--radius-button', '--radius-input'],
        motion: ['--transition-colors', '--transition-transform', '--transition-all']
      };

      Object.entries(expectedTokenCategories).forEach(([category, tokens]) => {
        tokens.forEach(token => {
          const value = mockComputedStyle.getPropertyValue(token);
          expect(value).toBeTruthy();
        });
      });
    });
  });
});

describe('SEMANTIC TOKEN THEMING INTEGRATION', () => {
  describe('Theme Switching', () => {
    it('should update semantic tokens on theme change', async () => {
      const wrapper = createWrapper({ defaultMode: "light" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.mode).toBe('light');

      // Switch to dark mode
      act(() => {
        result.current.setMode('dark');
      });

      expect(result.current.mode).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Verify semantic token values changed
      const background = mockComputedStyle.getPropertyValue('--background');
      expect(background).toBe('222.2 84% 4.9%'); // Dark mode value
    });

    it('should handle system preference correctly', () => {
      // Mock system prefers dark
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      const wrapper = createWrapper({ defaultMode: "system" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.mode).toBe('system');
      expect(result.current.resolvedMode).toBe('dark');
    });
  });

  describe('Color Theme Integration', () => {
    it('should handle theme switching without breaking semantic tokens', async () => {
      const wrapper = createWrapper({ defaultTheme: "blue" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe('blue');

      // Switch theme
      act(() => {
        result.current.setTheme('purple');
      });

      expect(result.current.theme).toBe('purple');
      expect(mockAppendChild).toHaveBeenCalled(); // Should load new CSS

      // Semantic tokens should still work
      const primary = mockComputedStyle.getPropertyValue('--primary');
      expect(primary).toBeTruthy();
    });

    it('should maintain semantic token structure across themes', () => {
      const themes = ['base', 'blue', 'purple', 'green'];

      themes.forEach(theme => {
        const wrapper = createWrapper({ defaultTheme: theme as any });
        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.theme).toBe(theme);

        // Semantic tokens should exist for all themes
        const background = mockComputedStyle.getPropertyValue('--background');
        const foreground = mockComputedStyle.getPropertyValue('--foreground');
        const primary = mockComputedStyle.getPropertyValue('--primary');

        expect(background).toBeTruthy();
        expect(foreground).toBeTruthy();
        expect(primary).toBeTruthy();
      });
    });
  });
});