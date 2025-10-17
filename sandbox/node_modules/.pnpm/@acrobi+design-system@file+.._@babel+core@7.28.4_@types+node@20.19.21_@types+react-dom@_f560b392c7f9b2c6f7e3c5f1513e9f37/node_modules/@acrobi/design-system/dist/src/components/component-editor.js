"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// This editor is now the primary testing ground for the design system.
// We will add the advanced workbench logic here in future steps.
const Preview = () => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Theme Preview" }) }), _jsxs(CardContent, { children: [_jsx("p", { children: "This component's colors are rendered by the local theme." }), _jsxs("div", { className: "flex gap-4 mt-4", children: [_jsx(Button, { children: "Primary" }), _jsx(Button, { variant: "secondary", children: "Secondary" })] })] })] }));
export function ComponentEditor() {
    return (_jsx("div", { className: "space-y-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-8", children: [_jsxs("div", { className: "p-8 rounded-lg bg-background border-border border", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Light Mode" }), _jsx(Preview, {})] }), _jsxs("div", { className: "dark p-8 rounded-lg bg-background border-border border", children: [_jsx("h2", { className: "text-2xl font-semibold mb-4 text-foreground", children: "Dark Mode" }), _jsx(Preview, {})] })] }), _jsx("div", { className: "space-y-6", children: _jsx(ThemeSelector, {}) })] }) }));
}
//# sourceMappingURL=component-editor.js.map