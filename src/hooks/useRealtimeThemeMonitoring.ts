import { useState, useEffect, useCallback, useRef } from 'react'

interface TokenData {
  primitives: Record<string, string>
  semantic: Record<string, string>
  computed: Record<string, string>
}

interface ChangeData {
  tier: string
  variable: string
  oldValue: string
  newValue: string
  timestamp: Date
}

export function useRealtimeThemeMonitoring(enabled: boolean = true, intervalMs: number = 500) {
  const [tokens, setTokens] = useState<TokenData>({
    primitives: {},
    semantic: {},
    computed: {}
  })
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [isWatching, setIsWatching] = useState(enabled)
  const [changes, setChanges] = useState<ChangeData[]>([])
  const tokensRef = useRef(tokens)

  // Update ref when tokens change
  useEffect(() => {
    tokensRef.current = tokens
  }, [tokens])

  const collectTokens = useCallback(() => {
    if (typeof window === 'undefined') return

    try {
      const root = document.documentElement
      const rootStyle = getComputedStyle(root)

      const newTokenMap: TokenData = {
        // Tier 1: Primitive Design Tokens
        primitives: {
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

        // Tier 2: Semantic Design Tokens
        semantic: {
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

        // Tier 3: Computed Values
        computed: {
          'background': rootStyle.backgroundColor,
          'foreground': rootStyle.color,
          'primary': rootStyle.getPropertyValue('--primary'),
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

      // Detect changes and track them using ref
      const currentTokens = tokensRef.current
      if (currentTokens && (currentTokens.primitives || currentTokens.semantic || currentTokens.computed)) {
        const newChanges: ChangeData[] = []

        Object.keys(newTokenMap).forEach(tier => {
          const tierTokens = newTokenMap[tier as keyof TokenData]
          if (tierTokens) {
            Object.keys(tierTokens).forEach(variable => {
              const oldValue = currentTokens[tier as keyof TokenData]?.[variable as keyof TokenData[keyof TokenData]]
              const newValue = tierTokens[variable as keyof typeof tierTokens]

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
          }
        })

        if (newChanges.length > 0) {
          setChanges(prev => [...newChanges.slice(-10), ...prev].slice(-20)) // Keep last 20 changes
          setLastUpdate(new Date())
        }
      }

      setTokens(newTokenMap)
    } catch (error) {
      console.error('Error collecting theme tokens:', error)
    }
  }, []) // Remove tokens dependency to prevent infinite loop

  // Real-time watching effect
  useEffect(() => {
    if (!isWatching || typeof window === 'undefined') return

    const interval = setInterval(() => {
      collectTokens()
    }, intervalMs)

    return () => clearInterval(interval)
  }, [isWatching, intervalMs, collectTokens])

  // Initial collection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      collectTokens()
    }
  }, [collectTokens])

  const toggleWatching = () => {
    setIsWatching(prev => !prev)
  }

  const forceRefresh = () => {
    collectTokens()
  }

  const clearChanges = () => {
    setChanges([])
  }

  return {
    tokens,
    lastUpdate,
    isWatching,
    changes,
    toggleWatching,
    forceRefresh,
    clearChanges,
    hasChanges: changes.length > 0
  }
}