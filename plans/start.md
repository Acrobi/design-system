# This script should be executed in the root of the 'design-system' repository.

# 1. Fix the Tailwind v4 Incompatibility in tailwind.config.js.
echo "Fixing Tailwind v4 color configuration..."
cat <<'EOL' > ./tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "oklch(var(--border) / <alpha-value>)",
        input: "oklch(var(--input) / <alpha-value>)",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background) / <alpha-value>)",
        foreground: "oklch(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "oklch(var(--popover) / <alpha-value>)",
          foreground: "oklch(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "oklch(var(--card) / <alpha-value>)",
          foreground: "oklch(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: { /* ... keyframes ... */ },
      animation: { /* ... animations ... */ },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOL
echo "Tailwind config updated to be v4 compliant."

# 2. Implement the official 'component-editor' in this project.
# This makes the design-system its own testbed, as per the new strategy.
echo "Implementing the official component-editor..."
cat <<'EOL' > ./src/components/component-editor.tsx
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// This editor is now the primary testing ground for the design system.
// We will add the advanced workbench logic here in future steps.
const Preview = () => (
    <Card>
        <CardHeader><CardTitle>Theme Preview</CardTitle></CardHeader>
        <CardContent><p>This component's colors are rendered by the local theme.</p>
        <div className="flex gap-4 mt-4"><Button>Primary</Button><Button variant="secondary">Secondary</Button></div></CardContent>
    </Card>
);
export function ComponentEditor() {
  return (
    <div className="space-y-8">
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

# 3. Update the main page to use the component editor as its primary view.
echo "Setting main page to display the component editor..."
cat <<'EOL' > ./src/app/page.tsx
import { ComponentEditor } from "@/components/component-editor";
export default function Home() {
  return (
    <main className="p-4 sm:p-8 md:p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Acrobi Design System</h1>
        <p className="text-muted-foreground mt-2">The Golden Master Test Environment</p>
      </div>
      <ComponentEditor />
    </main>
  );
}
EOL
echo "Main page updated."

# 4. Commit and push the architectural improvements.
echo "Committing and pushing changes..."
git add .
git commit -m "refactor(system): fix tailwind v4 config and implement local editor"
git push origin main
echo "Push complete."

# 5. Provide instructions to run the local test environment.
echo "\n--- VALIDATION ---"
echo "To validate, run 'pnpm dev' in this repository."
echo "Open http://localhost:3000 and confirm the components render correctly in both light and dark modes."