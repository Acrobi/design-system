/**
 * QA Test Suite: STORY-C1.3-Enforce-Arch-Standards - Variant System Testing
 *
 * Constitutional Requirements:
 * 1. Golden Rule: Validate components have NO hard-coded styles
 * 2. Absolute Honesty: Report all architectural violations
 * 3. Separation of Duties: QA Team tests ONLY, DEV team implemented
 */

import React from 'react';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Button } from '../src/components/ui/button';
import { Label } from '../src/components/ui/label';
import { Icon } from '../src/components/ui/icon';

describe('Variant System Tests', () => {
  describe('Button Component Variants', () => {
    it('should render all defined button variants correctly', () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'success', 'warning', 'info'];

      variants.forEach(variant => {
        const { container } = render(
          React.createElement(Button, { variant: variant as any }, 'Test Button')
        );

        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('class');

        // Verify no hard-coded styles are applied
        const styleAttr = button?.getAttribute('style');
        expect(styleAttr).toBeNull();
      });
    });

    it('should render all defined button sizes correctly', () => {
      const sizes = ['default', 'sm', 'lg', 'icon'];

      sizes.forEach(size => {
        const { container } = render(
          React.createElement(Button, { size: size as any }, 'Test Button')
        );

        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();

        // Verify no hard-coded styles
        const styleAttr = button?.getAttribute('style');
        expect(styleAttr).toBeNull();
      });
    });

    it('should apply semantic token classes instead of hard-coded values', () => {
      const { container } = render(
        React.createElement(Button, { variant: 'default' }, 'Test')
      );
      const button = container.querySelector('button');

      const className = button?.getAttribute('class') || '';

      // Should use semantic tokens, not hard-coded values
      expect(className).toContain('bg-primary');
      expect(className).toContain('text-primary-foreground');

      // Should NOT contain hard-coded hex colors
      expect(className).not.toMatch(/#[0-9a-fA-F]{6}/);
      expect(className).not.toMatch(/rgb\(/);
      expect(className).not.toMatch(/rgba\(/);
    });

    it('should handle custom className composition correctly', () => {
      const { container } = render(
        React.createElement(Button, { className: 'custom-test-class' }, 'Test Button')
      );

      const button = container.querySelector('button');
      const className = button?.getAttribute('class') || '';

      expect(className).toContain('custom-test-class');
      // Should still contain base variant classes
      expect(className).toContain('bg-primary');
    });

    it('should validate additional variant definitions follow patterns', () => {
      // Test the newer variants (success, warning, info) for compliance
      const variants = [
        { name: 'success', expectedBg: 'bg-green-500', expectedHover: 'hover:bg-green-600' },
        { name: 'warning', expectedBg: 'bg-yellow-500', expectedHover: 'hover:bg-yellow-600' },
        { name: 'info', expectedBg: 'bg-blue-500', expectedHover: 'hover:bg-blue-600' }
      ];

      variants.forEach(({ name, expectedBg, expectedHover }) => {
        const { container } = render(
          React.createElement(Button, { variant: name as any }, 'Test')
        );
        const button = container.querySelector('button');
        const className = button?.getAttribute('class') || '';

        expect(className).toContain(expectedBg);
        expect(className).toContain(expectedHover);

        // Still no hard-coded styles
        const styleAttr = button?.getAttribute('style');
        expect(styleAttr).toBeNull();
      });
    });
  });

  describe('Icon Component Variants', () => {
    it('should render icons without hard-coded styles', () => {
      const { container } = render(
        React.createElement(Icon, { metaphor: 'placeholder' })
      );
      const icon = container.querySelector('svg');

      expect(icon).toBeInTheDocument();

      // Should use Tailwind classes, not inline styles
      const styleAttr = icon?.getAttribute('style');
      expect(styleAttr).toBeNull();

      // Should have size classes
      const className = icon?.getAttribute('class') || '';
      expect(className).toContain('h-4');
      expect(className).toContain('w-4');
    });

    it('should accept custom className for icon sizing', () => {
      const { container } = render(
        React.createElement(Icon, { metaphor: 'placeholder', className: 'h-8 w-8' })
      );

      const icon = container.querySelector('svg');
      const className = icon?.getAttribute('class') || '';

      expect(className).toContain('h-8');
      expect(className).toContain('w-8');
    });

    it('should handle unknown metaphor gracefully', () => {
      const { container } = render(
        React.createElement(Icon, { metaphor: 'unknown-metaphor' })
      );
      const icon = container.querySelector('svg');

      // Should still render an icon (placeholder fallback)
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Label Component Variants', () => {
    it('should render labels with icons without hard-coded styles', () => {
      const { container } = render(
        React.createElement(Label, { icon: 'placeholder' }, 'Test Label')
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();

      // Should use Tailwind classes only
      const styleAttr = label?.getAttribute('style');
      expect(styleAttr).toBeNull();

      // Should have base label classes
      const className = label?.getAttribute('class') || '';
      expect(className).toContain('text-sm');
      expect(className).toContain('font-medium');
    });

    it('should handle label without icon', () => {
      const { container } = render(
        React.createElement(Label, {}, 'Test Label')
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();

      const styleAttr = label?.getAttribute('style');
      expect(styleAttr).toBeNull();
    });
  });

  describe('Constitutional Violation Detection', () => {
    it('should detect any hard-coded color values in components', () => {
      const components = [
        React.createElement(Button, {}, 'Test'),
        React.createElement(Label, {}, 'Test'),
        React.createElement(Icon, { metaphor: 'placeholder' })
      ];

      components.forEach(component => {
        const { container } = render(component);
        const allElements = container.querySelectorAll('*');

        allElements.forEach(element => {
          const styleAttr = element.getAttribute('style');
          if (styleAttr) {
            // Check for hard-coded colors in inline styles
            expect(styleAttr).not.toMatch(/#[0-9a-fA-F]{3,6}/);
            expect(styleAttr).not.toMatch(/rgb\([^)]+\)/);
            expect(styleAttr).not.toMatch(/rgba\([^)]+\)/);
            expect(styleAttr).not.toMatch(/hsl\([^)]+\)/);
          }
        });
      });
    });

    it('should ensure all styling uses CSS classes/Tailwind', () => {
      const { container } = render(
        React.createElement(Button, { variant: 'default' }, 'Test')
      );
      const button = container.querySelector('button');

      const className = button?.getAttribute('class') || '';

      // Should contain utility classes
      expect(className.split(' ').length).toBeGreaterThan(1);

      // Should follow Tailwind naming conventions
      const classes = className.split(' ');
      classes.forEach(cls => {
        expect(cls).toMatch(/^[a-z-]+(\[[^\]]+\])?$/);
      });
    });
  });

  describe('Variant System Extensibility', () => {
    it('should validate variant system uses class-variance-authority correctly', () => {
      // This test verifies the architecture pattern is being followed
      const { container } = render(
        React.createElement(Button, { variant: 'default' }, 'Test')
      );

      // The component should use cva for variant management
      // We can't directly test cva usage, but we can test the output
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();

      const className = button?.getAttribute('class') || '';
      // Should have base classes + variant classes
      expect(className.length).toBeGreaterThan(10);
    });

    it('should ensure consistent variant application across components', () => {
      const buttons = [
        { variant: 'default', expectedPattern: /bg-primary/ },
        { variant: 'destructive', expectedPattern: /bg-destructive/ },
        { variant: 'outline', expectedPattern: /border/ }
      ];

      buttons.forEach(({ variant, expectedPattern }) => {
        const { container } = render(
          React.createElement(Button, { variant: variant as any }, 'Test')
        );

        const button = container.querySelector('button');
        const className = button?.getAttribute('class') || '';

        expect(className).toMatch(expectedPattern);
      });
    });
  });
});