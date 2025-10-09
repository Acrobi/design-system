# This script should be executed in the root of the 'design-system' repository.

# --- Story C1.2: Configure Tailwind CSS Bridge ---
# 1. Replace the existing tailwind.config.js with the new, authoritative version.
echo "Implementing Tailwind CSS bridge (Story C1.2)..."
cat <<'EOL' > ./tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [ './pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', ],
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    extend: {
      colors: {
        border: 'hsl(var(--border))', input: 'hsl(var(--input))', ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))', foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
      },
      borderRadius: { lg: 'var(--radius)', md: 'calc(var(--radius) - 0.25rem)', sm: 'calc(var(--radius) - 0.5rem)' },
      transitionDuration: { ultrafast: 'var(--duration-ultrafast)', fast: 'var(--duration-fast)', normal: 'var(--duration-normal)', slow: 'var(--duration-slow)', ultraslow: 'var(--duration-ultraslow)' },
      transitionTimingFunction: { linear: 'var(--ease-linear)', in: 'var(--ease-in)', out: 'var(--ease-out)', 'in-out': 'var(--ease-in-out)', spring: 'var(--ease-spring)' },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "slide-in-from-bottom": { "0%": { transform: "translateY(100%)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom var(--duration-normal) var(--ease-out)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOL
echo "Tailwind config updated."

# --- Story C2.1: Implement Motion System ---
# 2. Add the motion primitive tokens to globals.css.
echo "Implementing Motion System (Story C2.1)..."
sed -i.bak '/--radius: var(--radius-md);/a \
    /* Motion Primitives */\
    --duration-ultrafast: 60ms;\
    --duration-fast: 120ms;\
    --duration-normal: 240ms;\
    --duration-slow: 480ms;\
    --duration-ultraslow: 960ms;\
    --ease-linear: linear;\
    --ease-in: cubic-bezier(0.4, 0, 1, 1);\
    --ease-out: cubic-bezier(0, 0, 0.2, 1);\
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\
    --ease-spring: cubic-bezier(0.5, 1.5, 0.5, 1);' ./src/styles/globals.css
rm ./src/styles/globals.css.bak
echo "Motion primitives added."

# --- Story C2.2: Implement Icon Metaphor System ---
# 3. Create the necessary directories and files.
echo "Implementing Icon Metaphor System (Story C2.2)..."
mkdir -p ./src/lib/icon-maps
# 4. Create the icon metaphor contract.
cat <<'EOL' > ./src/lib/icon-metaphors.ts
export const iconMetaphors = [ "add", "remove", "delete", "edit", "save", "close", "search", "upload", "download", "copy", "send", "chevron-down", "chevron-up", "chevron-left", "chevron-right", "arrow-left", "arrow-right", "external-link", "menu", "user", "users", "home", "settings", "bell", "notification", "heart", "star-filled", "star-empty", "image", "file", "folder", "calendar", "clock", "info", "success", "warning", "error", "help", "eye-open", "eye-closed", "sun", "moon", "play", "pause", "stop", "placeholder" ] as const;
export type IconMetaphor = typeof iconMetaphors[number];
EOL
# 5. Create the default Lucide icon map.
cat <<'EOL' > ./src/lib/icon-maps/lucide.map.ts
import { type LucideIcon, Plus, Minus, Trash2, Edit, Save, X, Search, Upload, Download, Copy, Send, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, ExternalLink, Menu, User, Users, Home, Settings, Bell, Heart, Star, Image, File, Folder, Calendar, Clock, Info, CheckCircle2, AlertTriangle, XCircle, HelpCircle, Eye, EyeOff, Sun, Moon, Play, Pause, StopCircle, CircleHelp } from 'lucide-react';
import { type IconMetaphor } from '../icon-metaphors';
export const lucideMap: Record<IconMetaphor, LucideIcon> = { "add": Plus, "remove": Minus, "delete": Trash2, "edit": Edit, "save": Save, "close": X, "search": Search, "upload": Upload, "download": Download, "copy": Copy, "send": Send, "chevron-down": ChevronDown, "chevron-up": ChevronUp, "chevron-left": ChevronLeft, "chevron-right": ChevronRight, "arrow-left": ArrowLeft, "arrow-right": ArrowRight, "external-link": ExternalLink, "menu": Menu, "user": User, "users": Users, "home": Home, "settings": Settings, "bell": Bell, "notification": Bell, "heart": Heart, "star-filled": Star, "star-empty": Star, "image": Image, "file": File, "folder": Folder, "calendar": Calendar, "clock": Clock, "info": Info, "success": CheckCircle2, "warning": AlertTriangle, "error": XCircle, "help": HelpCircle, "eye-open": Eye, "eye-closed": EyeOff, "sun": Sun, "moon": Moon, "play": Play, "pause": Pause, "stop": StopCircle, "placeholder": CircleHelp };
EOL
# 6. Create the 'Icon' component, which is the consumer of the system.
cat <<'EOL' > ./src/components/ui/icon.tsx
/**
 * @prop {metaphor} {string} {} - The semantic name of the icon to display.
 * @prop {className} {string} {} - Additional CSS classes.
 */
import * as React from "react"
import { cn } from "@/lib/utils"
import { IconMetaphor } from "@/lib/icon-metaphors"
import { lucideMap } from "@/lib/icon-maps/lucide.map"

// In the future, this component will use a React Context to get a theme-specific map.
// For now, it directly uses the default Lucide map.
const Icon = React.forwardRef<SVGSVGElement, { metaphor: IconMetaphor, className?: string }>(
  ({ metaphor, className, ...props }, ref) => {
    const LucideIcon = lucideMap[metaphor] || lucideMap.placeholder;
    return ( <LucideIcon ref={ref} className={cn("h-4 w-4", className)} {...props} /> );
  }
)
Icon.displayName = "Icon"
export { Icon }
EOL
echo "Icon system created."

# 7. Re-build the registry and push all changes.
echo "Re-building registry to include new Icon component and pushing changes..."
pnpm build
git add .
git commit -m "feat(system): implement tailwind bridge, motion, and icon systems"
git push origin main
echo "Push complete."