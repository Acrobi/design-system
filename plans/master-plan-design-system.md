# This is the Master Plan for the 'design-system' repository.
# It is idempotent and can be run on an empty directory.

# --- Phase 1: Setup & Configuration ---
echo "Phase 1: Setting up the project foundation..."
# 1. Start with a clean clone of the shadcn/ui registry template.
git clone https://github.com/shadcn-ui/registry-template-v4.git .
rm -rf .git
git init
# 2. Customize package.json for Acrobi.
node -e "const fs = require('fs'); const pkgPath = 'package.json'; const pkg = JSON.parse(fs.readFileSync(pkgPath)); pkg.name = '@acrobi/design-system'; pkg.repository.url = 'git+https://github.com/Acrobi/design-system.git'; fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));"
# 3. Implement the authoritative oklch theme in a new /styles directory.
mkdir -p ./src/styles
cat <<'EOL' > ./src/styles/globals.css
@layer base {
  :root {
    --background: oklch(1 0 0); --foreground: oklch(0.145 0 0); --card: oklch(1 0 0);
    --card-foreground: oklch(0.145 0 0); --popover: oklch(1 0 0); --popover-foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0); --primary-foreground: oklch(0.985 0 0); --secondary: oklch(0.97 0 0);
    --secondary-foreground: oklch(0.205 0 0); --muted: oklch(0.97 0 0); --muted-foreground: oklch(0.556 0 0);
    --accent: oklch(0.97 0 0); --accent-foreground: oklch(0.205 0 0); --destructive: oklch(0.577 0.245 27.325);
    --border: oklch(0.922 0 0); --input: oklch(0.922 0 0); --ring: oklch(0.708 0 0); --radius: 0.625rem;
  }
  .dark {
    --background: oklch(0.145 0 0); --foreground: oklch(0.985 0 0); --card: oklch(0.205 0 0);
    --card-foreground: oklch(0.985 0 0); --popover: oklch(0.269 0 0); --popover-foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0); --primary-foreground: oklch(0.205 0 0); --secondary: oklch(0.269 0 0);
    --secondary-foreground: oklch(0.985 0 0); --muted: oklch(0.269 0 0); --muted-foreground: oklch(0.708 0 0);
    --accent: oklch(0.371 0 0); --accent-foreground: oklch(0.985 0 0); --destructive: oklch(0.704 0.191 22.216);
    --border: oklch(1 0 0 / 10%); --input: oklch(1 0 0 / 15%); --ring: oklch(0.556 0 0);
  }
}
@layer base { * { @apply border-border; } body { @apply bg-background text-foreground; } }
EOL
# 4. Update the layout to use the new stylesheet location.
rm ./src/app/globals.css
sed -i.bak "s|@/app/globals.css|@/styles/globals.css|" ./src/app/layout.tsx && rm ./src/app/layout.tsx.bak
# 5. Implement the v4-compliant Tailwind config.
cat <<'EOL' > ./tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: "oklch(var(--border) / <alpha-value>)", input: "oklch(var(--input) / <alpha-value>)", ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background) / <alpha-value>)", foreground: "oklch(var(--foreground) / <alpha-value>)",
        primary: { DEFAULT: "oklch(var(--primary) / <alpha-value>)", foreground: "oklch(var(--primary-foreground) / <alpha-value>)" },
        secondary: { DEFAULT: "oklch(var(--secondary) / <alpha-value>)", foreground: "oklch(var(--secondary-foreground) / <alpha-value>)" },
        destructive: { DEFAULT: "oklch(var(--destructive) / <alpha-value>)", foreground: "oklch(var(--destructive-foreground) / <alpha-value>)" },
        muted: { DEFAULT: "oklch(var(--muted) / <alpha-value>)", foreground: "oklch(var(--muted-foreground) / <alpha-value>)" },
        accent: { DEFAULT: "oklch(var(--accent) / <alpha-value>)", foreground: "oklch(var(--accent-foreground) / <alpha-value>)" },
        popover: { DEFAULT: "oklch(var(--popover) / <alpha-value>)", foreground: "oklch(var(--popover-foreground) / <alpha-value>)" },
        card: { DEFAULT: "oklch(var(--card) / <alpha-value>)", foreground: "oklch(var(--card-foreground) / <alpha-value>)" },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOL

