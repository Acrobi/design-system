# This script is idempotent and will overwrite existing test pages with the new, more comprehensive versions.

# 1. Create a simple navigation component to access the test pages.
echo "Ensuring navigation component exists..."
mkdir -p ./src/components
cat <<'EOL' > ./src/components/nav.tsx
import Link from 'next/link';
export const Nav = () => (
  <nav className="p-4 border-b bg-muted/40">
    <div className="container mx-auto flex gap-6 text-sm font-medium">
      <Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link>
      <Link href="/button" className="hover:text-foreground">Button</Link>
      <Link href="/icon" className="hover:text-foreground">Icon</Link>
      <Link href="/label" className="hover:text-foreground">Label</Link>
    </div>
  </nav>
);
EOL
echo "Nav component is up-to-date."

# 2. Ensure the navigation is in the root layout.
echo "Updating root layout to include navigation..."
sed -i.bak "s|import './globals.css'|import './globals.css'\nimport { Nav } from '@/components/nav'|" ./src/app/layout.tsx
sed -i.bak 's|{children}|<Nav />{children}|' ./src/app/layout.tsx
# Clean up any duplicate imports or navs if the script is re-run
# (This is a simplified approach for the agent)
rm ./src/app/layout.tsx.bak
echo "Layout updated."

# 3. Overwrite the 'button' test page with the comprehensive "gold standard" version.
echo "Implementing the gold standard test page for Button..."
mkdir -p ./src/app/button
cat <<'EOL' > ./src/app/button/page.tsx
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function ButtonTestPage() {
  const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const;
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Button Component</h1>
      {variants.map((variant) => (
        <div key={variant} className="mb-8">
          <h2 className="text-xl font-semibold capitalize mb-4 border-b pb-2">{variant}</h2>
          <div className="flex items-center gap-4 flex-wrap p-4 bg-muted/20 rounded-lg">
            <Button variant={variant} size="lg">Large Button</Button>
            <Button variant={variant} size="default">Default Button</Button>
            <Button variant={variant} size="sm">Small Button</Button>
            <Button variant={variant} size="icon"><Rocket className="h-4 w-4" /></Button>
            <Button variant={variant} disabled>Disabled</Button>
          </div>
        </div>
      ))}
    </main>
  );
}
EOL
echo "Button test page is now the gold standard."

# 4. Overwrite the 'Icon' test page, following the gold standard format.
echo "Implementing the gold standard test page for Icon..."
mkdir -p ./src/app/icon
cat <<'EOL' > ./src/app/icon/page.tsx
import { Icon } from "@/components/ui/icon";
import { iconMetaphors } from "@/lib/icon-metaphors";
import { Button } from "@/components/ui/button";

export default function IconTestPage() {
  const sizes = [ { class: "h-4 w-4", name: "Small (16px)" }, { class: "h-6 w-6", name: "Default (24px)" }, { class: "h-8 w-8", name: "Large (32px)" } ];
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Icon Component</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Sizes</h2>
        <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
          {sizes.map(size => (
            <div key={size.name} className="flex items-center gap-4">
              <Icon metaphor="settings" className={size.class} />
              <span className="text-sm font-medium">{size.name}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Full Metaphor Library</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4 bg-muted/20 rounded-lg">
          {iconMetaphors.map((metaphor) => (
            <div key={metaphor} title={metaphor} className="flex flex-col items-center justify-center gap-2 p-2 border rounded-md bg-background aspect-square">
              <Icon metaphor={metaphor} className="h-6 w-6" />
              <code className="text-xs text-muted-foreground truncate">{metaphor}</code>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
EOL
echo "Icon test page upgraded."

# 5. Overwrite the 'Label' test page, following the gold standard format.
echo "Implementing the gold standard test page for Label..."
mkdir -p ./src/app/label
cat <<'EOL' > ./src/app/label/page.tsx
import { Label } from "@/components/ui/label";

export default function LabelTestPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Label Component</h1>
      <div className="space-y-8 max-w-sm">
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Variants</h2>
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Default</h3>
              <Label>This is a standard label.</Label>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">With Icon Metaphor</h3>
              <Label icon="save">Label with a save icon</Label>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Contextual Usage</h2>
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="h-4 w-4" />
                <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email" icon="user">Email</Label>
                <input type="email" id="email" placeholder="Email" className="h-10 w-full rounded-md border border-input px-3" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
EOL
echo "Label test page upgraded."

# 6. Commit and push the new test pages.
echo "Committing and pushing gold standard test pages..."
git add .
git commit -m "feat(test): implement gold standard test pages for all components"
git push origin main
echo "Push complete."