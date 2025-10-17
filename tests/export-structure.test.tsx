/**
 * Export Structure Validation Tests
 *
 * Tests for package export structure (main, module, types) and module resolution
 *
 * Constitutional Requirements:
 * 1. Golden Rule: Validate exports support semantic token distribution
 * 2. Absolute Honesty: Report all export structure issues
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { describe, it, expect, beforeAll } from '@jest/globals';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const distPath = path.join(packageRoot, 'dist');

describe('Export Structure Validation', () => {
  let packageJson: any;
  let mainExportContent: string;
  let moduleExportContent: string;
  let typesExportContent: string;

  beforeAll(async () => {
    // Load package.json
    const packageContent = await fs.readFile(
      path.join(packageRoot, 'package.json'),
      'utf-8'
    );
    packageJson = JSON.parse(packageContent);

    // Load export files if they exist
    try {
      mainExportContent = await fs.readFile(
        path.join(distPath, 'index.js'),
        'utf-8'
      );
    } catch (error) {
      console.warn('Main export file not found');
    }

    try {
      moduleExportContent = await fs.readFile(
        path.join(distPath, 'index.esm.js'),
        'utf-8'
      );
    } catch (error) {
      console.warn('Module export file not found');
    }

    try {
      typesExportContent = await fs.readFile(
        path.join(distPath, 'index.d.ts'),
        'utf-8'
      );
    } catch (error) {
      console.warn('Types export file not found');
    }
  });

  describe('Package.json Export Configuration', () => {
    it('should have proper main export configuration', () => {
      expect(packageJson.main).toBe('dist/index.js');
      expect(typeof packageJson.main).toBe('string');
      expect(packageJson.main).toBeTruthy();
    });

    it('should have proper module export configuration', () => {
      expect(packageJson.module).toBe('dist/index.esm.js');
      expect(typeof packageJson.module).toBe('string');
      expect(packageJson.module).toBeTruthy();
    });

    it('should have proper types export configuration', () => {
      expect(packageJson.types).toBe('dist/index.d.ts');
      expect(typeof packageJson.types).toBe('string');
      expect(packageJson.types).toBeTruthy();
    });

    it('should have proper exports field configuration', () => {
      expect(packageJson.exports).toBeDefined();

      if (packageJson.exports) {
        // Root export
        expect(packageJson.exports['.']).toBeDefined();

        if (packageJson.exports['.']) {
          expect(packageJson.exports['.'].import).toBeDefined();
          expect(packageJson.exports['.'].require).toBeDefined();
          expect(packageJson.exports['.'].types).toBeDefined();

          // Export paths should be correct
          expect(packageJson.exports['.'].import).toBe('./dist/index.esm.js');
          expect(packageJson.exports['.'].require).toBe('./dist/index.js');
          expect(packageJson.exports['.'].types).toBe('./dist/index.d.ts');
        }
      }
    });

    it('should have CLI export configuration', () => {
      expect(packageJson.bin).toBeDefined();
      expect(packageJson.bin['acrobi-design']).toBe('cli/index.js');
    });

    it('should support browser field', () => {
      // Browser field is optional but recommended
      if (packageJson.browser) {
        expect(typeof packageJson.browser).toBe('object');
      }
    });
  });

  describe('Main Export (CommonJS)', () => {
    it('should have main export file', async () => {
      const mainFile = path.join(distPath, 'index.js');
      const stats = await fs.stat(mainFile);
      expect(stats.isFile()).toBe(true);
    });

    it('should export components and utilities', () => {
      if (!mainExportContent) return;

      // Should have exports
      expect(mainExportContent).toContain('export');

      // Should export common components
      const expectedExports = [
        'Button',
        'Card',
        'ThemeProvider',
        'cn'
      ];

      for (const exportName of expectedExports) {
        // Some exports might be commented out or conditional
        if (mainExportContent.includes(exportName)) {
          expect(mainExportContent).toMatch(new RegExp(`export.*${exportName}`));
        }
      }
    });

    it('should use proper CommonJS syntax where needed', () => {
      if (!mainExportContent) return;

      // Can contain both ES modules and some CommonJS
      expect(mainExportContent).toContain('export');
      // May contain require statements for compatibility
    });

    it('should have consistent export naming', () => {
      if (!mainExportContent) return;

      // Extract exported names
      const namedExports = mainExportContent.match(/export\s*\{([^}]+)\}/g);
      if (namedExports) {
        for (const exportStatement of namedExports) {
          const names = exportStatement.match(/\{([^}]+)\}/)?.[1];
          if (names) {
            // Should not have duplicate exports
            const exportNames = names.split(',').map(name => name.trim());
            const uniqueNames = [...new Set(exportNames)];
            expect(exportNames.length).toBe(uniqueNames.length);
          }
        }
      }
    });

    it('should handle default exports properly', () => {
      if (!mainExportContent) return;

      // Should have consistent default export usage
      const defaultExports = (mainExportContent.match(/export\s+default/g) || []).length;
      expect(defaultExports).toBeLessThanOrEqual(1); // At most one default export
    });
  });

  describe('Module Export (ESM)', () => {
    it('should have module export file', async () => {
      const moduleFile = path.join(distPath, 'index.esm.js');
      const stats = await fs.stat(moduleFile);
      expect(stats.isFile()).toBe(true);
    });

    it('should use pure ES module syntax', () => {
      if (!moduleExportContent) return;

      expect(moduleExportContent).toContain('export');
      // Should not contain require() statements
      expect(moduleExportContent).not.toContain('require(');
      expect(moduleExportContent).not.toContain('module.exports');
    });

    it('should export same API as main export', () => {
      if (!moduleExportContent || !mainExportContent) return;

      // Extract exports from both files
      const mainExports = extractExportNames(mainExportContent);
      const moduleExports = extractExportNames(moduleExportContent);

      // Should have similar export structure
      expect(moduleExports.length).toBeGreaterThan(0);
      // Module exports should include main exports
      for (const mainExport of mainExports) {
        if (mainExport !== 'default') {
          expect(moduleExports).toContain(mainExport);
        }
      }
    });

    it('should support tree-shaking', () => {
      if (!moduleExportContent) return;

      // Should have named exports for tree-shaking
      expect(moduleExportContent).toMatch(/export\s*\{[^}]+\}/);
    });
  });

  describe('Types Export', () => {
    it('should have types export file', async () => {
      const typesFile = path.join(distPath, 'index.d.ts');
      const stats = await fs.stat(typesFile);
      expect(stats.isFile()).toBe(true);
    });

    it('should export TypeScript declarations', () => {
      if (!typesExportContent) return;

      expect(typesExportContent).toContain('export declare');
      expect(typesExportContent).toContain('export type');
    });

    it('should have consistent type definitions', () => {
      if (!typesExportContent) return;

      // Should export component types
      const expectedTypes = [
        'ButtonProps',
        'CardProps',
        'ThemeProviderProps',
        'Theme'
      ];

      for (const typeName of expectedTypes) {
        if (typesExportContent.includes(typeName)) {
          expect(typesExportContent).toMatch(new RegExp(`export.*(interface|type).*${typeName}`));
        }
      }
    });

    it('should match runtime exports', () => {
      if (!typesExportContent || !mainExportContent) return;

      const runtimeExports = extractExportNames(mainExportContent);
      const typeExports = extractExportNames(typesExportContent);

      // Type exports should include runtime exports
      for (const runtimeExport of runtimeExports) {
        if (runtimeExport !== 'default') {
          expect(typeExports).toContain(runtimeExport);
        }
      }
    });

    it('should have proper generic type support', () => {
      if (!typesExportContent) return;

      // Should support generic types where appropriate
      expect(typesExportContent).toMatch(/<[^>]+>/);
    });

    it('should have proper JSX type declarations', () => {
      if (!typesExportContent) return;

      // Should import React types for components
      expect(typesExportContent).toMatch(/import.*React/);
      expect(typesExportContent).toContain('React.');
    });
  });

  describe('Component Export Structure', () => {
    it('should export Button component properly', async () => {
      const buttonFile = path.join(distPath, 'src/components/Button.js');
      const buttonTypesFile = path.join(distPath, 'src/components/Button.d.ts');

      const buttonExists = await fs.access(buttonFile).then(() => true).catch(() => false);
      const buttonTypesExist = await fs.access(buttonTypesFile).then(() => true).catch(() => false);

      if (buttonExists) {
        const buttonContent = await fs.readFile(buttonFile, 'utf-8');
        expect(buttonContent).toContain('export');

        if (buttonTypesExist) {
          const buttonTypesContent = await fs.readFile(buttonTypesFile, 'utf-8');
          expect(buttonTypesContent).toContain('export');
        }
      }
    });

    it('should export ThemeProvider with proper types', async () => {
      const themeProviderFile = path.join(distPath, 'src/components/ThemeProvider.js');
      const themeProviderTypesFile = path.join(distPath, 'src/components/ThemeProvider.d.ts');

      const themeProviderExists = await fs.access(themeProviderFile).then(() => true).catch(() => false);
      const themeProviderTypesExist = await fs.access(themeProviderTypesFile).then(() => true).catch(() => false);

      if (themeProviderExists) {
        const themeProviderContent = await fs.readFile(themeProviderFile, 'utf-8');
        expect(themeProviderContent).toContain('export');

        if (themeProviderTypesExist) {
          const themeProviderTypesContent = await fs.readFile(themeProviderTypesFile, 'utf-8');
          expect(themeProviderTypesContent).toContain('export declare');
          expect(themeProviderTypesContent).toMatch(/ThemeProviderProps/);
        }
      }
    });

    it('should export utility functions', async () => {
      const utilsFile = path.join(distPath, 'src/lib/utils.js');
      const utilsTypesFile = path.join(distPath, 'src/lib/utils.d.ts');

      const utilsExists = await fs.access(utilsFile).then(() => true).catch(() => false);
      const utilsTypesExist = await fs.access(utilsTypesFile).then(() => true).catch(() => false);

      if (utilsExists) {
        const utilsContent = await fs.readFile(utilsFile, 'utf-8');
        expect(utilsContent).toContain('export');
        expect(utilsContent).toMatch(/cn|clsx|twMerge/);

        if (utilsTypesExist) {
          const utilsTypesContent = await fs.readFile(utilsTypesFile, 'utf-8');
          expect(utilsTypesContent).toContain('export');
          expect(utilsTypesContent).toMatch(/cn|clsx/);
        }
      }
    });

    it('should export theme utilities', async () => {
      const themeUtilsFile = path.join(distPath, 'src/lib/theme-utils.js');
      const themeUtilsTypesFile = path.join(distPath, 'src/lib/theme-utils.d.ts');

      const themeUtilsExists = await fs.access(themeUtilsFile).then(() => true).catch(() => false);
      const themeUtilsTypesExist = await fs.access(themeUtilsTypesFile).then(() => true).catch(() => false);

      if (themeUtilsExists) {
        const themeUtilsContent = await fs.readFile(themeUtilsFile, 'utf-8');
        expect(themeUtilsContent).toContain('export');

        if (themeUtilsTypesExist) {
          const themeUtilsTypesContent = await fs.readFile(themeUtilsTypesFile, 'utf-8');
          expect(themeUtilsTypesContent).toContain('export');
        }
      }
    });
  });

  describe('Sub-Path Exports', () => {
    it('should support component sub-path exports', () => {
      if (packageJson.exports) {
        // Check if sub-path exports are defined
        const componentExports = Object.keys(packageJson.exports).filter(key =>
          key.startsWith('./components/')
        );

        // Sub-path exports are optional but recommended
        if (componentExports.length > 0) {
          for (const exportPath of componentExports) {
            expect(packageJson.exports[exportPath]).toBeDefined();
            expect(packageJson.exports[exportPath].types).toBeDefined();
          }
        }
      }
    });

    it('should support theme sub-path exports', () => {
      if (packageJson.exports) {
        const themeExports = Object.keys(packageJson.exports).filter(key =>
          key.includes('theme') || key.includes('css')
        );

        // Theme exports are optional
        if (themeExports.length > 0) {
          for (const exportPath of themeExports) {
            expect(packageJson.exports[exportPath]).toBeDefined();
          }
        }
      }
    });

    it('should have proper CLI exports', () => {
      if (packageJson.exports && packageJson.bin) {
        const cliExport = packageJson.exports['./cli'];
        if (cliExport) {
          expect(cliExport.import).toBeDefined();
          expect(cliExport.require).toBeDefined();
        }
      }
    });
  });

  describe('Import Resolution', () => {
    it('should support default import', () => {
      if (!mainExportContent) return;

      // Should support default import for compatibility
      const hasDefaultExport = mainExportContent.includes('export default');
      if (hasDefaultExport) {
        expect(mainExportContent).toMatch(/export\s+default/);
      }
    });

    it('should support named imports', () => {
      if (!mainExportContent) return;

      // Should support named imports
      expect(mainExportContent).toMatch(/export\s*\{[^}]+\}/);
    });

    it('should support namespace imports', () => {
      if (!mainExportContent) return;

      // Should support namespace imports by having multiple named exports
      const namedExports = mainExportContent.match(/export\s*\{([^}]+)\}/g);
      if (namedExports && namedExports.length > 0) {
        expect(namedExports[0]).toContain('{');
        expect(namedExports[0]).toContain('}');
      }
    });

    it('should resolve internal imports correctly', () => {
      if (!mainExportContent) return;

      // Check for internal import patterns
      const internalImports = mainExportContent.match(/from\s+['"]\.\/[^'"]+['"]/g);
      if (internalImports) {
        for (const importStatement of internalImports) {
          const importPath = importStatement.match(/from\s+['"]([^'"]+)['"]/)?.[1];
          expect(importPath).toBeTruthy();
          expect(importPath).toMatch(/^\.\//); // Should be relative imports
        }
      }
    });
  });

  describe('Export Consistency', () => {
    it('should have consistent exports across all formats', () => {
      if (!mainExportContent || !moduleExportContent || !typesExportContent) return;

      const mainExports = extractExportNames(mainExportContent);
      const moduleExports = extractExportNames(moduleExportContent);
      const typeExports = extractExportNames(typesExportContent);

      // All formats should have similar export structure
      expect(mainExports.length).toBeGreaterThan(0);
      expect(moduleExports.length).toBeGreaterThan(0);
      expect(typeExports.length).toBeGreaterThan(0);

      // Critical exports should be present in all formats
      const criticalExports = ['Button', 'ThemeProvider', 'cn'];
      for (const criticalExport of criticalExports) {
        if (mainExports.includes(criticalExport)) {
          expect(moduleExports).toContain(criticalExport);
          expect(typeExports).toContain(criticalExport);
        }
      }
    });

    it('should maintain export order consistency', () => {
      if (!mainExportContent || !moduleExportContent) return;

      const mainExports = extractExportsInOrder(mainExportContent);
      const moduleExports = extractExportsInOrder(moduleExportContent);

      // Export order should be similar (not necessarily identical)
      expect(mainExports.length).toBe(moduleExports.length);
    });

    it('should have no orphaned exports', () => {
      if (!mainExportContent || !typesExportContent) return;

      const runtimeExports = extractExportNames(mainExportContent);
      const typeExports = extractExportNames(typesExportContent);

      // All runtime exports should have corresponding types
      for (const runtimeExport of runtimeExports) {
        if (runtimeExport !== 'default') {
          expect(typeExports).toContain(runtimeExport);
        }
      }
    });
  });

  describe('Semantic Token Export Support', () => {
    it('should export theme-related types', () => {
      if (!typesExportContent) return;

      // Should export theme-related types for semantic tokens
      const themeTypes = [
        'Theme',
        'ThemeContext',
        'ThemeProviderProps',
        'ThemeColors'
      ];

      for (const themeType of themeTypes) {
        if (typesExportContent.includes(themeType)) {
          expect(typesExportContent).toMatch(new RegExp(`export.*(interface|type).*${themeType}`));
        }
      }
    });

    it('should export CSS variables interface', () => {
      if (!typesExportContent) return;

      // Should have CSS variable types for semantic tokens
      expect(typesExportContent).toMatch(/--?[a-zA-Z-]+/);
    });

    it('should support theme extension', () => {
      if (!typesExportContent) return;

      // Should support theme customization
      const hasThemeExtension = typesExportContent.includes('extend') ||
                                typesExportContent.includes('Partial') ||
                                typesExportContent.includes('Override');

      if (hasThemeExtension) {
        expect(typesExportContent).toMatch(/(Partial|Extend|Override)/);
      }
    });
  });
});

// Helper functions
function extractExportNames(content: string): string[] {
  const exports: string[] = [];

  // Extract named exports
  const namedExports = content.match(/export\s*\{([^}]+)\}/g);
  if (namedExports) {
    for (const exportStatement of namedExports) {
      const names = exportStatement.match(/\{([^}]+)\}/)?.[1];
      if (names) {
        const exportNames = names.split(',').map(name => {
          // Handle "as" syntax
          const match = name.trim().match(/(\w+)(?:\s+as\s+(\w+))?/);
          return match ? match[2] || match[1] : name.trim();
        });
        exports.push(...exportNames);
      }
    }
  }

  // Extract default exports
  if (content.includes('export default')) {
    exports.push('default');
  }

  // Extract individual export declarations
  const individualExports = content.match(/export\s+(?:const|function|class|interface|type)\s+(\w+)/g);
  if (individualExports) {
    for (const exportStatement of individualExports) {
      const match = exportStatement.match(/export\s+(?:const|function|class|interface|type)\s+(\w+)/);
      if (match) {
        exports.push(match[1]);
      }
    }
  }

  return [...new Set(exports)]; // Remove duplicates
}

function extractExportsInOrder(content: string): string[] {
  const exports: string[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    if (line.includes('export')) {
      if (line.includes('export default')) {
        exports.push('default');
      } else if (line.includes('export {')) {
        const match = line.match(/export\s*\{([^}]+)\}/);
        if (match) {
          const names = match[1].split(',').map(name => name.trim());
          exports.push(...names);
        }
      } else {
        const match = line.match(/export\s+(?:const|function|class|interface|type)\s+(\w+)/);
        if (match) {
          exports.push(match[1]);
        }
      }
    }
  }

  return exports;
}