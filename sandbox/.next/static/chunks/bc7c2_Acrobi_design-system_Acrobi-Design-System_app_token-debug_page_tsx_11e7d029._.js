(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TokenDebugPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/node_modules/.pnpm/next@15.5.2_@babel+core@7.28.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/node_modules/.pnpm/next@15.5.2_@babel+core@7.28.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../../src/components/ui/theme-provider'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function TokenDebugPage() {
    _s();
    const { mode, resolvedMode, theme, setMode, setTheme, toggleMode, toggleTheme } = useTheme();
    const [tokens, setTokens] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle hydration
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TokenDebugPage.useEffect": ()=>{
            setMounted(true);
        }
    }["TokenDebugPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TokenDebugPage.useEffect": ()=>{
            if (!mounted) return;
            // Get all CSS variable values from different layers
            const root = document.documentElement;
            const rootStyle = getComputedStyle(root);
            // Collect token values from different layers
            const tokenMap = {
                // Tier 1: @theme block values (Tailwind CSS v4 primitives)
                '@theme': {
                    '--color-background': rootStyle.getPropertyValue('--color-background'),
                    '--color-foreground': rootStyle.getPropertyValue('--color-foreground'),
                    '--color-primary': rootStyle.getPropertyValue('--color-primary'),
                    '--color-secondary': rootStyle.getPropertyValue('--color-secondary'),
                    '--color-muted': rootStyle.getPropertyValue('--color-muted'),
                    '--color-card': rootStyle.getPropertyValue('--color-card'),
                    '--color-border': rootStyle.getPropertyValue('--color-border'),
                    '--color-destructive': rootStyle.getPropertyValue('--color-destructive'),
                    '--color-success': rootStyle.getPropertyValue('--color-success'),
                    '--color-warning': rootStyle.getPropertyValue('--color-warning'),
                    '--color-info': rootStyle.getPropertyValue('--color-info')
                },
                // Tier 2: :root CSS variables (semantic tokens)
                ':root': {
                    '--background': rootStyle.getPropertyValue('--background'),
                    '--foreground': rootStyle.getPropertyValue('--foreground'),
                    '--primary': rootStyle.getPropertyValue('--primary'),
                    '--secondary': rootStyle.getPropertyValue('--secondary'),
                    '--muted': rootStyle.getPropertyValue('--muted'),
                    '--card': rootStyle.getPropertyValue('--card'),
                    '--border': rootStyle.getPropertyValue('--border'),
                    '--destructive': rootStyle.getPropertyValue('--destructive'),
                    '--success': rootStyle.getPropertyValue('--success'),
                    '--warning': rootStyle.getPropertyValue('--warning'),
                    '--info': rootStyle.getPropertyValue('--info')
                },
                // Tier 3: Computed values (actual rendered colors)
                'computed': {
                    'background': rootStyle.backgroundColor,
                    'foreground': rootStyle.color,
                    'primary': rootStyle.getPropertyValue('--color-primary'),
                    'secondary': rootStyle.getPropertyValue('--color-secondary'),
                    'muted': rootStyle.getPropertyValue('--color-muted'),
                    'card': rootStyle.getPropertyValue('--color-card'),
                    'border': rootStyle.getPropertyValue('--color-border'),
                    'destructive': rootStyle.getPropertyValue('--color-destructive'),
                    'success': rootStyle.getPropertyValue('--color-success'),
                    'warning': rootStyle.getPropertyValue('--color-warning'),
                    'info': rootStyle.getPropertyValue('--color-info')
                }
            };
            setTokens(tokenMap);
        }
    }["TokenDebugPage.useEffect"], [
        mode,
        theme,
        mounted
    ]);
    const formatColorValue = (value)=>{
        if (!value) return 'undefined';
        const clean = value.trim();
        // Check if it's hex
        if (clean.startsWith('#')) return clean;
        // Check if it's rgb/rgba
        if (clean.startsWith('rgb')) return clean;
        // Check if it's oklch
        if (clean.startsWith('oklch')) return clean;
        // Check if it's hsl
        if (clean.startsWith('hsl')) return clean;
        return clean;
    };
    const getColorSwatch = (color)=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-16 h-16 rounded-lg border-2 border-gray-300",
            style: {
                backgroundColor: color
            }
        }, void 0, false, {
            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
            lineNumber: 97,
            columnNumber: 7
        }, this);
    };
    const switchMode = (newMode)=>{
        setMode(newMode);
    };
    const switchColorTheme = (newTheme)=>{
        setTheme(newTheme);
    };
    const colorThemes = [
        'base',
        'blue',
        'purple',
        'green',
        'orange',
        'red'
    ];
    const modes = [
        'light',
        'dark',
        'system'
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-8",
        style: {
            backgroundColor: 'var(--background)',
            color: 'var(--foreground)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-6xl mx-auto space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl font-bold",
                            children: "🔍 Token System Debug"
                        }, void 0, false, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xl",
                            style: {
                                color: 'var(--muted-foreground)'
                            },
                            children: "Three-Tier Color Token Analysis with Theme Switching"
                        }, void 0, false, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 121,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center gap-6 text-sm flex-wrap",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Mode: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: mounted ? mode : '...'
                                        }, void 0, false, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 125,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Resolved: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: mounted ? resolvedMode : '...'
                                        }, void 0, false, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Theme: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: mounted ? theme : '...'
                                        }, void 0, false, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 127,
                                            columnNumber: 26
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        "Dark Class: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: mounted && document.documentElement.classList.contains('dark') ? 'YES' : 'NO'
                                        }, void 0, false, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 31
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 128,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 rounded-lg border",
                    style: {
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--border)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-semibold mb-4",
                            children: "🎨 Advanced Theme Controls"
                        }, void 0, false, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-3",
                                    children: "Mode (Light/Dark/System)"
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 flex-wrap",
                                    children: [
                                        modes.map((modeOption)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>switchMode(modeOption),
                                                className: "px-4 py-2 rounded-lg font-medium transition-all ".concat(mode === modeOption ? 'ring-2 ring-blue-500 text-white' : 'text-gray-700 hover:text-gray-900'),
                                                style: {
                                                    backgroundColor: mode === modeOption ? 'var(--primary)' : 'var(--muted)'
                                                },
                                                children: modeOption === 'light' ? '☀️ Light' : modeOption === 'dark' ? '🌙 Dark' : '💻 System'
                                            }, modeOption, false, {
                                                fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: toggleMode,
                                            className: "px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 border border-gray-300",
                                            style: {
                                                backgroundColor: 'var(--muted)'
                                            },
                                            children: "🔄 Toggle Mode"
                                        }, void 0, false, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-3",
                                    children: "Color Themes"
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 flex-wrap",
                                    children: [
                                        colorThemes.map((colorTheme)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>switchColorTheme(colorTheme),
                                                className: "px-4 py-2 rounded-lg font-medium transition-all ".concat(theme === colorTheme ? 'ring-2 ring-purple-500 text-white' : 'text-gray-700 hover:text-gray-900'),
                                                style: {
                                                    backgroundColor: theme === colorTheme ? 'var(--primary)' : 'var(--muted)'
                                                },
                                                children: colorTheme === 'base' ? '🎨 Base' : colorTheme === 'blue' ? '💙 Blue' : colorTheme === 'purple' ? '💜 Purple' : colorTheme === 'green' ? '💚 Green' : colorTheme === 'orange' ? '🧡 Orange' : '❤️ Red'
                                            }, colorTheme, false, {
                                                fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                lineNumber: 173,
                                                columnNumber: 17
                                            }, this)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: toggleTheme,
                                            className: "px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 border border-gray-300",
                                            style: {
                                                backgroundColor: 'var(--muted)'
                                            },
                                            children: "🎨 Toggle Theme"
                                        }, void 0, false, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                    lineNumber: 133,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 rounded-lg border",
                            style: {
                                backgroundColor: 'var(--card)',
                                borderColor: 'var(--border)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-4",
                                    children: "Tier 1: @theme Block"
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mb-4",
                                    style: {
                                        color: 'var(--muted-foreground)'
                                    },
                                    children: "Tailwind CSS v4 primitives (hex values)"
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 font-mono text-xs",
                                    children: Object.entries(tokens['@theme'] || {}).map((param)=>{
                                        let [key, value] = param;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center p-2 rounded",
                                            style: {
                                                backgroundColor: 'var(--muted)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        key,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono",
                                                    children: formatColorValue(value)
                                                }, void 0, false, {
                                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                    lineNumber: 217,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 208,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 rounded-lg border",
                            style: {
                                backgroundColor: 'var(--card)',
                                borderColor: 'var(--border)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-4",
                                    children: "Tier 2: :root Variables"
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mb-4",
                                    style: {
                                        color: 'var(--muted-foreground)'
                                    },
                                    children: "Semantic tokens (should reference Tier 1)"
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 font-mono text-xs",
                                    children: Object.entries(tokens[':root'] || {}).map((param)=>{
                                        let [key, value] = param;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center p-2 rounded",
                                            style: {
                                                backgroundColor: 'var(--muted)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        key,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono",
                                                    children: formatColorValue(value)
                                                }, void 0, false, {
                                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-6 rounded-lg border",
                            style: {
                                backgroundColor: 'var(--card)',
                                borderColor: 'var(--border)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-semibold mb-4",
                                    children: "Tier 3: Computed Values"
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm mb-4",
                                    style: {
                                        color: 'var(--muted-foreground)'
                                    },
                                    children: "Actual rendered colors (should match Tier 2)"
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 font-mono text-xs",
                                    children: Object.entries(tokens['computed'] || {}).map((param)=>{
                                        let [key, value] = param;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center p-2 rounded",
                                            style: {
                                                backgroundColor: 'var(--muted)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        key,
                                                        ":"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-mono",
                                                    children: formatColorValue(value)
                                                }, void 0, false, {
                                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 245,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 rounded-lg border",
                    style: {
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--border)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-semibold mb-4",
                            children: "Visual Color Swatches"
                        }, void 0, false, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 258,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4",
                            children: [
                                {
                                    name: 'Background',
                                    color: 'var(--background)'
                                },
                                {
                                    name: 'Foreground',
                                    color: 'var(--foreground)'
                                },
                                {
                                    name: 'Primary',
                                    color: 'var(--primary)'
                                },
                                {
                                    name: 'Secondary',
                                    color: 'var(--secondary)'
                                },
                                {
                                    name: 'Muted',
                                    color: 'var(--muted)'
                                },
                                {
                                    name: 'Card',
                                    color: 'var(--card)'
                                },
                                {
                                    name: 'Border',
                                    color: 'var(--border)'
                                },
                                {
                                    name: 'Destructive',
                                    color: 'var(--destructive)'
                                },
                                {
                                    name: 'Success',
                                    color: 'var(--success)'
                                },
                                {
                                    name: 'Warning',
                                    color: 'var(--warning)'
                                },
                                {
                                    name: 'Info',
                                    color: 'var(--info)'
                                }
                            ].map((param)=>{
                                let { name, color } = param;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center space-y-2",
                                    children: [
                                        getColorSwatch(color),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs font-mono",
                                            children: name
                                        }, void 0, false, {
                                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                            lineNumber: 275,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, name, true, {
                                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                    lineNumber: 257,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 rounded-lg border",
                    style: {
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--border)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-semibold mb-4",
                            children: "🔍 Issues Detected"
                        }, void 0, false, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded border",
                                style: {
                                    backgroundColor: 'var(--destructive)/10',
                                    borderColor: 'var(--destructive)/20'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold",
                                        style: {
                                            color: 'var(--destructive)'
                                        },
                                        children: "Check These Issues:"
                                    }, void 0, false, {
                                        fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list-disc list-inside text-sm mt-2 space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "Do Tier 1, 2, and 3 values match for each color?"
                                            }, void 0, false, {
                                                fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                lineNumber: 288,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "Are there any undefined or empty values?"
                                            }, void 0, false, {
                                                fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "Is there a format mismatch between tiers?"
                                            }, void 0, false, {
                                                fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "Does the .dark class properly override values?"
                                            }, void 0, false, {
                                                fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$REPOS$2f$Acrobi$2f$design$2d$system$2f$Acrobi$2d$Design$2d$System$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$2_$40$babel$2b$core$40$7$2e$28$2e$4_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: "Are CSS variables referencing the correct tier?"
                                            }, void 0, false, {
                                                fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                                lineNumber: 292,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                            lineNumber: 284,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
                    lineNumber: 282,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
            lineNumber: 117,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/REPOS/Acrobi/design-system/Acrobi-Design-System/app/token-debug/page.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
_s(TokenDebugPage, "5mHIA7C3BEQa1YnlK8NU9Pul6Lc=", false, function() {
    return [
        useTheme
    ];
});
_c = TokenDebugPage;
var _c;
__turbopack_context__.k.register(_c, "TokenDebugPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=bc7c2_Acrobi_design-system_Acrobi-Design-System_app_token-debug_page_tsx_11e7d029._.js.map