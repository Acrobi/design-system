/**
 * Architectural Standards: Icon Component
 *
 * Component API Naming Convention: icn*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Simple state management with hooks
 */

"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { iconVariants } from "../../lib/variants"
import { IconAPI, ArchitecturalMetadata } from "../../lib/types"
import { IconMetaphor } from "../../lib/icon-metaphors"
import { lucideMap } from "../../lib/icon-maps/lucide.map"

// Icon component props following naming convention
export interface IconProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof iconVariants> {
  metaphor: IconMetaphor;
  fallback?: React.ReactNode;
}

// Icon component with architectural compliance
const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({
    className,
    metaphor,
    icnVariant,
    icnSize,
    icnRotated,
    icnAnimated,
    fallback,
    ...props
  }, ref) => {
    // Get the Lucide icon component from the map
    const LucideIcon = lucideMap[metaphor] || lucideMap.placeholder;

    // If icon is not found and fallback is provided, render fallback
    if (!lucideMap[metaphor] && fallback) {
      return (
        <span
          ref={ref as any}
          className={cn(
            "inline-flex items-center justify-center",
            iconVariants({
              icnVariant,
              icnSize,
              icnRotated,
              icnAnimated,
              className
            })
          )}
          {...(props as any)}
        >
          {fallback}
        </span>
      );
    }

    // Render the Lucide icon with variant system
    return (
      <LucideIcon
        ref={ref}
        className={cn(iconVariants({
          icnVariant,
          icnSize,
          icnRotated,
          icnAnimated,
          className
        }))}
        {...props}
      />
    );
  }
)

Icon.displayName = "Icon"

// Architectural compliance metadata
export const iconMetadata: ArchitecturalMetadata = {
  componentType: 'atomic',
  hasHardcodedStyles: false, // Golden Rule compliance
  followsNamingConvention: true, // icn* API
  usesSizePrimitives: true, // xs, sm, md, lg, xl
  hasControllerPattern: false, // Simple component, no controller needed
  lastReviewed: new Date()
}

// Icon variants for convenience
export const IconVariants = {
  Default: (props: Omit<IconProps, 'icnVariant'>) => (
    <Icon {...props} icnVariant="default" />
  ),
  Button: (props: Omit<IconProps, 'icnVariant'>) => (
    <Icon {...props} icnVariant="button" />
  ),
  Input: (props: Omit<IconProps, 'icnVariant'>) => (
    <Icon {...props} icnVariant="input" />
  ),
  Standalone: (props: Omit<IconProps, 'icnVariant'>) => (
    <Icon {...props} icnVariant="standalone" />
  )
} as const;

// Icon sizes for convenience
export const IconSizes = {
  XS: (props: Omit<IconProps, 'icnSize'>) => (
    <Icon {...props} icnSize="xs" />
  ),
  SM: (props: Omit<IconProps, 'icnSize'>) => (
    <Icon {...props} icnSize="sm" />
  ),
  MD: (props: Omit<IconProps, 'icnSize'>) => (
    <Icon {...props} icnSize="md" />
  ),
  LG: (props: Omit<IconProps, 'icnSize'>) => (
    <Icon {...props} icnSize="lg" />
  ),
  XL: (props: Omit<IconProps, 'icnSize'>) => (
    <Icon {...props} icnSize="xl" />
  )
} as const;

// Specialized icon components for common use cases
export const ButtonIcon = (props: Omit<IconProps, 'icnVariant'>) => (
  <Icon {...props} icnVariant="button" icnSize="sm" />
);

export const InputIcon = (props: Omit<IconProps, 'icnVariant'>) => (
  <Icon {...props} icnVariant="input" icnSize="sm" />
);

export const LoadingIcon = (props: Omit<IconProps, 'metaphor' | 'icnAnimated'>) => (
  <Icon
    {...props}
    metaphor="placeholder"
    icnAnimated={true}
    icnVariant="default"
  />
);

// Icon factory for creating custom icon variants
export const createIconVariant = (
  defaultVariant: IconProps['icnVariant'],
  defaultSize: IconProps['icnSize'] = 'md'
) => {
  return (props: Omit<IconProps, 'icnVariant' | 'icnSize'>) => (
    <Icon
      {...props}
      icnVariant={defaultVariant}
      icnSize={defaultSize}
    />
  );
};

// Export component and utilities
export { Icon, iconVariants };