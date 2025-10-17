/**
 * Architectural Standards: Button Component
 *
 * Component API Naming Convention: btn*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Integrates with useButtonController
 */
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "../../lib/variants";
import { ArchitecturalMetadata } from "../../lib/types";
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'size'>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    children: React.ReactNode;
    loadingText?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: VariantProps<typeof buttonVariants>['btnVariant'];
    size?: VariantProps<typeof buttonVariants>['btnSize'];
    disabled?: boolean;
    loading?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare const buttonMetadata: ArchitecturalMetadata;
export declare const ButtonVariants: {
    readonly Primary: (props: Omit<ButtonProps, "btnVariant">) => import("react/jsx-runtime").JSX.Element;
    readonly Secondary: (props: Omit<ButtonProps, "btnVariant">) => import("react/jsx-runtime").JSX.Element;
    readonly Destructive: (props: Omit<ButtonProps, "btnVariant">) => import("react/jsx-runtime").JSX.Element;
    readonly Outline: (props: Omit<ButtonProps, "btnVariant">) => import("react/jsx-runtime").JSX.Element;
    readonly Ghost: (props: Omit<ButtonProps, "btnVariant">) => import("react/jsx-runtime").JSX.Element;
    readonly Link: (props: Omit<ButtonProps, "btnVariant">) => import("react/jsx-runtime").JSX.Element;
};
export declare const ButtonSizes: {
    readonly XS: (props: Omit<ButtonProps, "btnSize">) => import("react/jsx-runtime").JSX.Element;
    readonly SM: (props: Omit<ButtonProps, "btnSize">) => import("react/jsx-runtime").JSX.Element;
    readonly MD: (props: Omit<ButtonProps, "btnSize">) => import("react/jsx-runtime").JSX.Element;
    readonly LG: (props: Omit<ButtonProps, "btnSize">) => import("react/jsx-runtime").JSX.Element;
    readonly XL: (props: Omit<ButtonProps, "btnSize">) => import("react/jsx-runtime").JSX.Element;
};
export { Button, buttonVariants };
//# sourceMappingURL=button.d.ts.map