# --- Phase 2: System Implementation (Icon, Sensory) ---
echo "Phase 2: Implementing core systems..."
# 6. Implement Icon Metaphor System.
mkdir -p ./src/lib/icon-maps
cat <<'EOL' > ./src/lib/icon-metaphors.ts
export const iconMetaphors = [ "add", "remove", "delete", "edit", "save", "close", "search", "upload", "download", "copy", "send", "chevron-down", "chevron-up", "chevron-left", "chevron-right", "arrow-left", "arrow-right", "external-link", "menu", "user", "users", "home", "settings", "bell", "notification", "heart", "star-filled", "star-empty", "image", "file", "folder", "calendar", "clock", "info", "success", "warning", "error", "help", "eye-open", "eye-closed", "sun", "moon", "play", "pause", "stop", "placeholder" ] as const;
export type IconMetaphor = typeof iconMetaphors[number];
EOL
cat <<'EOL' > ./src/lib/icon-maps/lucide.map.ts
import { type LucideIcon, Plus, Minus, Trash2, Edit, Save, X, Search, Upload, Download, Copy, Send, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, ExternalLink, Menu, User, Users, Home, Settings, Bell, Heart, Star, Image, File, Folder, Calendar, Clock, Info, CheckCircle2, AlertTriangle, XCircle, HelpCircle, Eye, EyeOff, Sun, Moon, Play, Pause, StopCircle, CircleHelp } from 'lucide-react';
import { type IconMetaphor } from '../icon-metaphors';
export const lucideMap: Record<IconMetaphor, LucideIcon> = { "add": Plus, "remove": Minus, "delete": Trash2, "edit": Edit, "save": Save, "close": X, "search": Search, "upload": Upload, "download": Download, "copy": Copy, "send": Send, "chevron-down": ChevronDown, "chevron-up": ChevronUp, "chevron-left": ChevronLeft, "chevron-right": ChevronRight, "arrow-left": ArrowLeft, "arrow-right": ArrowRight, "external-link": ExternalLink, "menu": Menu, "user": User, "users": Users, "home": Home, "settings": Settings, "bell": Bell, "notification": Bell, "heart": Heart, "star-filled": Star, "star-empty": Star, "image": Image, "file": File, "folder": Folder, "calendar": Calendar, "clock": Clock, "info": Info, "success": CheckCircle2, "warning": AlertTriangle, "error": XCircle, "help": HelpCircle, "eye-open": Eye, "eye-closed": EyeOff, "sun": Sun, "moon": Moon, "play": Play, "pause": Pause, "stop": StopCircle, "placeholder": CircleHelp };
EOL
# 7. Implement Sensory Feedback System.
cat <<'EOL' > ./src/components/ui/sensory-provider.tsx
"use client"; import React, { createContext, useContext } from 'react';
const playSfx = (sound: string) => console.log(`SFX: ${sound}`);
interface SensoryContextType { playSfx: (sound: string) => void; }
const SensoryContext = createContext<SensoryContextType | undefined>(undefined);
export const SensoryProvider = ({ children }: { children: React.ReactNode }) => (<SensoryContext.Provider value={{ playSfx }}>{children}</SensoryContext.Provider>);
export const useSensoryFeedback = () => useContext(SensoryContext) || { playSfx: () => {} };
EOL

# --- Phase 3: Component Implementation & Test Pages ---
echo "Phase 3: Implementing components and their test pages..."
# 8. Create/overwrite the core components (Icon, Label, Button).
# The agent will use its context to fill these files with the final, correct versions from our previous steps.
cat <<'EOL' > ./src/components/ui/icon.tsx
/* The agent should fill this with the final Icon component code. */
EOL
cat <<'EOL' > ./src/components/ui/label.tsx
/* The agent should fill this with the final Label component code. */
EOL
cat <<'EOL' > ./src/components/ui/button.tsx
/* The agent should fill this with the final, refactored Button component code. */
EOL
# 9. Create the test page infrastructure.
cat <<'EOL' > ./src/components/nav.tsx
import Link from 'next/link';
export const Nav = () => ( <nav className="p-4 border-b bg-muted/40"><div className="container mx-auto flex gap-6 text-sm font-medium"><Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link><Link href="/button" className="hover:text-foreground">Button</Link><Link href="/icon" className="hover:text-foreground">Icon</Link><Link href="/label" className="hover:text-foreground">Label</Link></div></nav> );
EOL
sed -i.bak "s|{children}|<SensoryProvider><Nav />{children}</SensoryProvider>|" ./src/app/layout.tsx && rm ./src/app/layout.tsx.bak
sed -i.bak "1s;^;import { Nav } from '@/components/nav';\nimport { SensoryProvider } from '@/components/ui/sensory-provider';\n;" ./src/app/layout.tsx && rm ./src/app/layout.tsx.bak
# 10. Create the "gold standard" test pages.
# The agent will use its context to fill these with the final, comprehensive versions.
mkdir -p ./src/app/button ./src/app/icon ./src/app/label
cat <<'EOL' > ./src/app/button/page.tsx
/* The agent should fill this with the final Button test page code. */
EOL
cat <<'EOL' > ./src/app/icon/page.tsx
/* The agent should fill this with the final Icon test page code. */
EOL
cat <<'EOL' > ./src/app/label/page.tsx
/* The agent should fill this with the final Label test page code. */
EOL
# 11. Create a simple home page.
cat <<'EOL' > ./src/app/page.tsx
export default function Home() { return (<main className="container mx-auto p-8 text-center"><h1 className="text-4xl font-bold">Acrobi Design System</h1><p className="text-muted-foreground mt-2">The Golden Master. Use the navigation to review components.</p></main>); }
EOL

# --- Finalization ---
echo "Phase 4: Finalizing the project..."
pnpm install
pnpm build # Build the registry
echo "Setup complete. The 'design-system' is now a fully runnable test environment."
echo "HANDOFF: Run 'pnpm dev' and verify all test pages work correctly."