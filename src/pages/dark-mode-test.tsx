import React from 'react'
import { useTheme } from '../components/ui/theme-provider'

export default function DarkModeTest() {
  const { mode, resolvedMode, theme, toggleMode } = useTheme()

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Dark Mode Test</h1>

        <div className="p-6 border-2 rounded-lg bg-card text-card-foreground border-border">
          <h2 className="text-2xl font-semibold mb-4">Current Theme State</h2>
          <div className="space-y-2 font-mono text-sm">
            <p>Mode: {mode}</p>
            <p>Resolved: {resolvedMode}</p>
            <p>Theme: {theme}</p>
          </div>
          <button
            onClick={toggleMode}
            className="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold"
          >
            Toggle Dark Mode
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-primary text-primary-foreground rounded-lg">
            <p>Primary</p>
          </div>
          <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
            <p>Secondary</p>
          </div>
          <div className="p-4 bg-muted text-muted-foreground rounded-lg">
            <p>Muted</p>
          </div>
        </div>

        <div className="p-4 bg-accent text-accent-foreground rounded-lg">
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