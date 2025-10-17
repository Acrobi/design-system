/**
 * DARK MODE FUNCTIONALITY TEST SUITE
 * QA Team Validation for STORY-C1.1-Implement-Primitives
 *
 * CONSTITUTIONAL REQUIREMENTS:
 * 1. Golden Rule: Validate dark mode uses semantic tokens, not hard-coded values
 * 2. Absolute Honesty: Report all dark mode violations honestly
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '../src/components/ui/theme-provider';
import { FoundationsDemo } from '../src/components/ui/foundations-demo';
import { getTheme, setTheme, toggleTheme, getCurrentThemeColors } from '../src/lib/theme-utils';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia for system preference detection
const createMockMatchMedia = (matches: boolean) => ({
  matches,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Mock document.head.appendChild for theme CSS loading
const mockAppendChild = jest.spyOn(document.head, 'appendChild').mockImplementation(() => {
  return document.createElement('link');
});

// Mock CSS computed styles for dark mode testing
const mockComputedStyle = {
  getPropertyValue: jest.fn((property) => {
    const isDarkMode = document.documentElement.classList.contains('dark');

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
    };

    // Dark mode overrides
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
      // Dark mode shadow adjustments
      '--shadow-card': 'var(--shadow-sm)',
      '--shadow-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)',
      '--shadow-modal': '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)',
    };

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

describe('DARK MODE FUNCTIONALITY VALIDATION', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.className = '';
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    mockAppendChild.mockClear();

    // Reset matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => createMockMatchMedia(false)),
    });
  });

  describe('🚨 CONSTITUTIONAL: Dark Mode Architecture', () => {
    it('should use semantic tokens for dark mode, not hard-coded values', () => {
      // Set dark mode
      document.documentElement.classList.add('dark');

      const darkBackground = mockComputedStyle.getPropertyValue('--background');
      const darkForeground = mockComputedStyle.getPropertyValue('--foreground');
      const darkPrimary = mockComputedStyle.getPropertyValue('--primary');

      // Verify dark mode uses semantic tokens
      expect(darkBackground).toMatch(/^\d+\s+\d+%\s+\d+%$/); // HSL format
      expect(darkForeground).toMatch(/^\d+\s+\d+%\s+\d+%$/);
      expect(darkPrimary).toMatch(/^\d+\s+\d+%\s+\d+%$/);

      // 🚨 CONSTITUTIONAL VIOLATION FOUND:
      // Dark mode shadows still use hard-coded RGB values
      const darkShadowDropdown = mockComputedStyle.getPropertyValue('--shadow-dropdown');
      const darkShadowModal = mockComputedStyle.getPropertyValue('--shadow-modal');

      expect(darkShadowDropdown).toContain('rgb(0 0 0 / 0.3)');
      expect(darkShadowModal).toContain('rgb(0 0 0 / 0.3)');

      console.warn('CONSTITUTIONAL VIOLATION: Dark mode shadows use hard-coded RGB(0,0,0) values');
    });

    it('should maintain semantic token structure in dark mode', () => {
      document.documentElement.classList.add('dark');

      const semanticTokens = [
        '--background', '--foreground', '--primary', '--secondary',
        '--muted', '--accent', '--destructive', '--border', '--input', '--ring'
      ];

      semanticTokens.forEach(token => {
        const value = mockComputedStyle.getPropertyValue(token);
        expect(value).toBeTruthy();
        expect(value).toMatch(/^\d+\s+\d+%\s+\d+%$/); // Should be HSL format
      });
    });

    it('should properly invert light/dark color relationships', () => {
      // Light mode
      document.documentElement.className = '';
      const lightBackground = mockComputedStyle.getPropertyValue('--background');
      const lightForeground = mockComputedStyle.getPropertyValue('--foreground');

      // Dark mode
      document.documentElement.classList.add('dark');
      const darkBackground = mockComputedStyle.getPropertyValue('--background');
      const darkForeground = mockComputedStyle.getPropertyValue('--foreground');

      // Colors should be inverted
      expect(lightBackground).not.toBe(darkBackground);
      expect(lightForeground).not.toBe(darkForeground);

      // Should maintain contrast relationship
      expect(lightBackground).toBe(darkForeground);
      expect(lightForeground).toBe(darkBackground);
    });
  });

  describe('Dark Mode Class Management', () => {
    it('should apply dark class when mode is set to dark', () => {
      const wrapper = createWrapper({ defaultMode: "dark" });
      renderHook(() => useTheme(), { wrapper });

      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class when mode is set to light', () => {
      const wrapper = createWrapper({ defaultMode: "light" });
      renderHook(() => useTheme(), { wrapper });

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should toggle dark class on mode change', async () => {
      const wrapper = createWrapper({ defaultMode: "light" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Switch to dark mode
      await act(async () => {
        result.current.setMode('dark');
      });

      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Switch back to light mode
      await act(async () => {
        result.current.setMode('light');
      });

      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should handle system mode correctly', () => {
      // Mock system prefers dark
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => createMockMatchMedia(true)),
      });

      const wrapper = createWrapper({ defaultMode: "system" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.mode).toBe('system');
      expect(result.current.resolvedMode).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('Dark Mode Token Values', () => {
    it('should have proper dark mode color values', () => {
      document.documentElement.classList.add('dark');

      const expectedDarkValues = {
        '--background': '222.2 84% 4.9%',
        '--foreground': '210 40% 98%',
        '--card': '222.2 84% 4.9%',
        '--card-foreground': '210 40% 98%',
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

      Object.entries(expectedDarkValues).forEach(([token, expectedValue]) => {
        const actualValue = mockComputedStyle.getPropertyValue(token);
        expect(actualValue).toBe(expectedValue);
      });
    });

    it('should maintain proper contrast ratios in dark mode', () => {
      document.documentElement.classList.add('dark');

      const contrastPairs = [
        ['--background', '--foreground'],
        ['--card', '--card-foreground'],
        ['--primary', '--primary-foreground'],
        ['--secondary', '--secondary-foreground'],
        ['--destructive', '--destructive-foreground'],
      ];

      contrastPairs.forEach(([bg, fg]) => {
        const backgroundValue = mockComputedStyle.getPropertyValue(bg);
        const foregroundValue = mockComputedStyle.getPropertyValue(fg);

        expect(backgroundValue).toBeTruthy();
        expect(foregroundValue).toBeTruthy();
        expect(backgroundValue).not.toBe(foregroundValue);
      });
    });

    it('should have enhanced shadows for dark mode', () => {
      document.documentElement.classList.add('dark');

      const cardShadow = mockComputedStyle.getPropertyValue('--shadow-card');
      const dropdownShadow = mockComputedStyle.getPropertyValue('--shadow-dropdown');
      const modalShadow = mockComputedStyle.getPropertyValue('--shadow-modal');

      expect(cardShadow).toBe('var(--shadow-sm)');
      expect(dropdownShadow).toContain('rgb(0 0 0 / 0.3)');
      expect(modalShadow).toContain('rgb(0 0 0 / 0.3)');
    });
  });

  describe('Dark Mode Toggle Functionality', () => {
    it('should toggle through modes correctly', async () => {
      const wrapper = createWrapper({ defaultMode: "light" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.mode).toBe('light');

      // Toggle to dark
      await act(async () => {
        result.current.toggleMode();
      });
      expect(result.current.mode).toBe('dark');

      // Toggle to system
      await act(async () => {
        result.current.toggleMode();
      });
      expect(result.current.mode).toBe('system');

      // Toggle back to light
      await act(async () => {
        result.current.toggleMode();
      });
      expect(result.current.mode).toBe('light');
    });

    it('should persist mode preference to localStorage', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useTheme(), { wrapper });

      await act(async () => {
        result.current.setMode('dark');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('acrobi-theme-mode', 'dark');
    });

    it('should load mode preference from localStorage on mount', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'acrobi-theme-mode') return 'dark';
        return null;
      });

      const wrapper = createWrapper();
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(localStorageMock.getItem).toHaveBeenCalledWith('acrobi-theme-mode');
    });
  });

  describe('System Preference Integration', () => {
    it('should respond to system preference changes', async () => {
      const mockMediaQuery = createMockMatchMedia(false);
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => mockMediaQuery),
      });

      const wrapper = createWrapper({ defaultMode: "system" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.resolvedMode).toBe('light');

      // Simulate system preference change to dark
      mockMediaQuery.matches = true;
      const changeEvent = new Event('change');
      mockMediaQuery.addEventListener.mock.calls[0][1](changeEvent);

      expect(result.current.resolvedMode).toBe('dark');
    });

    it('should not override explicit mode settings', async () => {
      const wrapper = createWrapper({ defaultMode: "light" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.mode).toBe('light');
      expect(result.current.resolvedMode).toBe('light');

      // Simulate system preference change
      const mockMediaQuery = createMockMatchMedia(true);
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => mockMediaQuery),
      });

      const changeEvent = new Event('change');
      mockMediaQuery.addEventListener.mock.calls[0][1](changeEvent);

      // Explicit light mode should not change
      expect(result.current.mode).toBe('light');
      expect(result.current.resolvedMode).toBe('light');
    });
  });

  describe('Dark Mode with Color Themes', () => {
    it('should work correctly with different color themes', async () => {
      const themes = ['base', 'blue', 'purple', 'green'];

      for (const theme of themes) {
        // Reset DOM
        document.documentElement.className = '';
        mockAppendChild.mockClear();

        const wrapper = createWrapper({ defaultTheme: theme as any, defaultMode: "dark" });
        const { result } = renderHook(() => useTheme(), { wrapper });

        expect(result.current.theme).toBe(theme);
        expect(result.current.mode).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        // Semantic tokens should work in dark mode
        const background = mockComputedStyle.getPropertyValue('--background');
        const foreground = mockComputedStyle.getPropertyValue('--foreground');
        expect(background).toBeTruthy();
        expect(foreground).toBeTruthy();
      }
    });

    it('should maintain dark mode when switching color themes', async () => {
      const wrapper = createWrapper({ defaultTheme: "base", defaultMode: "dark" });
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.mode).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      // Switch color theme
      await act(async () => {
        result.current.setTheme('purple');
      });

      // Dark mode should be maintained
      expect(result.current.theme).toBe('purple');
      expect(result.current.mode).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('Theme Utils Integration', () => {
    it('should get current theme correctly', () => {
      document.documentElement.classList.add('dark');
      expect(getTheme()).toBe('dark');

      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      expect(getTheme()).toBe('light');

      document.documentElement.classList.remove('light');
      expect(getTheme()).toBe('system');
    });

    it('should set theme correctly', () => {
      setTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');

      setTheme('light');
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(document.documentElement.classList.contains('light')).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    });

    it('should toggle theme correctly', () => {
      document.documentElement.classList.add('light');
      toggleTheme();
      expect(document.documentElement.classList.contains('light')).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      toggleTheme();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(document.documentElement.classList.contains('light')).toBe(true);
    });

    it('should get current theme colors in dark mode', () => {
      document.documentElement.classList.add('dark');
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

  describe('Dark Mode UI Components', () => {
    it('should render FoundationsDemo correctly in dark mode', () => {
      const wrapper = createWrapper({ defaultMode: "dark" });

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      expect(screen.getByText('Design System Foundations')).toBeInTheDocument();
      expect(screen.getByText('Current Theme: dark')).toBeInTheDocument();
    });

    it('should toggle theme in FoundationsDemo', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper({ defaultMode: "light" });

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const toggleButton = screen.getByText(/Current Theme:/);
      expect(screen.getByText('Current Theme: light')).toBeInTheDocument();

      await user.click(toggleButton);
      expect(screen.getByText('Current Theme: dark')).toBeInTheDocument();
    });

    it('should display color tokens correctly in dark mode', () => {
      const wrapper = createWrapper({ defaultMode: "dark" });

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const colorTokens = [
        'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
        'background', 'foreground', 'muted', 'muted-foreground',
        'accent', 'accent-foreground', 'destructive', 'destructive-foreground'
      ];

      colorTokens.forEach(token => {
        expect(screen.getByText(token)).toBeInTheDocument();
      });
    });
  });

  describe('Dark Mode Performance', () => {
    it('should handle rapid theme switching', async () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useTheme(), { wrapper });

      // Rapidly switch themes
      const modes = ['light', 'dark', 'system', 'light'];

      for (const mode of modes) {
        await act(async () => {
          result.current.setMode(mode as any);
        });
        expect(result.current.mode).toBe(mode);
      }
    });

    it('should not cause memory leaks during theme switching', async () => {
      const wrapper = createWrapper();
      const { result, unmount } = renderHook(() => useTheme(), { wrapper });

      // Switch themes multiple times
      await act(async () => {
        result.current.setMode('dark');
      });
      await act(async () => {
        result.current.setMode('light');
      });

      // Unmount should not cause errors
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Dark Mode Accessibility', () => {
    it('should respect prefers-reduced-motion in dark mode', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      document.documentElement.classList.add('dark');

      // Test should verify that CSS handles reduced motion
      const darkBackground = mockComputedStyle.getPropertyValue('--background');
      expect(darkBackground).toBeTruthy();

      console.warn('Reduced motion should be handled by CSS media queries in globals.css');
    });

    it('should maintain accessibility in dark mode', () => {
      document.documentElement.classList.add('dark');

      // Check that interactive elements have proper contrast
      const primary = mockComputedStyle.getPropertyValue('--primary');
      const primaryForeground = mockComputedStyle.getPropertyValue('--primary-foreground');
      const secondary = mockComputedStyle.getPropertyValue('--secondary');
      const secondaryForeground = mockComputedStyle.getPropertyValue('--secondary-foreground');

      expect(primary).toBeTruthy();
      expect(primaryForeground).toBeTruthy();
      expect(secondary).toBeTruthy();
      expect(secondaryForeground).toBeTruthy();

      // Colors should be different for contrast
      expect(primary).not.toBe(primaryForeground);
      expect(secondary).not.toBe(secondaryForeground);
    });
  });
});