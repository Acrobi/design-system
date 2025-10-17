"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./button";
import { useTheme } from "./theme-provider";
// ===================================
// 🎨 THEME SELECTOR CONFIGURATION
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This component provides theme mode switching UI
// - DO NOT add theme color selection (blue, purple, green) here
// - DO NOT modify the mode icons or their meanings
// - This is a compact version for navigation bars
// - For full theme selection, create a separate component
// ===================================
// Mode icons - 🚨 DO NOT modify these emoji assignments
const modeIcons = {
    light: "☀️", // Light mode icon
    dark: "🌙", // Dark mode icon
    system: "💻" // System preference icon
};
// ===================================
// 🎛️ COMPACT THEME SELECTOR
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This component renders a compact theme selector for navigation
// - DO NOT modify the layout structure significantly
// - DO NOT add theme color selection options
// - DO NOT change the button styling to break navigation design
// - The select dropdown allows explicit mode selection
// ===================================
export function ThemeSelectorCompact() {
    // 🚨 DO NOT modify this hook usage - it's essential for theme functionality
    const { mode, setMode, toggleMode, resolvedMode } = useTheme();
    // 🚨 DO NOT modify this rendering structure - prevents hydration mismatches
    return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: toggleMode, className: "px-2 py-1 h-8", title: `Current: ${mode} (${resolvedMode}) - Click to toggle`, children: modeIcons[mode] }), _jsxs("select", { value: mode, onChange: (e) => {
                    // 🚨 DO NOT modify this mode change handling
                    const newMode = e.target.value;
                    console.log(`🔄 Theme mode changed to: ${newMode}`);
                    setMode(newMode);
                }, className: "flex h-8 rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer", children: [_jsx("option", { value: "light", children: "\u2600\uFE0F Light" }), _jsx("option", { value: "dark", children: "\uD83C\uDF19 Dark" }), _jsx("option", { value: "system", children: "\uD83D\uDCBB System" })] })] }));
}
//# sourceMappingURL=theme-selector-compact.js.map