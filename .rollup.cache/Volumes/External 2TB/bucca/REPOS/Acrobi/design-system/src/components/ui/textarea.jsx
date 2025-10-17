/**
 * @prop {variant} {enum} {default|destructive|outline|secondary|ghost} {default} - The visual style of the textarea.
 * @prop {size} {enum} {default|sm|lg} {default} - The size of the textarea.
 * @prop {resize} {enum} {none|vertical|horizontal|both} {vertical} - Whether the textarea can be resized.
 * @prop {disabled} {boolean} {false} - Whether the textarea is disabled.
 * @prop {required} {boolean} {false} - Whether the textarea is required.
 * @prop {readOnly} {boolean} {false} - Whether the textarea is read-only.
 * @prop {error} {boolean} {false} - Whether the textarea has an error state.
 */
"use client";
import { __rest } from "tslib";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const textareaVariants = cva("flex min-h-[80px] w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", {
    variants: {
        variant: {
            default: "border-input bg-background text-foreground",
            destructive: "border-destructive bg-background text-destructive-foreground placeholder:text-destructive-foreground/50",
            outline: "border-2 border-input bg-background text-foreground",
            secondary: "border-border bg-secondary text-secondary-foreground placeholder:text-secondary-foreground/70",
        },
        size: {
            default: "px-3 py-2 text-sm",
            sm: "px-2 py-1 text-xs",
            lg: "px-4 py-3 text-base",
        },
        resize: {
            none: "resize-none",
            vertical: "resize-y",
            horizontal: "resize-x",
            both: "resize",
        },
        error: {
            true: "border-destructive bg-destructive/5 text-destructive-foreground placeholder:text-destructive-foreground/50 focus-visible:ring-destructive",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        resize: "vertical",
        error: false,
    },
});
const Textarea = React.forwardRef((_a, ref) => {
    var { className, variant, size, resize, error, disabled } = _a, props = __rest(_a, ["className", "variant", "size", "resize", "error", "disabled"]);
    return (<textarea className={cn(textareaVariants({ variant, size, resize, error, className }))} ref={ref} disabled={disabled} aria-invalid={error} {...props}/>);
});
Textarea.displayName = "Textarea";
export { Textarea, textareaVariants };
//# sourceMappingURL=textarea.jsx.map