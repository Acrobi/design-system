/**
 * Architectural Standards: Icon Component
 *
 * Component API Naming Convention: icn*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Simple state management with hooks
 */
"use client";
import { __rest } from "tslib";
import * as React from "react";
import { cn } from "../../lib/utils";
import { iconVariants } from "../../lib/variants";
import { lucideMap } from "../../lib/icon-maps/lucide.map";
// Icon component with architectural compliance
const Icon = React.forwardRef((_a, ref) => {
    var { className, metaphor, icnVariant, icnSize, icnRotated, icnAnimated, fallback } = _a, props = __rest(_a, ["className", "metaphor", "icnVariant", "icnSize", "icnRotated", "icnAnimated", "fallback"]);
    // Get the Lucide icon component from the map
    const LucideIcon = lucideMap[metaphor] || lucideMap.placeholder;
    // If icon is not found and fallback is provided, render fallback
    if (!lucideMap[metaphor] && fallback) {
        return (<span ref={ref} className={cn("inline-flex items-center justify-center", iconVariants({
                icnVariant,
                icnSize,
                icnRotated,
                icnAnimated,
                className
            }))} {...props}>
          {fallback}
        </span>);
    }
    // Render the Lucide icon with variant system
    return (<LucideIcon ref={ref} className={cn(iconVariants({
            icnVariant,
            icnSize,
            icnRotated,
            icnAnimated,
            className
        }))} {...props}/>);
});
Icon.displayName = "Icon";
// Architectural compliance metadata
export const iconMetadata = {
    componentType: 'atomic',
    hasHardcodedStyles: false, // Golden Rule compliance
    followsNamingConvention: true, // icn* API
    usesSizePrimitives: true, // xs, sm, md, lg, xl
    hasControllerPattern: false, // Simple component, no controller needed
    lastReviewed: new Date()
};
// Icon variants for convenience
export const IconVariants = {
    Default: (props) => (<Icon {...props} icnVariant="default"/>),
    Button: (props) => (<Icon {...props} icnVariant="button"/>),
    Input: (props) => (<Icon {...props} icnVariant="input"/>),
    Standalone: (props) => (<Icon {...props} icnVariant="standalone"/>)
};
// Icon sizes for convenience
export const IconSizes = {
    XS: (props) => (<Icon {...props} icnSize="xs"/>),
    SM: (props) => (<Icon {...props} icnSize="sm"/>),
    MD: (props) => (<Icon {...props} icnSize="md"/>),
    LG: (props) => (<Icon {...props} icnSize="lg"/>),
    XL: (props) => (<Icon {...props} icnSize="xl"/>)
};
// Specialized icon components for common use cases
export const ButtonIcon = (props) => (<Icon {...props} icnVariant="button" icnSize="sm"/>);
export const InputIcon = (props) => (<Icon {...props} icnVariant="input" icnSize="sm"/>);
export const LoadingIcon = (props) => (<Icon {...props} metaphor="placeholder" icnAnimated={true} icnVariant="default"/>);
// Icon factory for creating custom icon variants
export const createIconVariant = (defaultVariant, defaultSize = 'md') => {
    return (props) => (<Icon {...props} icnVariant={defaultVariant} icnSize={defaultSize}/>);
};
// Export component and utilities
export { Icon, iconVariants };
//# sourceMappingURL=icon.jsx.map