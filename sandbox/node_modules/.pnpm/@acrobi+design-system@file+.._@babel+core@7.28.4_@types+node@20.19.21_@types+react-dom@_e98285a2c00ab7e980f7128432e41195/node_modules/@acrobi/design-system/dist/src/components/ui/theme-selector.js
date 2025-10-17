"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "./button";
import { useTheme } from "./theme-provider";
import { cn } from "../../lib/utils";
// ===================================
// 🎨 THEME SELECTOR CONFIGURATION
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This component provides color theme switching UI
// - DO NOT modify the theme definitions or colors
// - DO NOT change the theme order or naming convention
// - This shows actual color themes, not light/dark modes
// ===================================
// Color theme definitions - 🚨 DO NOT modify these values
const colorThemes = [
    {
        name: "base",
        label: "Base",
        description: "shadcn/ui default theme",
        preview: "bg-gradient-to-r from-gray-100 to-gray-900 dark:from-gray-900 dark:to-gray-100"
    },
    {
        name: "blue",
        label: "Blue",
        description: "Professional blue primary",
        preview: "bg-gradient-to-r from-blue-400 to-blue-600"
    },
    {
        name: "purple",
        label: "Purple",
        description: "Creative purple primary",
        preview: "bg-gradient-to-r from-purple-400 to-purple-600"
    },
    {
        name: "green",
        label: "Green",
        description: "Natural green primary",
        preview: "bg-gradient-to-r from-green-400 to-green-600"
    },
    {
        name: "orange",
        label: "Orange",
        description: "Energetic orange primary",
        preview: "bg-gradient-to-r from-orange-400 to-orange-600"
    },
    {
        name: "red",
        label: "Red",
        description: "Bold red primary",
        preview: "bg-gradient-to-r from-red-400 to-red-600"
    }
];
// ===================================
// 🎛️ THEME SELECTOR COMPONENT
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This component renders color theme selection UI
// - DO NOT modify the layout structure significantly
// - DO NOT remove the theme preview functionality
// - The select dropdown allows explicit theme selection
// ===================================
export function ThemeSelector() {
    var _a;
    // 🚨 DO NOT modify this hook usage - it's essential for theme functionality
    const { theme, setTheme, toggleTheme, mode, toggleMode } = useTheme();
    // 🚨 DO NOT modify this rendering structure - prevents hydration mismatches
    return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: toggleMode, className: "px-2 py-1 h-8", title: `Mode: ${mode} - Click to toggle`, children: [mode === "light" && "☀️", mode === "dark" && "🌙", mode === "system" && "💻"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Theme:" }), _jsx("select", { value: theme, onChange: (e) => {
                            // 🚨 DO NOT modify this theme change handling
                            const newTheme = e.target.value;
                            console.log(`🎨 Color theme changed to: ${newTheme}`);
                            setTheme(newTheme);
                        }, className: "flex h-8 rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer min-w-[80px]", children: colorThemes.map((themeOption) => (_jsx("option", { value: themeOption.name, children: themeOption.label }, themeOption.name))) }), _jsx(Button, { variant: "outline", size: "sm", onClick: toggleTheme, className: "px-2 py-1 h-8 w-8 p-0", title: `Current: ${theme} - Click to cycle`, children: _jsx("div", { className: cn(((_a = colorThemes.find(t => t.name === theme)) === null || _a === void 0 ? void 0 : _a.preview) || "", "w-3 h-3 rounded-sm") }) })] })] }));
}
//# sourceMappingURL=theme-selector.js.map