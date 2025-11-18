/**
 * @acrobi/design-composites
 *
 * Complex composite UI components for the Acrobi Design System
 * Tier 3 components built from primitives
 */

// Export utilities
export { cn } from './lib/utils';

// Export Card
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';

// Export Dialog
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './dialog';

// Export Tabs
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';

// Export Alert
export { Alert, AlertTitle, AlertDescription } from './alert';

// Export Badge
export { Badge, badgeVariants } from './badge';

// Export Select
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator } from './select';

// Export Spinner
export { Spinner } from './spinner';

/**
 * Package metadata
 */
export const PACKAGE_INFO = {
  name: '@acrobi/design-composites',
  version: '1.0.0',
  description: 'Complex composite UI components for the Acrobi Design System',
  tier: 3,
} as const;
