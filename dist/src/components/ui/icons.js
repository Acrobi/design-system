var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
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
    return (_jsx(LucideIcon, Object.assign({ ref: ref, className: cn(sizeClasses[size], className) }, props)));
});
CustomIcon.displayName = "Icon";
export { CustomIcon as Icon };
//# sourceMappingURL=icons.js.map