import { useState, useEffect } from 'react';
import { useTheme } from '../components/ui/theme-provider';
export default function TokenDebugPage() {
    const { mode, resolvedMode, theme, setMode, setTheme, toggleMode, toggleTheme } = useTheme();
    const [tokens, setTokens] = useState({});
    const [mounted, setMounted] = useState(false);
    // Handle hydration
    useEffect(() => {
        setMounted(true);
    }, []);
    useEffect(() => {
        if (!mounted)
            return;
        // Get all CSS variable values from different layers
        const root = document.documentElement;
        const rootStyle = getComputedStyle(root);
        // Collect token values from different layers
        const tokenMap = {
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
                'background': rootStyle.backgroundColor, /* Component renders computed value */
                'foreground': rootStyle.color, /* Component renders computed value */
                'primary': rootStyle.getPropertyValue('--primary'), /* Component gets semantic value */
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
        };
        setTokens(tokenMap);
    }, [mode, theme, mounted]);
    const formatColorValue = (value) => {
        if (!value)
            return 'undefined';
        const clean = value.trim();
        // Check if it's hex
        if (clean.startsWith('#'))
            return clean;
        // Check if it's rgb/rgba
        if (clean.startsWith('rgb'))
            return clean;
        // Check if it's oklch
        if (clean.startsWith('oklch'))
            return clean;
        // Check if it's hsl
        if (clean.startsWith('hsl'))
            return clean;
        return clean;
    };
    const getColorSwatch = (color) => {
        return (<div className="w-16 h-16 rounded-lg border-2 border-gray-300" style={{ backgroundColor: color }}/>);
    };
    const switchMode = (newMode) => {
        setMode(newMode);
    };
    const switchColorTheme = (newTheme) => {
        setTheme(newTheme);
    };
    const colorThemes = ['base', 'blue', 'purple', 'green', 'orange', 'red'];
    const modes = ['light', 'dark', 'system'];
    if (!mounted) {
        return (<div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">🔍 Loading Token System Debug...</h1>
          <p className="text-muted-foreground">Initializing theme system...</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen p-8" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">🔍 Three-Tier Token Architecture</h1>
          <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>
            Proper Three-Tier Design Token System (Primitives → Semantics → Components)
          </p>
          <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
            <span>Mode: <strong>{mounted ? mode : '...'}</strong></span>
            <span>Resolved: <strong>{mounted ? resolvedMode : '...'}</strong></span>
            <span>Theme: <strong>{mounted ? theme : '...'}</strong></span>
            <span>Dark Class: <strong>{mounted && document.documentElement.classList.contains('dark') ? 'YES' : 'NO'}</strong></span>
          </div>
        </div>

        {/* Enhanced Theme Controls */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h2 className="text-2xl font-semibold mb-4">🎨 Advanced Theme Controls</h2>

          {/* Mode Switching */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Mode (Light/Dark/System)</h3>
            <div className="flex gap-3 flex-wrap">
              {modes.map((modeOption) => (<button key={modeOption} onClick={() => switchMode(modeOption)} className={`px-4 py-2 rounded-lg font-medium transition-all ${mode === modeOption
                ? 'ring-2 ring-blue-500 text-white'
                : 'text-gray-700 hover:text-gray-900'}`} style={{
                backgroundColor: mode === modeOption ? 'var(--primary)' : 'var(--muted)'
            }}>
                  {modeOption === 'light' ? '☀️ Light' :
                modeOption === 'dark' ? '🌙 Dark' :
                    '💻 System'}
                </button>))}
              <button onClick={toggleMode} className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 border border-gray-300" style={{ backgroundColor: 'var(--muted)' }}>
                🔄 Toggle Mode
              </button>
            </div>
          </div>

          {/* Color Theme Switching */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Color Themes</h3>
            <div className="flex gap-3 flex-wrap">
              {colorThemes.map((colorTheme) => (<button key={colorTheme} onClick={() => switchColorTheme(colorTheme)} className={`px-4 py-2 rounded-lg font-medium transition-all ${theme === colorTheme
                ? 'ring-2 ring-purple-500 text-white'
                : 'text-gray-700 hover:text-gray-900'}`} style={{
                backgroundColor: theme === colorTheme ? 'var(--primary)' : 'var(--muted)'
            }}>
                  {colorTheme === 'base' ? '🎨 Base' :
                colorTheme === 'blue' ? '💙 Blue' :
                    colorTheme === 'purple' ? '💜 Purple' :
                        colorTheme === 'green' ? '💚 Green' :
                            colorTheme === 'orange' ? '🧡 Orange' :
                                '❤️ Red'}
                </button>))}
              <button onClick={toggleTheme} className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 border border-gray-300" style={{ backgroundColor: 'var(--muted)' }}>
                🎨 Toggle Theme
              </button>
            </div>
          </div>

          {/* Theme System Status */}
          <div className="mt-6 p-4 rounded" style={{ backgroundColor: 'var(--muted)' }}>
            <h4 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Theme System Status</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Mode:</span>
                <div className="font-mono" style={{ color: 'var(--primary)' }}>{mode}</div>
              </div>
              <div>
                <span className="font-medium">Resolved:</span>
                <div className="font-mono" style={{ color: 'var(--success)' }}>{resolvedMode}</div>
              </div>
              <div>
                <span className="font-medium">Theme:</span>
                <div className="font-mono" style={{ color: 'var(--info)' }}>{theme}</div>
              </div>
              <div>
                <span className="font-medium">Dark Class:</span>
                <div className="font-mono" style={{ color: 'var(--warning)' }}>
                  {mounted && document.documentElement.classList.contains('dark') ? 'YES' : 'NO'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Tier System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Tier 1: Primitive Design Tokens */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 1: Primitives</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Raw OKLCH colors (NEVER used directly in components)
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens['primitives'] || {}).map(([key, value]) => (<div key={key} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                  <span>{key}:</span>
                  <span className="font-mono">{formatColorValue(value)}</span>
                </div>))}
            </div>
          </div>

          {/* Tier 2: Semantic Design Tokens */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 2: Semantics</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              Purposeful variables (reference Tier 1 primitives)
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens['semantic'] || {}).map(([key, value]) => (<div key={key} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                  <span>{key}:</span>
                  <span className="font-mono">{formatColorValue(value)}</span>
                </div>))}
            </div>
          </div>

          {/* Tier 3: Computed Values - Components */}
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-semibold mb-4">Tier 3: Components</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              UI elements consume Tier 2 semantic tokens only
            </p>
            <div className="space-y-2 font-mono text-xs">
              {Object.entries(tokens['computed'] || {}).map(([key, value]) => (<div key={key} className="flex justify-between items-center p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
                  <span>{key}:</span>
                  <span className="font-mono">{formatColorValue(value)}</span>
                </div>))}
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h3 className="text-xl font-semibold mb-4">Visual Color Swatches</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
            { name: 'Background', color: 'var(--background)' },
            { name: 'Foreground', color: 'var(--foreground)' },
            { name: 'Primary', color: 'var(--primary)' },
            { name: 'Secondary', color: 'var(--secondary)' },
            { name: 'Muted', color: 'var(--muted)' },
            { name: 'Card', color: 'var(--card)' },
            { name: 'Border', color: 'var(--border)' },
            { name: 'Destructive', color: 'var(--destructive)' },
            { name: 'Success', color: 'var(--success)' },
            { name: 'Warning', color: 'var(--warning)' },
            { name: 'Info', color: 'var(--info)' },
        ].map(({ name, color }) => (<div key={name} className="text-center space-y-2">
                {getColorSwatch(color)}
                <div className="text-xs font-mono">{name}</div>
              </div>))}
          </div>
        </div>

        {/* Architecture Validation */}
        <div className="p-6 rounded-lg border" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <h3 className="text-xl font-semibold mb-4">✅ Three-Tier Architecture Validation</h3>
          <div className="space-y-4">
            <div className="p-4 rounded border" style={{ backgroundColor: 'var(--success)/10', borderColor: 'var(--success)/20' }}>
              <h4 className="font-semibold" style={{ color: 'var(--success)' }}>Correct Architecture Implementation:</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1" style={{ color: 'var(--foreground)' }}>
                <li><strong>Tier 1 (Primitives):</strong> Raw OKLCH values, NEVER used directly</li>
                <li><strong>Tier 2 (Semantics):</strong> Purposeful variables that reference Tier 1</li>
                <li><strong>Tier 3 (Components):</strong> Consume ONLY semantic variables</li>
                <li><strong>Dark Mode:</strong> Handled ONLY in Tier 2 (theme-default.css)</li>
                <li><strong>Tailwind Bridge:</strong> @theme block connects semantic tokens to utility classes</li>
              </ul>
            </div>
            <div className="p-4 rounded border" style={{ backgroundColor: 'var(--info)/10', borderColor: 'var(--info)/20' }}>
              <h4 className="font-semibold" style={{ color: 'var(--info)' }}>Validate These Points:</h4>
              <ul className="list-disc list-inside text-sm mt-2 space-y-1" style={{ color: 'var(--foreground)' }}>
                <li>Tier 1 shows OKLCH format values (e.g., oklch(0.55 0.24 230))</li>
                <li>Tier 2 shows var() references to Tier 1 (e.g., var(--blue-900))</li>
                <li>Tier 3 shows same values as Tier 2 (components use semantic tokens)</li>
                <li>Dark mode properly switches Tier 2 values while Tier 1 remains unchanged</li>
                <li>Theme switching works across all three tiers correctly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=token-debug.jsx.map