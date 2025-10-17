/**
 * @prop {variant} {enum} {default|destructive|outline|secondary|ghost} {default} - The visual style of the input.
 * @prop {size} {enum} {default|sm|lg} {default} - The size of the input.
 * @prop {disabled} {boolean} {false} - Whether the input is disabled.
 * @prop {required} {boolean} {false} - Whether the input is required.
 * @prop {readOnly} {boolean} {false} - Whether the input is read-only.
 * @prop {error} {boolean} {false} - Whether the input has an error state.
 */
"use client";
import { __rest } from "tslib";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const inputVariants = cva("flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "border-input bg-background text-foreground",
            destructive: "border-destructive bg-background text-destructive-foreground placeholder:text-destructive-foreground/50",
            outline: "border-2 border-input bg-background text-foreground",
            secondary: "border-border bg-secondary text-secondary-foreground placeholder:text-secondary-foreground/70",
        },
        size: {
            default: "h-10 px-3 py-2",
            sm: "h-9 px-2 py-1 text-xs",
            lg: "h-11 px-4 py-3 text-base",
        },
        error: {
            true: "border-destructive bg-destructive/5 text-destructive-foreground placeholder:text-destructive-foreground/50 focus-visible:ring-destructive",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        error: false,
    },
});
const Input = React.forwardRef((_a, ref) => {
    var { className, variant, size, error, disabled } = _a, props = __rest(_a, ["className", "variant", "size", "error", "disabled"]);
    return (<input className={cn(inputVariants({ variant, size, error, className }))} ref={ref} disabled={disabled} aria-invalid={error} {...props}/>);
});
Input.displayName = "Input";
export { Input, inputVariants };
//# sourceMappingURL=input.jsx.map