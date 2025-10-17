/**
 * Token Parser - Extracts tokens from CSS files
 *
 * This parser reads the existing CSS token definitions and converts them
 * into the structured token format for the management system.
 */

import {
  ColorToken,
  TypographyToken,
  SemanticToken,
  TokenTier,
  TokenType,
  BaseToken,
  TokenCollection
} from './token-types';

// Regular expressions for parsing CSS variables
const CSS_VAR_REGEX = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
const CSS_COLOR_REGEX = /oklch\(([^)]+)\)/;
const CSS_SELECTOR_REGEX = /([^.]+)\s*{\s*/g;

// Parsed CSS structure
interface ParsedCSSFile {
  selectors: {
    selector: string;
    properties: Array<{ name: string; value: string }>;
  }[];
}

export class TokenParser {
  /**
   * Parse a CSS file and extract tokens
   */
  static parseCSSFile(cssContent: string): ParsedCSSFile {
    const selectors: ParsedCSSFile['selectors'] = [];

    // Split by CSS selectors
    const selectorMatches = cssContent.split(/(?=[^}]+{|})/);
    let currentSelector = '';
    let currentProperties: Array<{ name: string; value: string }> = [];

    for (const match of selectorMatches) {
      const trimmed = match.trim();
      if (trimmed.endsWith('{')) {
        // New selector
        if (currentSelector && currentProperties.length > 0) {
          selectors.push({
            selector: currentSelector,
            properties: currentProperties
          });
        }
        currentSelector = trimmed.slice(0, -1).trim();
        currentProperties = [];
      } else if (trimmed === '}') {
        // End of selector block
        if (currentSelector && currentProperties.length > 0) {
          selectors.push({
            selector: currentSelector,
            properties: currentProperties
          });
        }
        currentSelector = '';
        currentProperties = [];
      } else if (trimmed && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
        // Property declaration
        const propertyMatch = trimmed.match(/([^:]+):\s*([^;]+);?/);
        if (propertyMatch) {
          currentProperties.push({
            name: propertyMatch[1].trim(),
            value: propertyMatch[2].trim()
          });
        }
      }
    }

    return { selectors };
  }

  /**
   * Extract primitive color tokens from primitives.css
   */
  static extractPrimitiveColors(cssContent: string): ColorToken[] {
    const parsed = this.parseCSSFile(cssContent);
    const tokens: ColorToken[] = [];
    const rootSelector = parsed.selectors.find(s => s.selector === ':root');

    if (!rootSelector) return tokens;

    for (const prop of rootSelector.properties) {
      if (prop.name.includes('-') && this.isColorValue(prop.value)) {
        const token: ColorToken = {
          id: this.generateId('primitive', prop.name),
          name: prop.name,
          tier: 'primitive',
          type: 'color',
          colorSpace: 'oklch',
          value: prop.value,
          description: this.generateColorDescription(prop.name),
          category: this.getColorCategory(prop.name),
          metadata: {
            author: 'system',
            tags: this.generateColorTags(prop.name),
            references: [],
            usage: []
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          version: '1.0.0',
          status: 'active'
        };

        tokens.push(token);
      }
    }

    return tokens;
  }

  /**
   * Extract semantic tokens from theme-default.css
   */
  static extractSemanticTokens(cssContent: string): SemanticToken[] {
    const parsed = this.parseCSSFile(cssContent);
    const tokens: SemanticToken[] = [];

    // Process light mode tokens
    const lightSelector = parsed.selectors.find(s => s.selector === ':root');
    if (lightSelector) {
      for (const prop of lightSelector.properties) {
        if (this.isSemanticToken(prop.name, prop.value)) {
          const token = this.createSemanticToken(prop.name, prop.value, 'light');
          tokens.push(token);
        }
      }
    }

    // Process dark mode tokens
    const darkSelector = parsed.selectors.find(s => s.selector === '.dark');
    if (darkSelector) {
      for (const prop of darkSelector.properties) {
        const existingToken = tokens.find(t => t.name === prop.name);
        if (existingToken) {
          existingToken.darkModeValue = prop.value;
        } else if (this.isSemanticToken(prop.name, prop.value)) {
          const token = this.createSemanticToken(prop.name, prop.value, 'dark');
          token.lightModeValue = ''; // Only exists in dark mode
          tokens.push(token);
        }
      }
    }

    return tokens;
  }

  /**
   * Extract typography tokens from CSS or from component variants
   */
  static extractTypographyTokens(cssContent: string): TypographyToken[] {
    const parsed = this.parseCSSFile(cssContent);
    const tokens: TypographyToken[] = [];

    // This would need to be implemented based on your actual typography tokens
    // For now, I'll create some sample tokens based on common patterns
    const typographyValues = [
      { name: 'font-sans', value: 'Inter, system-ui, sans-serif', property: 'font-family' },
      { name: 'font-mono', value: 'JetBrains Mono, monospace', property: 'font-family' },
      { name: 'font-serif', value: 'Georgia, serif', property: 'font-family' },
    ];

    for (const item of typographyValues) {
      const token: TypographyToken = {
        id: this.generateId('primitive', item.name),
        name: item.name,
        tier: 'primitive',
        type: 'typography',
        value: item.value,
        unit: 'unitless',
        fontFamily: item.value,
        description: `Font family: ${item.name}`,
        category: 'font-family',
        metadata: {
          author: 'system',
          tags: ['font-family', 'typography'],
          references: [],
          usage: []
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0.0',
        status: 'active'
      };

      tokens.push(token);
    }

    return tokens;
  }

  /**
   * Create a semantic token from CSS property
   */
  private static createSemanticToken(name: string, value: string, themeContext: 'light' | 'dark'): SemanticToken {
    const primitiveRef = this.extractPrimitiveReference(value);

    return {
      id: this.generateId('semantic', name),
      name: name,
      tier: 'semantic',
      type: this.inferTokenType(name),
      value: value,
      primitiveRef,
      lightModeValue: themeContext === 'light' ? value : '',
      darkModeValue: themeContext === 'dark' ? value : '',
      themeContext: 'both',
      purpose: this.inferTokenPurpose(name),
      description: `Semantic token: ${name}`,
      category: this.inferTokenCategory(name),
      metadata: {
        author: 'system',
        tags: this.generateSemanticTags(name),
        references: primitiveRef ? [primitiveRef] : [],
        usage: []
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      version: '1.0.0',
      status: 'active'
    };
  }

  /**
   * Check if a CSS value is a color
   */
  private static isColorValue(value: string): boolean {
    return value.includes('oklch(') || value.includes('rgb(') || value.includes('#');
  }

  /**
   * Check if a token is a semantic token
   */
  private static isSemanticToken(name: string, value: string): boolean {
    // Semantic tokens reference primitives
    return value.includes('var(--') && !name.includes('primitive');
  }

  /**
   * Extract primitive reference from semantic token value
   */
  private static extractPrimitiveReference(value: string): string | undefined {
    const match = value.match(/var\(--([^)]+)\)/);
    return match ? match[1] : undefined;
  }

  /**
   * Infer token type from name
   */
  private static inferTokenType(name: string): TokenType {
    if (name.includes('color') || name.includes('background') || name.includes('foreground')) {
      return 'color';
    }
    if (name.includes('font') || name.includes('text') || name.includes('heading')) {
      return 'typography';
    }
    if (name.includes('space') || name.includes('gap') || name.includes('padding') || name.includes('margin')) {
      return 'spacing';
    }
    if (name.includes('radius') || name.includes('border')) {
      return 'shape';
    }
    if (name.includes('shadow') || name.includes('elevation')) {
      return 'elevation';
    }
    if (name.includes('duration') || name.includes('easing') || name.includes('transition')) {
      return 'motion';
    }
    if (name.includes('opacity')) {
      return 'opacity';
    }
    return 'color'; // Default
  }

  /**
   * Infer token purpose
   */
  private static inferTokenPurpose(name: string) {
    if (name.includes('primary')) {
      return { role: 'primary' as const, usage: 'Primary interactive elements', examples: ['buttons', 'links'] };
    }
    if (name.includes('secondary')) {
      return { role: 'secondary' as const, usage: 'Secondary interactive elements', examples: ['secondary buttons', 'subtle links'] };
    }
    if (name.includes('background') || name.includes('surface')) {
      return { role: 'surface' as const, usage: 'Background surfaces', examples: ['cards', 'modals', 'pages'] };
    }
    if (name.includes('border') || name.includes('outline')) {
      return { role: 'border' as const, usage: 'Borders and outlines', examples: ['input borders', 'dividers'] };
    }
    if (name.includes('text') || name.includes('foreground')) {
      return { role: 'text' as const, usage: 'Text and typography', examples: ['headings', 'paragraphs'] };
    }
    return { role: 'accent' as const, usage: 'Accent elements', examples: ['highlights', 'focus states'] };
  }

  /**
   * Infer token category
   */
  private static inferTokenCategory(name: string): string {
    if (name.includes('color')) return 'colors';
    if (name.includes('font') || name.includes('text')) return 'typography';
    if (name.includes('space') || name.includes('gap')) return 'spacing';
    if (name.includes('border') || name.includes('radius')) return 'shape';
    if (name.includes('shadow') || name.includes('elevation')) return 'elevation';
    if (name.includes('opacity')) return 'opacity';
    if (name.includes('transition') || name.includes('animation')) return 'motion';
    return 'general';
  }

  /**
   * Generate unique ID for token
   */
  private static generateId(tier: TokenTier, name: string): string {
    return `${tier}-${name.replace(/[^a-zA-Z0-9]/g, '-')}`;
  }

  /**
   * Generate color description
   */
  private static generateColorDescription(name: string): string {
    const palette = this.getColorPalette(name);
    const shade = this.getColorShade(name);
    return `${palette} color - ${shade}`;
  }

  /**
   * Get color palette from name
   */
  private static getColorPalette(name: string): string {
    if (name.includes('gray')) return 'Neutral';
    if (name.includes('blue')) return 'Blue';
    if (name.includes('red')) return 'Red';
    if (name.includes('green')) return 'Green';
    if (name.includes('yellow')) return 'Yellow';
    if (name.includes('orange')) return 'Orange';
    if (name.includes('purple')) return 'Purple';
    return 'Unknown';
  }

  /**
   * Get color shade from name
   */
  private static getColorShade(name: string): string {
    const match = name.match(/(\d+)$/);
    return match ? `Shade ${match[1]}` : 'Base';
  }

  /**
   * Get color category
   */
  private static getColorCategory(name: string): string {
    return this.getColorPalette(name).toLowerCase();
  }

  /**
   * Generate color tags
   */
  private static generateColorTags(name: string): string[] {
    const tags = ['color', this.getColorPalette(name).toLowerCase()];
    const shade = this.getColorShade(name);
    if (shade !== 'Base') {
      tags.push(shade.toLowerCase().replace(' ', '-'));
    }
    return tags;
  }

  /**
   * Generate semantic tags
   */
  private static generateSemanticTags(name: string): string[] {
    const tags = ['semantic'];
    const type = this.inferTokenType(name);
    const purpose = this.inferTokenPurpose(name);

    tags.push(type);
    tags.push(purpose.role);

    return tags;
  }

  /**
   * Parse all token files and create token collection
   */
  static async parseAllTokenFiles(): Promise<TokenCollection> {
    // In a real implementation, these would be read from actual files
    // For now, I'll simulate the parsing

    const primitivesCss = await this.readFileContent('/styles/primitives.css');
    const themeCss = await this.readFileContent('/styles/theme-default.css');

    const primitiveColors = this.extractPrimitiveColors(primitivesCss);
    const semanticTokens = this.extractSemanticTokens(themeCss);
    const typographyTokens = this.extractTypographyTokens(primitivesCss);

    return {
      primitives: [...primitiveColors, ...typographyTokens],
      semantics: semanticTokens,
      components: [], // Would be extracted from component files
      relationships: [] // Would be inferred from references
    };
  }

  /**
   * Helper to read file content
   */
  private static async readFileContent(path: string): Promise<string> {
    try {
      // For browser environment, we'll need to fetch the CSS files
      // In a real implementation with file system access, this would use fs.readFileSync
      const response = await fetch(path);
      if (!response.ok) {
        console.warn(`Could not fetch ${path}: ${response.status}`);
        return '';
      }
      return await response.text();
    } catch (error) {
      console.warn(`Error reading ${path}:`, error);
      return '';
    }
  }
}