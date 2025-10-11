import React from 'react'
import { useTheme } from '../components/ui/theme-provider'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function ThemeTestPage() {
  const { theme, setTheme, toggleTheme, mode, toggleMode, resolvedMode } = useTheme()

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Theme System Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <strong>Current Mode:</strong> {mode} (resolved: {resolvedMode})
          </div>
          <div>
            <strong>Current Theme:</strong> {theme}
          </div>

          <div className="space-y-2">
            <Button onClick={toggleMode}>Toggle Mode</Button>
            <Button onClick={toggleTheme} variant="outline">Toggle Theme</Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['base', 'blue', 'purple', 'green', 'orange', 'red'].map((t) => (
              <Button
                key={t}
                onClick={() => setTheme(t as any)}
                variant={theme === t ? 'default' : 'outline'}
                size="sm"
              >
                {t}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="p-4 bg-primary text-primary-foreground rounded">
              Primary Color Test
            </div>
            <div className="p-4 bg-secondary text-secondary-foreground rounded">
              Secondary Color Test
            </div>
            <div className="p-4 border rounded">
              Border Test
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}