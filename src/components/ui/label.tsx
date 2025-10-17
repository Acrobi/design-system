/**
 * Architectural Standards: Label Component
 *
 * Component API Naming Convention: lbl*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Simple state management with hooks
 */

"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { labelVariants } from "../../lib/variants"
import { LabelAPI, ArchitecturalMetadata } from "../../lib/types"
import { IconMetaphor } from "../../lib/icon-metaphors"
import { Icon } from "./icon"

// Label component props following naming convention
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  children: React.ReactNode;
  icon?: IconMetaphor;
  htmlFor?: string;
  // Expose standard names for convenience while maintaining prefixed variants internally
  variant?: VariantProps<typeof labelVariants>['lblVariant'];
  size?: VariantProps<typeof labelVariants>['lblSize'];
  required?: boolean;
  optional?: boolean;
}

// Label component with architectural compliance
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({
    className,
    children,
    variant,
    size,
    required,
    optional,
    icon,
    htmlFor,
    ...props
  }, ref) => {
    // Map standard names to the prefixed names expected by labelVariants
    const mappedVariant = required ? 'required' :
                         optional ? 'optional' :
                         variant === 'error' ? 'error' :
                         'default';

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(labelVariants({
          lblVariant: mappedVariant,
          lblSize: size,
          lblRequired: required,
          lblOptional: optional,
          className
        }))}
        {...props}
      >
        {/* Icon integration */}
        {icon && (
          <span className="lbl-icon">
            <Icon
              metaphor={icon}
              icnSize={size || 'sm'}
              icnVariant="default"
            />
          </span>
        )}

        {/* Label text */}
        <span className="lbl-text">
          {children}
        </span>

        {/* Required indicator */}
        {required && (
          <span className="lbl-required-indicator" aria-hidden="true">
            *
          </span>
        )}

        {/* Optional indicator */}
        {optional && !required && (
          <span className="lbl-optional-indicator" aria-hidden="true">
            (optional)
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = "Label"

// Architectural compliance metadata
export const labelMetadata: ArchitecturalMetadata = {
  componentType: 'atomic',
  hasHardcodedStyles: false, // Golden Rule compliance
  followsNamingConvention: true, // lbl* API
  usesSizePrimitives: true, // xs, sm, md, lg, xl
  hasControllerPattern: false, // Simple component, no controller needed
  lastReviewed: new Date()
}

// Label variants for convenience
export const LabelVariants = {
  Default: (props: Omit<LabelProps, 'variant'>) => (
    <Label {...props} variant="default" />
  ),
  Required: (props: Omit<LabelProps, 'variant'>) => (
    <Label {...props} required={true} />
  ),
  Optional: (props: Omit<LabelProps, 'variant'>) => (
    <Label {...props} variant="optional" />
  ),
  Error: (props: Omit<LabelProps, 'variant'>) => (
    <Label {...props} variant="error" />
  )
} as const;

// Label sizes for convenience
export const LabelSizes = {
  XS: (props: Omit<LabelProps, 'lblSize'>) => (
    <Label {...props} lblSize="xs" />
  ),
  SM: (props: Omit<LabelProps, 'lblSize'>) => (
    <Label {...props} lblSize="sm" />
  ),
  MD: (props: Omit<LabelProps, 'lblSize'>) => (
    <Label {...props} lblSize="md" />
  ),
  LG: (props: Omit<LabelProps, 'lblSize'>) => (
    <Label {...props} lblSize="lg" />
  ),
  XL: (props: Omit<LabelProps, 'lblSize'>) => (
    <Label {...props} lblSize="xl" />
  )
} as const;

// Export component and utilities
export { Label, labelVariants };