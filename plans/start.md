# This script should be executed in the root of the 'design-system' repository.

# --- Story C1.3: Set Up Developer Tooling ---
# 1. Install the ESLint plugin for Tailwind CSS.
echo "Installing ESLint plugin for Tailwind CSS (Story C1.3)..."
pnpm add -D eslint-plugin-tailwindcss
# 2. Configure the ESLint rules in .eslintrc.json.
echo "Configuring ESLint rules..."
# This command safely adds the plugin and the rule to the JSON file.
node -e "const fs = require('fs'); \
const path = '.eslintrc.json'; \
const config = JSON.parse(fs.readFileSync(path)); \
config.plugins = [...(config.plugins || []), 'tailwindcss']; \
config.rules = {...(config.rules || {}), 'tailwindcss/no-custom-classname': 'warn'}; \
fs.writeFileSync(path, JSON.stringify(config, null, 2));"
echo "ESLint configured to warn against hard-coded style values."

# --- Story C2.2: Implement Sensory Feedback System ---
# 3. Implement the Sensory Feedback provider.
echo "Implementing Sensory Feedback System (Story C2.2)..."
cat <<'EOL' > ./src/components/ui/sensory-provider.tsx
"use client"
import React, { createContext, useContext, useCallback } from 'react';

// For now, these are stubs. In the future, they could play sounds or use the Vibration API.
const playSfx = (sound: string) => console.log(`SFX: Playing sound "${sound}"`);
const triggerHaptic = (pattern: string) => console.log(`HAPTIC: Triggering pattern "${pattern}"`);

interface SensoryContextType {
  playSfx: (sound: string) => void;
  triggerHaptic: (pattern: string) => void;
}

const SensoryContext = createContext<SensoryContextType | undefined>(undefined);

export const SensoryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SensoryContext.Provider value={{ playSfx, triggerHaptic }}>
      {children}
    </SensoryContext.Provider>
  );
};

export const useSensoryFeedback = () => {
  const context = useContext(SensoryContext);
  if (context === undefined) {
    // Return dummy functions if the provider is not used.
    return { playSfx: () => {}, triggerHaptic: () => {} };
  }
  return context;
};
EOL
echo "SensoryProvider created."

# --- Story C2.3: Refactor Core Components ---
# 4. Create the 'Label' component, refactored to use the Icon system.
echo "Creating refactored Label component (Story C2.3)..."
cat <<'EOL' > ./src/components/ui/label.tsx
/**
 * @prop {icon} {string} {} - The semantic metaphor for the icon to display.
 * @prop {className} {string} {} - Additional CSS classes.
 */
import * as React from "react"
import { cn } from "@/lib/utils"
import { IconMetaphor } from "@/lib/icon-metaphors"
import { Icon } from "@/components/ui/icon"

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  icon?: IconMetaphor;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, icon, ...props }, ref) => {
    return (
      <label ref={ref} className={cn("inline-flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)} {...props}>
        {icon && <Icon metaphor={icon} />}
        {children}
      </label>
    )
  }
)
Label.displayName = "Label"
export { Label }
EOL
echo "Label component created."

# 5. Refactor the 'Button' component to use the Sensory Feedback system.
echo "Refactoring Button component..."
sed -i.bak "s|\"use client\"|\"use client\"\n\nimport { useSensoryFeedback } from \"./sensory-provider\"|" ./src/components/ui/button.tsx
# Add the hook call and onClick wrapper
sed -i.bak "s|({ className, style, size, asChild = false, ...props }, ref) => {|({ className, style, size, asChild = false, onClick, ...props }, ref) => {\n    const { playSfx } = useSensoryFeedback();\n    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {\n      playSfx('click');\n      if (onClick) onClick(e);\n    };|" ./src/components/ui/button.tsx
sed -i.bak "s|{...props}|{...props} onClick={handleClick}|" ./src/components/ui/button.tsx
rm ./src/components/ui/button.tsx.bak
echo "Button refactored."

# 6. Re-build the registry and push all changes.
echo "Re-building registry to include new Label component and pushing changes..."
pnpm build
git add .
git commit -m "feat(system): implement linting, sensory feedback, and component refactors"
git push origin main
echo "Push complete."