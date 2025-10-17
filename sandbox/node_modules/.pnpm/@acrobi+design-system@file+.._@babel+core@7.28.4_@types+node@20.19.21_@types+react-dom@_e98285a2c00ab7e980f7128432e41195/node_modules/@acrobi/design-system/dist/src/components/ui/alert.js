/**
 * @prop {variant} {enum} {default|destructive|warning|success|info} {default} - The visual style of the alert.
 * @prop {size} {enum} {default|sm|lg} {default} - The size of the alert.
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
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
const alertVariants = cva("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
    variants: {
        variant: {
            default: "bg-background text-foreground border-border",
            destructive: "border-destructive/50 text-destructive bg-destructive/10 [&>svg]:text-destructive",
            warning: "border-yellow-500/50 text-yellow-800 bg-yellow-50 [&>svg]:text-yellow-500 dark:border-yellow-600/50 dark:text-yellow-200 dark:bg-yellow-900/20 [&>svg]:text-yellow-600",
            success: "border-green-500/50 text-green-800 bg-green-50 [&>svg]:text-green-500 dark:border-green-600/50 dark:text-green-200 dark:bg-green-900/20 [&>svg]:text-green-600",
            info: "border-blue-500/50 text-blue-800 bg-blue-50 [&>svg]:text-blue-500 dark:border-blue-600/50 dark:text-blue-200 dark:bg-blue-900/20 [&>svg]:text-blue-600",
        },
        size: {
            default: "p-4",
            sm: "p-3 text-sm [&>svg]:h-4 [&>svg]:w-4",
            lg: "p-6 text-lg [&>svg]:h-6 [&>svg]:w-6",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const Alert = React.forwardRef((_a, ref) => {
    var { className, variant, size, children } = _a, props = __rest(_a, ["className", "variant", "size", "children"]);
    return (_jsx("div", Object.assign({ ref: ref, role: "alert", className: cn(alertVariants({ variant, size }), className) }, props, { children: children })));
});
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("h5", Object.assign({ ref: ref, className: cn("mb-1 font-medium leading-none tracking-tight", className) }, props)));
});
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (_jsx("div", Object.assign({ ref: ref, className: cn("text-sm [&_p]:leading-relaxed", className) }, props)));
});
AlertDescription.displayName = "AlertDescription";
// Pre-configured alert components with icons
const AlertDestructive = React.forwardRef((_a, ref) => {
    var { title, description, className } = _a, props = __rest(_a, ["title", "description", "className"]);
    return (_jsxs(Alert, Object.assign({ variant: "destructive", ref: ref }, props, { children: [_jsx(AlertCircle, { className: "h-4 w-4" }), title && _jsx(AlertTitle, { children: title }), description && _jsx(AlertDescription, { children: description })] })));
});
AlertDestructive.displayName = "AlertDestructive";
const AlertWarning = React.forwardRef((_a, ref) => {
    var { title, description, className } = _a, props = __rest(_a, ["title", "description", "className"]);
    return (_jsxs(Alert, Object.assign({ variant: "warning", ref: ref }, props, { children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), title && _jsx(AlertTitle, { children: title }), description && _jsx(AlertDescription, { children: description })] })));
});
AlertWarning.displayName = "AlertWarning";
const AlertSuccess = React.forwardRef((_a, ref) => {
    var { title, description, className } = _a, props = __rest(_a, ["title", "description", "className"]);
    return (_jsxs(Alert, Object.assign({ variant: "success", ref: ref }, props, { children: [_jsx(CheckCircle, { className: "h-4 w-4" }), title && _jsx(AlertTitle, { children: title }), description && _jsx(AlertDescription, { children: description })] })));
});
AlertSuccess.displayName = "AlertSuccess";
const AlertInfo = React.forwardRef((_a, ref) => {
    var { title, description, className } = _a, props = __rest(_a, ["title", "description", "className"]);
    return (_jsxs(Alert, Object.assign({ variant: "info", ref: ref }, props, { children: [_jsx(Info, { className: "h-4 w-4" }), title && _jsx(AlertTitle, { children: title }), description && _jsx(AlertDescription, { children: description })] })));
});
AlertInfo.displayName = "AlertInfo";
export { Alert, AlertTitle, AlertDescription, AlertDestructive, AlertWarning, AlertSuccess, AlertInfo, alertVariants, };
//# sourceMappingURL=alert.js.map