import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { type VariantProps } from "class-variance-authority";
declare const switchVariants: (props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, VariantProps<typeof switchVariants> {
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<any>>;
export { Switch, switchVariants };
//# sourceMappingURL=switch.d.ts.map