'use client';
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAsset } from './AssetProvider.js';
import { cn } from '../lib/utils.js';
/**
 * Universal Asset Component
 *
 * Renders assets based on metaphor with collection override support.
 * Automatically determines the appropriate tag based on asset type.
 */
export function Asset({ metaphor, className, alt, width, height, fallback, onLoad, onError, }) {
    const { asset, isLoading, error, hasAsset } = useAsset(metaphor);
    // Loading state
    if (isLoading) {
        return (_jsx("div", { className: cn('animate-pulse bg-muted rounded', 'flex items-center justify-center', className), style: { width, height }, role: "img", "aria-label": `Loading ${metaphor}`, children: _jsx("div", { className: "w-4 h-4 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" }) }));
    }
    // Error state
    if (error || !hasAsset) {
        if (fallback) {
            return _jsx(_Fragment, { children: fallback });
        }
        return (_jsx("div", { className: cn('bg-muted border border-dashed border-muted-foreground/25 rounded', 'flex items-center justify-center text-muted-foreground text-sm', className), style: { width, height }, role: "img", "aria-label": `Missing ${metaphor}`, title: error ? `Error: ${error}` : `No asset found for "${metaphor}"`, children: _jsx("span", { className: "text-xs", children: "?" }) }));
    }
    // Determine the appropriate tag based on asset type
    const { url, type, filename } = asset;
    // SVG assets - use img tag for consistency
    if (type === 'svg' || filename.endsWith('.svg')) {
        return (_jsx("img", { src: url, alt: alt || metaphor, className: className, width: width, height: height, onLoad: onLoad, onError: onError, style: { width, height } }));
    }
    // Image assets (png, jpg, webp, etc.)
    if (type === 'image' || /\.(png|jpe?g|webp|gif|avif)$/i.test(filename)) {
        return (_jsx("img", { src: url, alt: alt || metaphor, className: cn('object-contain', className), width: width, height: height, onLoad: onLoad, onError: onError, style: { width, height } }));
    }
    // Icon assets - try to render as img first, fallback to div
    if (type === 'icon') {
        return (_jsx("img", { src: url, alt: alt || metaphor, className: cn('inline-block', className), width: width || 24, height: height || 24, onLoad: onLoad, onError: (e) => {
                // If img fails, try to load as SVG inline
                if (filename && filename.endsWith('.svg') && url) {
                    fetchSvgInline(url, alt || metaphor || 'asset', className, width || 24, height || 24);
                }
                onError === null || onError === void 0 ? void 0 : onError();
            } }));
    }
    // Default fallback for unknown types
    return (_jsx("img", { src: url, alt: alt || metaphor, className: className, width: width, height: height, onLoad: onLoad, onError: onError, style: { width, height } }));
}
/**
 * Helper function to load SVG inline (fallback for icon rendering)
 */
function fetchSvgInline(url, alt, className, width, height) {
    fetch(url)
        .then(response => response.text())
        .then(svgContent => {
        // Create a temporary div to parse SVG
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgContent;
        const svg = tempDiv.querySelector('svg');
        if (svg) {
            // Apply attributes to the SVG
            svg.setAttribute('alt', alt);
            svg.setAttribute('role', 'img');
            svg.className.baseVal.add(className);
            svg.setAttribute('width', String(width));
            svg.setAttribute('height', String(height));
            // Replace the image element with the SVG
            const img = document.querySelector(`img[src="${url}"]`);
            if (img && img.parentNode) {
                img.parentNode.replaceChild(svg, img);
            }
        }
    })
        .catch(error => {
        console.error('Failed to load SVG inline:', error);
    });
}
/**
 * Asset component with built-in loading skeleton
 */
export function AssetWithSkeleton(props) {
    return (_jsx("div", { className: "relative", children: _jsx(Asset, Object.assign({}, props)) }));
}
/**
 * Simple asset component that returns null if no asset found
 */
export function OptionalAsset(props) {
    const { hasAsset } = useAsset(props.metaphor);
    if (!hasAsset) {
        return null;
    }
    return _jsx(Asset, Object.assign({}, props));
}
//# sourceMappingURL=Asset.js.map