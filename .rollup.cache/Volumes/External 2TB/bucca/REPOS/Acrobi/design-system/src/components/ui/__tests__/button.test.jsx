import { render, screen } from '@testing-library/react';
import { Button } from '../button';
import { SensoryProvider } from '../sensory-provider';
// Mock console.log for sensory feedback tests
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();
describe('Button Component', () => {
    beforeEach(() => {
        mockConsoleLog.mockClear();
    });
    afterEach(() => {
        mockConsoleLog.mockClear();
    });
    const renderWithProvider = (component) => {
        return render(<SensoryProvider>
        {component}
      </SensoryProvider>);
    };
    describe('Rendering', () => {
        it('renders a default button', () => {
            renderWithProvider(<Button>Click me</Button>);
            const button = screen.getByRole('button', { name: /click me/i });
            expect(button).toBeInTheDocument();
            expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
        });
        it('renders with custom className', () => {
            renderWithProvider(<Button className="custom-class">Button</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('custom-class');
        });
        it('renders as child when asChild is true', () => {
            renderWithProvider(<Button asChild>
          <a href="/test">Link Button</a>
        </Button>);
            const link = screen.getByRole('link', { name: /link button/i });
            expect(link).toBeInTheDocument();
        });
    });
    describe('Variants', () => {
        it('renders destructive variant', () => {
            renderWithProvider(<Button variant="destructive">Delete</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('bg-destructive', 'text-destructive-foreground');
        });
        it('renders outline variant', () => {
            renderWithProvider(<Button variant="outline">Outline</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('border', 'border-input', 'bg-background');
        });
        it('renders secondary variant', () => {
            renderWithProvider(<Button variant="secondary">Secondary</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
        });
        it('renders ghost variant', () => {
            renderWithProvider(<Button variant="ghost">Ghost</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground');
        });
        it('renders link variant', () => {
            renderWithProvider(<Button variant="link">Link</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('text-primary', 'underline-offset-4');
        });
    });
    describe('Sizes', () => {
        it('renders default size', () => {
            renderWithProvider(<Button size="default">Default</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('h-10', 'px-4', 'py-2');
        });
        it('renders small size', () => {
            renderWithProvider(<Button size="sm">Small</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('h-9', 'px-3');
        });
        it('renders large size', () => {
            renderWithProvider(<Button size="lg">Large</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('h-11', 'px-8');
        });
        it('renders icon size', () => {
            renderWithProvider(<Button size="icon">🎨</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveClass('h-10', 'w-10');
        });
    });
    describe('Accessibility', () => {
        it('has proper button attributes', () => {
            renderWithProvider(<Button>Accessible Button</Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('type', 'button');
        });
        it('supports disabled state', () => {
            renderWithProvider(<Button disabled>Disabled</Button>);
            const button = screen.getByRole('button');
            expect(button).toBeDisabled();
            expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
        });
        it('supports custom HTML attributes', () => {
            renderWithProvider(<Button data-testid="custom-button" aria-label="Custom aria label">
          Button
        </Button>);
            const button = screen.getByRole('button');
            expect(button).toHaveAttribute('data-testid', 'custom-button');
            expect(button).toHaveAttribute('aria-label', 'Custom aria label');
        });
    });
    describe('Interactions', () => {
        it('calls onClick handler when clicked', () => {
            const handleClick = jest.fn();
            renderWithProvider(<Button onClick={handleClick}>Click me</Button>);
            const button = screen.getByRole('button');
            button.click();
            expect(handleClick).toHaveBeenCalledTimes(1);
        });
        it('plays sound effect when clicked', () => {
            renderWithProvider(<Button>Click me</Button>);
            const button = screen.getByRole('button');
            button.click();
            expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound "click"');
        });
        it('handles click events with sensory feedback', () => {
            const handleClick = jest.fn();
            renderWithProvider(<Button onClick={handleClick}>Click me</Button>);
            const button = screen.getByRole('button');
            button.click();
            expect(handleClick).toHaveBeenCalled();
            expect(mockConsoleLog).toHaveBeenCalledWith('SFX: Playing sound "click"');
        });
    });
    describe('CSS Variables Compliance', () => {
        it('uses semantic CSS variables instead of hard-coded colors', () => {
            renderWithProvider(<Button variant="default">Test Button</Button>);
            const button = screen.getByRole('button');
            // Should use semantic variables like --primary, --background
            expect(button).toHaveClass('bg-primary');
            expect(button).toHaveClass('text-primary-foreground');
            // Should not contain hard-coded hex values
            const buttonStyles = button.getAttribute('class') || '';
            expect(buttonStyles).not.toMatch(/#[0-9a-fA-F]{3,6}/);
        });
        it('maintains consistent spacing with CSS variables', () => {
            renderWithProvider(<Button size="default">Test</Button>);
            const button = screen.getByRole('button');
            // Should use Tailwind classes that map to CSS variables
            expect(button).toHaveClass('px-4', 'py-2');
        });
    });
});
//# sourceMappingURL=button.test.jsx.map