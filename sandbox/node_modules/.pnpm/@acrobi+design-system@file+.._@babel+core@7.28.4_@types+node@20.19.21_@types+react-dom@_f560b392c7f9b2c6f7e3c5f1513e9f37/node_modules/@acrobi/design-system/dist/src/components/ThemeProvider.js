'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(undefined);
/**
 * Dynamic ThemeProvider Component
 *
 * Manages the application of dynamic themes from a remote URL.
 * Automatically injects stylesheet links and handles loading states.
 */
export function ThemeProvider({ children, themeUrl, fallbackUrl }) {
    const [currentThemeUrl, setCurrentThemeUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    /**
     * Load theme CSS from URL
     */
    const loadTheme = async (url) => {
        if (!url) {
            console.warn('ThemeProvider: No theme URL provided');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Remove any existing theme stylesheet
            const existingLink = document.querySelector('link[data-acrobi-theme]');
            if (existingLink) {
                existingLink.remove();
            }
            // Create new stylesheet link
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.setAttribute('data-acrobi-theme', 'true');
            // Add error handling
            link.onerror = () => {
                console.error(`ThemeProvider: Failed to load theme from ${url}`);
                if (fallbackUrl && url !== fallbackUrl) {
                    console.log(`ThemeProvider: Trying fallback URL: ${fallbackUrl}`);
                    loadTheme(fallbackUrl);
                }
                else {
                    setError(`Failed to load theme from ${url}`);
                    setIsLoading(false);
                }
            };
            link.onload = () => {
                console.log(`ThemeProvider: Successfully loaded theme from ${url}`);
                setCurrentThemeUrl(url);
                setIsLoading(false);
                setError(null);
            };
            // Inject into document head
            document.head.appendChild(link);
        }
        catch (err) {
            console.error('ThemeProvider: Error loading theme:', err);
            setError(`Error loading theme: ${err instanceof Error ? err.message : 'Unknown error'}`);
            setIsLoading(false);
        }
    };
    /**
     * Reload the current theme
     */
    const reloadTheme = () => {
        if (currentThemeUrl) {
            loadTheme(currentThemeUrl);
        }
        else if (themeUrl) {
            loadTheme(themeUrl);
        }
    };
    // Load theme when component mounts or themeUrl changes
    useEffect(() => {
        if (themeUrl) {
            loadTheme(themeUrl);
        }
    }, [themeUrl]);
    const contextValue = {
        themeUrl: currentThemeUrl,
        isLoading,
        error,
        reloadTheme,
    };
    return (_jsx(ThemeContext.Provider, { value: contextValue, children: children }));
}
/**
 * Hook to access theme context
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
/**
 * Component to display theme loading/error states
 */
export function ThemeStatus() {
    const { isLoading, error, themeUrl } = useTheme();
    if (isLoading) {
        return (_jsxs("div", { className: "text-sm text-muted-foreground", children: ["Loading theme from: ", themeUrl, "..."] }));
    }
    if (error) {
        return (_jsxs("div", { className: "text-sm text-destructive", children: ["Theme error: ", error] }));
    }
    if (themeUrl) {
        return (_jsxs("div", { className: "text-sm text-muted-foreground", children: ["Theme loaded from: ", themeUrl] }));
    }
    return null;
}
/**
 * Hook to load theme from acrobi.config.json
 */
export function useConfigTheme() {
    const [config, setConfig] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadConfig = async () => {
            try {
                const response = await fetch('/acrobi.config.json');
                if (!response.ok) {
                    throw new Error(`Failed to load config: ${response.statusText}`);
                }
                const configData = await response.json();
                setConfig(configData);
                setError(null);
            }
            catch (err) {
                console.error('Error loading acrobi.config.json:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setConfig(null);
            }
            finally {
                setIsLoading(false);
            }
        };
        loadConfig();
    }, []);
    return { config, isLoading, error };
}
//# sourceMappingURL=ThemeProvider.js.map