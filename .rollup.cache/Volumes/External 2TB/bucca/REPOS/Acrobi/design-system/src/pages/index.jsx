import React from 'react';
import { useTheme } from '../components/ui/theme-provider';
export default function Home() {
    const { mode, resolvedMode, theme, toggleMode } = useTheme();
    // Add immediate debug logging
    React.useEffect(() => {
        console.log('🎨 Home page mounted, theme state:', { mode, resolvedMode, theme });
    }, [mode, resolvedMode, theme]);
    return (<main className="container mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold">Acrobi Design System</h1>
      <p className="text-muted-foreground mt-2">The Golden Master. Use the navigation to review components.</p>

      {/* Manual test section */}
      <div className="mt-8 p-8 border-4 border-red-500 bg-red-50">
        <h2 className="text-2xl font-bold text-red-700 mb-4">MANUAL DARK MODE TEST</h2>
        <p className="text-red-600 mb-4">If you can see this section, the page is loading.</p>
        <button onClick={() => {
            console.log('🎨 Manual toggle clicked!');
            toggleMode();
            // Force DOM check
            setTimeout(() => {
                const html = document.documentElement;
                console.log('🎨 HTML classes after toggle:', html.className);
                console.log('🎨 Has dark class:', html.classList.contains('dark'));
            }, 100);
        }} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
          CLICK TO TOGGLE DARK MODE
        </button>
        <div className="mt-4 p-4 bg-black text-white rounded">
          <p>Current mode: <strong>{mode}</strong></p>
          <p>Resolved: <strong>{resolvedMode}</strong></p>
          <p>Theme: <strong>{theme}</strong></p>
        </div>
      </div>

      {/* Debug section to verify theme switching */}
      <div className="mt-8 p-4 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Theme Debug Info</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Mode:</strong> {mode}</p>
          <p><strong>Resolved Mode:</strong> {resolvedMode}</p>
          <p><strong>Color Theme:</strong> {theme}</p>
          <button onClick={toggleMode} className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-80">
            Toggle Mode (☀️ Light / 🌙 Dark / 💻 System)
          </button>
        </div>
      </div>

      {/* Visual theme indicators */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="p-4 bg-primary text-primary-foreground rounded">
          <p>Primary</p>
        </div>
        <div className="p-4 bg-secondary text-secondary-foreground rounded">
          <p>Secondary</p>
        </div>
        <div className="p-4 bg-muted text-muted-foreground rounded">
          <p>Muted</p>
        </div>
        <div className="p-4 bg-card text-card-foreground border rounded">
          <p>Card</p>
        </div>
        <div className="p-4 bg-destructive text-destructive-foreground rounded">
          <p>Destructive</p>
        </div>
        <div className="p-4 bg-accent text-accent-foreground rounded">
          <p>Accent</p>
        </div>
      </div>
    </main>);
}
//# sourceMappingURL=index.jsx.map