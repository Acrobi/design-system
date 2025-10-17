'use client'

import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '../../components/ui'
import { useTheme } from '../../components/ui/theme-provider'

export default function DarkModeTestPage() {
  const { mode, setMode, toggleMode, resolvedMode } = useTheme()
  const [testCount, setTestCount] = useState(0)

  return (
    <main className="container mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">🌙 Dark Mode Test</h1>
        <p className="text-xl text-muted-foreground">
          Test the theme switching functionality
        </p>
      </div>

      {/* Theme Controls */}
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Theme Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">Current Mode: <span className="font-bold">{mode}</span></p>
            <p className="text-sm font-medium">Resolved Mode: <span className="font-bold">{resolvedMode}</span></p>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={() => setMode('light')} variant={mode === 'light' ? 'default' : 'outline'}>
              ☀️ Light Mode
            </Button>
            <Button onClick={() => setMode('dark')} variant={mode === 'dark' ? 'default' : 'outline'}>
              🌙 Dark Mode
            </Button>
            <Button onClick={() => setMode('system')} variant={mode === 'system' ? 'default' : 'outline'}>
              💻 System Mode
            </Button>
            <Button onClick={toggleMode} variant="secondary">
              🔄 Toggle Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visual Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Primary Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-12 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              Primary
            </div>
            <div className="h-12 bg-secondary rounded-md flex items-center justify-center text-secondary-foreground">
              Secondary
            </div>
            <div className="h-12 bg-accent rounded-md flex items-center justify-center text-accent-foreground">
              Accent
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Colors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-12 bg-destructive rounded-md flex items-center justify-center text-destructive-foreground">
              Destructive
            </div>
            <div className="h-12 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
              Muted
            </div>
            <div className="h-12 border-2 border-border rounded-md flex items-center justify-center">
              Border
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interactive Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-2xl font-bold">{testCount}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTestCount(testCount - 1)}
                disabled={testCount <= 0}
              >
                -
              </Button>
              <Button
                size="sm"
                onClick={() => setTestCount(testCount + 1)}
              >
                +
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTestCount(0)}
              className="w-full"
            >
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Text Samples */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Text Samples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">This is normal text color.</p>
          <p className="text-muted-foreground">This is muted text color.</p>
          <p className="text-primary">This is primary text color.</p>
          <p className="text-destructive">This is destructive text color.</p>
          <div className="p-4 bg-muted rounded-md">
            <p className="text-muted-foreground">This is in a muted background container.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}