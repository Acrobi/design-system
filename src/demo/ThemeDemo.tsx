'use client'

import React, { useState, useEffect } from 'react'
import '../globals.css'
import '../themes/index.css'

interface ThemeDemoProps {
  className?: string
}

export const ThemeDemo: React.FC<ThemeDemoProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(systemTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  return (
    <div className={`min-h-screen bg-background text-foreground p-8 ${className}`}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Theme System Demo</h1>
          <button
            onClick={toggleTheme}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        {/* Color Palette */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Color Palette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Primary Colors */}
            <div className="space-y-2">
              <h3 className="font-medium">Primary Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                {['primary', 'primary-foreground'].map((color) => (
                  <div key={color} className="space-y-1">
                    <div
                      className="h-12 rounded border border-border"
                      style={{ backgroundColor: `var(--${color})` }}
                    />
                    <p className="text-xs text-muted-foreground">{color}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-2">
              <h3 className="font-medium">Secondary Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                {['secondary', 'secondary-foreground'].map((color) => (
                  <div key={color} className="space-y-1">
                    <div
                      className="h-12 rounded border border-border"
                      style={{ backgroundColor: `var(--${color})` }}
                    />
                    <p className="text-xs text-muted-foreground">{color}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Colors */}
            <div className="space-y-2">
              <h3 className="font-medium">Status Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'status-success',
                  'status-warning',
                  'status-error',
                  'status-info'
                ].map((color) => (
                  <div key={color} className="space-y-1">
                    <div
                      className="h-12 rounded border border-border"
                      style={{ backgroundColor: `var(--${color})` }}
                    />
                    <p className="text-xs text-muted-foreground">{color.replace('status-', '')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Surface Colors */}
            <div className="space-y-2">
              <h3 className="font-medium">Surface Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                {['background', 'card', 'muted', 'accent'].map((color) => (
                  <div key={color} className="space-y-1">
                    <div
                      className="h-12 rounded border border-border"
                      style={{ backgroundColor: `var(--${color})` }}
                    />
                    <p className="text-xs text-muted-foreground">{color}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Destructive Colors */}
            <div className="space-y-2">
              <h3 className="font-medium">Destructive Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                {['destructive', 'destructive-foreground'].map((color) => (
                  <div key={color} className="space-y-1">
                    <div
                      className="h-12 rounded border border-border"
                      style={{ backgroundColor: `var(--${color})` }}
                    />
                    <p className="text-xs text-muted-foreground">{color.replace('destructive-', '')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Colors */}
            <div className="space-y-2">
              <h3 className="font-medium">Border Colors</h3>
              <div className="grid grid-cols-2 gap-2">
                {['border', 'input', 'ring'].map((color) => (
                  <div key={color} className="space-y-1">
                    <div
                      className="h-12 rounded border-2"
                      style={{ borderColor: `var(--${color})`, backgroundColor: 'var(--background)' }}
                    />
                    <p className="text-xs text-muted-foreground">{color}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Typography</h2>
          <div className="space-y-4">
            {[
              { size: 'text-4xl', label: 'Heading 1' },
              { size: 'text-3xl', label: 'Heading 2' },
              { size: 'text-2xl', label: 'Heading 3' },
              { size: 'text-xl', label: 'Heading 4' },
              { size: 'text-lg', label: 'Large' },
              { size: 'text-base', label: 'Body' },
              { size: 'text-sm', label: 'Small' },
              { size: 'text-xs', label: 'Extra Small' }
            ].map(({ size, label }) => (
              <div key={size} className="space-y-2">
                <p className={`${size} font-medium`} style={{ fontSize: `var(--${size.replace('text-', 'text-')})` }}>
                  {label} - The quick brown fox jumps over the lazy dog
                </p>
                <p className="text-xs text-muted-foreground">{size}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Elements */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Interactive Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Buttons */}
            <div className="space-y-2">
              <h3 className="font-medium">Buttons</h3>
              <div className="space-y-2">
                <button
                  className="w-full px-4 py-2 rounded-lg border border-border transition-colors"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    borderColor: 'var(--border)'
                  }}
                >
                  Primary Button
                </button>
                <button
                  className="w-full px-4 py-2 rounded-lg border border-border transition-colors"
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                    borderColor: 'var(--border)'
                  }}
                >
                  Secondary Button
                </button>
                <button
                  className="w-full px-4 py-2 rounded-lg border border-border transition-colors"
                  style={{
                    backgroundColor: 'var(--destructive)',
                    color: 'var(--destructive-foreground)',
                    borderColor: 'var(--border)'
                  }}
                >
                  Destructive Button
                </button>
              </div>
            </div>

            {/* Form Elements */}
            <div className="space-y-2">
              <h3 className="font-medium">Form Elements</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Text input"
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--input)',
                    '--tw-ring-color': 'var(--ring)'
                  } as React.CSSProperties}
                />
                <textarea
                  placeholder="Textarea"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--input)',
                    '--tw-ring-color': 'var(--ring)'
                  } as React.CSSProperties}
                />
                <select
                  className="w-full px-3 py-2 rounded-lg border border-border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    borderColor: 'var(--input)',
                    '--tw-ring-color': 'var(--ring)'
                  } as React.CSSProperties}
                >
                  <option>Select option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-2">
              <h3 className="font-medium">Cards</h3>
              <div className="space-y-2">
                <div
                  className="p-4 rounded-lg border border-border"
                  style={{
                    backgroundColor: 'var(--card)',
                    color: 'var(--card-foreground)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <h4 className="font-medium mb-2">Card Title</h4>
                  <p className="text-sm text-muted-foreground">
                    This is a card component with proper theming.
                  </p>
                </div>
                <div
                  className="p-4 rounded-lg border border-border"
                  style={{
                    backgroundColor: 'var(--muted)',
                    color: 'var(--muted-foreground)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <h4 className="font-medium mb-2">Muted Card</h4>
                  <p className="text-sm">
                    This is a muted card for less important content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gradients */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Gradients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'gradient-primary',
              'gradient-secondary',
              'gradient-success',
              'gradient-warning',
              'gradient-error'
            ].map((gradient) => (
              <div key={gradient} className="space-y-2">
                <div
                  className="h-24 rounded-lg border border-border"
                  style={{
                    background: `var(--${gradient})`,
                    borderColor: 'var(--border)'
                  }}
                />
                <p className="text-xs text-muted-foreground">{gradient.replace('gradient-', '')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Spacing</h2>
          <div className="space-y-4">
            {['space-1', 'space-2', 'space-3', 'space-4', 'space-6', 'space-8'].map((space) => (
              <div key={space} className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground w-16">{space}</span>
                <div
                  className="bg-primary rounded"
                  style={{
                    width: `var(--${space})`,
                    height: `var(--${space})`,
                    backgroundColor: 'var(--primary)'
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Shadow Levels */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl'].map((shadow) => (
              <div key={shadow} className="space-y-2">
                <div
                  className="h-24 rounded-lg bg-card"
                  style={{
                    boxShadow: `var(--${shadow})`,
                    backgroundColor: 'var(--card)'
                  }}
                />
                <p className="text-xs text-muted-foreground text-center">{shadow}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Border Radius</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['radius-sm', 'radius-md', 'radius-lg', 'radius-xl'].map((radius) => (
              <div key={radius} className="space-y-2">
                <div
                  className="h-24 bg-primary"
                  style={{
                    borderRadius: `var(--${radius})`,
                    backgroundColor: 'var(--primary)'
                  }}
                />
                <p className="text-xs text-muted-foreground text-center">{radius}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ThemeDemo