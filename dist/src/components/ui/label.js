/**
 * Architectural Standards: Label Component
 *
 * Component API Naming Convention: lbl*
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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { labelVariants } from "../../lib/variants";
import { Icon } from "./icon";
// Label component with architectural compliance
const Label = React.forwardRef((_a, ref) => {
    var { className, children, variant, size, required, optional, icon, htmlFor } = _a, props = __rest(_a, ["className", "children", "variant", "size", "required", "optional", "icon", "htmlFor"]);
    // Map standard names to the prefixed names expected by labelVariants
    const mappedVariant = required ? 'required' :
        optional ? 'optional' :
            variant === 'error' ? 'error' :
                'default';
    return (_jsxs("label", Object.assign({ ref: ref, htmlFor: htmlFor, className: cn(labelVariants({
            lblVariant: mappedVariant,
            lblSize: size,
            lblRequired: required,
            lblOptional: optional,
            className
        })) }, props, { children: [icon && (_jsx("span", { className: "lbl-icon", children: _jsx(Icon, { metaphor: icon, icnSize: size || 'sm', icnVariant: "default" }) })), _jsx("span", { className: "lbl-text", children: children }), required && (_jsx("span", { className: "lbl-required-indicator", "aria-hidden": "true", children: "*" })), optional && !required && (_jsx("span", { className: "lbl-optional-indicator", "aria-hidden": "true", children: "(optional)" }))] })));
});
Label.displayName = "Label";
// Architectural compliance metadata
export const labelMetadata = {
    componentType: 'atomic',
    hasHardcodedStyles: false, // Golden Rule compliance
    followsNamingConvention: true, // lbl* API
    usesSizePrimitives: true, // xs, sm, md, lg, xl
    hasControllerPattern: false, // Simple component, no controller needed
    lastReviewed: new Date()
};
// Label variants for convenience
export const LabelVariants = {
    Default: (props) => (_jsx(Label, Object.assign({}, props, { variant: "default" }))),
    Required: (props) => (_jsx(Label, Object.assign({}, props, { required: true }))),
    Optional: (props) => (_jsx(Label, Object.assign({}, props, { variant: "optional" }))),
    Error: (props) => (_jsx(Label, Object.assign({}, props, { variant: "error" })))
};
// Label sizes for convenience
export const LabelSizes = {
    XS: (props) => (_jsx(Label, Object.assign({}, props, { lblSize: "xs" }))),
    SM: (props) => (_jsx(Label, Object.assign({}, props, { lblSize: "sm" }))),
    MD: (props) => (_jsx(Label, Object.assign({}, props, { lblSize: "md" }))),
    LG: (props) => (_jsx(Label, Object.assign({}, props, { lblSize: "lg" }))),
    XL: (props) => (_jsx(Label, Object.assign({}, props, { lblSize: "xl" })))
};
// Export component and utilities
export { Label, labelVariants };
//# sourceMappingURL=label.js.map