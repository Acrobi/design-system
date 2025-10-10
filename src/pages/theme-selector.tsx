import React from 'react'
import { ThemeSelector } from '../components/ui/theme-selector'
import { ThemeSelectorCompact } from '../components/ui/theme-selector-compact'
import { SensoryProvider } from '../components/ui/sensory-provider'

export default function ThemeSelectorPage() {
  return (
    <SensoryProvider>
      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Theme Selector Component</h1>
            <p className="text-muted-foreground text-lg">
              Theme switching components for dynamic color customization
            </p>
          </div>

          {/* Standard Theme Selector */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Standard Theme Selector</h2>
            <div className="border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-4">
                The standard theme selector provides an intuitive interface for switching between predefined color themes.
              </p>
              <div className="flex justify-center">
                <ThemeSelector />
              </div>
            </div>
          </div>

          {/* Compact Theme Selector */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Compact Theme Selector</h2>
            <div className="border rounded-lg p-6">
              <p className="text-sm text-muted-foreground mb-4">
                The compact version is ideal for navigation bars and tight spaces.
              </p>
              <div className="flex justify-center">
                <ThemeSelectorCompact />
              </div>
            </div>
          </div>

          {/* Available Themes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Available Themes</h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Base Theme */}
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-800"></div>
                  <h3 className="font-semibold">Base Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Clean and professional slate-based design system
                </p>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 rounded bg-slate-600" title="Primary"></div>
                  <div className="w-4 h-4 rounded bg-slate-100" title="Secondary"></div>
                  <div className="w-4 h-4 rounded bg-slate-50" title="Background"></div>
                </div>
              </div>

              {/* Blue Theme */}
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                  <h3 className="font-semibold">Blue Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Professional blue palette for corporate applications
                </p>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 rounded bg-blue-600" title="Primary"></div>
                  <div className="w-4 h-4 rounded bg-blue-100" title="Secondary"></div>
                  <div className="w-4 h-4 rounded bg-blue-50" title="Background"></div>
                </div>
              </div>

              {/* Purple Theme */}
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-700"></div>
                  <h3 className="font-semibold">Purple Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Creative purple palette for modern interfaces
                </p>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 rounded bg-purple-600" title="Primary"></div>
                  <div className="w-4 h-4 rounded bg-purple-100" title="Secondary"></div>
                  <div className="w-4 h-4 rounded bg-purple-50" title="Background"></div>
                </div>
              </div>

              {/* Green Theme */}
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-600 to-green-800"></div>
                  <h3 className="font-semibold">Green Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Natural green palette for eco-friendly applications
                </p>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 rounded bg-green-600" title="Primary"></div>
                  <div className="w-4 h-4 rounded bg-green-100" title="Secondary"></div>
                  <div className="w-4 h-4 rounded bg-green-50" title="Background"></div>
                </div>
              </div>

              {/* Orange Theme */}
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-700"></div>
                  <h3 className="font-semibold">Orange Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Energetic orange palette for vibrant interfaces
                </p>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 rounded bg-orange-500" title="Primary"></div>
                  <div className="w-4 h-4 rounded bg-orange-100" title="Secondary"></div>
                  <div className="w-4 h-4 rounded bg-orange-50" title="Background"></div>
                </div>
              </div>

              {/* Red Theme */}
              <div className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-700"></div>
                  <h3 className="font-semibold">Red Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bold red palette for high-impact applications
                </p>
                <div className="flex space-x-2">
                  <div className="w-4 h-4 rounded bg-red-600" title="Primary"></div>
                  <div className="w-4 h-4 rounded bg-red-100" title="Secondary"></div>
                  <div className="w-4 h-4 rounded bg-red-50" title="Background"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Notes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Implementation Features</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="border rounded-lg p-6 space-y-3">
                <h3 className="font-semibold">Dynamic CSS Loading</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• CSS files loaded on-demand</li>
                  <li>• No page refresh required</li>
                  <li>• Instant theme switching</li>
                  <li>• Optimized performance</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6 space-y-3">
                <h3 className="font-semibold">Theme Persistence</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• LocalStorage integration</li>
                  <li>• Remembers user preference</li>
                  <li>• Automatic restoration</li>
                  <li>• Cross-session persistence</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6 space-y-3">
                <h3 className="font-semibold">Dark/Light Mode</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• System preference detection</li>
                  <li>• Manual mode override</li>
                  <li>• Smooth transitions</li>
                  <li>• Accessibility compliant</li>
                </ul>
              </div>

              <div className="border rounded-lg p-6 space-y-3">
                <h3 className="font-semibold">3-Tier Architecture</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Primitives (base colors)</li>
                  <li>• Semantics (UI tokens)</li>
                  <li>• Components (styles)</li>
                  <li>• Tailwind CSS v4</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Usage Instructions */}
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Usage Instructions</h2>
            <div className="space-y-4 text-sm">
              <p>
                <strong>To use in your components:</strong>
              </p>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { ThemeSelector } from '../components/ui/theme-selector'

// In your component:
<ThemeSelector />`}
              </pre>
              <p>
                <strong>Compact version for navigation:</strong>
              </p>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { ThemeSelectorCompact } from '../components/ui/theme-selector-compact'

// In navigation:
<ThemeSelectorCompact />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </SensoryProvider>
  )
}