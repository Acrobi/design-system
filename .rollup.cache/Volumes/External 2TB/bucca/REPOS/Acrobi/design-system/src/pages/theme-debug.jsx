import { useTheme } from '../components/ui/theme-provider';
export default function ThemeDebug() {
    const { mode, resolvedMode, theme, toggleMode } = useTheme();
    return (<div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Theme Debug Console</h1>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Current Theme State</h2>
          <div className="p-4 border rounded-lg bg-card">
            <pre className="text-sm">
              {JSON.stringify({ mode, resolvedMode, theme }, null, 2)}
            </pre>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Manual Testing</h2>
          <button onClick={() => {
            console.log('🎨 Manual toggle triggered');
            toggleMode();
        }} className="px-4 py-2 bg-primary text-primary-foreground rounded">
            Toggle Mode (Console Debug)
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Visual Indicators</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary text-primary-foreground rounded">
              <p>Primary Color</p>
            </div>
            <div className="p-4 bg-secondary text-secondary-foreground rounded">
              <p>Secondary Color</p>
            </div>
            <div className="p-4 bg-muted text-muted-foreground rounded">
              <p>Muted Color</p>
            </div>
            <div className="p-4 bg-accent text-accent-foreground rounded">
              <p>Accent Color</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">DOM Inspector</h2>
          <div className="p-4 border rounded-lg bg-card">
            <p className="text-sm mb-2">Check browser console for debug messages</p>
            <p className="text-sm">Also inspect the HTML element for 'dark' class</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open browser developer tools (F12)</li>
            <li>Go to Console tab</li>
            <li>Click the "Toggle Mode" button above</li>
            <li>Watch for console messages with 🎨 emoji</li>
            <li>Go to Elements tab and inspect HTML element</li>
            <li>Look for 'dark' class being added/removed</li>
            <li>Observe visual color changes on this page</li>
          </ol>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=theme-debug.jsx.map