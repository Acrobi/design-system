import { type ReactNode } from 'react';
import { type AssetMap } from '../lib/assets.js';
interface AssetContextValue {
    assets: AssetMap;
    isLoading: boolean;
    error: string | null;
    getAsset: (metaphor: string) => {
        url: string;
        type: string;
        filename: string;
    } | null;
    refetch: () => void;
}
interface AssetProviderProps {
    children: ReactNode;
    appInterface?: string;
    themeId?: string;
}
/**
 * Asset Provider Component
 *
 * Manages asset resolution with collection override support.
 * Fetches base theme assets and interface-specific collection assets.
 * Provides override logic: collection assets take precedence over base assets.
 */
export declare function AssetProvider({ children, appInterface, themeId }: AssetProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access asset context
 */
export declare function useAssets(): AssetContextValue;
/**
 * Hook to get a specific asset by metaphor
 */
export declare function useAsset(metaphor: string): {
    asset: {
        url: string;
        type: string;
        filename: string;
    } | null;
    isLoading: boolean;
    error: string | null;
    hasAsset: boolean;
};
export {};
//# sourceMappingURL=AssetProvider.d.ts.map