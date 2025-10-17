import React from 'react';
interface AssetProps {
    metaphor: string;
    className?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    fallback?: React.ReactNode;
    onLoad?: () => void;
    onError?: () => void;
}
/**
 * Universal Asset Component
 *
 * Renders assets based on metaphor with collection override support.
 * Automatically determines the appropriate tag based on asset type.
 */
export declare function Asset({ metaphor, className, alt, width, height, fallback, onLoad, onError, }: AssetProps): import("react/jsx-runtime").JSX.Element;
/**
 * Asset component with built-in loading skeleton
 */
export declare function AssetWithSkeleton(props: AssetProps): import("react/jsx-runtime").JSX.Element;
/**
 * Simple asset component that returns null if no asset found
 */
export declare function OptionalAsset(props: AssetProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=Asset.d.ts.map