'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../../src/components/ui/theme-provider'

type ColorTheme = "base" | "blue" | "purple" | "green" | "orange" | "red"

export default function TokenDebugPage() {
  const { mode, resolvedMode, theme, setMode, setTheme, toggleMode, toggleTheme } = useTheme()
  const [tokens, setTokens] = useState<any>({})
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Get all CSS variable values from different layers
    const root = document.documentElement
    const rootStyle = getComputedStyle(root)

    // Collect token values from different layers
    const tokenMap: any = {
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
        '--color-info': rootStyle.getPropertyValue('--color-info'),
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
        '--info': rootStyle.getPropertyValue('--info'),
      },

      // Tier 3: Computed values (actual rendered colors)
      'computed': {
        'background': rootStyle.backgroundColor,
        'foreground': rootStyle.color,
        'primary': rootStyle.getPropertyValue('--color-primary'), // This will get computed value
        'secondary': rootStyle.getPropertyValue('--color-secondary'),
        'muted': rootStyle.getPropertyValue('--color-muted'),
        'card': rootStyle.getPropertyValue('--color-card'),
        'border': rootStyle.getPropertyValue('--color-border'),
        'destructive': rootStyle.getPropertyValue('--color-destructive'),
        'success': rootStyle.getPropertyValue('--color-success'),
        'warning': rootStyle.getPropertyValue('--color-warning'),
        'info': rootStyle.getPropertyValue('--color-info'),
      }
    }

    setTokens(tokenMap)
  }, [mode, theme, mounted])

  const formatColorValue = (value: string) => {
    if (!value) return 'undefined'
    const clean = value.trim()

    // Check if it's hex
    if (clean.startsWith('#')) return clean

    // Check if it's rgb/rgba
    if (clean.startsWith('rgb')) return clean

    // Check if it's oklch
    if (clean.startsWith('oklch')) return clean

    // Check if it's hsl
    if (clean.startsWith('hsl')) return clean

    return clean
  }

  const getColorSwatch = (color: string) => {
    return (
      <div
        className="w-16 h-16 rounded-lg border-2 border-gray-300"
        style={{ backgroundColor: color }}
      />
    )
  }

  const switchMode = (newMode: 'light' | 'dark' | 'system') => {
    setMode(newMode)
  }

  const switchColorTheme = (newTheme: ColorTheme) => {
    setTheme(newTheme)
  }

  const colorThemes: ColorTheme[] = ['base', 'blue', 'purple', 'green', 'orange', 'red']
  const modes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">🔍 Token System Debug</h1>
          <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>
            Three-Tier Color Token Analysis with Theme Switching
          </p>
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            <span>Mode: <strong>{mounted ? mode : '...'}</strong></span>
            <span>Resolved: <strong>{mounted ? resolvedMode : '...'}</strong></span>
            <span>Theme: <strong>{mounted ? theme : '...'}</strong></span>
            <span>Dark Class: <strong>{mounted && document.documentElement.classList.contains('dark') ? 'YES' : 'NO'}</strong></span>
          </div>
        </div>

        {/* Enhanced Theme Controls */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-semibold mb-4">🎨 Advanced Theme Controls</h2>

          {/* Mode Switching */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Mode (Light/Dark/System)</h3>
            <div className="flex gap-3 flex-wrap">
              {modes.map((modeOption) => (
                <button
                  key={modeOption}
                  onClick={() => switchMode(modeOption)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    mode === modeOption
                      ? 'ring-2 ring-blue-500 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{
                    backgroundColor: mode === modeOption ? 'var(--primary)' : 'var(--muted)'
                  }}
                >
                  {modeOption === 'light' ? '☀️ Light' :
                   modeOption === 'dark' ? '🌙 Dark' :
                   '💻 System'}
                </button>
              ))}
              <button
                onClick={toggleMode}
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 border border-gray-300"
                style={{ backgroundColor: 'var(--muted)' }}
              >
                🔄 Toggle Mode
              </button>
            </div>
          </div>

          {/* Color Theme Switching */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Color Themes</h3>
            <div className="flex gap-3 flex-wrap">
              {colorThemes.map((colorTheme) => (
                <button
                  key={colorTheme}
                  onClick={() => switchColorTheme(colorTheme)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    theme === colorTheme
                      ? 'ring-2 ring-purple-500 text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{
                    backgroundColor: theme === colorTheme ? 'var(--primary)' : 'var(--muted)'
                  }}
                >
                  {colorTheme === 'base' ? '🎨 Base' :
                   colorTheme === 'blue' ? '💙 Blue' :
                   colorTheme === 'purple' ? '💜 Purple' :
                   colorTheme === 'green' ? '💚 Green' :
                   colorTheme === 'orange' ? '🧡 Orange' :
                   '❤️ Red'}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 border border-gray-300"
                style={{ backgroundColor: 'var(--muted)' }}
              >
                🎨 Toggle Theme
              </button>
            </div>
          </div>
        </div>

        {/* Three Tier System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Tier 1: @theme Block */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 1: @theme Block</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Tailwind CSS v4 primitives (hex values)
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens['@theme'] || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                  <span>{key}:</span>
                  <span className="font-mono">{formatColorValue(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2: :root Variables */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 2: :root Variables</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Semantic tokens (should reference Tier 1)
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens[':root'] || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                  <span>{key}:</span>
                  <span className="font-mono">{formatColorValue(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3: Computed Values */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 3: Computed Values</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Actual rendered colors (should match Tier 2)
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens['computed'] || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                  <span>{key}:</span>
                  <span className="font-mono">{formatColorValue(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h3 className="text-xl font-semibold mb-4">Visual Color Swatches</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Background', color: 'var(--background)' },
              { name: 'Foreground', color: 'var(--foreground)' },
              { name: 'Primary', color: 'var(--primary)' },
              { name: 'Secondary', color: 'var(--secondary)' },
              { name: 'Muted', color: 'var(--muted)' },
              { name: 'Card', color: 'var(--card)' },
              { name: 'Border', color: 'var(--border)' },
              { name: 'Destructive', color: 'var(--destructive)' },
              { name: 'Success', color: 'var(--success)' },
              { name: 'Warning', color: 'var(--warning)' },
              { name: 'Info', color: 'var(--info)' },
            ].map(({ name, color }) => (
              <div key={name} className="text-center space-y-2">
                {getColorSwatch(color)}
                <div className="text-xs font-mono">{name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues Detected */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h3 className="text-xl font-semibold mb-4">🔍 Issues Detected</h3>
          <div className="space-y-4">
            <div className="p-4 rounded border" style={{ backgroundColor: 'var(--destructive)/10', borderColor: 'var(--destructive)/20' }}>
              <h4 className="font-semibold" style={{ color: 'var(--destructive)' }}>Check These Issues:</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                <li>Do Tier 1, 2, and 3 values match for each color?</li>
                <li>Are there any undefined or empty values?</li>
                <li>Is there a format mismatch between tiers?</li>
                <li>Does the .dark class properly override values?</li>
                <li>Are CSS variables referencing the correct tier?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}