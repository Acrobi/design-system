/**
 * Architectural Standards: Label Component
 *
 * Component API Naming Convention: lbl*
 * Golden Rule: NO hard-coded styles - uses variant system only
 * Size Primitives: Uses xs, sm, md, lg, xl size system
 * Controller Pattern: Simple state management with hooks
 */
"use client";
import { __rest } from "tslib";
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
    return (<label ref={ref} htmlFor={htmlFor} className={cn(labelVariants({
            lblVariant: mappedVariant,
            lblSize: size,
            lblRequired: required,
            lblOptional: optional,
            className
        }))} {...props}>
        {/* Icon integration */}
        {icon && (<span className="lbl-icon">
            <Icon metaphor={icon} icnSize={size || 'sm'} icnVariant="default"/>
          </span>)}

        {/* Label text */}
        <span className="lbl-text">
          {children}
        </span>

        {/* Required indicator */}
        {required && (<span className="lbl-required-indicator" aria-hidden="true">
            *
          </span>)}

        {/* Optional indicator */}
        {optional && !required && (<span className="lbl-optional-indicator" aria-hidden="true">
            (optional)
          </span>)}
      </label>);
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
    Default: (props) => (<Label {...props} variant="default"/>),
    Required: (props) => (<Label {...props} required={true}/>),
    Optional: (props) => (<Label {...props} variant="optional"/>),
    Error: (props) => (<Label {...props} variant="error"/>)
};
// Label sizes for convenience
export const LabelSizes = {
    XS: (props) => (<Label {...props} lblSize="xs"/>),
    SM: (props) => (<Label {...props} lblSize="sm"/>),
    MD: (props) => (<Label {...props} lblSize="md"/>),
    LG: (props) => (<Label {...props} lblSize="lg"/>),
    XL: (props) => (<Label {...props} lblSize="xl"/>)
};
// Export component and utilities
export { Label, labelVariants };
//# sourceMappingURL=label.jsx.map