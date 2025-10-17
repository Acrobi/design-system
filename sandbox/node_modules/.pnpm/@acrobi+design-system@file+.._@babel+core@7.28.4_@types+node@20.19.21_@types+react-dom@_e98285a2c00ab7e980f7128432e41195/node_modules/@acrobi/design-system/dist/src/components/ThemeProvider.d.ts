import { type ReactNode } from 'react';
interface ThemeContextValue {
    themeUrl: string | null;
    isLoading: boolean;
    error: string | null;
    reloadTheme: () => void;
}
interface ThemeProviderProps {
    children: ReactNode;
    themeUrl?: string;
    fallbackUrl?: string;
}
/**
 * Dynamic ThemeProvider Component
 *
 * Manages the application of dynamic themes from a remote URL.
 * Automatically injects stylesheet links and handles loading states.
 */
export declare function ThemeProvider({ children, themeUrl, fallbackUrl }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access theme context
 */
export declare function useTheme(): ThemeContextValue;
/**
 * Component to display theme loading/error states
 */
export declare function ThemeStatus(): import("react/jsx-runtime").JSX.Element | null;
/**
 * Hook to load theme from acrobi.config.json
 */
export declare function useConfigTheme(): {
    config: {
        themeUrl?: string;
    } | null;
    isLoading: boolean;
    error: string | null;
};
export {};
//# sourceMappingURL=ThemeProvider.d.ts.map