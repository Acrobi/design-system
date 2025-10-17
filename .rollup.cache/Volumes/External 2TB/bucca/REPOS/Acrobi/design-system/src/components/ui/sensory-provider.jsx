"use client";
import React, { createContext, useContext } from 'react';
// For now, these are stubs. In the future, they could play sounds or use the Vibration API.
const playSfx = (sound) => console.log(`SFX: Playing sound "${sound}"`);
const triggerHaptic = (pattern) => console.log(`HAPTIC: Triggering pattern "${pattern}"`);
const SensoryContext = createContext(undefined);
export const SensoryProvider = ({ children }) => {
    return (<SensoryContext.Provider value={{ playSfx, triggerHaptic }}>
      {children}
    </SensoryContext.Provider>);
};
export const useSensoryFeedback = () => {
    const context = useContext(SensoryContext);
    if (context === undefined) {
        // Return dummy functions if the provider is not used.
        return { playSfx: () => { }, triggerHaptic: () => { } };
    }
    return context;
};
//# sourceMappingURL=sensory-provider.jsx.map