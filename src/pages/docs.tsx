import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Design System Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Complete guide to using the Acrobi Design System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Learn the basics of using the design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Installation</h4>
                  <code className="block bg-muted p-2 rounded text-sm mt-1">
                    npm install acrobi-design-system
                  </code>
                </div>
                <div>
                  <h4 className="font-medium">Basic Usage</h4>
                  <code className="block bg-muted p-2 rounded text-sm mt-1">
                    {`import { Button } from 'acrobi-design-system/ui/button'`}
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>
                Available UI components and their variants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Button</span>
                  <span className="text-muted-foreground">6 variants</span>
                </div>
                <div className="flex justify-between">
                  <span>Card</span>
                  <span className="text-muted-foreground">3 parts</span>
                </div>
                <div className="flex justify-between">
                  <span>Theme Selector</span>
                  <span className="text-muted-foreground">3 themes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theming</CardTitle>
              <CardDescription>
                Customize colors and appearance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Available Themes</h4>
                  <ul className="text-sm text-muted-foreground mt-1">
                    <li>• Default (Blue)</li>
                    <li>• Client A (Purple)</li>
                    <li>• Client B (Green)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Full dark mode support with automatic switching
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>
                Theme generation and customization endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Generate Theme</h4>
                  <code className="block bg-muted p-2 rounded text-sm mt-1">
                    GET /api/themes/[primaryColor]
                  </code>
                </div>
                <Button variant="outline" size="sm">
                  View API Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Examples</CardTitle>
            <CardDescription>
              Common usage patterns and best practices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">Button Variants</h4>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Default</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
                <Button variant="link" size="sm">Link</Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Button Sizes</h4>
              <div className="flex items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🚀</Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Card Layout</h4>
              <Card className="max-w-sm">
                <CardHeader>
                  <CardTitle className="text-base">Sample Card</CardTitle>
                  <CardDescription className="text-sm">
                    This is how cards look in the design system
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  Cards are flexible containers for grouping related content.
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}