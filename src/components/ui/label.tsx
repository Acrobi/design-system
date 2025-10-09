/**
 * @prop {icon} {string} {} - The semantic metaphor for the icon to display.
 * @prop {className} {string} {} - Additional CSS classes.
 */
import * as React from "react"
import { cn } from "@/lib/utils"
import { IconMetaphor } from "@/src/lib/icon-metaphors"
import { Icon } from "@/src/components/ui/icon"

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