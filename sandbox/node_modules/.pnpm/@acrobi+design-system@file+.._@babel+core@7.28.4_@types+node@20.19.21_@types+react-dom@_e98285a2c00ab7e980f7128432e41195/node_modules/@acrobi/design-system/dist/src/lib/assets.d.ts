/**
 * Asset API utilities for fetching collections and interface-specific assets
 */
export interface Asset {
    id: string;
    url: string;
    type: string;
    filename: string;
    size?: number;
    mimeType?: string;
    metaphorId: string;
    createdAt: string;
    updatedAt: string;
}
export interface Metaphor {
    id: string;
    name: string;
    description?: string;
    assets: Asset[];
    createdAt: string;
    updatedAt: string;
}
export interface Collection {
    id: string;
    name: string;
    description?: string;
    assets: Array<{
        id: string;
        asset: Asset;
        createdAt: string;
    }>;
    createdAt: string;
    updatedAt: string;
}
export interface AppInterfaceTheme {
    id: string;
    interfaceName: string;
    themeId: string;
    collectionId?: string;
    collection?: Collection;
    createdAt: string;
    updatedAt: string;
}
export interface AssetMap {
    [metaphorName: string]: {
        url: string;
        type: string;
        filename: string;
    };
}
/**
 * Fetch assets for a specific interface and theme
 */
export declare function fetchAssetsForInterface(interfaceName: string, themeId: string): Promise<{
    baseAssets: AssetMap;
    interfaceAssets?: AssetMap;
}>;
/**
 * Get the resolved asset URL with collection override logic
 */
export declare function getResolvedAsset(metaphorName: string, baseAssets: AssetMap, interfaceAssets?: AssetMap): {
    url: string;
    type: string;
    filename: string;
} | null;
//# sourceMappingURL=assets.d.ts.map