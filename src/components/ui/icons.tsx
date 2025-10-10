import * as React from "react"
import { cn } from "../../lib/utils"
import { IconMetaphor } from "../../lib/icon-metaphors"
import { lucideMap } from "../../lib/icon-maps/lucide.map"

// Icon component using the Icon Metaphor System
const CustomIcon = React.forwardRef<SVGSVGElement, { metaphor: IconMetaphor, className?: string, size?: "default" | "sm" | "lg" }>(
  ({ metaphor, className, size = "default", ...props }, ref) => {
    const LucideIcon = lucideMap[metaphor] || lucideMap.placeholder;

    const sizeClasses = {
      default: "h-4 w-4",
      sm: "h-3 w-3",
      lg: "h-5 w-5"
    };

    return (
      <LucideIcon
        ref={ref}
        className={cn(sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
CustomIcon.displayName = "Icon";

export { CustomIcon as Icon };