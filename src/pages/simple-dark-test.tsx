import React from 'react'
import { useTheme } from '../components/ui/theme-provider'

export default function SimpleDarkTest() {
  const { mode, resolvedMode, theme, toggleMode } = useTheme()

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-foreground)' }}>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Simple Dark Mode Test</h1>

        <div className="p-6 border-2 rounded-lg" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)', color: 'var(--color-card-foreground)' }}>
          <h2 className="text-2xl font-semibold mb-4">Current Theme State</h2>
          <div className="space-y-2 font-mono text-sm">
            <p>Mode: {mode}</p>
            <p>Resolved: {resolvedMode}</p>
            <p>Theme: {theme}</p>
          </div>
          <button
            onClick={toggleMode}
            className="mt-4 px-6 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-foreground)',
              border: '1px solid var(--color-border)'
            }}
          >
            Toggle Dark Mode
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)', borderColor: 'var(--color-border)' }}>
            <p>Primary</p>
          </div>
          <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-secondary-foreground)', borderColor: 'var(--color-border)' }}>
            <p>Secondary</p>
          </div>
          <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--color-muted)', color: 'var(--color-muted-foreground)', borderColor: 'var(--color-border)' }}>
            <p>Muted</p>
          </div>
        </div>

        <div className="p-4 border rounded-lg" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)', borderColor: 'var(--color-border)' }}>
          <p>This should be very obvious when dark mode toggles!</p>
        </div>

        <div className="text-sm space-y-2">
          <p><strong>Instructions:</strong></p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click the "Toggle Dark Mode" button</li>
            <li>Watch for dramatic background color change</li>
            <li>Background should go from white to pure black</li>
            <li>Text should go from black to pure white</li>
          </ol>
        </div>
      </div>
    </div>
  )
}