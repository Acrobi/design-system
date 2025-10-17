/**
 * @prop {variant} {enum} {default|destructive|warning|success|info} {default} - The visual style of the alert.
 * @prop {size} {enum} {default|sm|lg} {default} - The size of the alert.
 */
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive:
          "border-destructive/50 text-destructive bg-destructive/10 [&>svg]:text-destructive",
        warning:
          "border-warning/50 text-warning-foreground bg-warning/10 [&>svg]:text-warning dark:border-warning/50 dark:text-warning-foreground dark:bg-warning/20 [&>svg]:text-warning",
        success:
          "border-success/50 text-success-foreground bg-success/10 [&>svg]:text-success dark:border-success/50 dark:text-success-foreground dark:bg-success/20 [&>svg]:text-success",
        info:
          "border-info/50 text-info-foreground bg-info/10 [&>svg]:text-info dark:border-info/50 dark:text-info-foreground dark:bg-info/20 [&>svg]:text-info",
      },
      size: {
        default: "p-4",
        sm: "p-3 text-sm [&>svg]:h-4 [&>svg]:w-4",
        lg: "p-6 text-lg [&>svg]:h-6 [&>svg]:w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, size, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

// Pre-configured alert components with icons
const AlertDestructive = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string; description?: string }
>(({ title, description, className, ...props }, ref) => (
  <Alert variant="destructive" ref={ref} {...props}>
    <AlertCircle className="h-4 w-4" />
    {title && <AlertTitle>{title}</AlertTitle>}
    {description && <AlertDescription>{description}</AlertDescription>}
  </Alert>
))
AlertDestructive.displayName = "AlertDestructive"

const AlertWarning = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string; description?: string }
>(({ title, description, className, ...props }, ref) => (
  <Alert variant="warning" ref={ref} {...props}>
    <AlertTriangle className="h-4 w-4" />
    {title && <AlertTitle>{title}</AlertTitle>}
    {description && <AlertDescription>{description}</AlertDescription>}
  </Alert>
))
AlertWarning.displayName = "AlertWarning"

const AlertSuccess = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string; description?: string }
>(({ title, description, className, ...props }, ref) => (
  <Alert variant="success" ref={ref} {...props}>
    <CheckCircle className="h-4 w-4" />
    {title && <AlertTitle>{title}</AlertTitle>}
    {description && <AlertDescription>{description}</AlertDescription>}
  </Alert>
))
AlertSuccess.displayName = "AlertSuccess"

const AlertInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string; description?: string }
>(({ title, description, className, ...props }, ref) => (
  <Alert variant="info" ref={ref} {...props}>
    <Info className="h-4 w-4" />
    {title && <AlertTitle>{title}</AlertTitle>}
    {description && <AlertDescription>{description}</AlertDescription>}
  </Alert>
))
AlertInfo.displayName = "AlertInfo"

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertDestructive,
  AlertWarning,
  AlertSuccess,
  AlertInfo,
  alertVariants,
}