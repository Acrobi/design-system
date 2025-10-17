/**
 * @prop {variant} {enum} {default|secondary|outline|ghost} {default} - The visual style of the badge.
 * @prop {size} {enum} {default|sm|lg} {default} - The size of the badge.
 */
"use client";
import { __rest } from "tslib";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
            outline: "text-foreground border-border hover:bg-accent hover:text-accent-foreground",
            success: "border-transparent bg-success text-success-foreground hover:bg-success/90",
            warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/90",
            info: "border-transparent bg-info text-info-foreground hover:bg-info/90",
        },
        size: {
            default: "px-2.5 py-0.5 text-xs",
            sm: "px-2 py-0.5 text-xs",
            lg: "px-3 py-1 text-sm",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Badge = React.forwardRef((_a, ref) => {
    var { className, variant, size } = _a, props = __rest(_a, ["className", "variant", "size"]);
    return (<div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}/>);
});
Badge.displayName = "Badge";
export { Badge, badgeVariants };
//# sourceMappingURL=badge.jsx.map