/**
 * Architectural Standards: Icon Component
 *
 * Component API Naming Convention: icn*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Simple state management with hooks
 */
"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
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
        return (_jsx("span", Object.assign({ ref: ref, className: cn("inline-flex items-center justify-center", iconVariants({
                icnVariant,
                icnSize,
                icnRotated,
                icnAnimated,
                className
            })) }, props, { children: fallback })));
    }
    // Render the Lucide icon with variant system
    return (_jsx(LucideIcon, Object.assign({ ref: ref, className: cn(iconVariants({
            icnVariant,
            icnSize,
            icnRotated,
            icnAnimated,
            className
        })) }, props)));
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
    Default: (props) => (_jsx(Icon, Object.assign({}, props, { icnVariant: "default" }))),
    Button: (props) => (_jsx(Icon, Object.assign({}, props, { icnVariant: "button" }))),
    Input: (props) => (_jsx(Icon, Object.assign({}, props, { icnVariant: "input" }))),
    Standalone: (props) => (_jsx(Icon, Object.assign({}, props, { icnVariant: "standalone" })))
};
// Icon sizes for convenience
export const IconSizes = {
    XS: (props) => (_jsx(Icon, Object.assign({}, props, { icnSize: "xs" }))),
    SM: (props) => (_jsx(Icon, Object.assign({}, props, { icnSize: "sm" }))),
    MD: (props) => (_jsx(Icon, Object.assign({}, props, { icnSize: "md" }))),
    LG: (props) => (_jsx(Icon, Object.assign({}, props, { icnSize: "lg" }))),
    XL: (props) => (_jsx(Icon, Object.assign({}, props, { icnSize: "xl" })))
};
// Specialized icon components for common use cases
export const ButtonIcon = (props) => (_jsx(Icon, Object.assign({}, props, { icnVariant: "button", icnSize: "sm" })));
export const InputIcon = (props) => (_jsx(Icon, Object.assign({}, props, { icnVariant: "input", icnSize: "sm" })));
export const LoadingIcon = (props) => (_jsx(Icon, Object.assign({}, props, { metaphor: "placeholder", icnAnimated: true, icnVariant: "default" })));
// Icon factory for creating custom icon variants
export const createIconVariant = (defaultVariant, defaultSize = 'md') => {
    return (props) => (_jsx(Icon, Object.assign({}, props, { icnVariant: defaultVariant, icnSize: defaultSize })));
};
// Export component and utilities
export { Icon, iconVariants };
//# sourceMappingURL=icon.js.map