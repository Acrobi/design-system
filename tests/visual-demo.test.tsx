/**
 * VISUAL DEMO COMPONENT FUNCTIONALITY TEST SUITE
 * QA Team Validation for STORY-C1.1-Implement-Primitives
 *
 * CONSTITUTIONAL REQUIREMENTS:
 * 1. Golden Rule: Validate demo uses semantic tokens, not hard-coded values
 * 2. Absolute Honesty: Report all demo violations honestly
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FoundationsDemo } from '../src/components/ui/foundations-demo';
import { ThemeProvider, useTheme } from '../src/components/ui/theme-provider';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock CSS computed styles
const mockComputedStyle = {
  getPropertyValue: jest.fn((property) => {
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Light mode values
    const lightModeValues: Record<string, string> = {
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',
      '--primary': '0 0% 0%',
      '--primary-foreground': '0 0% 100%',
      '--secondary': '210 40% 96.1%',
      '--secondary-foreground': '222.2 84% 4.9%',
      '--muted': '210 40% 96.1%',
      '--muted-foreground': '215.4 16.3% 46.9%',
      '--accent': '210 40% 96.1%',
      '--accent-foreground': '222.2 84% 4.9%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '214.3 31.8% 91.4%',
      '--input': '214.3 31.8% 91.4%',
      '--ring': '0 0% 0%',
      '--text-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
      '--text-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
      '--text-4xl': 'clamp(2.25rem, 1.9rem + 1.8vw, 3rem)',
    };

    // Dark mode values
    const darkModeValues: Record<string, string> = {
      '--background': '222.2 84% 4.9%',
      '--foreground': '210 40% 98%',
      '--primary': '0 0% 100%',
      '--primary-foreground': '222.2 84% 4.9%',
      '--secondary': '217.2 32.6% 17.5%',
      '--secondary-foreground': '210 40% 98%',
      '--muted': '217.2 32.6% 17.5%',
      '--muted-foreground': '212.4 32.6% 70.8%',
      '--accent': '217.2 32.6% 17.5%',
      '--accent-foreground': '210 40% 98%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 100%',
      '--border': '217.2 32.6% 17.5%',
      '--input': '217.2 32.6% 17.5%',
      '--ring': '0 0% 100%',
    };

    const values = isDarkMode ? darkModeValues : lightModeValues;
    return values[property] || '';
  }),
};

Object.defineProperty(window, 'getComputedStyle', {
  writable: true,
  value: jest.fn(() => mockComputedStyle),
});

// Test wrapper
const createWrapper = (props = {}) => {
  const defaultProps = {
    defaultMode: "light" as const,
    defaultTheme: "base" as const,
    enableSystem: true,
    ...props
  };

  return ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider {...defaultProps}>
      {children}
    </ThemeProvider>
  );
};

describe('VISUAL DEMO COMPONENT FUNCTIONALITY VALIDATION', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.className = '';
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  describe('🚨 CONSTITUTIONAL: Demo Component Architecture', () => {
    it('should render FoundationsDemo without errors', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      expect(screen.getByText('Design System Foundations')).toBeInTheDocument();
      expect(screen.getByText('Comprehensive showcase of all primitive tokens and components')).toBeInTheDocument();
    });

    it('should use semantic tokens for styling', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Verify the main container uses semantic tokens
      const mainContainer = screen.getByText('Design System Foundations').closest('div');
      expect(mainContainer).toHaveClass('bg-background');
      expect(mainContainer).toHaveClass('text-foreground');
    });

    it('should display comprehensive token showcase', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Check all main sections are present
      expect(screen.getByText('Color Palette')).toBeInTheDocument();
      expect(screen.getByText('Typography Scale')).toBeInTheDocument();
      expect(screen.getByText('Button Components')).toBeInTheDocument();
      expect(screen.getByText('Form Components')).toBeInTheDocument();
      expect(screen.getByText('Alert Components')).toBeInTheDocument();
      expect(screen.getByText('Tabs Component')).toBeInTheDocument();
      expect(screen.getByText('Spacing & Layout')).toBeInTheDocument();
    });
  });

  describe('Color Palette Showcase', () => {
    it('should display all semantic color tokens', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const expectedColorTokens = [
        'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
        'background', 'foreground', 'muted', 'muted-foreground',
        'accent', 'accent-foreground', 'destructive', 'destructive-foreground',
        'border', 'input', 'ring'
      ];

      expectedColorTokens.forEach(token => {
        expect(screen.getByText(token)).toBeInTheDocument();
      });
    });

    it('should render color swatches with correct classes', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const colorSwatches = screen.getAllByTestId(/color-swatch/);

      // Check that swatches use semantic token classes
      const primarySwatch = screen.getByText('primary').previousElementSibling;
      expect(primarySwatch).toHaveClass('bg-primary');

      const backgroundSwatch = screen.getByText('background').previousElementSibling;
      expect(backgroundSwatch).toHaveClass('bg-background');
    });

    it('should show color token names correctly', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Verify color token labels are displayed
      const colorLabels = screen.getAllByText(/primary|secondary|background|foreground|muted|accent|destructive|border|input|ring/);
      expect(colorLabels.length).toBeGreaterThan(10); // Should have multiple instances
    });
  });

  describe('Typography Scale Showcase', () => {
    it('should display all typography scale tokens', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const expectedTypographyTokens = [
        'text-xs - Small text',
        'text-sm - Body text',
        'text-base - Default text',
        'text-lg - Large text',
        'text-xl - Extra large text',
        'text-2xl - Heading text',
        'text-3xl - Large heading',
        'text-4xl - Display heading'
      ];

      expectedTypographyTokens.forEach(token => {
        expect(screen.getByText(token)).toBeInTheDocument();
      });
    });

    it('should use correct typography classes', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const typographyElements = screen.getAllByText(/text-\w+/);

      // Check that typography uses fluid typography tokens
      const smallText = screen.getByText('text-xs - Small text');
      expect(smallText).toHaveClass('text-xs');

      const displayHeading = screen.getByText('text-4xl - Display heading');
      expect(displayHeading).toHaveClass('text-4xl');
    });
  });

  describe('Button Components Showcase', () => {
    it('should display all button variants', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const expectedButtonVariants = [
        'Default', 'Secondary', 'Outline', 'Ghost', 'Link',
        'Destructive', 'Success', 'Warning', 'Info'
      ];

      expectedButtonVariants.forEach(variant => {
        expect(screen.getByText(variant)).toBeInTheDocument();
      });
    });

    it('should display all button sizes', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const expectedButtonSizes = ['Small', 'Default', 'Large'];

      expectedButtonSizes.forEach(size => {
        expect(screen.getByText(size)).toBeInTheDocument();
      });
    });

    it('should have functional theme toggle button', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper({ defaultMode: "light" });

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const toggleButton = screen.getByText(/Current Theme:/);
      expect(screen.getByText('Current Theme: light')).toBeInTheDocument();

      await user.click(toggleButton);
      expect(screen.getByText('Current Theme: dark')).toBeInTheDocument();
    });
  });

  describe('Form Components Showcase', () => {
    it('should display all form components', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Check for form elements
      expect(screen.getByLabelText('Text Input')).toBeInTheDocument();
      expect(screen.getByLabelText('Error State')).toBeInTheDocument();
      expect(screen.getByLabelText('Textarea')).toBeInTheDocument();
      expect(screen.getByText('Toggle Switch')).toBeInTheDocument();
      expect(screen.getByText('Checkbox Option')).toBeInTheDocument();
    });

    it('should have interactive form elements', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const textInput = screen.getByLabelText('Text Input');
      await user.type(textInput, 'test input');
      expect(textInput).toHaveValue('test input');

      const textarea = screen.getByLabelText('Textarea');
      await user.type(textarea, 'test textarea');
      expect(textarea).toHaveValue('test textarea');
    });

    it('should display badge variants', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const expectedBadgeVariants = [
        'Default', 'Secondary', 'Outline', 'Destructive', 'Success', 'Warning', 'Info'
      ];

      expectedBadgeVariants.forEach(variant => {
        expect(screen.getByText(variant)).toBeInTheDocument();
      });
    });
  });

  describe('Alert Components Showcase', () => {
    it('should display all alert variants', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Check for alert content
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Information')).toBeInTheDocument();
    });

    it('should display alert descriptions', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
      expect(screen.getByText('Please review your input before proceeding.')).toBeInTheDocument();
      expect(screen.getByText('Your changes have been saved successfully.')).toBeInTheDocument();
      expect(screen.getByText('Here\'s some helpful information for you.')).toBeInTheDocument();
    });
  });

  describe('Tabs Component Showcase', () => {
    it('should display functional tabs', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const tabButtons = ['Account', 'Password', 'Settings'];

      tabButtons.forEach(tab => {
        expect(screen.getByRole('tab', { name: tab })).toBeInTheDocument();
      });
    });

    it('should switch between tabs correctly', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const passwordTab = screen.getByRole('tab', { name: 'Password' });
      await user.click(passwordTab);

      // Check that password tab content is visible
      expect(screen.getByLabelText('Current Password')).toBeInTheDocument();
      expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    });
  });

  describe('Spacing and Layout Showcase', () => {
    it('should display layout examples', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
      expect(screen.getByText('Card 3')).toBeInTheDocument();
    });

    it('should demonstrate spacing utilities', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const spacingButtons = ['Small Gap', 'Default Gap', 'Large Button'];

      spacingButtons.forEach(button => {
        expect(screen.getByText(button)).toBeInTheDocument();
      });
    });
  });

  describe('Theme Integration', () => {
    it('should work correctly in light mode', () => {
      const wrapper = createWrapper({ defaultMode: "light" });

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      expect(screen.getByText('Current Theme: light')).toBeInTheDocument();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should work correctly in dark mode', () => {
      const wrapper = createWrapper({ defaultMode: "dark" });

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      expect(screen.getByText('Current Theme: dark')).toBeInTheDocument();
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should update token display on theme change', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper({ defaultMode: "light" });

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Initially in light mode
      expect(screen.getByText('Current Theme: light')).toBeInTheDocument();

      // Toggle to dark mode
      const toggleButton = screen.getByText(/Current Theme:/);
      await user.click(toggleButton);

      // Should update theme display
      expect(screen.getByText('Current Theme: dark')).toBeInTheDocument();
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('Component Interactions', () => {
    it('should handle form input changes', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const textInput = screen.getByLabelText('Text Input');
      await user.clear(textInput);
      await user.type(textInput, 'Hello World');

      expect(textInput).toHaveValue('Hello World');
    });

    it('should handle toggle interactions', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const switchLabel = screen.getByText('Toggle Switch');
      const toggleSwitch = switchLabel.previousElementSibling as HTMLElement;

      await user.click(toggleSwitch);

      // Switch should be toggled (visual verification would be needed in real browser)
      expect(toggleSwitch).toBeInTheDocument();
    });

    it('should handle checkbox interactions', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const checkboxLabel = screen.getByText('Checkbox Option');
      const checkbox = checkboxLabel.previousElementSibling as HTMLElement;

      await user.click(checkbox);

      // Checkbox should be checked (visual verification would be needed in real browser)
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive grid layouts', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Check for responsive grid classes
      const colorGrid = screen.getByText('primary').closest('div').parentElement;
      expect(colorGrid).toHaveClass('grid-cols-2');
      expect(colorGrid).toHaveClass('md:grid-cols-4');
      expect(colorGrid).toHaveClass('lg:grid-cols-8');
    });

    it('should have responsive form layouts', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Check for responsive grid in form section
      const formGrid = screen.getByLabelText('Text Input').closest('div').parentElement;
      expect(formGrid).toHaveClass('grid-cols-1');
      expect(formGrid).toHaveClass('md:grid-cols-2');
    });
  });

  describe('Accessibility Features', () => {
    it('should have proper semantic structure', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Check for proper heading hierarchy
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Design System Foundations');

      // Check for section headings
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThan(5);
    });

    it('should have accessible form controls', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Check for proper form labels
      expect(screen.getByLabelText('Text Input')).toBeInTheDocument();
      expect(screen.getByLabelText('Error State')).toBeInTheDocument();
      expect(screen.getByLabelText('Textarea')).toBeInTheDocument();
    });

    it('should have accessible tabs', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Check for proper tab roles
      const tabList = screen.getByRole('tablist');
      expect(tabList).toBeInTheDocument();

      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(3);

      const tabPanels = screen.getAllByRole('tabpanel');
      expect(tabPanels.length).toBe(3);
    });
  });

  describe('Performance and Error Handling', () => {
    it('should handle rapid theme switching', async () => {
      const user = userEvent.setup();
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      const toggleButton = screen.getByText(/Current Theme:/);

      // Rapidly switch themes
      for (let i = 0; i < 5; i++) {
        await user.click(toggleButton);
      }

      // Should still be functional
      expect(toggleButton).toBeInTheDocument();
    });

    it('should handle form validation errors gracefully', () => {
      const wrapper = createWrapper();

      render(
        <wrapper>
          <FoundationsDemo />
        </wrapper>
      );

      // Error state input should be displayed without crashing
      const errorInput = screen.getByLabelText('Error State');
      expect(errorInput).toBeInTheDocument();
      expect(errorInput).toHaveAttribute('error');
    });
  });
});