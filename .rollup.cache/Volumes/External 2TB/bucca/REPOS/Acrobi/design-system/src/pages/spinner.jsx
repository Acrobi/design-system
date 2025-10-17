import React from 'react';
import { Spinner } from '../components/ui/spinner';
import { SensoryProvider } from '../components/ui/sensory-provider';
export default function SpinnerPage() {
    return (<SensoryProvider>
      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Spinner Component</h1>
            <p className="text-muted-foreground text-lg">
              Loading spinners for indicating asynchronous activity
            </p>
          </div>

          {/* Basic Spinner Examples */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Basic Spinners</h2>

            <div className="flex flex-wrap gap-8 items-center">
              <div className="text-center space-y-2">
                <Spinner size="sm"/>
                <p className="text-sm text-muted-foreground">Small</p>
              </div>

              <div className="text-center space-y-2">
                <Spinner size="md"/>
                <p className="text-sm text-muted-foreground">Medium</p>
              </div>

              <div className="text-center space-y-2">
                <Spinner size="lg"/>
                <p className="text-sm text-muted-foreground">Large</p>
              </div>

              <div className="text-center space-y-2">
                <Spinner size="xl"/>
                <p className="text-sm text-muted-foreground">Extra Large</p>
              </div>
            </div>
          </div>

          {/* Colored Spinners */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Colored Spinners</h2>

            <div className="flex flex-wrap gap-8 items-center">
              <div className="text-center space-y-2">
                <Spinner size="lg" className="text-primary"/>
                <p className="text-sm text-muted-foreground">Primary</p>
              </div>

              <div className="text-center space-y-2">
                <Spinner size="lg" className="text-secondary"/>
                <p className="text-sm text-muted-foreground">Secondary</p>
              </div>

              <div className="text-center space-y-2">
                <Spinner size="lg" className="text-destructive"/>
                <p className="text-sm text-muted-foreground">Destructive</p>
              </div>

              <div className="text-center space-y-2">
                <Spinner size="lg" className="text-muted-foreground"/>
                <p className="text-sm text-muted-foreground">Muted</p>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Usage Examples</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Loading State */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Loading Data</h3>
                <div className="flex items-center space-x-3">
                  <Spinner size="sm"/>
                  <span className="text-sm text-muted-foreground">Loading user data...</span>
                </div>
              </div>

              {/* Submitting Form */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Submitting Form</h3>
                <div className="flex items-center space-x-3">
                  <Spinner size="sm" className="text-primary"/>
                  <span className="text-sm text-muted-foreground">Processing...</span>
                </div>
              </div>

              {/* Full Page Loading */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Full Page Loading</h3>
                <div className="flex justify-center py-8">
                  <Spinner size="xl"/>
                </div>
              </div>

              {/* Button Loading */}
              <div className="border rounded-lg p-6 space-y-4">
                <h3 className="font-semibold">Button Loading</h3>
                <div className="flex items-center space-x-3">
                  <Spinner size="sm"/>
                  <span className="text-sm text-muted-foreground">Please wait...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Testing */}
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Theme Testing</h2>
            <p className="text-muted-foreground">
              Test how spinners look with different themes using the theme selector in the navigation bar:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>• Base theme (default)</li>
              <li>• Blue theme (professional)</li>
              <li>• Purple theme (creative)</li>
              <li>• Green theme (natural)</li>
              <li>• Orange theme (energetic)</li>
              <li>• Red theme (bold)</li>
            </ul>
            <p className="text-sm">Also test dark/light mode switching with the mode toggle button.</p>
          </div>
        </div>
      </div>
    </SensoryProvider>);
}
//# sourceMappingURL=spinner.jsx.map