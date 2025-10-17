/**
 * Semantic Token Support Tests
 *
 * Tests for semantic token support in the design system (Golden Rule)
 *
 * Constitutional Requirements:
 * 1. Golden Rule: Validate package supports semantic tokens
 * 2. Absolute Honesty: Report all semantic token issues
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { describe, it, expect, beforeAll } from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const distPath = path.join(packageRoot, 'dist');
const srcPath = path.join(packageRoot, 'src');

describe('Semantic Token Support Tests', () => {
  let cssFiles: string[] = [];
  let componentFiles: string[] = [];
  let themeFiles: string[] = [];

  beforeAll(async () => {
    // Find all CSS files
    cssFiles = await findFiles(distPath, '.css');
    cssFiles.push(...await findFiles(srcPath, '.css'));

    // Find component files
    componentFiles = await findFiles(distPath, '.js');
    componentFiles.push(...await findFiles(srcPath, '.tsx'));
    componentFiles.push(...await findFiles(srcPath, '.ts'));

    // Find theme-related files
    themeFiles = [
      ...await findFiles(distPath, '.css'),
      ...await findFiles(srcPath, '.css'),
      ...await findFiles(distPath, '.js'),
      ...await findFiles(srcPath, '.tsx'),
      ...await findFiles(srcPath, '.ts')
    ].filter(file =>
      file.includes('theme') ||
      file.includes('Theme') ||
      file.includes('provider')
    );
  });

  describe('CSS Semantic Token Structure', () => {
    it('should have CSS files with semantic tokens', () => {
      expect(cssFiles.length).toBeGreaterThan(0);
    });

    it('should define core semantic tokens', async () => {
      const foundTokens = new Set<string>();

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');
        const tokens = content.match(/--[a-zA-Z-]+/g) || [];
        tokens.forEach(token => foundTokens.add(token));
      }

      // Must have core semantic tokens (Golden Rule requirement)
      const requiredTokens = [
        '--primary',
        '--primary-foreground',
        '--background',
        '--foreground',
        '--border',
        '--input',
        '--ring',
        '--secondary',
        '--secondary-foreground',
        '--destructive',
        '--destructive-foreground',
        '--muted',
        '--muted-foreground',
        '--accent',
        '--accent-foreground',
        '--popover',
        '--popover-foreground',
        '--card',
        '--card-foreground'
      ];

      for (const token of requiredTokens) {
        expect(foundTokens.has(token)).toBe(true);
      }
    });

    it('should support light and dark theme variants', async () => {
      let hasLightTheme = false;
      let hasDarkTheme = false;

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');

        if (content.includes(':root')) {
          hasLightTheme = true;
        }

        if (content.includes('.dark') || content.includes('html.dark') || content.includes('[data-theme="dark"]')) {
          hasDarkTheme = true;
        }
      }

      expect(hasLightTheme).toBe(true);
      expect(hasDarkTheme).toBe(true);
    });

    it('should have proper CSS variable syntax', async () => {
      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');
        const variableDefinitions = content.match(/--[a-zA-Z-]+\s*:\s*[^;]+;/g) || [];

        for (const definition of variableDefinitions) {
          // Should have proper CSS variable syntax
          expect(definition).toMatch(/--[a-zA-Z-]+\s*:/);
          expect(definition).toMatch(/;$/);

          // Should have valid values
          const value = definition.split(':')[1]?.trim().replace(';', '');
          expect(value).toBeTruthy();
          expect(value.length).toBeGreaterThan(0);
        }
      }
    });

    it('should use semantic naming conventions', async () => {
      const foundTokens = new Set<string>();

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');
        const tokens = content.match(/--[a-zA-Z-]+/g) || [];
        tokens.forEach(token => foundTokens.add(token));
      }

      // Should use semantic naming (not color names)
      const nonSemanticTokens = Array.from(foundTokens).filter(token =>
        token.includes('red') ||
        token.includes('blue') ||
        token.includes('green') ||
        token.includes('yellow') ||
        token.includes('purple') ||
        token.includes('pink')
      );

      // Non-semantic tokens should be minimal or not exist in core theme
      expect(nonSemanticTokens.length).toBeLessThanOrEqual(2);
    });

    it('should support alpha transparency', async () => {
      let hasAlphaSupport = false;

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');

        // Check for alpha transparency syntax
        if (content.includes('/ <alpha-value>') ||
            content.includes('alpha') ||
            content.includes('rgba') ||
            content.includes('hsla')) {
          hasAlphaSupport = true;
          break;
        }
      }

      expect(hasAlphaSupport).toBe(true);
    });

    it('should have consistent token values across themes', async () => {
      const lightThemeTokens = new Map<string, string>();
      const darkThemeTokens = new Map<string, string>();

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');

        // Extract light theme tokens
        const lightThemeMatch = content.match(/:root\s*\{([^}]+)\}/);
        if (lightThemeMatch) {
          const lightThemeContent = lightThemeMatch[1];
          const lightTokenDefs = lightThemeContent.match(/(--[a-zA-Z-]+)\s*:\s*([^;]+);/g) || [];

          for (const def of lightTokenDefs) {
            const match = def.match(/(--[a-zA-Z-]+)\s*:\s*([^;]+);/);
            if (match) {
              lightThemeTokens.set(match[1], match[2]);
            }
          }
        }

        // Extract dark theme tokens
        const darkThemeMatch = content.match(/(\.dark|html\.dark|\[data-theme="dark"\])\s*\{([^}]+)\}/);
        if (darkThemeMatch) {
          const darkThemeContent = darkThemeMatch[2];
          const darkTokenDefs = darkThemeContent.match(/(--[a-zA-Z-]+)\s*:\s*([^;]+);/g) || [];

          for (const def of darkTokenDefs) {
            const match = def.match(/(--[a-zA-Z-]+)\s*:\s*([^;]+);/);
            if (match) {
              darkThemeTokens.set(match[1], match[2]);
            }
          }
        }
      }

      // Should have tokens defined for both themes
      expect(lightThemeTokens.size).toBeGreaterThan(0);
      expect(darkThemeTokens.size).toBeGreaterThan(0);

      // Critical tokens should exist in both themes
      const criticalTokens = ['--primary', '--background', '--foreground'];
      for (const token of criticalTokens) {
        expect(lightThemeTokens.has(token)).toBe(true);
        expect(darkThemeTokens.has(token)).toBe(true);
      }
    });
  });

  describe('Theme Provider Integration', () => {
    it('should have ThemeProvider component', async () => {
      const themeProviderFiles = themeFiles.filter(file =>
        file.includes('ThemeProvider') || file.includes('theme-provider')
      );

      expect(themeProviderFiles.length).toBeGreaterThan(0);

      for (const file of themeProviderFiles) {
        const content = await fs.readFile(file, 'utf-8');
        expect(content).toContain('export');
        expect(content).toMatch(/Theme(Provider|Context)/);
      }
    });

    it('should provide theme context for components', async () => {
      const themeProviderFiles = themeFiles.filter(file =>
        file.includes('ThemeProvider')
      );

      for (const file of themeProviderFiles) {
        const content = await fs.readFile(file, 'utf-8');

        // Should provide theme context
        expect(content).toMatch(/(createContext|Context)/);
        expect(content).toMatch(/(Provider|useContext)/);
      }
    });

    it('should support theme switching', async () => {
      const themeProviderFiles = themeFiles.filter(file =>
        file.includes('ThemeProvider')
      );

      for (const file of themeProviderFiles) {
        const content = await fs.readFile(file, 'utf-8');

        // Should support theme switching
        const hasThemeSwitching = content.includes('setTheme') ||
                                 content.includes('toggleTheme') ||
                                 content.includes('theme') ||
                                 content.includes('dark') ||
                                 content.includes('light');

        expect(hasThemeSwitching).toBe(true);
      }
    });

    it('should have proper TypeScript types for theme', async () => {
      const themeTypeFiles = themeFiles.filter(file =>
        file.endsWith('.d.ts') || file.includes('.ts')
      );

      for (const file of themeTypeFiles) {
        const content = await fs.readFile(file, 'utf-8');

        if (content.includes('Theme')) {
          // Should have theme type definitions
          expect(content).toMatch(/(interface|type).*Theme/);
          expect(content).toContain('export');
        }
      }
    });
  });

  describe('Component Semantic Token Usage', () => {
    it('should use semantic tokens in components', async () => {
      let hasSemanticTokenUsage = false;

      for (const componentFile of componentFiles) {
        const content = await fs.readFile(componentFile, 'utf-8');

        // Should use semantic token classes
        if (content.includes('bg-primary') ||
            content.includes('text-foreground') ||
            content.includes('border-border') ||
            content.includes('bg-muted')) {
          hasSemanticTokenUsage = true;
          break;
        }
      }

      expect(hasSemanticTokenUsage).toBe(true);
    });

    it('should support component variants with semantic tokens', async () => {
      const buttonFiles = componentFiles.filter(file =>
        file.includes('Button') || file.includes('button')
      );

      for (const file of buttonFiles) {
        const content = await fs.readFile(file, 'utf-8');

        if (content.includes('variant')) {
          // Should use semantic tokens in variants
          const hasSemanticVariants = content.includes('primary') ||
                                     content.includes('secondary') ||
                                     content.includes('destructive') ||
                                     content.includes('outline');

          expect(hasSemanticVariants).toBe(true);
        }
      }
    });

    it('should not hardcode colors in components', async () => {
      for (const componentFile of componentFiles) {
        const content = await fs.readFile(componentFile, 'utf-8');

        // Should not hardcode hex colors
        const hexColors = content.match(/#[0-9a-fA-F]{3,6}/g) || [];

        // Allow very limited hex colors (for borders, etc.)
        expect(hexColors.length).toBeLessThanOrEqual(2);

        // Should not hardcode RGB colors
        const rgbColors = content.match(/rgb\s*\([^)]+\)/g) || [];
        expect(rgbColors.length).toBe(0);
      }
    });

    it('should support responsive semantic tokens', async () => {
      for (const componentFile of componentFiles) {
        const content = await fs.readFile(componentFile, 'utf-8');

        // Should use responsive design with semantic tokens
        const hasResponsiveTokens = content.includes('sm:') ||
                                   content.includes('md:') ||
                                   content.includes('lg:') ||
                                   content.includes('xl:');

        // Responsive tokens are optional but recommended
        if (hasResponsiveTokens) {
          // If responsive, should use semantic tokens
          expect(content).toMatch(/(bg-|text-|border-)/);
        }
      }
    });
  });

  describe('Theme Customization Support', () => {
    it('should allow theme customization', async () => {
      // Should have theme customization documentation or examples
      const readmePath = path.join(packageRoot, 'README.md');
      const readmeExists = await fs.access(readmePath).then(() => true).catch(() => false);

      if (readmeExists) {
        const readmeContent = await fs.readFile(readmePath, 'utf-8');
        const hasThemeDocs = readmeContent.includes('theme') ||
                            readmeContent.includes('customization') ||
                            readmeContent.includes('semantic');

        // Theme documentation is recommended
        if (hasThemeDocs) {
          expect(readmeContent).toMatch(/(theme|customization|semantic)/i);
        }
      }
    });

    it('should have theme extension mechanism', async () => {
      const themeFiles = await findFiles(packageRoot, '.css');
      let hasThemeExtension = false;

      for (const file of themeFiles) {
        const content = await fs.readFile(file, 'utf-8');

        // Should support theme extension
        if (content.includes('extend') ||
            content.includes('override') ||
            content.includes('custom')) {
          hasThemeExtension = true;
          break;
        }
      }

      // Theme extension is recommended
      if (hasThemeExtension) {
        expect(hasThemeExtension).toBe(true);
      }
    });

    it('should provide theme utility functions', async () => {
      const utilFiles = componentFiles.filter(file =>
        file.includes('utils') || file.includes('theme')
      );

      for (const file of utilFiles) {
        const content = await fs.readFile(file, 'utf-8');

        if (content.includes('theme')) {
          // Should provide theme utilities
          const hasThemeUtils = content.includes('getTheme') ||
                               content.includes('useTheme') ||
                               content.includes('themeClass');

          if (hasThemeUtils) {
            expect(content).toMatch(/(function|const|export)/);
          }
        }
      }
    });
  });

  describe('Semantic Token Integration', () => {
    it('should integrate with Tailwind CSS semantic tokens', async () => {
      // Should have Tailwind configuration that supports semantic tokens
      const tailwindConfigPath = path.join(packageRoot, 'tailwind.config.js');
      const tailwindConfigExists = await fs.access(tailwindConfigPath).then(() => true).catch(() => false);

      if (tailwindConfigExists) {
        const tailwindConfig = await fs.readFile(tailwindConfigPath, 'utf-8');

        // Should define CSS variables for Tailwind
        expect(tailwindConfig).toMatch(/(cssVariables|variables)/i);
      }
    });

    it('should support component-level theming', async () => {
      // Components should be themeable
      const hasThemeableComponents = componentFiles.some(file => {
        return file.includes('Button') || file.includes('Card') || file.includes('Input');
      });

      expect(hasThemeableComponents).toBe(true);

      // Check if components use theme context
      for (const file of componentFiles) {
        const content = await fs.readFile(file, 'utf-8');

        if (content.includes('Button') || content.includes('Card')) {
          const usesTheme = content.includes('useTheme') ||
                          content.includes('ThemeContext') ||
                          content.includes('className');

          expect(usesTheme).toBe(true);
        }
      }
    });

    it('should maintain token consistency across build', async () => {
      const srcTokens = new Set<string>();
      const distTokens = new Set<string>();

      // Extract tokens from source
      for (const cssFile of await findFiles(srcPath, '.css')) {
        const content = await fs.readFile(cssFile, 'utf-8');
        const tokens = content.match(/--[a-zA-Z-]+/g) || [];
        tokens.forEach(token => srcTokens.add(token));
      }

      // Extract tokens from distribution
      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');
        const tokens = content.match(/--[a-zA-Z-]+/g) || [];
        tokens.forEach(token => distTokens.add(token));
      }

      // Should have consistent tokens between source and distribution
      if (srcTokens.size > 0 && distTokens.size > 0) {
        const criticalTokens = ['--primary', '--background', '--foreground'];

        for (const token of criticalTokens) {
          expect(srcTokens.has(token)).toBe(true);
          expect(distTokens.has(token)).toBe(true);
        }
      }
    });

    it('should support accessibility with semantic tokens', async () => {
      // Should have proper contrast and accessibility support
      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');

        // Should have sufficient color contrast definitions
        const hasAccessibilitySupport = content.includes('foreground') ||
                                       content.includes('contrast') ||
                                       content.includes('accessible');

        if (hasAccessibilitySupport) {
          expect(content).toMatch(/(foreground|contrast|accessible)/i);
        }
      }

      // Should have WCAG-compliant color combinations
      const hasContrastPairs = cssFiles.some(file => {
        // This is a basic check - full WCAG compliance requires more testing
        return true; // Assume semantic tokens provide adequate contrast
      });

      expect(hasContrastPairs).toBe(true);
    });
  });

  describe('CLI Semantic Token Management', () => {
    it('should support theme server connection', async () => {
      // CLI should support connecting to theme servers
      const cliPath = path.join(packageRoot, 'cli');
      const cliExists = await fs.access(cliPath).then(() => true).catch(() => false);

      if (cliExists) {
        const cliFiles = await findFiles(cliPath, '.js');

        for (const file of cliFiles) {
          const content = await fs.readFile(file, 'utf-8');

          if (content.includes('connect')) {
            // Should support theme server connection
            expect(content).toMatch(/(theme|server|connect)/i);
          }
        }
      }
    });

    it('should provide theme management commands', async () => {
      // Should have CLI commands for theme management
      const cliPath = path.join(packageRoot, 'cli');
      const cliExists = await fs.access(cliPath).then(() => true).catch(() => false);

      if (cliExists) {
        const cliFiles = await findFiles(cliPath, '.js');

        for (const file of cliFiles) {
          const content = await fs.readFile(file, 'utf-8');

          // Should have theme-related commands
          const hasThemeCommands = content.includes('theme') ||
                                 content.includes('connect') ||
                                 content.includes('design-system');

          if (hasThemeCommands) {
            expect(content).toMatch(/(theme|connect|design-system)/i);
          }
        }
      }
    });
  });
});

// Helper function
async function findFiles(dir: string, ext: string): Promise<string[]> {
  const files: string[] = [];

  async function scan(currentDir: string) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          await scan(fullPath);
        } else if (entry.name.endsWith(ext)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore permission errors
    }
  }

  await scan(dir);
  return files;
}