/**
 * Architectural Standards: Label Component
 *
 * Component API Naming Convention: lbl*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Simple state management with hooks
 */
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { labelVariants } from "../../lib/variants";
import { ArchitecturalMetadata } from "../../lib/types";
import { IconMetaphor } from "../../lib/icon-metaphors";
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
    children: React.ReactNode;
    icon?: IconMetaphor;
    htmlFor?: string;
    variant?: VariantProps<typeof labelVariants>['lblVariant'];
    size?: VariantProps<typeof labelVariants>['lblSize'];
    required?: boolean;
    optional?: boolean;
}
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;
export declare const labelMetadata: ArchitecturalMetadata;
export declare const LabelVariants: {
    readonly Default: (props: Omit<LabelProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    readonly Required: (props: Omit<LabelProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    readonly Optional: (props: Omit<LabelProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    readonly Error: (props: Omit<LabelProps, "variant">) => import("react/jsx-runtime").JSX.Element;
};
export declare const LabelSizes: {
    readonly XS: (props: Omit<LabelProps, "lblSize">) => import("react/jsx-runtime").JSX.Element;
    readonly SM: (props: Omit<LabelProps, "lblSize">) => import("react/jsx-runtime").JSX.Element;
    readonly MD: (props: Omit<LabelProps, "lblSize">) => import("react/jsx-runtime").JSX.Element;
    readonly LG: (props: Omit<LabelProps, "lblSize">) => import("react/jsx-runtime").JSX.Element;
    readonly XL: (props: Omit<LabelProps, "lblSize">) => import("react/jsx-runtime").JSX.Element;
};
export { Label, labelVariants };
//# sourceMappingURL=label.d.ts.map