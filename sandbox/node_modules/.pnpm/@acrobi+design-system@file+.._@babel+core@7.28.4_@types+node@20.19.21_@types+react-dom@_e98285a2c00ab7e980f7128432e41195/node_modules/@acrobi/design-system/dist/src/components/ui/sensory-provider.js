"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from 'react';
// For now, these are stubs. In the future, they could play sounds or use the Vibration API.
const playSfx = (sound) => console.log(`SFX: Playing sound "${sound}"`);
const triggerHaptic = (pattern) => console.log(`HAPTIC: Triggering pattern "${pattern}"`);
const SensoryContext = createContext(undefined);
export const SensoryProvider = ({ children }) => {
    return (_jsx(SensoryContext.Provider, { value: { playSfx, triggerHaptic }, children: children }));
};
export const useSensoryFeedback = () => {
    const context = useContext(SensoryContext);
    if (context === undefined) {
        // Return dummy functions if the provider is not used.
        return { playSfx: () => { }, triggerHaptic: () => { } };
    }
    return context;
};
//# sourceMappingURL=sensory-provider.js.map