import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const Alert: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & VariantProps<(props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const AlertDestructive: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    description?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare const AlertWarning: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    description?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare const AlertSuccess: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    description?: string;
} & React.RefAttributes<HTMLDivElement>>;
declare const AlertInfo: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    description?: string;
} & React.RefAttributes<HTMLDivElement>>;
export { Alert, AlertTitle, AlertDescription, AlertDestructive, AlertWarning, AlertSuccess, AlertInfo, alertVariants, };
//# sourceMappingURL=alert.d.ts.map