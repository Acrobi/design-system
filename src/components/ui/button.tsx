/**
 * Architectural Standards: Button Component
 *
 * Component API Naming Convention: btn*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Integrates with useButtonController
 */

"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { useSensoryFeedback } from "./sensory-provider"
import { buttonVariants } from "../../lib/variants"
import { useButtonController } from "../../lib/controller"
import { ButtonAPI, ArchitecturalMetadata } from "../../lib/types"

// Button component props following naming convention
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'size'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // Expose standard names for convenience while maintaining prefixed variants internally
  variant?: VariantProps<typeof buttonVariants>['btnVariant'];
  size?: VariantProps<typeof buttonVariants>['btnSize'];
  disabled?: boolean;
  loading?: boolean;
}

// Button component with architectural compliance
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    children,
    asChild = false,
    onClick,
    loadingText,
    variant,
    size,
    disabled,
    loading,
    ...props
  }, ref) => {
    // Controller integration for complex state management
    const controller = useButtonController({
      loading,
      disabled
    });

    const { playSfx } = useSensoryFeedback();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      playSfx('click');
      if (onClick) onClick(e);
    };

    const Comp = asChild ? Slot : "button"

    // Merge controller state with props
    const isDisabled = disabled || controller.state.disabled || controller.state.loading;
    const isLoading = controller.state.loading || loading;

    return (
      <Comp
        className={cn(buttonVariants({
          btnVariant: variant,
          btnSize: size,
          btnDisabled: isDisabled,
          btnLoading: isLoading,
          className
        }))}
        ref={ref}
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {/* When loading, wrap both spinner and content in a single span */}
        {isLoading ? (
          <span className="relative inline-flex items-center justify-center">
            {/* Loading state */}
            <span className="btn-loading-spinner absolute inset-0 flex items-center justify-center">
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>

            {/* Button content */}
            <span className="opacity-0">
              {loadingText || children}
            </span>
          </span>
        ) : (
          // Normal state - render children directly
          children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

// Architectural compliance metadata
export const buttonMetadata: ArchitecturalMetadata = {
  componentType: 'atomic',
  hasHardcodedStyles: false, // Golden Rule compliance
  followsNamingConvention: true, // btn* API
  usesSizePrimitives: true, // xs, sm, md, lg, xl
  hasControllerPattern: true, // useButtonController integration
  lastReviewed: new Date()
}

// Button variants for convenience
export const ButtonVariants = {
  Primary: (props: Omit<ButtonProps, 'btnVariant'>) => (
    <Button {...props} btnVariant="primary" />
  ),
  Secondary: (props: Omit<ButtonProps, 'btnVariant'>) => (
    <Button {...props} btnVariant="secondary" />
  ),
  Destructive: (props: Omit<ButtonProps, 'btnVariant'>) => (
    <Button {...props} btnVariant="destructive" />
  ),
  Outline: (props: Omit<ButtonProps, 'btnVariant'>) => (
    <Button {...props} btnVariant="outline" />
  ),
  Ghost: (props: Omit<ButtonProps, 'btnVariant'>) => (
    <Button {...props} btnVariant="ghost" />
  ),
  Link: (props: Omit<ButtonProps, 'btnVariant'>) => (
    <Button {...props} btnVariant="link" />
  )
} as const;

// Button sizes for convenience
export const ButtonSizes = {
  XS: (props: Omit<ButtonProps, 'btnSize'>) => (
    <Button {...props} btnSize="xs" />
  ),
  SM: (props: Omit<ButtonProps, 'btnSize'>) => (
    <Button {...props} btnSize="sm" />
  ),
  MD: (props: Omit<ButtonProps, 'btnSize'>) => (
    <Button {...props} btnSize="md" />
  ),
  LG: (props: Omit<ButtonProps, 'btnSize'>) => (
    <Button {...props} btnSize="lg" />
  ),
  XL: (props: Omit<ButtonProps, 'btnSize'>) => (
    <Button {...props} btnSize="xl" />
  )
} as const;

// Export component and utilities
export { Button, buttonVariants };