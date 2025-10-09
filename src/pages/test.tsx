import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { SensoryProvider } from '../components/ui/sensory-provider';

export default function TestPage() {
  return (
    <SensoryProvider>
      <div className="min-h-screen bg-background text-foreground p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Design System Test Page</h1>
            <p className="text-muted-foreground text-lg">
              Test your styled components here
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>
                Different button styles and sizes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button>Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🚀</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>
                Click buttons to test interactions and sound effects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => alert('Button clicked!')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Click Me!
                </Button>
                <Button
                  variant="outline"
                  onClick={() => console.log('Outline button clicked')}
                >
                  Console Log
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    const element = document.getElementById('click-count');
                    if (element) {
                      const count = parseInt(element.textContent || '0');
                      element.textContent = String(count + 1);
                    }
                  }}
                >
                  Count Clicks: <span id="click-count">0</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Colors</CardTitle>
              <CardDescription>
                Visual representation of theme color variables
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-full h-16 bg-primary rounded-md border border-border"></div>
                  <p className="text-sm font-medium">Primary</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-full h-16 bg-secondary rounded-md border border-border"></div>
                  <p className="text-sm font-medium">Secondary</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-full h-16 bg-accent rounded-md border border-border"></div>
                  <p className="text-sm font-medium">Accent</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-full h-16 bg-destructive rounded-md border border-border"></div>
                  <p className="text-sm font-medium">Destructive</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-full h-16 bg-muted rounded-md border border-border"></div>
                  <p className="text-sm font-medium">Muted</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-full h-16 bg-background rounded-md border border-border"></div>
                  <p className="text-sm font-medium">Background</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-full h-16 bg-card rounded-md border border-border"></div>
                  <p className="text-sm font-medium">Card</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-full h-16 bg-border rounded-md border-2 border-foreground"></div>
                  <p className="text-sm font-medium">Border</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SensoryProvider>
  );
}