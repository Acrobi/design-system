import React from 'react';
import { type VariantProps } from 'class-variance-authority';
/**
 * Button Component Variants
 *
 * These variants define the different styles and states the button can have.
 * All styling uses Tailwind utility classes that reference our CSS variables.
 */
declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
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
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button, buttonVariants };
//# sourceMappingURL=Button.d.ts.map