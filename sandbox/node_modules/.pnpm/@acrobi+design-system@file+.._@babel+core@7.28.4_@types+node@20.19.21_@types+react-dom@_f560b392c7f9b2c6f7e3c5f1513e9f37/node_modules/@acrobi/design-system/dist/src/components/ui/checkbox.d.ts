import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type VariantProps } from "class-variance-authority";
declare const checkboxVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, VariantProps<typeof checkboxVariants> {
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<any>>;
export { Checkbox, checkboxVariants };
//# sourceMappingURL=checkbox.d.ts.map