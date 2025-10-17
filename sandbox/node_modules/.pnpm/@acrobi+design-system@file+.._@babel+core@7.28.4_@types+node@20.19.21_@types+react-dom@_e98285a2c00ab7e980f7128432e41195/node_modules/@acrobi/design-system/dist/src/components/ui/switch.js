/**
 * @prop {variant} {enum} {default|destructive|outline|secondary|ghost} {default} - The visual style of the switch.
 * @prop {size} {enum} {default|sm|lg} {default} - The size of the switch.
 * @prop {checked} {boolean} {false} - Whether the switch is checked.
 * @prop {disabled} {boolean} {false} - Whether the switch is disabled.
 * @prop {required} {boolean} {false} - Whether the switch is required.
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
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const switchVariants = cva("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", {
    variants: {
        variant: {
            default: "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            destructive: "data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input",
            success: "data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-input",
            warning: "data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-input",
        },
        size: {
            default: "h-6 w-11",
            sm: "h-5 w-9",
            lg: "h-7 w-13",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const switchThumbVariants = cva("pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0", {
    variants: {
        size: {
            default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
            sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
            lg: "h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
        },
    },
    defaultVariants: {
        size: "default",
    },
});
const Switch = React.forwardRef((_a, ref) => {
    var { className, variant, size } = _a, props = __rest(_a, ["className", "variant", "size"]);
    return (_jsx(SwitchPrimitives.Root, Object.assign({ className: cn(switchVariants({ variant, size, className })) }, props, { ref: ref, children: _jsx(SwitchPrimitives.Thumb, { className: cn(switchThumbVariants({ size })) }) })));
});
Switch.displayName = SwitchPrimitives.Root.displayName;
export { Switch, switchVariants };
//# sourceMappingURL=switch.js.map