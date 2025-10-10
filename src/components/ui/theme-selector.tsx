"use client"

import * as React from "react"
import { Button } from "./button"

interface Theme {
  name: string
  displayName: string
  primaryColor: string
  primaryHover: string
}

const themes: Theme[] = [
  {
    name: "default",
    displayName: "Default Theme",
    primaryColor: "#1975f0",
    primaryHover: "#1664d8"
  },
  {
    name: "client-a",
    displayName: "Client A",
    primaryColor: "#8b5cf6", // Purple
    primaryHover: "#7c3aed"
  },
  {
    name: "client-b",
    displayName: "Client B",
    primaryColor: "#10b981", // Green
    primaryHover: "#059669"
  }
]

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = React.useState<string>("default")
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  const applyTheme = (theme: Theme) => {
    // Create or update style element for theme variables
    let themeStyle = document.getElementById('dynamic-theme-vars')
    if (!themeStyle) {
      themeStyle = document.createElement('style')
      themeStyle.id = 'dynamic-theme-vars'
      document.head.appendChild(themeStyle)
    }

    // Apply theme colors as CSS custom properties
    const cssVariables = `
      :root {
        --primary: ${theme.primaryColor};
        --primary-foreground: #ffffff;
        --ring: ${theme.primaryColor}99;
      }

      .dark {
        --primary: ${theme.primaryHover};
        --primary-foreground: #ffffff;
        --ring: ${theme.primaryHover}99;
      }

      .hover\\:bg-primary\\/90:hover {
        background-color: ${theme.primaryColor};
        opacity: 0.9;
      }

      .bg-primary {
        background-color: ${theme.primaryColor};
      }

      .text-primary {
        color: ${theme.primaryColor};
      }

      .focus-within\\:ring-primary:focus-within {
        --tw-ring-color: ${theme.primaryColor}99;
      }

      .ring-primary {
        --tw-ring-color: ${theme.primaryColor}99;
      }
    `

    themeStyle.textContent = cssVariables
    setCurrentTheme(theme.name)
  }

  const toggleDarkMode = () => {
    const html = document.documentElement
    if (isDarkMode) {
      html.classList.remove('dark')
    } else {
      html.classList.add('dark')
    }
    setIsDarkMode(!isDarkMode)
  }

  React.useEffect(() => {
    // Apply default theme on mount
    const defaultTheme = themes.find(t => t.name === "default")!
    applyTheme(defaultTheme)
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Theme Selector</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDarkMode}
          className="ml-4"
        >
          {isDarkMode ? "☀️ Light" : "🌙 Dark"}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="theme-select" className="text-sm font-medium">
          Select Theme:
        </label>
        <select
          id="theme-select"
          value={currentTheme}
          onChange={(e) => {
            const theme = themes.find(t => t.name === e.target.value)
            if (theme) applyTheme(theme)
          }}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {themes.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.displayName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mt-2">
        <Button variant="default">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
      </div>

      <div className="text-xs text-muted-foreground mt-2">
        Current theme: <strong>{themes.find(t => t.name === currentTheme)?.displayName}</strong>
        {currentTheme !== "default" && (
          <span className="ml-2">
            ({currentTheme === "client-a" ? "Purple" : "Green"} theme active)
          </span>
        )}
      </div>
    </div>
  )
}