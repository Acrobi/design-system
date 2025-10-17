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
export async function fetchAssetsForInterface(
  interfaceName: string,
  themeId: string
): Promise<{ baseAssets: AssetMap; interfaceAssets?: AssetMap }> {
  try {
    // Fetch interface theme configuration
    const appInterfaceThemeResponse = await fetch(
      `/api/app-interface-themes?interfaceName=${interfaceName}&themeId=${themeId}`
    );

    if (!appInterfaceThemeResponse.ok) {
      throw new Error(`Failed to fetch interface theme: ${appInterfaceThemeResponse.statusText}`);
    }

    const appInterfaceThemes: AppInterfaceTheme[] = await appInterfaceThemeResponse.json();

    // Get base theme assets (all metaphors with their default assets)
    const metaphorsResponse = await fetch('/api/metaphors');
    if (!metaphorsResponse.ok) {
      throw new Error(`Failed to fetch metaphors: ${metaphorsResponse.statusText}`);
    }

    const metaphors: Metaphor[] = await metaphorsResponse.json();

    // Build base asset map
    const baseAssets: AssetMap = {};
    metaphors.forEach(metaphor => {
      if (metaphor.assets.length > 0) {
        // Use the first asset for each metaphor
        const asset = metaphor.assets[0];
        baseAssets[metaphor.name] = {
          url: asset.url,
          type: asset.type,
          filename: asset.filename,
        };
      }
    });

    // Build interface asset map if collection exists
    let interfaceAssets: AssetMap | undefined;
    const interfaceTheme = appInterfaceThemes[0]; // There should be only one per interface/theme

    if (interfaceTheme?.collection) {
      interfaceAssets = {};
      interfaceTheme.collection.assets.forEach(({ asset }) => {
        // Find the metaphor name for this asset
        const metaphor = metaphors.find(m => m.id === asset.metaphorId);
        if (metaphor) {
          if (interfaceAssets && metaphor) {
            interfaceAssets[metaphor.name] = {
              url: asset.url,
              type: asset.type,
              filename: asset.filename,
            };
          }
        }
      });
    }

    return { baseAssets, interfaceAssets };
  } catch (error) {
    console.error('Error fetching assets for interface:', error);
    throw error;
  }
}

/**
 * Get the resolved asset URL with collection override logic
 */
export function getResolvedAsset(
  metaphorName: string,
  baseAssets: AssetMap,
  interfaceAssets?: AssetMap
): { url: string; type: string; filename: string } | null {
  // Check interface assets first (collection override)
  if (interfaceAssets && interfaceAssets[metaphorName]) {
    return interfaceAssets[metaphorName];
  }

  // Fallback to base theme assets
  if (baseAssets[metaphorName]) {
    return baseAssets[metaphorName];
  }

  // No asset found
  return null;
}