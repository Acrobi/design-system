// Primitive UI Components - Core Design System Components
// These components strictly follow the no-hard-coded-values rule
// All styling uses CSS variables from the theme system

// Form Components
export { Button, buttonVariants } from "./button"
export { Input, inputVariants } from "./input"
export { Textarea, textareaVariants } from "./textarea"
export { Label } from "./label"
export { Checkbox, checkboxVariants } from "./checkbox"
export { Switch, switchVariants } from "./switch"

// Selection Components
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  selectVariants
} from "./select"

// Display Components
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
export { Badge, badgeVariants } from "./badge"

// Navigation Components
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsVariants } from "./tabs"

// Overlay Components
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogVariants
} from "./dialog"

// Feedback Components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDestructive,
  AlertWarning,
  AlertSuccess,
  AlertInfo,
  alertVariants
} from "./alert"

// Theme Components
export { ThemeProvider, useTheme } from "./theme-provider"
export { SensoryProvider, useSensoryFeedback } from "./sensory-provider"

// Icon Components
export { Icon } from "./icon"
export { ThemeSelector } from "./theme-selector"
export { ThemeSelectorCompact } from "./theme-selector-compact"

// Demo Components
export { FoundationsDemo } from "./foundations-demo"

// Legacy/Supporting Components
export { Spinner } from "./spinner"
export { GlobalNavigation } from "./global-navigation"

// Re-export types for convenience
export type { ButtonProps } from "./button"
export type { InputProps } from "./input"
export type { TextareaProps } from "./textarea"
export type { CheckboxProps } from "./checkbox"
export type { SwitchProps } from "./switch"
export type { BadgeProps } from "./badge"