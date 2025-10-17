'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchAssetsForInterface } from '../lib/assets.js';
import { useTheme } from './ThemeProvider.js';
const AssetContext = createContext(undefined);
/**
 * Asset Provider Component
 *
 * Manages asset resolution with collection override support.
 * Fetches base theme assets and interface-specific collection assets.
 * Provides override logic: collection assets take precedence over base assets.
 */
export function AssetProvider({ children, appInterface, themeId }) {
    const [assets, setAssets] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Get theme URL to extract theme ID if not provided
    const { themeUrl } = useTheme();
    /**
     * Load assets for the current interface and theme
     */
    const loadAssets = async () => {
        if (!appInterface) {
            console.warn('AssetProvider: No appInterface provided, skipping asset loading');
            return;
        }
        // Extract theme ID from theme URL or use provided themeId
        let currentThemeId = themeId;
        if (!currentThemeId && themeUrl) {
            // Try to extract theme ID from theme URL
            const urlParams = new URLSearchParams(themeUrl.split('?')[1] || '');
            currentThemeId = urlParams.get('themeId') || undefined;
        }
        if (!currentThemeId) {
            console.warn('AssetProvider: No themeId available, skipping asset loading');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const { baseAssets, interfaceAssets } = await fetchAssetsForInterface(appInterface, currentThemeId);
            // Merge assets with interface assets taking precedence
            const mergedAssets = Object.assign({}, baseAssets);
            if (interfaceAssets) {
                Object.assign(mergedAssets, interfaceAssets);
            }
            setAssets(mergedAssets);
            console.log(`AssetProvider: Loaded ${Object.keys(mergedAssets).length} assets for interface "${appInterface}"`);
        }
        catch (err) {
            console.error('AssetProvider: Error loading assets:', err);
            setError(err instanceof Error ? err.message : 'Failed to load assets');
            setAssets({});
        }
        finally {
            setIsLoading(false);
        }
    };
    /**
     * Get resolved asset for a metaphor
     */
    const getAsset = (metaphor) => {
        return assets[metaphor] || null;
    };
    /**
     * Refetch assets
     */
    const refetch = () => {
        loadAssets();
    };
    // Load assets when dependencies change
    useEffect(() => {
        if (appInterface) {
            loadAssets();
        }
    }, [appInterface, themeId, themeUrl]);
    const contextValue = {
        assets,
        isLoading,
        error,
        getAsset,
        refetch,
    };
    return (_jsx(AssetContext.Provider, { value: contextValue, children: children }));
}
/**
 * Hook to access asset context
 */
export function useAssets() {
    const context = useContext(AssetContext);
    if (context === undefined) {
        throw new Error('useAssets must be used within an AssetProvider');
    }
    return context;
}
/**
 * Hook to get a specific asset by metaphor
 */
export function useAsset(metaphor) {
    const { getAsset, isLoading, error } = useAssets();
    const asset = getAsset(metaphor);
    return {
        asset,
        isLoading,
        error,
        hasAsset: !!asset,
    };
}
//# sourceMappingURL=AssetProvider.js.map