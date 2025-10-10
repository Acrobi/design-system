"use client"
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useTheme } from "./theme-provider";

// A simple preview component to showcase the current theme
const Preview = () => (
    <Card>
        <CardHeader><CardTitle>Themed Card</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
            <p>This component's colors are controlled by the selected theme.</p>
            <div className="flex gap-4">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
            </div>
        </CardContent>
    </Card>
);

// The UI for selecting a theme
const ThemeSelector = () => {
    const { setTheme } = useTheme();

    const themes = [
        { name: 'default', color: '', label: 'Acrobi Base' },
        { name: 'client-a', color: '#5A42E5', label: 'Client A (Purple)' },
        { name: 'client-b', color: '#16a34a', label: 'Client B (Green)' },
    ];

    return (
        <div className="p-4 border rounded-lg">
            <label htmlFor="theme-select" className="block text-sm font-medium mb-2">Select Theme:</label>
            <select
                id="theme-select"
                onChange={(e) => {
                    const selectedTheme = themes.find(t => t.name === e.target.value);
                    if (selectedTheme) setTheme(selectedTheme);
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm"
            >
                {themes.map(theme => (
                    <option key={theme.name} value={theme.name}>{theme.label}</option>
                ))}
            </select>
        </div>
    );
};

export function ComponentEditor() {
  return (
    <div className="space-y-8">
        <ThemeSelector />
        <div>
            <h2 className="text-2xl font-semibold mb-4">Light Mode</h2>
            <div className="p-4 border rounded-md"><Preview /></div>
        </div>
        <div className="dark p-8 rounded-lg bg-background border">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Dark Mode</h2>
            <Preview />
        </div>
    </div>
  )
}