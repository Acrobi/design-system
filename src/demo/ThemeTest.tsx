'use client'

import React, { useState, useEffect } from 'react'
import '../globals.css'
import '../themes/index.css'

interface ThemeTestProps {
  className?: string
}

export const ThemeTest: React.FC<ThemeTestProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [testResults, setTestResults] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    // Check system preference
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    setTheme(systemTheme)
    document.documentElement.classList.toggle('dark', systemTheme === 'dark')
  }, [])

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, result])
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')

    // Test dark mode switching
    setTimeout(() => {
      const hasDarkClass = document.documentElement.classList.contains('dark')
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim()
      const fgColor = getComputedStyle(document.documentElement).getPropertyValue('--foreground').trim()

      addTestResult(`✅ Theme switched to ${newTheme}`)
      addTestResult(`✅ Dark class applied: ${hasDarkClass}`)
      addTestResult(`✅ Background color: ${bgColor}`)
      addTestResult(`✅ Foreground color: ${fgColor}`)

      if (newTheme === 'dark') {
        const isDarkBg = bgColor.includes('n950') || bgColor === 'var(--n950)'
        const isLightFg = fgColor.includes('n50') || fgColor === 'var(--n50)'
        addTestResult(isDarkBg ? '✅ Dark mode background correct' : '❌ Dark mode background incorrect')
        addTestResult(isLightFg ? '✅ Dark mode foreground correct' : '❌ Dark mode foreground incorrect')
      } else {
        const isLightBg = bgColor === 'var(--n50)' || bgColor === '#ffffff'
        const isDarkFg = fgColor.includes('n900') || fgColor === 'var(--n900)'
        addTestResult(isLightBg ? '✅ Light mode background correct' : '❌ Light mode background incorrect')
        addTestResult(isDarkFg ? '✅ Light mode foreground correct' : '❌ Light mode foreground incorrect')
      }
    }, 100)
  }

  const testVariables = () => {
    const variables = [
      '--background',
      '--foreground',
      '--primary',
      '--primary-foreground',
      '--secondary',
      '--secondary-foreground',
      '--muted',
      '--muted-foreground',
      '--accent',
      '--accent-foreground',
      '--destructive',
      '--destructive-foreground',
      '--border',
      '--input',
      '--ring'
    ]

    addTestResult('🔍 Testing CSS Variables:')
    variables.forEach(variable => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
      const hasHardcodedValue = value.startsWith('#') && !variable.includes('background') && !variable.includes('card') && !variable.includes('popover')
      addTestResult(`${hasHardcodedValue ? '❌' : '✅'} ${variable}: ${value}`)
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className={`min-h-screen p-8 ${className}`} style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6">Theme System Test</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)'
            }}
          >
            Toggle Theme (Current: {theme})
          </button>

          <button
            onClick={testVariables}
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--secondary-foreground)'
            }}
          >
            Test Variables
          </button>

          <button
            onClick={() => setTestResults([])}
            className="px-4 py-2 rounded transition-colors"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)'
            }}
          >
            Clear Results
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--card-foreground)'
            }}
          >
            <h2 className="text-xl font-semibold mb-4">Current Theme: {theme.toUpperCase()}</h2>
            <div className="space-y-2 text-sm">
              <p>Background: <span className="font-mono" style={{ color: 'var(--muted-foreground)' }}>var(--background)</span></p>
              <p>Foreground: <span className="font-mono" style={{ color: 'var(--muted-foreground)' }}>var(--foreground)</span></p>
              <p>Primary: <span className="font-mono" style={{ color: 'var(--muted-foreground)' }}>var(--primary)</span></p>
              <p>Secondary: <span className="font-mono" style={{ color: 'var(--muted-foreground)' }}>var(--secondary)</span></p>
              <p>Muted: <span className="font-mono" style={{ color: 'var(--muted-foreground)' }}>var(--muted)</span></p>
              <p>Border: <span className="font-mono" style={{ color: 'var(--muted-foreground)' }}>var(--border)</span></p>
            </div>
          </div>

          <div
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'var(--muted)',
              borderColor: 'var(--border)',
              color: 'var(--muted-foreground)'
            }}
          >
            <h2 className="text-xl font-semibold mb-4">Test Components</h2>
            <div className="space-y-3">
              <button
                className="w-full px-3 py-2 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                Primary Button
              </button>
              <button
                className="w-full px-3 py-2 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--secondary-foreground)'
                }}
              >
                Secondary Button
              </button>
              <button
                className="w-full px-3 py-2 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--destructive)',
                  color: 'var(--destructive-foreground)'
                }}
              >
                Destructive Button
              </button>
            </div>
          </div>
        </div>

        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            color: 'var(--card-foreground)'
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-muted-foreground">No tests run yet. Click the buttons above to test the theme system.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono" style={{ color: 'var(--muted-foreground)' }}>
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--accent)',
            borderColor: 'var(--border)',
            color: 'var(--accent-foreground)'
          }}
        >
          <h2 className="text-xl font-semibold mb-4">System Information</h2>
          <div className="space-y-2 text-sm">
            <p>Dark mode preference: <span className="font-mono">{window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Yes' : 'No'}</span></p>
            <p>HTML dark class: <span className="font-mono">{document.documentElement.classList.contains('dark') ? 'Yes' : 'No'}</span></p>
            <p>CSS Variables supported: <span className="font-mono">{CSS.supports('color', 'var(--test)') ? 'Yes' : 'No'}</span></p>
            <p>Reduced motion: <span className="font-mono">{window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Yes' : 'No'}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeTest