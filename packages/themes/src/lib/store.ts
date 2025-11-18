import { create } from 'zustand';

export interface Token {
  id: string;
  name: string;
  value: string;
  description?: string;
  tier: 'primitive' | 'semantic' | 'component';
  category?: string;
  pixelValue?: number;
}

interface TokenStore {
  // Typography tokens
  typographyTokens: Token[];
  colorTokens: Token[];
  spacingTokens: Token[];
  shapeTokens: Token[];
  elevationTokens: Token[];
  opacityTokens: Token[];
  motionTokens: Token[];

  // Actions
  addToken: (category: string, token: Omit<Token, 'id'>) => void;
  updateToken: (category: string, tokenId: string, updates: Partial<Token>) => void;
  deleteToken: (category: string, tokenId: string) => void;
  getToken: (category: string, tokenId: string) => Token | undefined;
  getTokensByCategory: (category: string) => Token[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useTokenStore = create<TokenStore>((set, get) => ({
  // Initial token data
  typographyTokens: [
    {
      id: 'font-family-sans',
      name: '--font-family-sans',
      value: 'Inter, system-ui, sans-serif',
      description: 'Primary sans-serif font family',
      tier: 'primitive',
      category: 'typography'
    },
    {
      id: 'font-size-base',
      name: '--font-size-base',
      value: '16px',
      description: 'Base font size',
      tier: 'primitive',
      category: 'typography',
      pixelValue: 16
    },
    {
      id: 'font-weight-medium',
      name: '--font-weight-medium',
      value: '500',
      description: 'Medium font weight',
      tier: 'primitive',
      category: 'typography'
    },
    {
      id: 'line-height-base',
      name: '--line-height-base',
      value: '1.5',
      description: 'Base line height',
      tier: 'primitive',
      category: 'typography'
    },
    {
      id: 'text-heading-1',
      name: '--text-heading-1',
      value: 'bold 48px/1.2 Inter, sans-serif',
      description: 'Heading level 1 typography',
      tier: 'semantic',
      category: 'typography'
    },
    {
      id: 'text-body',
      name: '--text-body',
      value: 'normal 16px/1.5 Inter, sans-serif',
      description: 'Body text typography',
      tier: 'semantic',
      category: 'typography'
    }
  ],

  colorTokens: [
    {
      id: 'color-primary-500',
      name: '--color-primary-500',
      value: '#3b82f6',
      description: 'Primary color brand',
      tier: 'primitive',
      category: 'colors'
    },
    {
      id: 'color-gray-500',
      name: '--color-gray-500',
      value: '#6b7280',
      description: 'Neutral gray color',
      tier: 'primitive',
      category: 'colors'
    },
    {
      id: 'color-text-primary',
      name: '--color-text-primary',
      value: '#1f2937',
      description: 'Primary text color',
      tier: 'semantic',
      category: 'colors'
    },
    {
      id: 'color-background',
      name: '--color-background',
      value: '#ffffff',
      description: 'Main background color',
      tier: 'semantic',
      category: 'colors'
    }
  ],

  spacingTokens: [
    {
      id: 'space-4',
      name: '--space-4',
      value: '16px',
      description: 'Base spacing unit',
      tier: 'primitive',
      category: 'spacing',
      pixelValue: 16
    },
    {
      id: 'space-8',
      name: '--space-8',
      value: '32px',
      description: 'Double spacing unit',
      tier: 'primitive',
      category: 'spacing',
      pixelValue: 32
    },
    {
      id: 'spacing-component',
      name: '--spacing-component',
      value: 'var(--space-4)',
      description: 'Component internal spacing',
      tier: 'semantic',
      category: 'spacing'
    }
  ],

  shapeTokens: [
    {
      id: 'radius-sm',
      name: '--radius-sm',
      value: '4px',
      description: 'Small border radius',
      tier: 'primitive',
      category: 'shape',
      pixelValue: 4
    },
    {
      id: 'radius-md',
      name: '--radius-md',
      value: '8px',
      description: 'Medium border radius',
      tier: 'primitive',
      category: 'shape',
      pixelValue: 8
    },
    {
      id: 'radius-lg',
      name: '--radius-lg',
      value: '12px',
      description: 'Large border radius',
      tier: 'primitive',
      category: 'shape',
      pixelValue: 12
    }
  ],

  elevationTokens: [
    {
      id: 'shadow-sm',
      name: '--shadow-sm',
      value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      description: 'Small shadow',
      tier: 'primitive',
      category: 'elevation'
    },
    {
      id: 'shadow-md',
      name: '--shadow-md',
      value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      description: 'Medium shadow',
      tier: 'primitive',
      category: 'elevation'
    }
  ],

  opacityTokens: [
    {
      id: 'opacity-disabled',
      name: '--opacity-disabled',
      value: '0.5',
      description: 'Disabled state opacity',
      tier: 'semantic',
      category: 'opacity'
    }
  ],

  motionTokens: [
    {
      id: 'transition-fast',
      name: '--transition-fast',
      value: '150ms ease-in-out',
      description: 'Fast transition duration',
      tier: 'primitive',
      category: 'motion'
    }
  ],

  // Actions
  addToken: (category: string, tokenData: Omit<Token, 'id'>) => {
    const newToken: Token = {
      ...tokenData,
      id: generateId()
    };

    set((state) => {
      const categoryKey = `${category}Tokens` as keyof TokenStore;
      const currentTokens = (state[categoryKey] as Token[]) || [];

      return {
        [categoryKey]: [...currentTokens, newToken]
      };
    });
  },

  updateToken: (category: string, tokenId: string, updates: Partial<Token>) => {
    set((state) => {
      const categoryKey = `${category}Tokens` as keyof TokenStore;
      const currentTokens = (state[categoryKey] as Token[]) || [];

      return {
        [categoryKey]: currentTokens.map(token =>
          token.id === tokenId ? { ...token, ...updates } : token
        )
      };
    });
  },

  deleteToken: (category: string, tokenId: string) => {
    set((state) => {
      const categoryKey = `${category}Tokens` as keyof TokenStore;
      const currentTokens = (state[categoryKey] as Token[]) || [];

      return {
        [categoryKey]: currentTokens.filter(token => token.id !== tokenId)
      };
    });
  },

  getToken: (category: string, tokenId: string) => {
    const categoryKey = `${category}Tokens` as keyof TokenStore;
    const tokens = (get()[categoryKey] as Token[]) || [];
    return tokens.find(token => token.id === tokenId);
  },

  getTokensByCategory: (category: string) => {
    const categoryKey = `${category}Tokens` as keyof TokenStore;
    return (get()[categoryKey] as Token[]) || [];
  }
}));