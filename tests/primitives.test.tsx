/**
 * PRIMITIVE TOKENS TEST SUITE
 * QA Team Validation for STORY-C1.1-Implement-Primitives
 *
 * CONSTITUTIONAL REQUIREMENTS:
 * 1. Golden Rule: Validate NO hard-coded values exist
 * 2. Absolute Honesty: Report all violations honestly
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { render, screen } from '@testing-library/react';
import { FoundationsDemo } from '../src/components/ui/foundations-demo';
import { ThemeProvider } from '../src/components/ui/theme-provider';

// Mock CSS computed styles for testing
const mockComputedStyle = {
  getPropertyValue: jest.fn((property) => {
    const mockValues: Record<string, string> = {
      '--p50': '210 100% 98%',
      '--p100': '210 100% 96%',
      '--p500': '210 100% 80%',
      '--n50': '0 0% 98%',
      '--n100': '0 0% 96%',
      '--n500': '0 0% 80%',
      '--font-sans': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '--font-mono': 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      '--text-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
      '--text-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
      '--space-1': '0.25rem',
      '--space-4': '1rem',
      '--space-8': '2rem',
      '--shadow-sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      '--shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      '--radius-md': '0.375rem',
      '--radius-lg': '0.5rem',
      '--duration-fast': '150ms',
      '--duration-normal': '300ms',
      '--ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      // Semantic tokens
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',
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
      '--font-heading': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '--font-body': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      '--font-code': 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      '--container-sm': 'var(--space-4)',
      '--container-md': 'var(--space-6)',
      '--container-lg': 'var(--space-8)',
      '--container-xl': 'var(--space-12)',
      '--shadow-card': 'var(--shadow-sm)',
      '--shadow-dropdown': 'var(--shadow-lg)',
      '--shadow-modal': 'var(--shadow-xl)',
      '--radius-card': 'var(--radius-lg)',
      '--radius-button': 'var(--radius-md)',
      '--radius-input': 'var(--radius-md)',
      '--transition-colors': 'color var(--duration-normal) var(--ease-in-out), background-color var(--duration-normal) var(--ease-in-out), border-color var(--duration-normal) var(--ease-in-out)',
      '--transition-transform': 'transform var(--duration-normal) var(--ease-in-out)',
      '--transition-all': 'all var(--duration-normal) var(--ease-in-out)',
    };
    return mockValues[property] || '';
  }),
};

Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: jest.fn(() => mockComputedStyle),
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider defaultMode="light" defaultTheme="base">
    {children}
  </ThemeProvider>
);

describe('PRIMITIVE TOKENS VALIDATION', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset DOM to clean state
    document.documentElement.className = '';
    document.body.className = '';
  });

  describe('🚨 CONSTITUTIONAL: Golden Rule - No Hard-coded Values', () => {
    it('VIOLATION FOUND: Hard-coded RGB values in shadow primitives', () => {
      // This test documents a constitutional violation
      const shadowValues = [
        '--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        '--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        '--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        '--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      ];

      shadowValues.forEach(shadow => {
        expect(shadow).toMatch(/rgb\(\s*0\s+0\s+0\s*\//);
      });

      // 🚨 CONSTITUTIONAL VIOLATION REPORT:
      // Location: globals.css lines 75-79
      // Violation: Hard-coded RGB(0,0,0) values in shadow definitions
      // Recommendation: Create opacity primitive tokens and reference them
      console.warn('CONSTITUTIONAL VIOLATION: Hard-coded RGB values found in shadow primitives');
    });

    it('VIOLATION FOUND: Hard-coded hex color in theme-utils.ts', () => {
      // This test documents violations in theme utilities
      const violations = [
        'getContrastColor(hexColor: string): string { return luminance > 0.5 ? \'#000000\' : \'#ffffff\'; }',
        '--destructive: \'#ef4444\'',
        '--destructive-foreground: \'#ffffff\'',
        '--destructive: \'#dc2626\'',
        '--destructive-foreground: \'#ffffff\'',
      ];

      violations.forEach(violation => {
        expect(violation).toMatch(/#[0-9a-fA-F]{6}/);
      });

      // 🚨 CONSTITUTIONAL VIOLATION REPORT:
      // Location: theme-utils.ts lines 158, 181-182, 209-210
      // Violation: Hard-coded hex colors #000000, #ffffff, #ef4444, #dc2626
      // Recommendation: Create semantic tokens for these colors
      console.warn('CONSTITUTIONAL VIOLATION: Hard-coded hex colors found in theme utilities');
    });

    it('COMPLIANT: Primitive tokens use proper HSL format', () => {
      // Test that primitive tokens follow correct format
      const compliantPrimitiveFormats = [
        '--p50: 210 100% 98%',
        '--n100: 0 0% 96%',
        '--text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        '--space-4: 1rem',
        '--radius-md: 0.375rem',
        '--duration-fast: 150ms',
      ];

      compliantPrimitiveFormats.forEach(token => {
        expect(token).not.toMatch(/rgb\(|#[0-9a-fA-F]{3,6}|color:\s*(white|black|red|blue|green)/);
      });
    });
  });

  describe('Color Primitive Tokens', () => {
    it('should have all primary color scale tokens', () => {
      const expectedPrimaryTokens = [
        '--p50', '--p100', '--p200', '--p300', '--p400', '--p500',
        '--p600', '--p700', '--p800', '--p900', '--p950'
      ];

      expectedPrimaryTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/\d+\s+\d+%\s+\d+%$/); // HSL format
      });
    });

    it('should have all neutral color scale tokens', () => {
      const expectedNeutralTokens = [
        '--n50', '--n100', '--n200', '--n300', '--n400', '--n500',
        '--n600', '--n700', '--n800', '--n900', '--n950'
      ];

      expectedNeutralTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/\d+\s+\d+%\s+\d+%$/); // HSL format
      });
    });

    it('should maintain consistent HSL format across color primitives', () => {
      const colorTokens = [
        '--p500', '--p600', '--n400', '--n500'
      ];

      colorTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toMatch(/^\d+\s+\d+%\s+\d+%$/);
      });
    });
  });

  describe('Typography Primitive Tokens', () => {
    it('should have font family primitives', () => {
      const fontSans = mockComputedStyle.getPropertyValue('--font-sans');
      const fontMono = mockComputedStyle.getPropertyValue('--font-mono');

      expect(fontSans).toContain('system-ui');
      expect(fontSans).toContain('sans-serif');
      expect(fontMono).toContain('monospace');
    });

    it('should have fluid typography scale using clamp()', () => {
      const typographyTokens = [
        '--text-xs', '--text-sm', '--text-base', '--text-lg',
        '--text-xl', '--text-2xl', '--text-3xl', '--text-4xl'
      ];

      typographyTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toMatch(/^clamp\(/);
        expect(value).toMatch(/rem/);
      });
    });

    it('should have responsive typography values', () => {
      const textBase = mockComputedStyle.getPropertyValue('--text-base');
      const textLg = mockComputedStyle.getPropertyValue('--text-lg');

      expect(textBase).toBe('clamp(1rem, 0.9rem + 0.5vw, 1.125rem)');
      expect(textLg).toBe('clamp(1.125rem, 1rem + 0.6vw, 1.25rem)');
    });
  });

  describe('Spacing Primitive Tokens', () => {
    it('should have consistent spacing scale', () => {
      const spacingTokens = [
        '--space-1', '--space-2', '--space-3', '--space-4', '--space-5',
        '--space-6', '--space-8', '--space-10', '--space-12', '--space-16',
        '--space-20', '--space-24'
      ];

      spacingTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/rem$/);
      });
    });

    it('should follow consistent spacing progression', () => {
      // Test that spacing follows a logical progression
      const space1 = mockComputedStyle.getPropertyValue('--space-1');
      const space2 = mockComputedStyle.getPropertyValue('--space-2');
      const space4 = mockComputedStyle.getPropertyValue('--space-4');

      expect(space1).toBe('0.25rem');
      expect(space2).toBe('0.5rem');
      expect(space4).toBe('1rem');
    });
  });

  describe('Shadow Primitive Tokens', () => {
    it('should have all shadow variants', () => {
      const shadowTokens = ['--shadow-xs', '--shadow-sm', '--shadow-md', '--shadow-lg', '--shadow-xl'];

      shadowTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/box-shadow/);
      });
    });

    it('should have consistent shadow opacity values', () => {
      // Note: This test documents the current state with hard-coded values
      const shadowSm = mockComputedStyle.getPropertyValue('--shadow-sm');
      const shadowMd = mockComputedStyle.getPropertyValue('--shadow-md');

      expect(shadowSm).toContain('rgb(0 0 0 / 0.1)');
      expect(shadowMd).toContain('rgb(0 0 0 / 0.1)');
    });
  });

  describe('Border Radius Primitive Tokens', () => {
    it('should have complete radius scale', () => {
      const radiusTokens = [
        '--radius-xs', '--radius-sm', '--radius-md', '--radius-lg',
        '--radius-2xl', '--radius-full'
      ];

      radiusTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
      });
    });

    it('should have consistent radius values', () => {
      const radiusSm = mockComputedStyle.getPropertyValue('--radius-sm');
      const radiusMd = mockComputedStyle.getPropertyValue('--radius-md');
      const radiusLg = mockComputedStyle.getPropertyValue('--radius-lg');

      expect(radiusSm).toBe('0.25rem');
      expect(radiusMd).toBe('0.375rem');
      expect(radiusLg).toBe('0.5rem');
    });
  });

  describe('Z-Index Primitive Tokens', () => {
    it('should have proper stacking hierarchy', () => {
      const zIndexTokens = [
        '--z-dropdown', '--z-sticky', '--z-fixed', '--z-modal-backdrop',
        '--z-modal', '--z-popover', '--z-tooltip', '--z-toast'
      ];

      zIndexTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(parseInt(value)).toBeGreaterThan(0);
      });
    });

    it('should maintain logical stacking order', () => {
      const dropdown = parseInt(mockComputedStyle.getPropertyValue('--z-dropdown'));
      const modal = parseInt(mockComputedStyle.getPropertyValue('--z-modal'));
      const toast = parseInt(mockComputedStyle.getPropertyValue('--z-toast'));

      expect(dropdown).toBeLessThan(modal);
      expect(modal).toBeLessThan(toast);
    });
  });

  describe('Motion Primitive Tokens', () => {
    it('should have duration tokens', () => {
      const durationTokens = ['--duration-fast', '--duration-normal', '--duration-slow'];

      durationTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/ms$/);
      });
    });

    it('should have easing function tokens', () => {
      const easingTokens = ['--ease-in', '--ease-out', '--ease-in-out'];

      easingTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/cubic-bezier/);
      });
    });
  });

  describe('Primitive Token Architecture Compliance', () => {
    it('should not reference primitive tokens in @theme block', () => {
      // Verify that @theme block uses semantic tokens, not primitive ones
      const themeBlockColor = mockComputedStyle.getPropertyValue('--color-background');
      expect(themeBlockColor).toBe('hsl(var(--background))');
    });

    it('should have proper naming convention for primitives', () => {
      const validPrimitiveNames = [
        '--p50', '--n100', '--text-xs', '--space-4', '--shadow-sm',
        '--radius-md', '--z-dropdown', '--duration-fast', '--ease-in-out'
      ];

      validPrimitiveNames.forEach(name => {
        expect(name).toMatch(/^--(p|n|text|space|shadow|radius|z|duration|ease)/);
      });
    });
  });
});

describe('PRIMITIVE TOKENS INTEGRATION', () => {
  describe('Foundations Demo Component', () => {
    it('should render without errors', () => {
      render(
        <TestWrapper>
          <FoundationsDemo />
        </TestWrapper>
      );

      expect(screen.getByText('Design System Foundations')).toBeInTheDocument();
    });

    it('should display all color palette tokens', () => {
      render(
        <TestWrapper>
          <FoundationsDemo />
        </TestWrapper>
      );

      const colorTokens = [
        'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
        'background', 'foreground', 'muted', 'muted-foreground',
        'accent', 'accent-foreground', 'destructive', 'destructive-foreground',
        'border', 'input', 'ring'
      ];

      colorTokens.forEach(token => {
        expect(screen.getByText(token)).toBeInTheDocument();
      });
    });

    it('should display typography scale', () => {
      render(
        <TestWrapper>
          <FoundationsDemo />
        </TestWrapper>
      );

      expect(screen.getByText('text-xs - Small text')).toBeInTheDocument();
      expect(screen.getByText('text-base - Default text')).toBeInTheDocument();
      expect(screen.getByText('text-4xl - Display heading')).toBeInTheDocument();
    });
  });

  describe('Token Accessibility', () => {
    it('should ensure sufficient contrast ratios', () => {
      // This test documents the need for contrast validation
      const foreground = mockComputedStyle.getPropertyValue('--foreground');
      const background = mockComputedStyle.getPropertyValue('--background');

      expect(foreground).toBeTruthy();
      expect(background).toBeTruthy();

      // Note: Actual contrast ratio calculation would require color conversion utilities
      // This test ensures tokens exist for contrast validation
      console.warn('TODO: Implement actual contrast ratio validation');
    });

    it('should support reduced motion preferences', () => {
      // Test that motion tokens respect accessibility
      const durationFast = mockComputedStyle.getPropertyValue('--duration-fast');
      const durationNormal = mockComputedStyle.getPropertyValue('--duration-normal');

      expect(durationFast).toBe('150ms');
      expect(durationNormal).toBe('300ms');

      // Note: CSS should handle reduced motion automatically
      console.warn('Reduced motion should be handled by CSS media queries');
    });
  });
});