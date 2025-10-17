import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../components/ui/theme-provider'
import { ButtonVariants } from '../components/ui/button'

type ColorTheme = "base" | "blue" | "purple" | "green" | "orange" | "red"

export default function TokenDebugPage() {
  const { mode, resolvedMode, theme, setMode, setTheme, toggleMode, toggleTheme } = useTheme()
  const [tokens, setTokens] = useState<any>({})
  const [mounted, setMounted] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isWatching, setIsWatching] = useState(true)
  const [changes, setChanges] = useState<Array<{tier: string, variable: string, oldValue: string, newValue: string, timestamp: Date}>>([])

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const collectTokens = useCallback(() => {
    if (!mounted) return

    // Get all CSS variable values from different layers
    const root = document.documentElement
    const rootStyle = getComputedStyle(root)

    // Collect token values from different layers
    const newTokenMap: any = {
      // Tier 1: Primitive Design Tokens (OKLCH format - raw values, NEVER used directly)
      'primitives': {
        '--gray-0': rootStyle.getPropertyValue('--gray-0'),
        '--gray-50': rootStyle.getPropertyValue('--gray-50'),
        '--gray-100': rootStyle.getPropertyValue('--gray-100'),
        '--gray-500': rootStyle.getPropertyValue('--gray-500'),
        '--gray-900': rootStyle.getPropertyValue('--gray-900'),
        '--gray-950': rootStyle.getPropertyValue('--gray-950'),
        '--blue-500': rootStyle.getPropertyValue('--blue-500'),
        '--blue-600': rootStyle.getPropertyValue('--blue-600'),
        '--blue-800': rootStyle.getPropertyValue('--blue-800'),
        '--blue-900': rootStyle.getPropertyValue('--blue-900'),
        '--red-500': rootStyle.getPropertyValue('--red-500'),
        '--red-600': rootStyle.getPropertyValue('--red-600'),
        '--green-500': rootStyle.getPropertyValue('--green-500'),
        '--green-600': rootStyle.getPropertyValue('--green-600'),
        '--yellow-500': rootStyle.getPropertyValue('--yellow-500'),
        '--yellow-600': rootStyle.getPropertyValue('--yellow-600'),
        '--radius-md': rootStyle.getPropertyValue('--radius-md'),
      },

      // Tier 2: Semantic Design Tokens (purposeful variables - reference Tier 1)
      'semantic': {
        '--background': rootStyle.getPropertyValue('--background'),
        '--foreground': rootStyle.getPropertyValue('--foreground'),
        '--primary': rootStyle.getPropertyValue('--primary'),
        '--primary-foreground': rootStyle.getPropertyValue('--primary-foreground'),
        '--secondary': rootStyle.getPropertyValue('--secondary'),
        '--secondary-foreground': rootStyle.getPropertyValue('--secondary-foreground'),
        '--muted': rootStyle.getPropertyValue('--muted'),
        '--muted-foreground': rootStyle.getPropertyValue('--muted-foreground'),
        '--card': rootStyle.getPropertyValue('--card'),
        '--card-foreground': rootStyle.getPropertyValue('--card-foreground'),
        '--border': rootStyle.getPropertyValue('--border'),
        '--input': rootStyle.getPropertyValue('--input'),
        '--ring': rootStyle.getPropertyValue('--ring'),
        '--destructive': rootStyle.getPropertyValue('--destructive'),
        '--destructive-foreground': rootStyle.getPropertyValue('--destructive-foreground'),
        '--success': rootStyle.getPropertyValue('--success'),
        '--success-foreground': rootStyle.getPropertyValue('--success-foreground'),
        '--warning': rootStyle.getPropertyValue('--warning'),
        '--warning-foreground': rootStyle.getPropertyValue('--warning-foreground'),
        '--info': rootStyle.getPropertyValue('--info'),
        '--info-foreground': rootStyle.getPropertyValue('--info-foreground'),
        '--radius': rootStyle.getPropertyValue('--radius'),
      },

      // Tier 3: Computed Values (actual rendered colors - components consume Tier 2)
      'computed': {
        'background': rootStyle.backgroundColor,           /* Component renders computed value */
        'foreground': rootStyle.color,                     /* Component renders computed value */
        'primary': rootStyle.getPropertyValue('--primary'),  /* Component gets semantic value */
        'primary-foreground': rootStyle.getPropertyValue('--primary-foreground'),
        'secondary': rootStyle.getPropertyValue('--secondary'),
        'muted': rootStyle.getPropertyValue('--muted'),
        'card': rootStyle.getPropertyValue('--card'),
        'border': rootStyle.getPropertyValue('--border'),
        'destructive': rootStyle.getPropertyValue('--destructive'),
        'success': rootStyle.getPropertyValue('--success'),
        'warning': rootStyle.getPropertyValue('--warning'),
        'info': rootStyle.getPropertyValue('--info'),
      }
    }

    // Detect changes and track them
    if (tokens && Object.keys(tokens).length > 0) {
      const newChanges: typeof changes = []

      Object.keys(newTokenMap).forEach(tier => {
        Object.keys(newTokenMap[tier]).forEach(variable => {
          const oldValue = tokens[tier]?.[variable]
          const newValue = newTokenMap[tier][variable]

          if (oldValue !== newValue) {
            newChanges.push({
              tier,
              variable,
              oldValue: oldValue || 'undefined',
              newValue,
              timestamp: new Date()
            })
          }
        })
      })

      if (newChanges.length > 0) {
        setChanges(prev => [...newChanges.slice(-10), ...prev].slice(-20)) // Keep last 20 changes
        setLastUpdate(new Date())
      }
    }

    setTokens(newTokenMap)
  }, [mode, theme, mounted])

  // Real-time watching effect
  useEffect(() => {
    if (!isWatching || !mounted) return

    const interval = setInterval(() => {
      collectTokens()
    }, 500) // Check every 500ms for changes

    return () => clearInterval(interval)
  }, [isWatching, mounted, mode, theme])

  // Initial load and mode/theme changes
  useEffect(() => {
    collectTokens()
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

  if (!mounted) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">🔍 Loading Token System Debug...</h1>
          <p className="text-muted-foreground">Initializing theme system...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">🔍 Three-Tier Token Architecture</h1>
          <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>
            Proper Three-Tier Design Token System (Primitives → Semantics → Components)
          </p>
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
                      ? ''
                      : ''
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
                className="px-4 py-2 rounded-lg font-medium"
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
                      ? ''
                      : ''
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
                className="px-4 py-2 rounded-lg font-medium"
                style={{ backgroundColor: 'var(--muted)' }}
              >
                🎨 Toggle Theme
              </button>
            </div>
          </div>


          {/* Real-time Monitoring Controls */}
          <div className="mt-6 p-4 rounded" style={{ backgroundColor: 'var(--muted)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold" style={{ color: 'var(--foreground)' }}>Real-time Monitoring</h4>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  Last update: {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isWatching ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium">
                    {isWatching ? 'Watching' : 'Paused'}
                  </span>
                </div>
                <button
                  onClick={() => setIsWatching(!isWatching)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    isWatching
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isWatching ? '⏸ Pause' : '▶ Resume'}
                </button>
                <button
                  onClick={collectTokens}
                  className="px-3 py-1 rounded text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                >
                  🔄 Refresh Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Changes */}
        {changes.length > 0 && (
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">🔄 Recent Changes</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {changes.slice(0, 10).map((change, index) => (
                <div key={`${change.timestamp.getTime()}-${index}`} className="p-3 rounded border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      change.tier === 'primitives' ? 'bg-purple-100 text-purple-700' :
                      change.tier === 'semantic' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {change.tier.toUpperCase()}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {change.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm font-mono">
                    <div className="flex items-center gap-2">
                      <span>{change.variable}:</span>
                      <span className="text-red-600 line-through">{change.oldValue}</span>
                      <span>→</span>
                      <span className="text-green-600 font-semibold">{change.newValue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {changes.length > 10 && (
              <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
                Showing latest 10 of {changes.length} changes
              </p>
            )}
          </div>
        )}

        {/* Three Tier System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Tier 1: Primitive Design Tokens */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 1: Primitives</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Raw OKLCH colors (NEVER used directly in components)
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens['primitives'] || {}).map(([key, value]) => {
                const recentChange = changes.find(c => c.tier === 'primitives' && c.variable === key)
                return (
                  <div
                    key={key}
                    className={`flex justify-between items-center p-2 rounded transition-colors ${
                      recentChange ? 'bg-purple-50 border border-purple-200' : ''
                    }`}
                    style={{ backgroundColor: recentChange ? undefined : 'var(--muted)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{key}:</span>
                      {recentChange && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full" title="Recently changed"></span>
                      )}
                    </div>
                    <span className="font-mono">{formatColorValue(String(value))}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tier 2: Semantic Design Tokens */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 2: Semantics</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Purposeful variables (reference Tier 1 primitives)
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens['semantic'] || {}).map(([key, value]) => {
                const recentChange = changes.find(c => c.tier === 'semantic' && c.variable === key)
                return (
                  <div
                    key={key}
                    className={`flex justify-between items-center p-2 rounded transition-colors ${
                      recentChange ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                    style={{ backgroundColor: recentChange ? undefined : 'var(--muted)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{key}:</span>
                      {recentChange && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" title="Recently changed"></span>
                      )}
                    </div>
                    <span className="font-mono">{formatColorValue(String(value))}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tier 3: Computed Values - Components */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 3: Components</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              UI elements consume Tier 2 semantic tokens only
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens['computed'] || {}).map(([key, value]) => {
                const recentChange = changes.find(c => c.tier === 'computed' && c.variable === key)
                return (
                  <div
                    key={key}
                    className={`flex justify-between items-center p-2 rounded transition-colors ${
                      recentChange ? 'bg-green-50 border border-green-200' : ''
                    }`}
                    style={{ backgroundColor: recentChange ? undefined : 'var(--muted)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span>{key}:</span>
                      {recentChange && (
                        <span className="w-2 h-2 bg-green-500 rounded-full" title="Recently changed"></span>
                      )}
                    </div>
                    <span className="font-mono">{formatColorValue(String(value))}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h3 className="text-xl font-semibold mb-4">Visual Color Swatches</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Background', color: tokens['semantic']?.['--background'] || 'var(--background)' },
              { name: 'Foreground', color: tokens['semantic']?.['--foreground'] || 'var(--foreground)' },
              { name: 'Primary', color: tokens['semantic']?.['--primary'] || 'var(--primary)' },
              { name: 'Secondary', color: tokens['semantic']?.['--secondary'] || 'var(--secondary)' },
              { name: 'Muted', color: tokens['semantic']?.['--muted'] || 'var(--muted)' },
              { name: 'Card', color: tokens['semantic']?.['--card'] || 'var(--card)' },
              { name: 'Border', color: tokens['semantic']?.['--border'] || 'var(--border)' },
              { name: 'Destructive', color: tokens['semantic']?.['--destructive'] || 'var(--destructive)' },
              { name: 'Success', color: tokens['semantic']?.['--success'] || 'var(--success)' },
              { name: 'Warning', color: tokens['semantic']?.['--warning'] || 'var(--warning)' },
              { name: 'Info', color: tokens['semantic']?.['--info'] || 'var(--info)' },
            ].map(({ name, color }) => (
              <div key={name} className="text-center space-y-2">
                {getColorSwatch(String(color))}
                <div className="text-xs font-mono">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}