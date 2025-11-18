"use client"

import React, { createContext, useContext } from 'react';

interface SensoryContextType {
  playSfx: (sound: string) => void;
}

const SensoryContext = createContext<SensoryContextType | undefined>(undefined);

export const SensoryProvider = ({ children }: { children: React.ReactNode }) => {
  const playSfx = (sound: string) => {
    // Stub implementation - does nothing for now
    // Will be replaced by @acrobi/design-sensory package
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log(`SFX: ${sound}`);
    }
  };

  return (
    <SensoryContext.Provider value={{ playSfx }}>
      {children}
    </SensoryContext.Provider>
  );
};

export const useSensoryFeedback = () => {
  const context = useContext(SensoryContext);
  // Return a default implementation if no provider
  return context || { playSfx: () => {} };
};
