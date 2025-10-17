import { renderHook } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../theme-provider';
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
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
describe('ThemeProvider', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        // Reset DOM
        document.documentElement.className = '';
        // Remove any existing theme links
        const existingLinks = document.querySelectorAll('link[data-theme-css]');
        existingLinks.forEach(link => link.remove());
    });
    describe('Theme Context', () => {
        it('provides default theme values', () => {
            const wrapper = ({ children }) => (<ThemeProvider defaultMode="light" defaultTheme="base">
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            expect(result.current.mode).toBe('light');
            expect(result.current.theme).toBe('base');
            expect(result.current.resolvedMode).toBe('light');
        });
        it('throws error when useTheme is used outside provider', () => {
            var _a;
            const { result } = renderHook(() => useTheme());
            expect(result.error).toBeInstanceOf(Error);
            expect((_a = result.error) === null || _a === void 0 ? void 0 : _a.message).toBe('useTheme must be used within a ThemeProvider');
        });
    });
    describe('Mode Management', () => {
        it('initializes mode from localStorage', () => {
            localStorageMock.getItem.mockImplementation((key) => {
                if (key === 'acrobi-theme-mode')
                    return 'dark';
                return null;
            });
            const wrapper = ({ children }) => (<ThemeProvider>
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            expect(localStorageMock.getItem).toHaveBeenCalledWith('acrobi-theme-mode');
        });
        it('sets mode and persists to localStorage', () => {
            const wrapper = ({ children }) => (<ThemeProvider>
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            result.current.setMode('dark');
            expect(localStorageMock.setItem).toHaveBeenCalledWith('acrobi-theme-mode', 'dark');
        });
        it('toggles through modes correctly', () => {
            const wrapper = ({ children }) => (<ThemeProvider defaultMode="light">
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            expect(result.current.mode).toBe('light');
            result.current.toggleMode();
            expect(result.current.mode).toBe('dark');
            result.current.toggleMode();
            expect(result.current.mode).toBe('system');
            result.current.toggleMode();
            expect(result.current.mode).toBe('light');
        });
    });
    describe('Theme Management', () => {
        it('initializes theme from localStorage', () => {
            localStorageMock.getItem.mockImplementation((key) => {
                if (key === 'acrobi-color-theme')
                    return 'purple';
                return null;
            });
            const wrapper = ({ children }) => (<ThemeProvider>
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            expect(localStorageMock.getItem).toHaveBeenCalledWith('acrobi-color-theme');
        });
        it('sets theme and persists to localStorage', () => {
            const wrapper = ({ children }) => (<ThemeProvider>
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            result.current.setTheme('blue');
            expect(localStorageMock.setItem).toHaveBeenCalledWith('acrobi-color-theme', 'blue');
        });
        it('toggles through themes correctly', () => {
            const wrapper = ({ children }) => (<ThemeProvider defaultTheme="base">
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            const themes = ['base', 'blue', 'purple', 'green', 'orange', 'red'];
            themes.forEach((expectedTheme, index) => {
                expect(result.current.theme).toBe(expectedTheme);
                if (index < themes.length - 1) {
                    result.current.toggleTheme();
                }
            });
        });
    });
    describe('Dark Mode Application', () => {
        it('applies dark class to document element', () => {
            const wrapper = ({ children }) => (<ThemeProvider defaultMode="dark">
          {children}
        </ThemeProvider>);
            renderHook(() => useTheme(), { wrapper });
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });
        it('removes dark class for light mode', () => {
            const wrapper = ({ children }) => (<ThemeProvider defaultMode="light">
          {children}
        </ThemeProvider>);
            renderHook(() => useTheme(), { wrapper });
            expect(document.documentElement.classList.contains('dark')).toBe(false);
        });
        it('respects system preference when mode is system', () => {
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
            const wrapper = ({ children }) => (<ThemeProvider defaultMode="system" enableSystem={true}>
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            expect(result.current.resolvedMode).toBe('dark');
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });
    });
    describe('Color Theme CSS Loading', () => {
        // Mock document.head.appendChild
        const mockAppendChild = jest.spyOn(document.head, 'appendChild').mockImplementation();
        afterEach(() => {
            mockAppendChild.mockClear();
        });
        it('does not load CSS for base theme', () => {
            const wrapper = ({ children }) => (<ThemeProvider defaultTheme="base">
          {children}
        </ThemeProvider>);
            renderHook(() => useTheme(), { wrapper });
            expect(mockAppendChild).not.toHaveBeenCalled();
        });
        it('loads CSS for non-base themes', () => {
            const wrapper = ({ children }) => (<ThemeProvider defaultTheme="blue">
          {children}
        </ThemeProvider>);
            renderHook(() => useTheme(), { wrapper });
            expect(mockAppendChild).toHaveBeenCalled();
            const createdLink = mockAppendChild.mock.calls[0][0];
            expect(createdLink.tagName).toBe('LINK');
            expect(createdLink.rel).toBe('stylesheet');
            expect(createdLink.href).toContain('/themes/blue.css');
            expect(createdLink.getAttribute('data-theme-css')).toBe('blue');
        });
    });
    describe('TypeScript Type Safety', () => {
        it('enforces correct mode types', () => {
            const wrapper = ({ children }) => (<ThemeProvider>
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            // These should not cause TypeScript errors
            const validModes = ['light', 'dark', 'system'];
            validModes.forEach(mode => {
                result.current.setMode(mode);
            });
        });
        it('enforces correct theme types', () => {
            const wrapper = ({ children }) => (<ThemeProvider>
          {children}
        </ThemeProvider>);
            const { result } = renderHook(() => useTheme(), { wrapper });
            // These should not cause TypeScript errors
            const validThemes = ['base', 'blue', 'purple', 'green', 'orange', 'red'];
            validThemes.forEach(theme => {
                result.current.setTheme(theme);
            });
        });
    });
});
//# sourceMappingURL=theme-provider.test.jsx.map