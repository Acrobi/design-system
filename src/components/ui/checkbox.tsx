/**
 * @prop {variant} {enum} {default|destructive|outline|secondary|ghost} {default} - The visual style of the checkbox.
 * @prop {size} {enum} {default|sm|lg} {default} - The size of the checkbox.
 * @prop {checked} {boolean} {false} - Whether the checkbox is checked.
 * @prop {disabled} {boolean} {false} - Whether the checkbox is disabled.
 * @prop {required} {boolean} {false} - Whether the checkbox is required.
 * @prop {indeterminate} {boolean} {false} - Whether the checkbox is in an indeterminate state.
 */
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      variant: {
        default:
          "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        destructive:
          "border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground",
        secondary:
          "border-secondary data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground",
        outline:
          "border-2 border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      },
      size: {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant, size, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }