/**
 * Acrobi Extension Entry Point
 *
 * This file provides Level 2 integration with the Acrobi Framework
 * Enables hook-based integration and lifecycle management
 */

// Types for Acrobi Extension (would normally come from @acrobi/core)
interface ExtensionContext {
  extensionId: string;
  config: Record<string, any>;
  hooks: {
    addAction: (hook: string, callback: (...args: any[]) => void | Promise<void>, priority?: number) => void;
    addFilter: (hook: string, callback: (...args: any[]) => any, priority?: number) => void;
  };
  logger: {
    info: (message: string, ...args: any[]) => void;
    debug: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
    error: (message: string, error?: Error) => void;
  };
}

/**
 * Play a sound effect
 */
function playSound(sound: string): void {
  if (typeof window === 'undefined') return;

  // In a real implementation, this would play actual sound files
  console.log(`[Sensory] Playing sound: ${sound}`);
}

/**
 * Trigger haptic feedback
 */
function triggerHaptic(pattern: number | number[]): void {
  if (typeof window === 'undefined' || !navigator.vibrate) return;

  try {
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('[Sensory] Haptic feedback not supported', error);
  }
}

/**
 * Extension activation function
 * Called when the extension is activated in the Acrobi Framework
 */
export async function activate(context: ExtensionContext): Promise<void> {
  const config = context.config || {};
  const hapticsEnabled = config.hapticsEnabled ?? true;
  const soundsEnabled = config.soundsEnabled ?? false;

  context.logger.info('Sensory feedback extension activated');

  // Register hook for button clicks
  context.hooks.addAction('ui:button:click', async (event: any) => {
    if (hapticsEnabled) {
      triggerHaptic(10); // Short vibration
    }
    if (soundsEnabled) {
      playSound('click');
    }
  });

  // Register hook for errors
  context.hooks.addAction('ui:error', async (error: any) => {
    if (hapticsEnabled) {
      triggerHaptic([100, 50, 100]); // Error vibration pattern
    }
    if (soundsEnabled) {
      playSound('error');
    }
  });

  // Register hook for success
  context.hooks.addAction('ui:success', async () => {
    if (hapticsEnabled) {
      triggerHaptic([50, 30, 50, 30, 50]); // Success vibration pattern
    }
    if (soundsEnabled) {
      playSound('success');
    }
  });

  context.logger.debug('Sensory feedback hooks registered', {
    hapticsEnabled,
    soundsEnabled,
  });
}

/**
 * Extension deactivation function
 * Called when the extension is deactivated
 */
export async function deactivate(): Promise<void> {
  console.log('[Sensory] Extension deactivated');
}
