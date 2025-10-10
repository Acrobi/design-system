/**
 * @prop {metaphor} {string} {} - The semantic name of the icon to display.
 * @prop {className} {string} {} - Additional CSS classes.
 */
import * as React from "react"
import { cn } from "../../lib/utils"
import { IconMetaphor } from "../../lib/icon-metaphors"
import { lucideMap } from "../../lib/icon-maps/lucide.map"

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