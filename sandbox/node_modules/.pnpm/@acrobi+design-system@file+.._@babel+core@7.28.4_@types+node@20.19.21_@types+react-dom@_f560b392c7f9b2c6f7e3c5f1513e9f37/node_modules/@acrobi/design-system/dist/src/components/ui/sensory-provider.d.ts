import React from 'react';
interface SensoryContextType {
    playSfx: (sound: string) => void;
    triggerHaptic: (pattern: string) => void;
}
export declare const SensoryProvider: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useSensoryFeedback: () => SensoryContextType;
export {};
//# sourceMappingURL=sensory-provider.d.ts.map