import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { SensoryProvider } from '../components/ui/sensory-provider'
import { Icon } from '../components/ui/icons'

export default function CardPage() {
  return (
    <SensoryProvider>
      <div className="container mx-auto p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Card Component</h1>
            <p className="text-muted-foreground text-lg">
              Card components for displaying content in styled containers
            </p>
          </div>

          {/* Basic Card Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>A simple card with header and content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the main content area of the card. It can contain any type of content including text, images, or other components.</p>
            </CardContent>
          </Card>

          {/* Card with Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>A card with header, content, and footer</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card demonstrates how to use all three sections together for a complete card component.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Icon metaphor="chevron-left" className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button size="sm">
                Next
                <Icon metaphor="chevron-right" className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Card Variants */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Default card styling with border and background.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Borderless Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Card without border but with enhanced shadow.</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>Hover Card</CardTitle>
                <CardDescription>Hover for shadow effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card gains a shadow on hover.</p>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Primary Border</CardTitle>
                <CardDescription>Primary colored border</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card with primary colored border.</p>
              </CardContent>
            </Card>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle>Muted Background</CardTitle>
                <CardDescription>Subtle background color</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card with muted background.</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Examples */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon metaphor="user" className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Profile Card</h3>
                    <p className="text-sm text-muted-foreground">User information</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <Icon metaphor="success" className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Status Card</h3>
                    <p className="text-sm text-muted-foreground">Success state</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Icon metaphor="warning" className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Alert Card</h3>
                    <p className="text-sm text-muted-foreground">Warning message</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Theme Testing */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Testing</CardTitle>
              <CardDescription>Test how cards look with different themes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Use the theme selector in the navigation bar to test how cards appear with different color themes:</p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Base theme (default)</li>
                <li>• Blue theme (professional)</li>
                <li>• Purple theme (creative)</li>
                <li>• Green theme (natural)</li>
                <li>• Orange theme (energetic)</li>
                <li>• Red theme (bold)</li>
              </ul>
              <p className="text-sm">Also test dark/light mode switching with the mode toggle button.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SensoryProvider>
  )
}