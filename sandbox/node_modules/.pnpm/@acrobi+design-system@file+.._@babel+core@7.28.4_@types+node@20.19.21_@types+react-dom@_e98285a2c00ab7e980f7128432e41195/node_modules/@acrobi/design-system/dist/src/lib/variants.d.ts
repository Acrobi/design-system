/**
 * Architectural Standards: Shared Variant System
 *
 * This file implements the shared variant system with size primitives
 * ensuring no hard-coded styles in components.
 */
import { SizePrimitive, SizeMapping, ButtonVariant, LabelVariant, IconVariant } from './types';
export declare const sizeMappings: Record<SizePrimitive, SizeMapping>;
export declare const iconSizeMappings: Record<SizePrimitive, string>;
export declare const buttonVariants: (props?: ({
    btnVariant?: "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary" | null | undefined;
    btnSize?: "sm" | "lg" | "xs" | "md" | "xl" | null | undefined;
    btnDisabled?: boolean | null | undefined;
    btnLoading?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const labelVariants: (props?: ({
    lblVariant?: "default" | "error" | "required" | "optional" | null | undefined;
    lblSize?: "sm" | "lg" | "xs" | "md" | "xl" | null | undefined;
    lblRequired?: boolean | null | undefined;
    lblOptional?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const iconVariants: (props?: ({
    icnVariant?: "default" | "button" | "input" | "standalone" | null | undefined;
    icnSize?: "sm" | "lg" | "xs" | "md" | "xl" | null | undefined;
    icnRotated?: boolean | null | undefined;
    icnAnimated?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const getSizeClass: (size: SizePrimitive, type?: "component" | "icon") => string;
export declare const getResponsiveSizeClasses: (size: SizePrimitive, responsiveSizes?: Partial<Record<SizePrimitive, SizePrimitive>>) => string;
export declare const validateArchitecturalCompliance: (componentName: string, hasHardcodedStyles: boolean, followsNamingConvention: boolean, usesSizePrimitives: boolean) => boolean;
export { type SizePrimitive, type ButtonVariant, type LabelVariant, type IconVariant };
//# sourceMappingURL=variants.d.ts.map