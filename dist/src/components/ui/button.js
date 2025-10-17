/**
 * Architectural Standards: Button Component
 *
 * Component API Naming Convention: btn*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Integrates with useButtonController
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
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import { useSensoryFeedback } from "./sensory-provider";
import { buttonVariants } from "../../lib/variants";
import { useButtonController } from "../../lib/controller";
// Button component with architectural compliance
const Button = React.forwardRef((_a, ref) => {
    var { className, children, asChild = false, onClick, loadingText, variant, size, disabled, loading } = _a, props = __rest(_a, ["className", "children", "asChild", "onClick", "loadingText", "variant", "size", "disabled", "loading"]);
    // Controller integration for complex state management
    const controller = useButtonController({
        loading,
        disabled
    });
    const { playSfx } = useSensoryFeedback();
    const handleClick = (e) => {
        playSfx('click');
        if (onClick)
            onClick(e);
    };
    const Comp = asChild ? Slot : "button";
    // Merge controller state with props
    const isDisabled = disabled || controller.state.disabled || controller.state.loading;
    const isLoading = controller.state.loading || loading;
    return (_jsx(Comp, Object.assign({ className: cn(buttonVariants({
            btnVariant: variant,
            btnSize: size,
            btnDisabled: isDisabled,
            btnLoading: isLoading,
            className
        })), ref: ref, disabled: isDisabled, onClick: handleClick }, props, { children: isLoading ? (_jsxs("span", { className: "relative inline-flex items-center justify-center", children: [_jsx("span", { className: "btn-loading-spinner absolute inset-0 flex items-center justify-center", children: _jsxs("svg", { className: "animate-spin h-4 w-4", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }) }), _jsx("span", { className: "opacity-0", children: loadingText || children })] })) : (
        // Normal state - render children directly
        children) })));
});
Button.displayName = "Button";
// Architectural compliance metadata
export const buttonMetadata = {
    componentType: 'atomic',
    hasHardcodedStyles: false, // Golden Rule compliance
    followsNamingConvention: true, // btn* API
    usesSizePrimitives: true, // xs, sm, md, lg, xl
    hasControllerPattern: true, // useButtonController integration
    lastReviewed: new Date()
};
// Button variants for convenience
export const ButtonVariants = {
    Primary: (props) => (_jsx(Button, Object.assign({}, props, { btnVariant: "primary" }))),
    Secondary: (props) => (_jsx(Button, Object.assign({}, props, { btnVariant: "secondary" }))),
    Destructive: (props) => (_jsx(Button, Object.assign({}, props, { btnVariant: "destructive" }))),
    Outline: (props) => (_jsx(Button, Object.assign({}, props, { btnVariant: "outline" }))),
    Ghost: (props) => (_jsx(Button, Object.assign({}, props, { btnVariant: "ghost" }))),
    Link: (props) => (_jsx(Button, Object.assign({}, props, { btnVariant: "link" })))
};
// Button sizes for convenience
export const ButtonSizes = {
    XS: (props) => (_jsx(Button, Object.assign({}, props, { btnSize: "xs" }))),
    SM: (props) => (_jsx(Button, Object.assign({}, props, { btnSize: "sm" }))),
    MD: (props) => (_jsx(Button, Object.assign({}, props, { btnSize: "md" }))),
    LG: (props) => (_jsx(Button, Object.assign({}, props, { btnSize: "lg" }))),
    XL: (props) => (_jsx(Button, Object.assign({}, props, { btnSize: "xl" })))
};
// Export component and utilities
export { Button, buttonVariants };
//# sourceMappingURL=button.js.map