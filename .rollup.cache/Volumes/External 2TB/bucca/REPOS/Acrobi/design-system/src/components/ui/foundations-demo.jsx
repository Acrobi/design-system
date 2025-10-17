/**
 * Foundations Demo View - Comprehensive showcase of all primitive tokens and components
 * This component serves as visual regression test for the core theme system
 */
"use client";
import * as React from "react";
import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Label } from "./label";
import { Switch } from "./switch";
import { Checkbox } from "./checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { AlertDestructive, AlertSuccess, AlertWarning, AlertInfo } from "./alert";
import { useTheme } from "./theme-provider";
export function FoundationsDemo() {
    const theme = useTheme();
    const setTheme = useTheme()[1];
    const [inputValue, setInputValue] = useState("");
    const [textareaValue, setTextareaValue] = useState("");
    const [switchState, setSwitchState] = useState(false);
    const [checkboxState, setCheckboxState] = useState(false);
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (<div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Design System Foundations</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive showcase of all primitive tokens and components
          </p>
          <Button onClick={toggleTheme} variant="outline">
            Current Theme: {theme}
          </Button>
        </div>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>
              All semantic color tokens from the design system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {/* Primary Colors */}
              <div className="space-y-2">
                <div className="h-12 rounded bg-primary"></div>
                <p className="text-xs text-center">primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded bg-primary-foreground"></div>
                <p className="text-xs text-center">primary-foreground</p>
              </div>

              {/* Secondary Colors */}
              <div className="space-y-2">
                <div className="h-12 rounded bg-secondary"></div>
                <p className="text-xs text-center">secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded bg-secondary-foreground"></div>
                <p className="text-xs text-center">secondary-foreground</p>
              </div>

              {/* Background Colors */}
              <div className="space-y-2">
                <div className="h-12 rounded bg-background border"></div>
                <p className="text-xs text-center">background</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded bg-foreground"></div>
                <p className="text-xs text-center">foreground</p>
              </div>

              {/* Muted Colors */}
              <div className="space-y-2">
                <div className="h-12 rounded bg-muted"></div>
                <p className="text-xs text-center">muted</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded bg-muted-foreground"></div>
                <p className="text-xs text-center">muted-foreground</p>
              </div>

              {/* Accent Colors */}
              <div className="space-y-2">
                <div className="h-12 rounded bg-accent"></div>
                <p className="text-xs text-center">accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded bg-accent-foreground"></div>
                <p className="text-xs text-center">accent-foreground</p>
              </div>

              {/* Destructive Colors */}
              <div className="space-y-2">
                <div className="h-12 rounded bg-destructive"></div>
                <p className="text-xs text-center">destructive</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded bg-destructive-foreground"></div>
                <p className="text-xs text-center">destructive-foreground</p>
              </div>

              {/* Border & Input */}
              <div className="space-y-2">
                <div className="h-12 rounded bg-border"></div>
                <p className="text-xs text-center">border</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 rounded bg-input"></div>
                <p className="text-xs text-center">input</p>
              </div>

              {/* Ring */}
              <div className="space-y-2">
                <div className="h-12 rounded bg-ring"></div>
                <p className="text-xs text-center">ring</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography Scale</CardTitle>
            <CardDescription>
              Fluid typography using CSS clamp() for responsive text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs">text-xs - Small text</p>
              <p className="text-sm">text-sm - Body text</p>
              <p className="text-base">text-base - Default text</p>
              <p className="text-lg">text-lg - Large text</p>
              <p className="text-xl">text-xl - Extra large text</p>
              <p className="text-2xl">text-2xl - Heading text</p>
              <p className="text-3xl">text-3xl - Large heading</p>
              <p className="text-4xl">text-4xl - Display heading</p>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>
              All button variants and sizes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Button Variants</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="info">Info</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Button Sizes</h4>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">🔥</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Components */}
        <Card>
          <CardHeader>
            <CardTitle>Form Components</CardTitle>
            <CardDescription>
              Input fields, textareas, checkboxes, switches, and more
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Text Input</Label>
                  <Input id="text-input" placeholder="Enter some text..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="error-input">Error State</Label>
                  <Input id="error-input" placeholder="This field has an error" error/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea">Textarea</Label>
                  <Textarea id="textarea" placeholder="Enter longer text here..." value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)}/>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch checked={switchState} onCheckedChange={(checked) => setSwitchState(checked)}/>
                  <Label>Toggle Switch</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox checked={checkboxState} onCheckedChange={(checked) => setCheckboxState(checked)}/>
                  <Label>Checkbox Option</Label>
                </div>

                <div className="space-y-2">
                  <Label>Badges</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="info">Info</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Components</CardTitle>
            <CardDescription>
              Pre-configured alert variants for different message types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertDestructive title="Error" description="Something went wrong. Please try again."/>
            <AlertWarning title="Warning" description="Please review your input before proceeding."/>
            <AlertSuccess title="Success" description="Your changes have been saved successfully."/>
            <AlertInfo title="Information" description="Here's some helpful information for you."/>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs Component</CardTitle>
            <CardDescription>
              Tab navigation with different variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="w-full">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="John Doe"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com"/>
                </div>
              </TabsContent>
              <TabsContent value="password" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input id="current" type="password"/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input id="new" type="password"/>
                </div>
              </TabsContent>
              <TabsContent value="settings" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Enable notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <Label>Enable dark mode</Label>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Spacing and Layout */}
        <Card>
          <CardHeader>
            <CardTitle>Spacing & Layout</CardTitle>
            <CardDescription>
              Demonstrating various spacing utilities and layout patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">Card 1</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">Card 2</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">Card 3</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm">Small Gap</Button>
              <Button>Default Gap</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}
export default FoundationsDemo;
//# sourceMappingURL=foundations-demo.jsx.map