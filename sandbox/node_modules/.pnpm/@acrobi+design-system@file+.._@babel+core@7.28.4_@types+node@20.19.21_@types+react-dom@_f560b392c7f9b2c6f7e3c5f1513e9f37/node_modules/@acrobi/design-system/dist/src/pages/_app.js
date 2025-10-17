import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import '../styles/globals.css';
import { ThemeProvider } from '../components/ui/theme-provider';
import { SensoryProvider } from '../components/ui/sensory-provider';
import { GlobalNavigation } from '../components/ui/global-navigation';
// ===================================
// 📱 APP ROOT COMPONENT
// ===================================
// 🚨 AI AGENT GUIDANCE:
// - This is the root component for the entire application
// - DO NOT modify the provider structure
// - DO NOT remove any of the providers unless refactoring the entire system
// - The order of providers is important - DO NOT change it
// - Theme initialization script must run before any React code
// ===================================
export default function App({ Component, pageProps }) {
    return (_jsxs(_Fragment, { children: [_jsx("script", { dangerouslySetInnerHTML: {
                    __html: `
            (function() {
              try {
                // 🚨 DO NOT modify this storage key - must match ThemeProvider
                var mode = localStorage.getItem('acrobi-theme-mode');
                var root = document.documentElement;

                // Apply dark mode based on saved preference
                // 🚨 DO NOT modify this dark mode logic
                var resolvedMode = 'light';
                if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  resolvedMode = 'dark';
                }

                // Apply dark mode class to root element
                // 🚨 DO NOT modify this DOM manipulation - essential for CSS overrides
                if (resolvedMode === 'dark') {
                  root.classList.add('dark');
                } else {
                  root.classList.remove('dark');
                }

                // Set theme-color meta tag for mobile browsers
                // 🚨 DO NOT remove this - essential for mobile app experience
                var meta = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
                meta.name = 'theme-color';
                meta.content = resolvedMode === 'dark' ? '#020817' : '#ffffff';
                if (!document.querySelector('meta[name="theme-color"]')) {
                  document.head.appendChild(meta);
                }
              } catch (e) {
                // 🚨 DO NOT remove this error handling - prevents app crashes
                console.error('Theme initialization error:', e);
              }
            })();
          `,
                } }), _jsx(SensoryProvider, { children: _jsx(ThemeProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground", suppressHydrationWarning: true, children: [_jsx(GlobalNavigation, {}), _jsx(Component, Object.assign({}, pageProps))] }) }) })] }));
}
//# sourceMappingURL=_app.js.map