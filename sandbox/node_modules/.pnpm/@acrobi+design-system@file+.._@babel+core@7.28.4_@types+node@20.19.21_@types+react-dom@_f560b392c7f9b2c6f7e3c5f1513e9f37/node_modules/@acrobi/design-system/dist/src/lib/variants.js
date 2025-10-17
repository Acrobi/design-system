/**
 * Architectural Standards: Shared Variant System
 *
 * This file implements the shared variant system with size primitives
 * ensuring no hard-coded styles in components.
 */
import { cva } from 'class-variance-authority';
// Size primitive mappings for consistent spacing and sizing
export const sizeMappings = {
    xs: {
        xs: 'h-4 px-2 py-1 text-xs',
        sm: 'h-6 px-3 py-1.5 text-sm',
        md: 'h-8 px-4 py-2 text-sm',
        lg: 'h-10 px-6 py-2.5 text-base',
        xl: 'h-12 px-8 py-3 text-lg'
    },
    sm: {
        xs: 'h-5 px-2.5 py-1.5 text-xs',
        sm: 'h-7 px-3.5 py-2 text-sm',
        md: 'h-9 px-4.5 py-2.5 text-sm',
        lg: 'h-11 px-6.5 py-3 text-base',
        xl: 'h-13 px-8.5 py-3.5 text-lg'
    },
    md: {
        xs: 'h-6 px-3 py-1.5 text-sm',
        sm: 'h-8 px-4 py-2 text-sm',
        md: 'h-10 px-5 py-2.5 text-base',
        lg: 'h-12 px-7 py-3 text-lg',
        xl: 'h-14 px-9 py-3.5 text-xl'
    },
    lg: {
        xs: 'h-7 px-3.5 py-2 text-sm',
        sm: 'h-9 px-4.5 py-2.5 text-sm',
        md: 'h-11 px-5.5 py-3 text-base',
        lg: 'h-13 px-7.5 py-3.5 text-lg',
        xl: 'h-15 px-9.5 py-4 text-xl'
    },
    xl: {
        xs: 'h-8 px-4 py-2 text-sm',
        sm: 'h-10 px-5 py-2.5 text-base',
        md: 'h-12 px-6 py-3 text-lg',
        lg: 'h-14 px-8 py-3.5 text-xl',
        xl: 'h-16 px-10 py-4 text-2xl'
    }
};
// Icon size mappings
export const iconSizeMappings = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
};
// Button variant system with no hard-coded styles
export const buttonVariants = cva(
// Base styles - only structural, no visual hard-coding
'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        btnVariant: {
            primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/70',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        btnSize: {
            xs: sizeMappings.xs.xs,
            sm: sizeMappings.xs.sm,
            md: sizeMappings.xs.md,
            lg: sizeMappings.xs.lg,
            xl: sizeMappings.xs.xl
        },
        btnDisabled: {
            true: 'opacity-50 cursor-not-allowed pointer-events-none'
        },
        btnLoading: {
            true: 'relative text-transparent'
        }
    },
    defaultVariants: {
        btnVariant: 'primary',
        btnSize: 'md',
        btnDisabled: false,
        btnLoading: false
    }
});
// Label variant system
export const labelVariants = cva(
// Base styles - only structural, no visual hard-coding
'inline-flex items-center gap-2 font-medium leading-none transition-colors', {
    variants: {
        lblVariant: {
            default: 'text-foreground',
            required: 'text-foreground',
            optional: 'text-muted-foreground',
            error: 'text-destructive'
        },
        lblSize: {
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl'
        },
        lblRequired: {
            true: 'after:content-["*"] after:text-destructive after:ml-1'
        },
        lblOptional: {
            true: 'after:content-["(optional)"] after:text-muted-foreground after:ml-1 after:font-normal'
        }
    },
    defaultVariants: {
        lblVariant: 'default',
        lblSize: 'sm',
        lblRequired: false,
        lblOptional: false
    }
});
// Icon variant system
export const iconVariants = cva(
// Base styles - only structural, no visual hard-coding
'inline-flex items-center justify-center transition-all duration-200', {
    variants: {
        icnVariant: {
            default: 'text-foreground',
            button: 'text-current',
            input: 'text-muted-foreground',
            standalone: 'text-foreground'
        },
        icnSize: {
            xs: iconSizeMappings.xs,
            sm: iconSizeMappings.sm,
            md: iconSizeMappings.md,
            lg: iconSizeMappings.lg,
            xl: iconSizeMappings.xl
        },
        icnRotated: {
            true: 'rotate-180'
        },
        icnAnimated: {
            true: 'animate-spin'
        }
    },
    defaultVariants: {
        icnVariant: 'default',
        icnSize: 'md',
        icnRotated: false,
        icnAnimated: false
    }
});
// Utility functions for size mapping
export const getSizeClass = (size, type = 'component') => {
    if (type === 'icon') {
        return iconSizeMappings[size];
    }
    return sizeMappings.xs[size]; // Default to xs base size
};
// Utility function for responsive size mapping
export const getResponsiveSizeClasses = (size, responsiveSizes) => {
    const classes = [getSizeClass(size)];
    if (responsiveSizes) {
        Object.entries(responsiveSizes).forEach(([breakpoint, responsiveSize]) => {
            classes.push(`${breakpoint}:${getSizeClass(responsiveSize)}`);
        });
    }
    return classes.join(' ');
};
// Architectural compliance validator
export const validateArchitecturalCompliance = (componentName, hasHardcodedStyles, followsNamingConvention, usesSizePrimitives) => {
    // Golden Rule: Components FORBIDDEN from hard-coded styles
    if (hasHardcodedStyles) {
        console.error(`❌ ${componentName}: Contains hard-coded styles - VIOLATION`);
        return false;
    }
    // Naming convention validation
    if (!followsNamingConvention) {
        console.warn(`⚠️ ${componentName}: Does not follow naming convention`);
    }
    // Size primitives validation
    if (!usesSizePrimitives) {
        console.warn(`⚠️ ${componentName}: Does not use size primitives`);
    }
    return true;
};
//# sourceMappingURL=variants.js.map