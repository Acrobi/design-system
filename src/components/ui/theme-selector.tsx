"use client"

import * as React from "react"
import { Button } from "./button"
import { useTheme } from "./theme-provider"
import { cn } from "../../lib/utils"

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
] as const

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
  // 🚨 DO NOT modify this hook usage - it's essential for theme functionality
  const { theme, setTheme, toggleTheme, mode, toggleMode } = useTheme()

  // 🚨 DO NOT modify this rendering structure - prevents hydration mismatches
  return (
    <div className="flex items-center gap-3">
      {/* Mode toggle button - for light/dark/system switching */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMode}
        className="px-2 py-1 h-8"
        title={`Mode: ${mode} - Click to toggle`}
      >
        {/* 🚨 DO NOT modify these mode icons */}
        {mode === "light" && "☀️"}
        {mode === "dark" && "🌙"}
        {mode === "system" && "💻"}
      </Button>

      {/* Color theme selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Theme:</span>
        <select
          value={theme}
          onChange={(e) => {
            // 🚨 DO NOT modify this theme change handling
            const newTheme = e.target.value as typeof theme
            console.log(`🎨 Color theme changed to: ${newTheme}`)
            setTheme(newTheme)
          }}
          className="flex h-8 rounded-md border border-input bg-background px-2 py-1 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer min-w-[80px]"
        >
          {/* 🚨 DO NOT modify these option values or display text */}
          {colorThemes.map((themeOption) => (
            <option key={themeOption.name} value={themeOption.name}>
              {themeOption.label}
            </option>
          ))}
        </select>

        {/* Theme preview button - cycles through themes */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="px-2 py-1 h-8 w-8 p-0"
          title={`Current: ${theme} - Click to cycle`}
        >
          {/* 🚨 DO NOT modify this preview display */}
          <div
            className={cn(
              colorThemes.find(t => t.name === theme)?.preview || "",
              "w-3 h-3 rounded-sm"
            )}
          />
        </Button>
      </div>
    </div>
  )
}

// ===================================
// 📚 COMPONENT USAGE GUIDELINES
// ===================================
// 🚨 AI AGENT GUIDANCE:
// USAGE EXAMPLES:
//
// 1. In Navigation:
//    <ThemeSelector />
//
// 2. In Settings Panel:
//    <ThemeSelector />
//
// DO NOT:
// - Use this component for mode-only switching
// - Modify the styling to break navigation layout
// - Remove or change the theme previews
// - Add additional color options here
//
// THE COLOR THEMES ARE:
// - base: shadcn/ui default (black/white)
// - blue: Professional blue primary
// - purple: Creative purple primary
// - green: Natural green primary
// - orange: Energetic orange primary
// - red: Bold red primary
// ===================================