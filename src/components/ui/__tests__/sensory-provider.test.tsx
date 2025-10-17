import { renderHook } from '@testing-library/react';
import { SensoryProvider, useSensoryFeedback } from '../sensory-provider';

describe('SensoryProvider', () => {
  // Mock console methods
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  describe('Provider Rendering', () => {
    it('renders children without errors', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      expect(result.current).toBeDefined();
    });
  });

  describe('Sensory Feedback Hook', () => {
    it('provides playSfx function', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      expect(typeof result.current.playSfx).toBe('function');
    });

    it('provides triggerHaptic function', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      expect(typeof result.current.triggerHaptic).toBe('function');
    });
  });

  describe('Sound Effects', () => {
    it('plays sound effect when playSfx is called', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      result.current.playSfx('click');

      expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound "click"');
    });

    it('plays different sound effects', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      result.current.playSfx('hover');
      result.current.playSfx('success');
      result.current.playSfx('error');

      expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound "hover"');
      expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound "success"');
      expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound "error"');
    });

    it('handles empty sound names', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      result.current.playSfx('');

      expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound ""');
    });
  });

  describe('Haptic Feedback', () => {
    it('triggers haptic pattern when triggerHaptic is called', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      result.current.triggerHaptic('light');

      expect(mockConsoleLog).toHaveBeenCalledWith('HAPTIC: Triggering pattern "light"');
    });

    it('triggers different haptic patterns', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      result.current.triggerHaptic('medium');
      result.current.triggerHaptic('heavy');
      result.current.triggerHaptic('success');

      expect(mockConsoleLog).toHaveBeenCalledWith('HAPTIC: Triggering pattern "medium"');
      expect(mockConsoleLog).toHaveBeenCalledWith('HAPTIC: Triggering pattern "heavy"');
      expect(mockConsoleLog).toHaveBeenCalledWith('HAPTIC: Triggering pattern "success"');
    });

    it('handles empty haptic patterns', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      result.current.triggerHaptic('');

      expect(mockConsoleLog).toHaveBeenCalledWith('HAPTIC: Triggering pattern ""');
    });
  });

  describe('Fallback Behavior', () => {
    it('provides dummy functions when provider is not used', () => {
      const { result } = renderHook(() => useSensoryFeedback());

      expect(typeof result.current.playSfx).toBe('function');
      expect(typeof result.current.triggerHaptic).toBe('function');

      // Should not throw errors
      expect(() => {
        result.current.playSfx('test');
        result.current.triggerHaptic('test');
      }).not.toThrow();
    });

    it('dummy functions do not log to console', () => {
      const { result } = renderHook(() => useSensoryFeedback());

      result.current.playSfx('test');
      result.current.triggerHaptic('test');

      expect(mockConsoleLog).not.toHaveBeenCalled();
    });
  });

  describe('TypeScript Type Safety', () => {
    it('provides correctly typed functions', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      // TypeScript should enforce these types
      expect(() => {
        result.current.playSfx('click'); // string parameter
        result.current.triggerHaptic('light'); // string parameter
      }).not.toThrow();
    });
  });

  describe('Integration with Components', () => {
    it('can be used in component scenarios', () => {
      const { result } = renderHook(() => useSensoryFeedback(), {
        wrapper: ({ children }) => <SensoryProvider>{children}</SensoryProvider>,
      });

      // Simulate user interactions
      result.current.playSfx('click');
      result.current.triggerHaptic('light');
      result.current.playSfx('hover');
      result.current.triggerHaptic('success');

      expect(mockConsoleLog).toHaveBeenCalledTimes(4);
      expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound "click"');
      expect(mockConsoleLog).toHaveBeenCalledWith('HAPTIC: Triggering pattern "light"');
      expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound "hover"');
      expect(mockConsoleLog).toHaveBeenCalledWith('HAPTIC: Triggering pattern "success"');
    });
  });
});