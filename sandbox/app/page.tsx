import { Button } from '../components/ui'
import { useTheme } from '../components/ui/theme-provider'
import Link from 'next/link'

export default function Home() {
  const { mode, toggleMode, resolvedMode } = useTheme()

  return (
    <main className="container mx-auto py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Acrobi Design System</h1>
          <p className="text-xl text-muted-foreground">
            Playground and Testing Environment
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span>Current theme: <strong>{mode}</strong> (resolved: <strong>{resolvedMode}</strong>)</span>
            <Button variant="outline" size="sm" onClick={toggleMode}>
              🌓 Toggle
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Test Pages</h2>
            <div className="space-y-2">
              <Link href="/test" className="block">
                <Button variant="outline" className="w-full justify-start">
                  🧪 Component Tests
                </Button>
              </Link>
              <Link href="/dark-mode-test" className="block">
                <Button variant="outline" className="w-full justify-start">
                  🌙 Dark Mode Test
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Quick Theme Test</h2>
            <div className="p-4 border rounded-md space-y-2">
              <div className="h-8 bg-primary rounded" />
              <div className="h-8 bg-secondary rounded" />
              <div className="h-8 bg-accent rounded" />
              <div className="h-8 bg-muted rounded" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            This is a testing environment for the Acrobi Design System.
            Use this space to develop and test new components.
          </p>
        </div>
      </div>
    </main>
  )
}