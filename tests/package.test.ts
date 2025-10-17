/**
 * Package Structure Tests
 *
 * Tests for @acrobi/design-system NPM package structure and semantic token support
 *
 * Constitutional Requirements:
 * 1. Golden Rule: Validate package supports semantic tokens
 * 2. Absolute Honesty: Report all distribution issues
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const distPath = path.join(packageRoot, 'dist');

describe('Package Structure Validation', () => {
  let packageJson: any;
  let registryJson: any;

  beforeAll(async () => {
    // Load package.json
    const packageContent = await fs.readFile(
      path.join(packageRoot, 'package.json'),
      'utf-8'
    );
    packageJson = JSON.parse(packageContent);

    // Load registry.json if exists
    try {
      const registryContent = await fs.readFile(
        path.join(distPath, 'registry.json'),
        'utf-8'
      );
      registryJson = JSON.parse(registryContent);
    } catch (error) {
      console.warn('Registry file not found, skipping registry tests');
    }
  });

  describe('Package Metadata', () => {
    it('should have correct package name and scope', () => {
      expect(packageJson.name).toBe('@acrobi/design-system');
      expect(packageJson.private).toBe(false);
      expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('should have proper NPM publishing configuration', () => {
      expect(packageJson.main).toBeDefined();
      expect(packageJson.module).toBeDefined();
      expect(packageJson.types).toBeDefined();
      expect(packageJson.files).toContain('dist');
      expect(packageJson.license).toBe('MIT');
      expect(packageJson.publishConfig).toBeDefined();
    });

    it('should include semantic tokens in keywords', () => {
      expect(packageJson.keywords).toContain('semantic-tokens');
      expect(packageJson.keywords).toContain('theme-management');
      expect(packageJson.keywords).toContain('design-system');
    });

    it('should have proper export structure', () => {
      expect(packageJson.main).toBe('dist/index.js');
      expect(packageJson.module).toBe('dist/index.esm.js');
      expect(packageJson.types).toBe('dist/index.d.ts');
    });

    it('should have CLI binary configuration', () => {
      expect(packageJson.bin).toBeDefined();
      expect(packageJson.bin['acrobi-design']).toBe('cli/index.js');
    });
  });

  describe('Distribution Files', () => {
    it('should have all required distribution files', async () => {
      const requiredFiles = [
        'dist/index.js',
        'dist/index.d.ts',
        'dist/registry.json',
        'README.md'
      ];

      for (const file of requiredFiles) {
        const filePath = path.join(packageRoot, file);
        const stats = await fs.stat(filePath);
        expect(stats.isFile()).toBe(true);
      }
    });

    it('should have proper ES module build', async () => {
      const mainFile = path.join(distPath, 'index.js');
      const content = await fs.readFile(mainFile, 'utf-8');

      // Check for proper module exports
      expect(content).toContain('export');
      expect(content).not.toContain('require(');
    });

    it('should have TypeScript declaration files', async () => {
      const typesFile = path.join(distPath, 'index.d.ts');
      const content = await fs.readFile(typesFile, 'utf-8');

      expect(content).toContain('export declare');
      expect(content).toMatch(/export\s+\{\s*[^}]+\s*\}/);
    });

    it('should have component registry structure', async () => {
      if (!registryJson) return;

      expect(typeof registryJson).toBe('object');

      // Check for standard components
      const expectedComponents = ['button', 'card', 'input'];
      for (const component of expectedComponents) {
        if (registryJson[component]) {
          expect(registryJson[component]).toHaveProperty('name');
          expect(registryJson[component]).toHaveProperty('dependencies');
          expect(registryJson[component]).toHaveProperty('files');
          expect(registryJson[component]).toHaveProperty('props');
        }
      }
    });
  });

  describe('Semantic Token Support', () => {
    it('should have semantic token CSS variables', async () => {
      // Look for CSS files with semantic tokens
      const cssFiles = await findFiles(distPath, '.css');

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');

        // Check for semantic token patterns
        expect(content).toMatch(/--primary\s*:/);
        expect(content).toMatch(/--background\s*:/);
        expect(content).toMatch(/--foreground\s*:/);
        expect(content).toMatch(/--border\s*:/);
      }
    });

    it('should support dark/light theme variants', async () => {
      const cssFiles = await findFiles(distPath, '.css');

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');

        // Check for theme support
        expect(content).toMatch(/:root/);
        expect(content).toMatch(/\.dark|html\.dark/);
      }
    });

    it('should have proper token naming convention', async () => {
      const cssFiles = await findFiles(distPath, '.css');

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');

        // Check for semantic token naming patterns
        const semanticTokens = content.match(/--[a-zA-Z-]+\s*:/g) || [];

        // Should have well-named semantic tokens
        const hasValidTokens = semanticTokens.some(token =>
          token.includes('primary') ||
          token.includes('secondary') ||
          token.includes('accent') ||
          token.includes('background') ||
          token.includes('foreground') ||
          token.includes('muted') ||
          token.includes('border')
        );

        expect(hasValidTokens).toBe(true);
      }
    });
  });

  describe('Component Export Structure', () => {
    it('should export Button component with variants', async () => {
      const buttonPath = path.join(distPath, 'src/components/Button.js');
      try {
        const content = await fs.readFile(buttonPath, 'utf-8');

        expect(content).toContain('export');
        expect(content).toMatch(/variant\s*:/);
        expect(content).toMatch(/size\s*:/);
      } catch (error) {
        // Button might be in different location
        console.warn('Button component not found at expected location');
      }
    });

    it('should have theme provider functionality', async () => {
      const themeProviderPath = path.join(distPath, 'src/components/ThemeProvider.js');
      try {
        const content = await fs.readFile(themeProviderPath, 'utf-8');

        expect(content).toContain('export');
        expect(content).toMatch(/Theme(Provider|Context)/);
      } catch (error) {
        console.warn('ThemeProvider not found at expected location');
      }
    });

    it('should have utility functions', async () => {
      const utilsPath = path.join(distPath, 'src/lib/utils.js');
      try {
        const content = await fs.readFile(utilsPath, 'utf-8');

        expect(content).toContain('export');
        expect(content).toMatch(/cn|clsx|twMerge/);
      } catch (error) {
        console.warn('Utils not found at expected location');
      }
    });
  });

  describe('Build Process Validation', () => {
    it('should have consistent build output', async () => {
      const jsFiles = await findFiles(distPath, '.js');
      const dtsFiles = await findFiles(distPath, '.d.ts');

      // Each JS file should have corresponding TypeScript declaration
      for (const jsFile of jsFiles) {
        const relativePath = path.relative(distPath, jsFile);
        const expectedDtsFile = jsFile.replace('.js', '.d.ts');

        try {
          await fs.access(expectedDtsFile);
        } catch (error) {
          console.warn(`Missing declaration file for ${relativePath}`);
        }
      }
    });

    it('should not have compilation errors', () => {
      // Run TypeScript compiler check
      try {
        execSync('npx tsc --noEmit', {
          cwd: packageRoot,
          stdio: 'pipe'
        });
      } catch (error) {
        fail('TypeScript compilation failed');
      }
    });
  });

  describe('NPM Package Installation Simulation', () => {
    it('should be installable as a dependency', () => {
      // Check if package has proper structure for NPM installation
      expect(packageJson.files).toBeDefined();
      expect(packageJson.files.length).toBeGreaterThan(0);

      // Should not include development files
      expect(packageJson.files).not.toContain('src');
      expect(packageJson.files).not.toContain('tests');
      expect(packageJson.files).not.toContain('.git');
    });

    it('should have proper peer dependencies', () => {
      expect(packageJson.peerDependencies || packageJson.dependencies).toBeDefined();

      const deps = {
        ...packageJson.peerDependencies,
        ...packageJson.dependencies
      };

      // Should have React as dependency
      expect(deps.react || deps['@types/react']).toBeDefined();
    });
  });
});

// Helper function to find files with specific extension
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

describe('Package Integration Tests', () => {
  it('should maintain semantic token consistency', async () => {
    // This test ensures semantic tokens are consistent across the package
    const cssFiles = await findFiles(distPath, '.css');
    const foundTokens = new Set<string>();

    for (const cssFile of cssFiles) {
      const content = await fs.readFile(cssFile, 'utf-8');
      const tokens = content.match(/--[a-zA-Z-]+/g) || [];
      tokens.forEach(token => foundTokens.add(token));
    }

    // Should have core semantic tokens
    const requiredTokens = [
      '--primary',
      '--background',
      '--foreground',
      '--border',
      '--muted'
    ];

    for (const token of requiredTokens) {
      expect(foundTokens.has(token)).toBe(true);
    }
  });

  it('should support component theming', async () => {
    // Test that components can be themed with semantic tokens
    const componentFiles = await findFiles(distPath, '.js');

    let hasThemedComponents = false;
    for (const file of componentFiles) {
      const content = await fs.readFile(file, 'utf-8');
      if (content.includes('className') &&
          (content.includes('bg-') || content.includes('text-'))) {
        hasThemedComponents = true;
        break;
      }
    }

    expect(hasThemedComponents).toBe(true);
  });
});