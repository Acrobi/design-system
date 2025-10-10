import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../components/ui/theme-provider'
import { SensoryProvider } from '../components/ui/sensory-provider'
import { GlobalNavigation } from '../components/ui/global-navigation'

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* ===================================
          🎨 THEME INITIALIZATION SCRIPT
          ===================================
          🚨 AI AGENT GUIDANCE:
          - This script runs BEFORE React to prevent FOUC (Flash of Unstyled Content)
          - DO NOT modify this script unless fixing initialization bugs
          - DO NOT remove this script - it's essential for proper theme loading
          - This ensures dark mode is applied before React hydrates
          ===================================*/}
      <script
        dangerouslySetInnerHTML={{
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
        }}
      />

      {/* ===================================
          🎭 PROVIDER HIERARCHY
          ===================================
          🚨 AI AGENT GUIDANCE:
          - The order of providers is important and intentional
          - SensoryProvider wraps everything for audio/haptic feedback
          - ThemeProvider provides dark/light mode switching
          - DO NOT change this provider order without understanding dependencies
          ===================================*/}

      {/* Sensory feedback provider - wraps entire app */}
      {/* 🚨 DO NOT remove or reposition this provider */}
      <SensoryProvider>
        {/* Theme mode provider - handles light/dark/system switching */}
        {/* 🚨 DO NOT remove or reposition this provider */}
        <ThemeProvider>
          {/* Main app container with theme-aware styling */}
          {/* 🚨 DO NOT remove suppressHydrationWarning - prevents false errors */}
          <div className="min-h-screen bg-background text-foreground" suppressHydrationWarning>
            {/* Global navigation - appears on all pages */}
            {/* 🚨 DO NOT remove navigation unless creating page-specific layouts */}
            <GlobalNavigation />

            {/* Page content - rendered component from pages directory */}
            {/* 🚨 DO NOT modify this props spreading */}
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </SensoryProvider>
    </>
  )
}

// ===================================
// 📚 APP ARCHITECTURE NOTES
// ===================================
// 🚨 AI AGENT GUIDANCE:
//
// PROVIDER ORDER (from outermost to innermost):
// 1. SensoryProvider - Provides audio/haptic feedback context
// 2. ThemeProvider - Provides light/dark/system theme context
// 3. Page Content - The actual page being rendered
//
// INITIALIZATION FLOW:
// 1. Theme script runs immediately (before React)
// 2. React hydrates with consistent initial state
// 3. Providers initialize with saved preferences
// 4. Theme provider applies any needed changes
//
// DO NOT:
// - Add providers that break the theme system
// - Modify the theme initialization script logic
// - Remove the suppressHydrationWarning prop
// - Change the global navigation placement
//
// MODIFY WITH CAUTION:
// - Add new providers outside the theme provider if they don't depend on theme
// - Update the container styling if changing the layout system
// - Modify the theme-color values to match design system changes
// ===================================