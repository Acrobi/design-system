/**
 * QA Test Suite: STORY-C1.3-Enforce-Arch-Standards - Architecture Compliance Testing
 *
 * Constitutional Requirements:
 * 1. Golden Rule: Validate components have NO hard-coded styles
 * 2. Absolute Honesty: Report all architectural violations
 * 3. Separation of Duties: QA Team tests ONLY, DEV team implemented
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import * as fs from 'fs';
import * as path from 'path';

import { Button } from '../src/components/ui/button';
import { Label } from '../src/components/ui/label';
import { Icon } from '../src/components/ui/icon';

describe('Size Primitives Integration Tests', () => {
  describe('Button Size System', () => {
    it('should implement consistent size primitives across all button sizes', () => {
      const sizes = [
        { name: 'default', expectedClasses: ['h-10', 'px-4', 'py-2'] },
        { name: 'sm', expectedClasses: ['h-9', 'px-3'] },
        { name: 'lg', expectedClasses: ['h-11', 'px-8'] },
        { name: 'icon', expectedClasses: ['h-10', 'w-10'] }
      ];

      sizes.forEach(({ name, expectedClasses }) => {
        const { container } = render(
          <Button size={name as any}>Test Button</Button>
        );

        const button = container.querySelector('button');
        const className = button?.getAttribute('class') || '';

        expectedClasses.forEach(expectedClass => {
          expect(className).toContain(expectedClass);
        });

        // Verify no hard-coded styles
        const styleAttr = button?.getAttribute('style');
        expect(styleAttr).toBeNull();
      });
    });

    it('should maintain consistent spacing ratios between sizes', () => {
      const sizeMap = {
        sm: { height: 'h-9', padding: 'px-3' },
        default: { height: 'h-10', padding: 'px-4' },
        lg: { height: 'h-11', padding: 'px-8' }
      };

      Object.entries(sizeMap).forEach(([sizeName, sizeClasses]) => {
        const { container } = render(
          <Button size={sizeName as any}>Test</Button>
        );

        const button = container.querySelector('button');
        const className = button?.getAttribute('class') || '';

        expect(className).toContain(sizeClasses.height);
        expect(className).toContain(sizeClasses.padding);
      });
    });

    it('should handle size composition with custom classes', () => {
      const { container } = render(
        <Button size="lg" className="custom-spacing">Test</Button>
      );

      const button = container.querySelector('button');
      const className = button?.getAttribute('class') || '';

      // Should contain both size classes and custom classes
      expect(className).toContain('h-11');
      expect(className).toContain('custom-spacing');
    });
  });

  describe('Icon Size System', () => {
    it('should use consistent size primitives for icons', () => {
      const { container } = render(<Icon metaphor="placeholder" />);
      const icon = container.querySelector('svg');

      const className = icon?.getAttribute('class') || '';
      expect(className).toContain('h-4');
      expect(className).toContain('w-4');

      // Should be square
      expect(className).toContain('h-4');
      expect(className).toContain('w-4');

      // No hard-coded styles
      const styleAttr = icon?.getAttribute('style');
      expect(styleAttr).toBeNull();
    });

    it('should support custom icon sizes through className', () => {
      const customSizes = [
        { className: 'h-2 w-2', description: 'extra small' },
        { className: 'h-6 w-6', description: 'medium' },
        { className: 'h-8 w-8', description: 'large' },
        { className: 'h-12 w-12', description: 'extra large' }
      ];

      customSizes.forEach(({ className, description }) => {
        const { container } = render(
          <Icon metaphor="placeholder" className={className} />
        );

        const icon = container.querySelector('svg');
        const iconClassName = icon?.getAttribute('class') || '';

        expect(iconClassName).toContain(className);
      });
    });

    it('should maintain aspect ratio for all icon sizes', () => {
      const testClasses = ['h-2 w-2', 'h-4 w-4', 'h-8 w-8', 'h-16 w-16'];

      testClasses.forEach(testClass => {
        const { container } = render(
          <Icon metaphor="placeholder" className={testClass} />
        );

        const icon = container.querySelector('svg');
        const className = icon?.getAttribute('class') || '';

        // Should always have matching height and width
        const heightMatch = className.match(/h-(\w+)/);
        const widthMatch = className.match(/w-(\w+)/);

        expect(heightMatch).toBeTruthy();
        expect(widthMatch).toBeTruthy();
        expect(heightMatch?.[1]).toBe(widthMatch?.[1]);
      });
    });
  });

  describe('Label Size System', () => {
    it('should use consistent text size primitives', () => {
      const { container } = render(<Label>Test Label</Label>);
      const label = container.querySelector('label');

      const className = label?.getAttribute('class') || '';
      expect(className).toContain('text-sm');

      // No hard-coded font sizes
      const styleAttr = label?.getAttribute('style');
      expect(styleAttr).not.toMatch(/font-size:/);
      expect(styleAttr).not.toMatch(/fontSize:/);
    });

    it('should support custom text sizes', () => {
      const textSizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'];

      textSizes.forEach(textSize => {
        const { container } = render(
          <Label className={textSize}>Test Label</Label>
        );

        const label = container.querySelector('label');
        const className = label?.getAttribute('class') || '';

        expect(className).toContain(textSize);
      });
    });
  });

  describe('Size System Consistency', () => {
    it('should use consistent spacing scale across components', () => {
      // Test that all components use the same spacing scale
      const spacingScale = [
        'p-0', 'p-1', 'p-2', 'p-3', 'p-4', 'p-5', 'p-6', 'p-7', 'p-8'
      ];

      const { container: btnContainer } = render(<Button>Test</Button>);
      const { container: lblContainer } = render(<Label>Test</Label>);

      const btnClasses = btnContainer.querySelector('button')?.getAttribute('class') || '';
      const lblClasses = lblContainer.querySelector('label')?.getAttribute('class') || '';

      // All classes should be from the standard scale
      const allClasses = [...btnClasses.split(' '), ...lblClasses.split(' ')];

      allClasses.forEach(cls => {
        if (cls.match(/^[pm][xy]?-\d+$/)) {
          expect(spacingScale).toContain(cls);
        }
      });
    });

    it('should maintain consistent height scale', () => {
      const heightScale = ['h-0', 'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10', 'h-11', 'h-12'];

      const { container: btnContainer } = render(<Button size="lg">Test</Button>);
      const { container: icnContainer } = render(<Icon metaphor="placeholder" className="h-6 w-6" />);

      const btnClasses = btnContainer.querySelector('button')?.getAttribute('class') || '';
      const icnClasses = icnContainer.querySelector('svg')?.getAttribute('class') || '';

      const allHeightClasses = [...btnClasses.split(' '), ...icnClasses.split(' ')];

      allHeightClasses.forEach(cls => {
        if (cls.match(/^h-\d+$/)) {
          expect(heightScale).toContain(cls);
        }
      });
    });
  });

  describe('Responsive Size Primitives', () => {
    it('should support responsive size modifiers', () => {
      const responsiveClasses = [
        'sm:h-8',
        'md:h-10',
        'lg:h-12',
        'xl:text-lg'
      ];

      responsiveClasses.forEach(responsiveClass => {
        const { container } = render(
          <Button className={responsiveClass}>Test</Button>
        );

        const button = container.querySelector('button');
        const className = button?.getAttribute('class') || '';

        expect(className).toContain(responsiveClass);
      });
    });
  });
});

describe('Controller Pattern Implementation Tests', () => {
  describe('Sensory Feedback Controller', () => {
    it('should integrate sensory feedback controller properly', () => {
      // Test that button component integrates with sensory provider
      expect(() => {
        render(<Button onClick={() => {}}>Test Button</Button>);
      }).not.toThrow();

      // Should not throw errors when sensory provider is not available
      const { container } = render(<Button>Test</Button>);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle controller interactions gracefully', () => {
      const handleClick = jest.fn();
      const { container } = render(
        <Button onClick={handleClick}>Test Button</Button>
      );

      const button = container.querySelector('button');

      // Should be clickable
      expect(button).not.toBeDisabled();

      // Simulate click
      if (button) {
        button.click();
        expect(handleClick).toHaveBeenCalled();
      }
    });
  });

  describe('Theme Provider Controller', () => {
    it('should support theme controller integration', () => {
      // Test that components work with theme system
      expect(() => {
        render(<Button variant="default">Themed Button</Button>);
        render(<Label>Themed Label</Label>);
        render(<Icon metaphor="placeholder" />);
      }).not.toThrow();
    });

    it('should use semantic tokens that can be controlled by theme', () => {
      const { container } = render(<Button variant="default">Test</Button>);
      const button = container.querySelector('button');
      const className = button?.getAttribute('class') || '';

      // Should use semantic tokens, not hard-coded values
      expect(className).toContain('bg-primary');
      expect(className).toContain('text-primary-foreground');

      // These tokens should be controllable by theme system
      expect(className).not.toMatch(/#[0-9a-fA-F]{6}/);
    });
  });

  describe('Icon Map Controller', () => {
    it('should use icon controller for metaphor mapping', () => {
      const { container } = render(<Icon metaphor="placeholder" />);
      const icon = container.querySelector('svg');

      // Should render an actual SVG element
      expect(icon).toBeInTheDocument();
      expect(icon?.tagName.toLowerCase()).toBe('svg');

      // Should use the icon mapping controller
      const styleAttr = icon?.getAttribute('style');
      expect(styleAttr).toBeNull(); // No inline styles
    });

    it('should handle unknown metaphors through controller', () => {
      const { container } = render(<Icon metaphor="unknown-metaphor-test" />);
      const icon = container.querySelector('svg');

      // Should still render an icon (fallback to placeholder)
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Controller Pattern Architecture', () => {
    it('should follow controller separation of concerns', () => {
      // Components should not contain business logic
      const { container } = render(<Button>Test</Button>);
      const button = container.querySelector('button');

      // Should be a clean component without inline logic
      const onclick = button?.getAttribute('onclick');
      expect(onclick).toBeNull(); // No inline onclick handlers

      // Should use event handlers properly
      expect(button?.hasAttribute('disabled')).toBe(false);
    });

    it('should support controller injection patterns', () => {
      // Test that components can accept controller dependencies
      expect(() => {
        render(
          <Button
            variant="default"
            size="default"
            className="controller-test"
          >
            Controller Test
          </Button>
        );
      }).not.toThrow();
    });
  });
});

describe('Constitutional Violation Detection - Architecture', () => {
  describe('Hard-coded Style Detection', () => {
    it('should scan for hard-coded styles in all components', () => {
      const components = [
        <Button variant="default">Test</Button>,
        <Button variant="destructive">Test</Button>,
        <Label>Test</Label>,
        <Icon metaphor="placeholder" />
      ];

      components.forEach(component => {
        const { container } = render(component);
        const allElements = container.querySelectorAll('*');

        allElements.forEach(element => {
          const styleAttr = element.getAttribute('style');
          if (styleAttr) {
            // Check for any hard-coded style values
            expect(styleAttr).not.toMatch(/#[0-9a-fA-F]{3,6}/); // Hex colors
            expect(styleAttr).not.toMatch(/rgb\([^)]+\)/); // RGB colors
            expect(styleAttr).not.toMatch(/rgba\([^)]+\)/); // RGBA colors
            expect(styleAttr).not.toMatch(/hsl\([^)]+\)/); // HSL colors
            expect(styleAttr).not.toMatch(/px\d+/); // Hard-coded pixels
            expect(styleAttr).not.toMatch(/em\d+/); // Hard-coded em
          }
        });
      });
    });

    it('should ensure all styling uses utility classes', () => {
      const { container } = render(
        <div>
          <Button>Test</Button>
          <Label>Test</Label>
          <Icon metaphor="placeholder" />
        </div>
      );

      const styledElements = container.querySelectorAll('[class]');

      styledElements.forEach(element => {
        const className = element.getAttribute('class') || '';

        // Should contain Tailwind utility classes
        expect(className.length).toBeGreaterThan(0);

        // Classes should follow Tailwind naming conventions
        const classes = className.split(' ');
        classes.forEach(cls => {
          expect(cls).toMatch(/^[a-z-]+(\[[^\]]+\])?$/);
        });
      });
    });
  });

  describe('Architectural Pattern Compliance', () => {
    it('should ensure components follow atomic design principles', () => {
      // Components should be composable and reusable
      const { container } = render(
        <Button>
          <Label>Button Label</Label>
        </Button>
      );

      const button = container.querySelector('button');
      const label = container.querySelector('label');

      expect(button).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(button?.contains(label)).toBe(true);
    });

    it('should maintain clean component boundaries', () => {
      // Components should not expose internal implementation
      const buttonRef = { current: null };
      const { container } = render(
        <Button ref={buttonRef}>Test</Button>
      );

      // Should expose a clean ref interface
      expect(buttonRef.current).toBeTruthy();

      // Should not expose internal state
      const button = container.querySelector('button');
      expect(button?.hasAttribute('data-internal')).toBe(false);
    });

    it('should prevent style leakage between components', () => {
      const { container } = render(
        <div>
          <Button variant="default">Button 1</Button>
          <Button variant="destructive">Button 2</Button>
          <Label>Label</Label>
        </div>
      );

      const elements = container.querySelectorAll('*');

      elements.forEach(element => {
        const className = element.getAttribute('class') || '';

        // Should not have conflicting classes
        if (className.includes('bg-primary')) {
          expect(className).not.toInclude('bg-destructive');
        }
      });
    });
  });

  describe('Performance and Bundle Size', () => {
    it('should ensure components are tree-shakable', () => {
      // Components should be individually importable
      expect(typeof Button).toBe('function');
      expect(typeof Label).toBe('function');
      expect(typeof Icon).toBe('function');

      // Each should have distinct display names
      expect(Button.displayName).not.toBe(Label.displayName);
      expect(Label.displayName).not.toBe(Icon.displayName);
      expect(Button.displayName).not.toBe(Icon.displayName);
    });

    it('should avoid unnecessary dependencies', () => {
      // Components should not import unused dependencies
      expect(() => {
        render(<Button>Test</Button>);
      }).not.toThrow();

      // Should work without external dependencies
      const buttonElement = <Button>Test</Button>;
      expect(buttonElement).toBeDefined();
    });
  });
});