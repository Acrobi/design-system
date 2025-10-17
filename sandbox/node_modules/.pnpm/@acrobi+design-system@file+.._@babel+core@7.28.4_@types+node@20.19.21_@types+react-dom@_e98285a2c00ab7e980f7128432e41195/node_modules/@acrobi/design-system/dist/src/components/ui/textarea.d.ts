import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const textareaVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
    resize?: "none" | "both" | "horizontal" | "vertical" | null | undefined;
    error?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
    error?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea, textareaVariants };
//# sourceMappingURL=textarea.d.ts.map