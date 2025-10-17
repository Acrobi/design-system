import * as React from "react";
type Mode = "light" | "dark" | "system";
type ColorTheme = "base" | "blue" | "purple" | "green" | "orange" | "red";
interface ThemeProviderProps {
    children: React.ReactNode;
    defaultMode?: Mode;
    defaultTheme?: ColorTheme;
    modeStorageKey?: string;
    themeStorageKey?: string;
    enableSystem?: boolean;
}
interface ThemeContextType {
    mode: Mode;
    setMode: (mode: Mode) => void;
    resolvedMode: "light" | "dark";
    toggleMode: () => void;
    theme: ColorTheme;
    setTheme: (theme: ColorTheme) => void;
    toggleTheme: () => void;
}
export declare function ThemeProvider({ children, defaultMode, defaultTheme, modeStorageKey, themeStorageKey, enableSystem, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useTheme(): ThemeContextType;
export {};
//# sourceMappingURL=theme-provider.d.ts.map