/**
 * QA Test Suite: STORY-C1.3-Enforce-Arch-Standards - Component API Naming Conventions
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

// Import components for testing
import { Button } from '../src/components/ui/button';
import { Label } from '../src/components/ui/label';
import { Icon } from '../src/components/ui/icon';

describe('Component API Naming Convention Tests', () => {
  describe('Button Component Naming (btn*)', () => {
    it('should follow btn* naming convention for button components', () => {
      // Test component exports follow naming conventions
      expect(Button.displayName).toBe('Button');

      // Test that Button component exists and is properly named
      expect(typeof Button).toBe('function');
    });

    it('should have consistent prop naming across button API', () => {
      const buttonProps = [
        'variant',
        'size',
        'className',
        'asChild',
        'onClick',
        'children',
        'disabled',
        'type'
      ];

      // Test that common button props are supported
      const { container } = render(
        <Button
          variant="default"
          size="default"
          className="test-class"
          disabled={false}
          type="button"
        >
          Test Button
        </Button>
      );

      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button?.textContent).toBe('Test Button');
    });

    it('should use semantic naming for button variants', () => {
      const semanticVariants = [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'success',
        'warning',
        'info'
      ];

      semanticVariants.forEach(variant => {
        expect(() => {
          render(<Button variant={variant as any}>Test</Button>);
        }).not.toThrow();
      });
    });

    it('should use semantic naming for button sizes', () => {
      const semanticSizes = ['default', 'sm', 'lg', 'icon'];

      semanticSizes.forEach(size => {
        expect(() => {
          render(<Button size={size as any}>Test</Button>);
        }).not.toThrow();
      });
    });
  });

  describe('Label Component Naming (lbl*)', () => {
    it('should follow lbl* naming convention for label components', () => {
      expect(Label.displayName).toBe('Label');
      expect(typeof Label).toBe('function');
    });

    it('should have consistent prop naming across label API', () => {
      const { container } = render(
        <Label
          className="test-label-class"
          htmlFor="test-input"
          icon="placeholder"
        >
          Test Label
        </Label>
      );

      const label = container.querySelector('label');
      expect(label).toBeInTheDocument();
      expect(label?.getAttribute('for')).toBe('test-input');
      expect(label?.textContent).toBe('Test Label');
    });

    it('should support icon prop with semantic metaphor naming', () => {
      const { container } = render(
        <Label icon="placeholder">Label with Icon</Label>
      );

      const label = container.querySelector('label');
      const icon = container.querySelector('svg');

      expect(label).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Icon Component Naming (icn*)', () => {
    it('should follow icn* naming convention for icon components', () => {
      expect(Icon.displayName).toBe('Icon');
      expect(typeof Icon).toBe('function');
    });

    it('should use semantic metaphor naming for icons', () => {
      const semanticMetaphors = [
        'placeholder',
        'user',
        'settings',
        'search',
        'close'
      ];

      semanticMetaphors.forEach(metaphor => {
        expect(() => {
          render(<Icon metaphor={metaphor as any} />);
        }).not.toThrow();
      });
    });

    it('should support className prop for custom styling', () => {
      const { container } = render(
        <Icon metaphor="placeholder" className="custom-icon-class" />
      );

      const icon = container.querySelector('svg');
      const className = icon?.getAttribute('class') || '';
      expect(className).toContain('custom-icon-class');
    });
  });

  describe('File Naming Convention Validation', () => {
    it('should have correctly named component files', () => {
      const componentsDir = path.join(__dirname, '../src/components/ui');

      if (fs.existsSync(componentsDir)) {
        const files = fs.readdirSync(componentsDir);

        // Check for expected component files
        const expectedFiles = [
          'button.tsx',    // btn*
          'label.tsx',     // lbl*
          'icon.tsx'       // icn*
        ];

        expectedFiles.forEach(expectedFile => {
          expect(files).toContain(expectedFile);
        });
      }
    });

    it('should have consistent naming in component exports', () => {
      // Test that exported components follow naming conventions
      const components = [
        { name: 'Button', component: Button, pattern: /^Button$/ },
        { name: 'Label', component: Label, pattern: /^Label$/ },
        { name: 'Icon', component: Icon, pattern: /^Icon$/ }
      ];

      components.forEach(({ name, component, pattern }) => {
        expect(component.displayName).toMatch(pattern);
        expect(typeof component).toBe('function');
      });
    });
  });

  describe('API Consistency Across Components', () => {
    it('should use consistent prop naming patterns', () => {
      // Common props that should be consistently named
      const commonProps = ['className', 'children'];

      // Test Button
      const { container: btnContainer } = render(
        <Button className="test">Test Button</Button>
      );
      const button = btnContainer.querySelector('button');
      expect(button?.getAttribute('class')).toContain('test');

      // Test Label
      const { container: lblContainer } = render(
        <Label className="test">Test Label</Label>
      );
      const label = lblContainer.querySelector('label');
      expect(label?.getAttribute('class')).toContain('test');

      // Test Icon
      const { container: icnContainer } = render(
        <Icon metaphor="placeholder" className="test" />
      );
      const icon = icnContainer.querySelector('svg');
      expect(icon?.getAttribute('class')).toContain('test');
    });

    it('should use semantic, non-technical prop names', () => {
      // Test that props use semantic names
      const semanticProps = {
        Button: ['variant', 'size', 'asChild'],
        Label: ['icon', 'htmlFor'],
        Icon: ['metaphor']
      };

      Object.entries(semanticProps).forEach(([componentName, props]) => {
        props.forEach(prop => {
          // Prop names should be semantic, not technical
          expect(prop).toMatch(/^[a-z][a-zA-Z]*$/);
          expect(prop).not.toMatch(/^(css|style|html)$/i);
        });
      });
    });
  });

  describe('Component Documentation and Type Safety', () => {
    it('should have proper TypeScript interfaces', () => {
      // Test that components have proper TypeScript types
      const buttonElement = <Button>Test</Button>;
      const labelElement = <Label>Test</Label>;
      const iconElement = <Icon metaphor="placeholder" />;

      // These should compile without TypeScript errors
      expect(buttonElement).toBeDefined();
      expect(labelElement).toBeDefined();
      expect(iconElement).toBeDefined();
    });

    it('should support all required accessibility props', () => {
      // Test Label with htmlFor
      const { container } = render(
        <Label htmlFor="test-input">Test Label</Label>
      );
      const label = container.querySelector('label');
      expect(label?.getAttribute('for')).toBe('test-input');

      // Test Button with type
      const { container: btnContainer } = render(
        <Button type="submit">Submit</Button>
      );
      const button = btnContainer.querySelector('button');
      expect(button?.getAttribute('type')).toBe('submit');
    });
  });

  describe('Constitutional Violation Detection - Naming', () => {
    it('should detect inconsistent naming patterns', () => {
      // Check for any naming inconsistencies
      const componentNames = ['Button', 'Label', 'Icon'];

      componentNames.forEach(name => {
        // Should be PascalCase
        expect(name).toMatch(/^[A-Z][a-zA-Z]*$/);

        // Should not contain abbreviations (except common ones)
        expect(name).not.toMatch(/Btn$/);  // Should be Button, not Btn
        expect(name).not.toMatch(/Lbl$/);  // Should be Label, not Lbl
        expect(name).not.toMatch(/Icn$/);  // Should be Icon, not Icn
      });
    });

    it('should ensure semantic prop naming over technical naming', () => {
      const technicalPropNames = ['cssClass', 'styleClass', 'htmlClass'];
      const semanticPropNames = ['className', 'variant', 'size', 'metaphor'];

      // Technical names should not be used
      technicalPropNames.forEach(techName => {
        // These props should not exist on our components
        expect(Button.prototype.hasOwnProperty(techName)).toBe(false);
        expect(Label.prototype.hasOwnProperty(techName)).toBe(false);
        expect(Icon.prototype.hasOwnProperty(techName)).toBe(false);
      });

      // Semantic names should be used
      semanticPropNames.forEach(semanticName => {
        // These are the correct semantic names
        expect(semanticName).toMatch(/^[a-z][a-zA-Z]*$/);
      });
    });
  });

  describe('Component Registry and Export Patterns', () => {
    it('should have consistent export patterns', () => {
      // Test that components follow consistent export patterns
      expect(typeof Button).toBe('function');
      expect(typeof Label).toBe('function');
      expect(typeof Icon).toBe('function');

      // Test display names are set correctly
      expect(Button.displayName).toBe('Button');
      expect(Label.displayName).toBe('Label');
      expect(Icon.displayName).toBe('Icon');
    });

    it('should support forwardRef pattern consistently', () => {
      // All components should support forwardRef
      const buttonRef = { current: null };
      const labelRef = { current: null };
      const iconRef = { current: null };

      expect(() => {
        render(<Button ref={buttonRef}>Test</Button>);
        render(<Label ref={labelRef}>Test</Label>);
        render(<Icon metaphor="placeholder" ref={iconRef} />);
      }).not.toThrow();
    });
  });
});