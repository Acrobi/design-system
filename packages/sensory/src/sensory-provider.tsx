"use client"
import React, { createContext, useContext } from 'react';

// For now, these are stubs. In the future, they could play sounds or use the Vibration API.
const playSfx = (sound: string) => console.log(`SFX: Playing sound "${sound}"`);
const triggerHaptic = (pattern: string) => console.log(`HAPTIC: Triggering pattern "${pattern}"`);

interface SensoryContextType {
  playSfx: (sound: string) => void;
  triggerHaptic: (pattern: string) => void;
}

const SensoryContext = createContext<SensoryContextType | undefined>(undefined);

export const SensoryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SensoryContext.Provider value={{ playSfx, triggerHaptic }}>
      {children}
    </SensoryContext.Provider>
  );
};

export const useSensoryFeedback = () => {
  const context = useContext(SensoryContext);
  if (context === undefined) {
    // Return dummy functions if the provider is not used.
    return { playSfx: () => {}, triggerHaptic: () => {} };
  }
  return context;
};