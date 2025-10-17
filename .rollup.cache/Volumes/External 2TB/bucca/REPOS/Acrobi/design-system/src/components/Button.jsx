import { __rest } from "tslib";
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
/**
 * Button Component Variants
 *
 * These variants define the different styles and states the button can have.
 * All styling uses Tailwind utility classes that reference our CSS variables.
 */
const buttonVariants = cva(
// Base classes - always applied
'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
        },
        size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-10 w-10',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
/**
 * Button Component
 *
 * This is the foundational Button component for the Acrobi Design System.
 * It demonstrates our core principles:
 *
 * ✅ Uses only Tailwind utility classes
 * ✅ References semantic CSS variables (bg-primary, text-primary-foreground)
 * ✅ Contains ZERO hard-coded style values
 * ✅ Fully supports light/dark theming
 * ✅ Multiple variants for different use cases
 * ✅ Accessible and keyboard navigable
 *
 * @param asChild - Render as child element when true
 * @param variant - Visual style variant (default, destructive, outline, etc.)
 * @param size - Size variant (default, sm, lg, icon)
 * @param className - Additional CSS classes
 * @param props - Standard button HTML attributes
 */
const Button = React.forwardRef((_a, ref) => {
    var { className, variant, size, asChild = false } = _a, props = __rest(_a, ["className", "variant", "size", "asChild"]);
    const Comp = asChild ? Slot : 'button';
    return (<Comp className={buttonVariants({ variant, size, className })} ref={ref} {...props}/>);
});
Button.displayName = 'Button';
export { Button, buttonVariants };
//# sourceMappingURL=Button.jsx.map