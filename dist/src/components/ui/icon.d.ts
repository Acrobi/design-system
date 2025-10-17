/**
 * Architectural Standards: Icon Component
 *
 * Component API Naming Convention: icn*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Simple state management with hooks
 */
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { iconVariants } from "../../lib/variants";
import { ArchitecturalMetadata } from "../../lib/types";
import { IconMetaphor } from "../../lib/icon-metaphors";
export interface IconProps extends React.SVGAttributes<SVGSVGElement>, VariantProps<typeof iconVariants> {
    metaphor: IconMetaphor;
    fallback?: React.ReactNode;
}
declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
export declare const iconMetadata: ArchitecturalMetadata;
export declare const IconVariants: {
    readonly Default: (props: Omit<IconProps, "icnVariant">) => import("react/jsx-runtime").JSX.Element;
    readonly Button: (props: Omit<IconProps, "icnVariant">) => import("react/jsx-runtime").JSX.Element;
    readonly Input: (props: Omit<IconProps, "icnVariant">) => import("react/jsx-runtime").JSX.Element;
    readonly Standalone: (props: Omit<IconProps, "icnVariant">) => import("react/jsx-runtime").JSX.Element;
};
export declare const IconSizes: {
    readonly XS: (props: Omit<IconProps, "icnSize">) => import("react/jsx-runtime").JSX.Element;
    readonly SM: (props: Omit<IconProps, "icnSize">) => import("react/jsx-runtime").JSX.Element;
    readonly MD: (props: Omit<IconProps, "icnSize">) => import("react/jsx-runtime").JSX.Element;
    readonly LG: (props: Omit<IconProps, "icnSize">) => import("react/jsx-runtime").JSX.Element;
    readonly XL: (props: Omit<IconProps, "icnSize">) => import("react/jsx-runtime").JSX.Element;
};
export declare const ButtonIcon: (props: Omit<IconProps, "icnVariant">) => import("react/jsx-runtime").JSX.Element;
export declare const InputIcon: (props: Omit<IconProps, "icnVariant">) => import("react/jsx-runtime").JSX.Element;
export declare const LoadingIcon: (props: Omit<IconProps, "metaphor" | "icnAnimated">) => import("react/jsx-runtime").JSX.Element;
export declare const createIconVariant: (defaultVariant: IconProps["icnVariant"], defaultSize?: IconProps["icnSize"]) => (props: Omit<IconProps, "icnVariant" | "icnSize">) => import("react/jsx-runtime").JSX.Element;
export { Icon, iconVariants };
//# sourceMappingURL=icon.d.ts.map