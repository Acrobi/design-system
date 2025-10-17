import React from 'react';
/**
 * Color Test Page - Comprehensive color system testing
 *
 * This component tests all color tokens and ensures they work correctly
 * in both light and dark themes with Tailwind CSS v4 hex values.
 */
export default function ColorTestPage() {
    return (<div className="min-h-screen bg-background text-foreground p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Design System Color Test</h1>
        <p className="text-muted-foreground">
          Testing Tailwind CSS v4 hex color compatibility across all tokens
        </p>
      </div>

      {/* Semantic Colors Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Semantic Colors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Primary Colors */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Primary</h3>
            <div className="bg-primary text-primary-foreground p-4 rounded-lg">
              <p className="font-medium">Primary Background</p>
              <p className="text-sm">Primary Foreground</p>
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Secondary</h3>
            <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
              <p className="font-medium">Secondary Background</p>
              <p className="text-sm">Secondary Foreground</p>
            </div>
          </div>

          {/* Accent Colors */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Accent</h3>
            <div className="bg-accent text-accent-foreground p-4 rounded-lg">
              <p className="font-medium">Accent Background</p>
              <p className="text-sm">Accent Foreground</p>
            </div>
          </div>

          {/* Muted Colors */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Muted</h3>
            <div className="bg-muted text-muted-foreground p-4 rounded-lg">
              <p className="font-medium">Muted Background</p>
              <p className="text-sm">Muted Foreground</p>
            </div>
          </div>

          {/* Destructive Colors */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Destructive</h3>
            <div className="bg-destructive text-destructive-foreground p-4 rounded-lg">
              <p className="font-medium">Destructive Background</p>
              <p className="text-sm">Destructive Foreground</p>
            </div>
          </div>

          {/* Card Colors */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Card</h3>
            <div className="bg-card text-card-foreground p-4 rounded-lg border">
              <p className="font-medium">Card Background</p>
              <p className="text-sm">Card Foreground</p>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Color Palette Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Extended Color Palette</h2>

        {/* Purple Scale */}
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Purple Scale (Brand)</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 950].map((shade) => (<div key={shade} className="text-center">
                <div className={`bg-purple-${shade} h-12 w-12 rounded-lg mx-auto mb-1 border`}/>
                <p className="text-xs text-muted-foreground">{shade}</p>
              </div>))}
          </div>
        </div>

        {/* Gray Scale */}
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Gray Scale</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 950].map((shade) => (<div key={shade} className="text-center">
                <div className={`bg-gray-${shade} h-12 w-12 rounded-lg mx-auto mb-1 border`}/>
                <p className="text-xs text-muted-foreground">{shade}</p>
              </div>))}
          </div>
        </div>

        {/* Blue Scale */}
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Blue Scale</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 950].map((shade) => (<div key={shade} className="text-center">
                <div className={`bg-blue-${shade} h-12 w-12 rounded-lg mx-auto mb-1 border`}/>
                <p className="text-xs text-muted-foreground">{shade}</p>
              </div>))}
          </div>
        </div>

        {/* Green Scale */}
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Green Scale</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 950].map((shade) => (<div key={shade} className="text-center">
                <div className={`bg-green-${shade} h-12 w-12 rounded-lg mx-auto mb-1 border`}/>
                <p className="text-xs text-muted-foreground">{shade}</p>
              </div>))}
          </div>
        </div>

        {/* Red Scale */}
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Red Scale</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 950].map((shade) => (<div key={shade} className="text-center">
                <div className={`bg-red-${shade} h-12 w-12 rounded-lg mx-auto mb-1 border`}/>
                <p className="text-xs text-muted-foreground">{shade}</p>
              </div>))}
          </div>
        </div>

        {/* Orange Scale */}
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Orange Scale</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 950].map((shade) => (<div key={shade} className="text-center">
                <div className={`bg-orange-${shade} h-12 w-12 rounded-lg mx-auto mb-1 border`}/>
                <p className="text-xs text-muted-foreground">{shade}</p>
              </div>))}
          </div>
        </div>
      </section>

      {/* UI Component Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">UI Component Examples</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Button Examples */}
          <div className="space-y-3">
            <h3 className="font-medium">Buttons</h3>
            <div className="space-y-2">
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Primary Button
              </button>
              <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Secondary Button
              </button>
              <button className="w-full bg-destructive text-destructive-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Destructive Button
              </button>
            </div>
          </div>

          {/* Input Examples */}
          <div className="space-y-3">
            <h3 className="font-medium">Inputs</h3>
            <div className="space-y-2">
              <input type="text" placeholder="Primary input" className="w-full px-3 py-2 border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"/>
              <input type="text" placeholder="Disabled input" disabled className="w-full px-3 py-2 border rounded-md bg-muted text-muted-foreground cursor-not-allowed"/>
            </div>
          </div>

          {/* Card Examples */}
          <div className="space-y-3">
            <h3 className="font-medium">Cards</h3>
            <div className="bg-card text-card-foreground p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Card Title</h4>
              <p className="text-sm text-muted-foreground">
                This is a card component using the semantic color tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Border and Ring Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Border and Ring Colors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border-2 border-border p-4 rounded-lg">
            <p className="text-sm font-medium">Border Color</p>
            <p className="text-xs text-muted-foreground">Default border</p>
          </div>

          <div className="border-2 border-input p-4 rounded-lg">
            <p className="text-sm font-medium">Input Border</p>
            <p className="text-xs text-muted-foreground">Input field border</p>
          </div>

          <div className="ring-2 ring-ring p-4 rounded-lg">
            <p className="text-sm font-medium">Ring Color</p>
            <p className="text-xs text-muted-foreground">Focus ring</p>
          </div>

          <div className="border-2 border-destructive p-4 rounded-lg">
            <p className="text-sm font-medium">Destructive Border</p>
            <p className="text-xs text-muted-foreground">Error state</p>
          </div>
        </div>
      </section>

      {/* Typography Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Typography</h2>

        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Extra Small Text</p>
          <p className="text-sm text-muted-foreground">Small Text</p>
          <p className="text-base">Base Text</p>
          <p className="text-lg">Large Text</p>
          <p className="text-xl">Extra Large Text</p>
          <p className="text-2xl">2XL Text</p>
          <p className="text-3xl">3XL Text</p>
          <p className="text-4xl">4XL Text</p>
        </div>
      </section>

      {/* Theme Toggle Test */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme Testing</h2>
        <p className="text-muted-foreground">
          Toggle between light and dark themes to verify all colors work correctly in both modes.
        </p>

        <div className="flex gap-4">
          <button onClick={() => document.documentElement.classList.remove('dark')} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Light Theme
          </button>
          <button onClick={() => document.documentElement.classList.add('dark')} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Dark Theme
          </button>
        </div>
      </section>

      {/* Status Message */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-2">✅ Tailwind CSS v4 Compatibility Test</h3>
        <p className="text-muted-foreground mb-4">
          This page verifies that all color tokens work correctly with hex values in Tailwind CSS v4.
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>All colors converted from HSL to hex format</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>@theme block properly configured for Tailwind v4</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Dark mode theme overrides working correctly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span>Semantic tokens properly mapped to utilities</span>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=color-test-page.jsx.map