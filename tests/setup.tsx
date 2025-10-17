import '@testing-library/jest-dom';
import React from 'react';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock Next.js image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => React.createElement('img', { ...props, 'data-testid': 'next-image' }),
}));

// Mock lucide-react icons
const createMockIcon = (testId: string) => () => React.createElement('svg', { 'data-testid': testId });

jest.mock('lucide-react', () => ({
  User: createMockIcon('user-icon'),
  Settings: createMockIcon('settings-icon'),
  Search: createMockIcon('search-icon'),
  X: createMockIcon('x-icon'),
  ChevronDown: createMockIcon('chevron-down-icon'),
  ChevronRight: createMockIcon('chevron-right-icon'),
  ChevronLeft: createMockIcon('chevron-left-icon'),
  ChevronUp: createMockIcon('chevron-up-icon'),
  Plus: createMockIcon('plus-icon'),
  Minus: createMockIcon('minus-icon'),
  Check: createMockIcon('check-icon'),
  AlertCircle: createMockIcon('alert-circle-icon'),
  Home: createMockIcon('home-icon'),
  Mail: createMockIcon('mail-icon'),
  placeholder: createMockIcon('placeholder-icon'),
}));

// Mock icon-metaphors
jest.mock('../src/lib/icon-metaphors', () => ({
  IconMetaphor: {
    placeholder: 'placeholder',
    user: 'user',
    settings: 'settings',
    search: 'search',
    close: 'x',
    menu: 'menu',
    chevronDown: 'chevron-down',
    chevronUp: 'chevron-up',
    chevronLeft: 'chevron-left',
    chevronRight: 'chevron-right',
    plus: 'plus',
    minus: 'minus',
    check: 'check',
    alert: 'alert-circle',
    info: 'info',
    warning: 'alert-triangle',
    error: 'x-circle',
    success: 'check-circle',
    loading: 'refresh-cw'
  }
}));

// Mock icon maps
jest.mock('../src/lib/icon-maps/lucide.map', () => ({
  lucideMap: {
    placeholder: createMockIcon('placeholder-icon'),
    user: createMockIcon('user-icon'),
    settings: createMockIcon('settings-icon'),
    search: createMockIcon('search-icon'),
    close: createMockIcon('x-icon'),
    menu: createMockIcon('menu-icon'),
    'chevron-down': createMockIcon('chevron-down-icon'),
    'chevron-up': createMockIcon('chevron-up-icon'),
    'chevron-left': createMockIcon('chevron-left-icon'),
    'chevron-right': createMockIcon('chevron-right-icon'),
    plus: createMockIcon('plus-icon'),
    minus: createMockIcon('minus-icon'),
    check: createMockIcon('check-icon'),
    'alert-circle': createMockIcon('alert-circle-icon'),
    info: createMockIcon('info-icon'),
    'alert-triangle': createMockIcon('alert-triangle-icon'),
    'x-circle': createMockIcon('x-circle-icon'),
    'check-circle': createMockIcon('check-circle-icon'),
    'refresh-cw': createMockIcon('refresh-cw-icon')
  }
}));

// Mock variants
jest.mock('../src/lib/variants', () => ({
  buttonVariants: ({ btnVariant, btnSize, btnDisabled, btnLoading, className }: any) => {
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      default: 'bg-primary text-primary-foreground hover:bg-primary/90'
    };

    const sizeClasses = {
      xs: 'h-8 rounded px-2 text-xs',
      sm: 'h-9 rounded-md px-3 text-sm',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 rounded-md px-8 text-lg',
      xl: 'h-12 rounded-lg px-10 text-xl',
      default: 'h-10 px-4 py-2'
    };

    const stateClasses = [
      btnDisabled ? 'disabled:opacity-50 disabled:pointer-events-none' : '',
      btnLoading ? 'opacity-75' : ''
    ].filter(Boolean).join(' ');

    // Mock cn function
    const cn = (...inputs: any[]) => {
      return inputs.filter(Boolean).join(' ');
    };

    return cn(
      baseClasses,
      variantClasses[btnVariant as keyof typeof variantClasses] || variantClasses.default,
      sizeClasses[btnSize as keyof typeof sizeClasses] || sizeClasses.default,
      stateClasses,
      className
    );
  },

  labelVariants: ({ lblVariant, lblSize, lblRequired, lblOptional, className }: any) => {
    const baseClasses = 'inline-flex items-center gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';

    const variantClasses = {
      default: 'text-sm text-foreground',
      error: 'text-sm text-destructive',
      required: 'text-sm text-foreground font-semibold',
      optional: 'text-sm text-muted-foreground'
    };

    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    };

    const cn = (...inputs: any[]) => {
      return inputs.filter(Boolean).join(' ');
    };

    return cn(
      baseClasses,
      variantClasses[lblVariant as keyof typeof variantClasses] || variantClasses.default,
      sizeClasses[lblSize as keyof typeof sizeClasses] || sizeClasses.sm,
      className
    );
  },

  iconVariants: ({ icnVariant, icnSize, icnRotated, icnAnimated, className }: any) => {
    const baseClasses = 'inline-flex items-center justify-center';

    const variantClasses = {
      default: '',
      button: '',
      input: '',
      standalone: ''
    };

    const sizeClasses = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8'
    };

    const stateClasses = [
      icnRotated ? 'rotate-180' : '',
      icnAnimated ? 'animate-spin' : ''
    ].filter(Boolean).join(' ');

    const cn = (...inputs: any[]) => {
      return inputs.filter(Boolean).join(' ');
    };

    return cn(
      baseClasses,
      variantClasses[icnVariant as keyof typeof variantClasses] || variantClasses.default,
      sizeClasses[icnSize as keyof typeof sizeClasses] || sizeClasses.sm,
      stateClasses,
      className
    );
  }
}));

// Mock utils
jest.mock('../src/lib/utils', () => ({
  cn: (...inputs: any[]) => {
    return inputs.filter(Boolean).join(' ');
  }
}));

// Mock controller
jest.mock('../src/lib/controller', () => ({
  useButtonController: ({ loading, disabled }: any) => ({
    state: {
      loading: loading || false,
      disabled: disabled || false
    },
    actions: {
      setLoading: jest.fn(),
      setDisabled: jest.fn()
    }
  })
}));

// Mock types
jest.mock('../src/lib/types', () => ({
  ButtonAPI: {
    btnVariant: 'primary',
    btnSize: 'md',
    btnDisabled: false,
    btnLoading: false,
    btnLeftIcon: null,
    btnRightIcon: null
  },
  LabelAPI: {
    lblVariant: 'default',
    lblSize: 'sm',
    lblRequired: false,
    lblOptional: false,
    lblError: false
  },
  IconAPI: {
    icnVariant: 'default',
    icnSize: 'sm',
    icnRotated: false,
    icnAnimated: false
  },
  ArchitecturalMetadata: {
    componentType: 'atomic',
    hasHardcodedStyles: false,
    followsNamingConvention: true,
    usesSizePrimitives: true,
    hasControllerPattern: false,
    lastReviewed: new Date()
  }
}));