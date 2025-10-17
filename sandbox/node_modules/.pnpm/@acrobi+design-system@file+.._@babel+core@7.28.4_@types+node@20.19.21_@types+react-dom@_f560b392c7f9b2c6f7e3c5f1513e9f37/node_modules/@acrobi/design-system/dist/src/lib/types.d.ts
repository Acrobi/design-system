/**
 * Architectural Standards: Component Types & Interfaces
 *
 * This file defines the core types and interfaces for the Acrobi Design System
 * following strict architectural standards with no hard-coded styles.
 */
export type SizePrimitive = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ExtendedSizePrimitive = SizePrimitive | '2xs' | '2xl' | '3xl';
export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
export type LabelVariant = 'default' | 'required' | 'optional' | 'error';
export type IconVariant = 'default' | 'button' | 'input' | 'standalone';
export interface ButtonAPI {
    btnVariant?: ButtonVariant;
    btnSize?: SizePrimitive;
    btnDisabled?: boolean;
    btnLoading?: boolean;
    btnLeftIcon?: string;
    btnRightIcon?: string;
}
export interface LabelAPI {
    lblVariant?: LabelVariant;
    lblSize?: SizePrimitive;
    lblRequired?: boolean;
    lblOptional?: boolean;
    lblError?: boolean;
}
export interface IconAPI {
    icnVariant?: IconVariant;
    icnSize?: SizePrimitive;
    icnRotated?: boolean;
    icnAnimated?: boolean;
}
export interface ComponentController<T = any> {
    state: T;
    actions: {
        update: (updates: Partial<T>) => void;
        reset: () => void;
    };
    hooks: {
        onChange?: (state: T) => void;
        onValidate?: (state: T) => boolean;
    };
}
export interface SizeMapping {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
}
export interface VariantConfig<T = string> {
    [key: string]: T;
}
export interface ArchitecturalMetadata {
    componentType: 'atomic' | 'molecular' | 'organism' | 'template' | 'page';
    hasHardcodedStyles: boolean;
    followsNamingConvention: boolean;
    usesSizePrimitives: boolean;
    hasControllerPattern: boolean;
    lastReviewed: Date;
}
//# sourceMappingURL=types.d.ts.map