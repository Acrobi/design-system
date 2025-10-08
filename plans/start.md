# This script should be executed in the root of the 'Acrobi-Design-System' repository.

# 1. Remove the internal '_label.tsx' component, as it's no longer needed.
echo "Removing the over-engineered internal label component..."
rm -f ./src/components/_internal/label.tsx
rmdir ./src/components/_internal
echo "Internal component removed."

# 2. Re-architect the public 'button.tsx' component to match the shadcn/ui API.
echo "Refactoring public button.tsx to use composition..."
cat <<'EOL' > ./src/components/ui/button.tsx
/** @usage
<Button>
  <Mail className="mr-2 h-4 w-4" /> Login with Email
</Button>
*/
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
EOL
echo "Button component refactored."

# 3. Update the registry builder to ignore the (now deleted) '_internal' directory.
echo "Updating registry builder to scan the correct 'ui' directory..."
# This ensures the script is looking in 'src/components/ui' and not 'primitives'.
sed -i.bak "s|const COMPONENTS_DIR = path.resolve(\"src/components/primitives\");|const COMPONENTS_DIR = path.resolve(\"src/components/ui\");|" ./scripts/build-registry.js
rm ./scripts/build-registry.js.bak
echo "Registry builder updated."

# 4. Re-build the project to update the registry with the new usage example.
echo "Re-building registry and pushing changes to remote..."
pnpm build
git add .
git commit -m "refactor(button): align with shadcn/ui compositional API"
git push origin main
echo "Push complete."