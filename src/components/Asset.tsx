'use client';

import React from 'react';
import { useAsset } from './AssetProvider.js';
import { cn } from '../lib/utils.js';

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
export function Asset({
  metaphor,
  className,
  alt,
  width,
  height,
  fallback,
  onLoad,
  onError,
}: AssetProps) {
  const { asset, isLoading, error, hasAsset } = useAsset(metaphor);

  // Loading state
  if (isLoading) {
    return (
      <div
        className={cn(
          'animate-pulse bg-muted rounded',
          'flex items-center justify-center',
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={`Loading ${metaphor}`}
      >
        <div className="w-4 h-4 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
      </div>
    );
  }

  // Error state
  if (error || !hasAsset) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div
        className={cn(
          'bg-muted border border-dashed border-muted-foreground/25 rounded',
          'flex items-center justify-center text-muted-foreground text-sm',
          className
        )}
        style={{ width, height }}
        role="img"
        aria-label={`Missing ${metaphor}`}
        title={error ? `Error: ${error}` : `No asset found for "${metaphor}"`}
      >
        <span className="text-xs">?</span>
      </div>
    );
  }

  // Determine the appropriate tag based on asset type
  const { url, type, filename } = asset!;

  // SVG assets - use img tag for consistency
  if (type === 'svg' || filename.endsWith('.svg')) {
    return (
      <img
        src={url}
        alt={alt || metaphor}
        className={className}
        width={width}
        height={height}
        onLoad={onLoad}
        onError={onError}
        style={{ width, height }}
      />
    );
  }

  // Image assets (png, jpg, webp, etc.)
  if (type === 'image' || /\.(png|jpe?g|webp|gif|avif)$/i.test(filename)) {
    return (
      <img
        src={url}
        alt={alt || metaphor}
        className={cn('object-contain', className)}
        width={width}
        height={height}
        onLoad={onLoad}
        onError={onError}
        style={{ width, height }}
      />
    );
  }

  // Icon assets - try to render as img first, fallback to div
  if (type === 'icon') {
    return (
      <img
        src={url}
        alt={alt || metaphor}
        className={cn('inline-block', className)}
        width={width || 24}
        height={height || 24}
        onLoad={onLoad}
        onError={(e) => {
          // If img fails, try to load as SVG inline
          if (filename && filename.endsWith('.svg') && url) {
            fetchSvgInline(url, alt || metaphor || 'asset', className, width || 24, height || 24);
          }
          onError?.();
        }}
      />
    );
  }

  // Default fallback for unknown types
  return (
    <img
      src={url}
      alt={alt || metaphor}
      className={className}
      width={width}
      height={height}
      onLoad={onLoad}
      onError={onError}
      style={{ width, height }}
    />
  );
}

/**
 * Helper function to load SVG inline (fallback for icon rendering)
 */
function fetchSvgInline(
  url: string,
  alt: string,
  className?: string,
  width?: number | string,
  height?: number | string
) {
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
export function AssetWithSkeleton(props: AssetProps) {
  return (
    <div className="relative">
      <Asset {...props} />
    </div>
  );
}

/**
 * Simple asset component that returns null if no asset found
 */
export function OptionalAsset(props: AssetProps) {
  const { hasAsset } = useAsset(props.metaphor);

  if (!hasAsset) {
    return null;
  }

  return <Asset {...props} />;
}