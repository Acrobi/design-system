import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const inputVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
    error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
    error?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input, inputVariants };
//# sourceMappingURL=input.d.ts.map