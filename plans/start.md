# This script should be executed in the root of the 'design-system' repository.

# 1. Create a second sample client theme to make switching meaningful.
echo "Creating 'client-b.css' sample theme..."
cat <<'EOL' > ./themes/client-b.css
/* Client B Theme: A Green Brand Color */
:root { --brand-primary: #16a34a; }
EOL
echo "Sample theme created."

# 2. Create the dynamic ThemeProvider component.
echo "Implementing ThemeProvider in /src/components/theme-provider.tsx..."
cat <<'EOL' > ./src/components/theme-provider.tsx
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
  setTheme: (theme: { name: string, color: string }) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState({ name: 'default', color: '' });

  useEffect(() => {
    // Remove any existing dynamic theme stylesheet
    const existingLink = document.getElementById('dynamic-theme');
    if (existingLink) {
      existingLink.remove();
    }

    // If a theme with a color is selected, create and append a new stylesheet link.
    if (theme.name !== 'default' && theme.color) {
      const link = document.createElement('link');
      link.id = 'dynamic-theme';
      link.rel = 'stylesheet';
      link.href = `/api/themes/dynamic.css?primary=${theme.color.replace('#', '')}`;
      document.head.appendChild(link);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
EOL
echo "ThemeProvider created."

# 3. Integrate the ThemeProvider into the root layout.
echo "Integrating ThemeProvider into the root layout..."
# We will wrap the children of the body tag with our new provider.
sed -i.bak 's|{children}|<ThemeProvider>{children}</ThemeProvider>|' ./src/app/layout.tsx
# Add the necessary import statement at the top.
sed -i.bak "1s;^;import { ThemeProvider } from '@/components/theme-provider';\n;" ./src/app/layout.tsx
rm ./src/app/layout.tsx.bak
echo "Layout updated."

# 4. Create the official 'component-editor.tsx' inside this project.
echo "Creating the official component-editor.tsx..."
cat <<'EOL' > ./src/components/component-editor.tsx
"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
EOL
echo "Component editor created."

# 5. Update the main page of the application to be the component editor.
echo "Setting the main page to be the component editor..."
cat <<'EOL' > ./src/app/page.tsx
import { ComponentEditor } from "@/components/component-editor";

export default function Home() {
  return (
    <main className="p-4 sm:p-8 md:p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Acrobi Component Editor</h1>
        <p className="text-muted-foreground mt-2">The Source of Truth for Component Testing & Visualization.</p>
      </div>
      <ComponentEditor />
    </main>
  );
}
EOL
echo "Main page updated."

# 6. Commit and push the new editor and theming system.
echo "Committing and pushing changes..."
git add .
git commit -m "feat(theme): implement dynamic theme provider and editor UI (W1.3)"
git push origin main
echo "Push complete."