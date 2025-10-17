import { useState, useEffect } from 'react'
import { useRealtimeThemeMonitoring } from '../../hooks/useRealtimeThemeMonitoring'

interface RealTimeThemeIndicatorProps {
  className?: string
  showChanges?: boolean
  showControls?: boolean
  compact?: boolean
}

export function RealTimeThemeIndicator({
  className = "",
  showChanges = true,
  showControls = true,
  compact = false
}: RealTimeThemeIndicatorProps) {
  const { tokens, lastUpdate, isWatching, changes, toggleWatching, forceRefresh, hasChanges } = useRealtimeThemeMonitoring()

  if (!tokens || Object.keys(tokens).length === 0) {
    return null
  }

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

  const getChangeColor = (tier: string) => {
    switch (tier) {
      case 'primitives': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'semantic': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'computed': return 'bg-green-100 text-green-700 border-green-200'
      default: return ''
    }
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 text-xs ${className}`}>
        <div className={`w-2 h-2 rounded-full ${isWatching ? 'bg-green-500' : 'bg-red-500'}`} title={isWatching ? 'Watching' : 'Paused'}></div>
        {hasChanges && (
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full">
            {changes.length} changes
          </span>
        )}
      </div>
    )
  }

  return (
    <div className={`p-4 rounded-lg border ${className}`} style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>Theme Monitoring</h4>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Last update: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        {showControls && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isWatching ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-xs font-medium">
                {isWatching ? 'Watching' : 'Paused'}
              </span>
            </div>
            <button
              onClick={toggleWatching}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                isWatching
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isWatching ? '⏸' : '▶'}
            </button>
            <button
              onClick={forceRefresh}
              className="px-2 py-1 rounded text-xs font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              🔄
            </button>
          </div>
        )}
      </div>

      {showChanges && hasChanges && (
        <div className="space-y-1">
          <div className="text-xs font-medium mb-1" style={{ color: 'var(--foreground)' }}>
            Recent Changes:
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {changes.slice(0, 5).map((change, index) => (
              <div key={`${change.timestamp.getTime()}-${index}`} className={`p-2 rounded border text-xs ${getChangeColor(change.tier)}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold px-1 py-0.5 rounded">
                    {change.tier.toUpperCase()}
                  </span>
                  <span className="opacity-75">
                    {change.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs">
                  <span>{change.variable}:</span>
                  <span className="line-through opacity-50">{change.oldValue}</span>
                  <span>→</span>
                  <span className="font-semibold">{change.newValue}</span>
                </div>
              </div>
            ))}
          </div>
          {changes.length > 5 && (
            <p className="text-xs opacity-75">
              Showing latest 5 of {changes.length} changes
            </p>
          )}
        </div>
      )}

      {/* Quick Status */}
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="text-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="font-semibold">Primary</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: formatColorValue(tokens.semantic?.['--primary'] || 'var(--primary)') }}></div>
            <span className="font-mono truncate max-w-[80px]">{formatColorValue(tokens.semantic?.['--primary'] || '')}</span>
          </div>
        </div>
        <div className="text-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="font-semibold">Background</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-3 h-3 rounded border" style={{ backgroundColor: formatColorValue(tokens.semantic?.['--background'] || 'var(--background)'), borderColor: formatColorValue(tokens.semantic?.['--border'] || 'var(--border)') }}></div>
            <span className="font-mono truncate max-w-[80px]">{formatColorValue(tokens.semantic?.['--background'] || '')}</span>
          </div>
        </div>
        <div className="text-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
          <div className="font-semibold">Foreground</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: formatColorValue(tokens.semantic?.['--foreground'] || 'var(--foreground)') }}></div>
            <span className="font-mono truncate max-w-[80px]">{formatColorValue(tokens.semantic?.['--foreground'] || '')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}