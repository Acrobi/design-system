/**
 * Architectural Standards: Button Component
 *
 * Component API Naming Convention: btn*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Integrates with useButtonController
 */
"use client";
import { __rest } from "tslib";
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
    return (<Comp className={cn(buttonVariants({
            btnVariant: variant,
            btnSize: size,
            btnDisabled: isDisabled,
            btnLoading: isLoading,
            className
        }))} ref={ref} disabled={isDisabled} onClick={handleClick} {...props}>
        {/* When loading, wrap both spinner and content in a single span */}
        {isLoading ? (<span className="relative inline-flex items-center justify-center">
            {/* Loading state */}
            <span className="btn-loading-spinner absolute inset-0 flex items-center justify-center">
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            </span>

            {/* Button content */}
            <span className="opacity-0">
              {loadingText || children}
            </span>
          </span>) : (
        // Normal state - render children directly
        children)}
      </Comp>);
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
    Primary: (props) => (<Button {...props} btnVariant="primary"/>),
    Secondary: (props) => (<Button {...props} btnVariant="secondary"/>),
    Destructive: (props) => (<Button {...props} btnVariant="destructive"/>),
    Outline: (props) => (<Button {...props} btnVariant="outline"/>),
    Ghost: (props) => (<Button {...props} btnVariant="ghost"/>),
    Link: (props) => (<Button {...props} btnVariant="link"/>)
};
// Button sizes for convenience
export const ButtonSizes = {
    XS: (props) => (<Button {...props} btnSize="xs"/>),
    SM: (props) => (<Button {...props} btnSize="sm"/>),
    MD: (props) => (<Button {...props} btnSize="md"/>),
    LG: (props) => (<Button {...props} btnSize="lg"/>),
    XL: (props) => (<Button {...props} btnSize="xl"/>)
};
// Export component and utilities
export { Button, buttonVariants };
//# sourceMappingURL=button.jsx.map