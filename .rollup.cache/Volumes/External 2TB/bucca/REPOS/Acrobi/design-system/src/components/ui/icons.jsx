import { __rest } from "tslib";
import * as React from "react";
import { cn } from "../../lib/utils";
import { lucideMap } from "../../lib/icon-maps/lucide.map";
// Icon component using the Icon Metaphor System
const CustomIcon = React.forwardRef((_a, ref) => {
    var { metaphor, className, size = "default" } = _a, props = __rest(_a, ["metaphor", "className", "size"]);
    const LucideIcon = lucideMap[metaphor] || lucideMap.placeholder;
    const sizeClasses = {
        default: "h-4 w-4",
        sm: "h-3 w-3",
        lg: "h-5 w-5"
    };
    return (<LucideIcon ref={ref} className={cn(sizeClasses[size], className)} {...props}/>);
});
CustomIcon.displayName = "Icon";
export { CustomIcon as Icon };
//# sourceMappingURL=icons.jsx.map