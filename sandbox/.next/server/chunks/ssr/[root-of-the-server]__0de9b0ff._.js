module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/REPOS/Acrobi/design-system/src/components/ui/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/node_modules/.pnpm/next@15.5.2_@babel+core@7.28.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/node_modules/.pnpm/next@15.5.2_@babel+core@7.28.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
// ===================================
// 📱 THEME CONTEXT PROVIDER
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This context provides theme mode functionality to the entire app
// - DO NOT modify the context structure
// - DO NOT add theme switching logic here - use CSS classes for client themes
// - The provider handles DOM manipulation for .dark class
// - localStorage persistence is automatic
// ===================================
const ThemeContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](undefined);
function ThemeProvider({ children, defaultMode = "system", defaultTheme = "base", modeStorageKey = "acrobi-theme-mode", themeStorageKey = "acrobi-color-theme", enableSystem = true }) {
    // 🚨 DO NOT modify these state initializations - they prevent hydration mismatches
    const [mode, setModeState] = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultMode);
    const [theme, setThemeState] = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultTheme);
    const [resolvedMode, setResolvedMode] = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("light");
    const [mounted, setMounted] = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    // ===================================
    // 🌙 DARK MODE APPLICATION
    // ===================================
    // 🚨 AI AGENT GUIDANCE:
    // - This function applies the dark mode class to the DOM
    // - DO NOT modify the DOM manipulation logic
    // - This ONLY handles .dark class addition/removal
    // - Color themes are handled separately in applyColorTheme
    // ===================================
    const applyThemeMode = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((newMode)=>{
        // 🚨 DO NOT modify this root element selection
        const root = window.document.documentElement;
        // Resolve system mode to actual light/dark
        let resolved = newMode;
        if (newMode === "system") {
            // 🚨 DO NOT modify this system preference detection
            resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
        }
        // Apply or remove dark mode class
        // 🚨 DO NOT modify this class logic - it's essential for CSS overrides
        if (resolved === "dark") {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        setResolvedMode(resolved);
        // Update meta theme-color for mobile browsers
        // 🚨 DO NOT remove this - it's essential for mobile app experience
        const themeColor = resolved === "dark" ? "var(--background)" : "var(--background)";
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', themeColor);
        } else {
            const meta = document.createElement('meta');
            meta.name = "theme-color";
            meta.content = themeColor;
            document.head.appendChild(meta);
        }
        // Debug logging - 🚨 DO NOT remove, helpful for development
        console.log(`🎨 Theme Mode: ${newMode} (resolved: ${resolved})`);
    }, []);
    // ===================================
    // 🎨 DYNAMIC THEME CSS LOADING
    // ===================================
    // 🚨 AI AGENT GUIDANCE:
    // - This function dynamically loads theme CSS files
    // - DO NOT modify the CSS loading logic
    // - This follows the proper architecture: separate theme files
    // - Works WITH dark mode - themes apply to both light and dark
    // ===================================
    const applyColorTheme = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](async (newTheme)=>{
        // 🚨 DO NOT modify this theme loading logic
        const root = window.document.documentElement;
        // Remove existing theme CSS links
        // 🚨 DO NOT modify this selector - it targets theme CSS links
        const existingThemeLinks = root.querySelectorAll('link[data-theme-css]');
        existingThemeLinks.forEach((link)=>link.remove());
        // Don't load CSS for base theme (uses globals.css defaults)
        if (newTheme === 'base') {
            console.log(`🎨 Color Theme: ${newTheme} (using base theme)`);
            return;
        }
        // Create and append new theme CSS link
        // 🚨 DO NOT modify this link creation logic
        const themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = `/themes/${newTheme}.css`;
        themeLink.setAttribute('data-theme-css', newTheme);
        themeLink.setAttribute('data-theme-name', newTheme);
        // Add the theme CSS to document head
        document.head.appendChild(themeLink);
        // Debug logging - 🚨 DO NOT remove, helpful for development
        console.log(`🎨 Color Theme: ${newTheme} (loaded /themes/${newTheme}.css)`);
    }, []);
    // ===================================
    // 💾 LOCAL STORAGE INITIALIZATION
    // ===================================
    // 🚨 AI AGENT GUIDANCE:
    // - This effect loads saved mode and theme preferences from localStorage
    // - DO NOT modify the storage key logic
    // - DO NOT change the mounted state handling
    // ===================================
    __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        // 🚨 DO NOT modify this storage key retrieval
        const storedMode = localStorage.getItem(modeStorageKey);
        const storedTheme = localStorage.getItem(themeStorageKey);
        if (storedMode) {
            setModeState(storedMode);
        }
        if (storedTheme) {
            setThemeState(storedTheme);
        }
        // 🚨 DO NOT remove this mounted state - prevents hydration mismatches
        setMounted(true);
    }, [
        modeStorageKey,
        themeStorageKey
    ]);
    // ===================================
    // 🎯 THEME MODE APPLICATION
    // ===================================
    // 🚨 AI AGENT GUIDANCE:
    // - This effect applies the theme mode when state changes
    // - DO NOT modify the dependency array
    // - DO NOT remove the mounted check
    // ===================================
    __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (mounted) {
            applyThemeMode(mode);
        }
    }, [
        mode,
        mounted,
        applyThemeMode
    ]);
    // ===================================
    // 🎨 COLOR THEME APPLICATION
    // ===================================
    // 🚨 AI AGENT GUIDANCE:
    // - This effect applies the color theme when state changes
    // - DO NOT modify the dependency array
    // - DO NOT remove the mounted check
    // ===================================
    __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (mounted) {
            applyColorTheme(theme);
        }
    }, [
        theme,
        mounted,
        applyColorTheme
    ]);
    // ===================================
    // 🖥️ SYSTEM PREFERENCE LISTENING
    // ===================================
    // 🚨 AI AGENT GUIDANCE:
    // - This effect listens for system theme preference changes
    // - DO NOT modify the media query or event handling
    // - DO NOT remove this - it's essential for system mode functionality
    // ===================================
    __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (!enableSystem) return;
        // 🚨 DO NOT modify this media query
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = ()=>{
            if (mode === "system") {
                applyThemeMode("system");
            }
        };
        // 🚨 DO NOT modify event listener management
        mediaQuery.addEventListener('change', handleChange);
        return ()=>mediaQuery.removeEventListener('change', handleChange);
    }, [
        mode,
        applyThemeMode,
        enableSystem
    ]);
    // ===================================
    // 🔄 MODE & THEME MANAGEMENT FUNCTIONS
    // ===================================
    // 🚨 AI AGENT GUIDANCE:
    // - These functions provide theme mode and color theme management
    // - DO NOT modify the localStorage logic
    // - DO NOT change the toggle cycling behavior
    // ===================================
    const setMode = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((newMode)=>{
        setModeState(newMode);
        // 🚨 DO NOT modify this localStorage persistence
        localStorage.setItem(modeStorageKey, newMode);
    }, [
        modeStorageKey
    ]);
    const toggleMode = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        // 🚨 DO NOT modify this cycling behavior
        const currentMode = mode;
        let newMode;
        if (currentMode === "light") {
            newMode = "dark";
        } else if (currentMode === "dark") {
            newMode = enableSystem ? "system" : "light";
        } else {
            newMode = "light";
        }
        setMode(newMode);
    }, [
        mode,
        enableSystem,
        setMode
    ]);
    const setTheme = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((newTheme)=>{
        setThemeState(newTheme);
        // 🚨 DO NOT modify this localStorage persistence
        localStorage.setItem(themeStorageKey, newTheme);
    }, [
        themeStorageKey
    ]);
    const toggleTheme = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"](()=>{
        // 🚨 DO NOT modify this cycling behavior
        const themes = [
            "base",
            "blue",
            "purple",
            "green",
            "orange",
            "red"
        ];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    }, [
        theme,
        setTheme
    ]);
    // Context value object
    // 🚨 DO NOT modify this structure - components depend on it
    const value = {
        mode,
        setMode,
        resolvedMode,
        toggleMode,
        theme,
        setTheme,
        toggleTheme
    };
    // ===================================
    // 🔒 HYDRATION MISMATCH PREVENTION
    // ===================================
    // 🚨 AI AGENT GUIDANCE:
    // - This prevents server/client rendering mismatches
    // - DO NOT modify this rendering logic
    // - DO NOT remove the mounted check
    // ===================================
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
            value: value,
            children: children
        }, void 0, false, {
            fileName: "[project]/REPOS/Acrobi/design-system/src/components/ui/theme-provider.tsx",
            lineNumber: 305,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/REPOS/Acrobi/design-system/src/components/ui/theme-provider.tsx",
        lineNumber: 312,
        columnNumber: 5
    }, this);
}
function useTheme() {
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](ThemeContext);
    if (context === undefined) {
        // 🚨 DO NOT modify this error message - it's essential for debugging
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0de9b0ff._.js.map