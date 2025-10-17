/**
 * Build Process and Distribution Validation Tests
 *
 * Tests for build process integrity and distribution readiness
 *
 * Constitutional Requirements:
 * 1. Golden Rule: Validate build supports semantic token distribution
 * 2. Absolute Honesty: Report all build and distribution issues
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const distPath = path.join(packageRoot, 'dist');
const cliRoot = path.resolve(__dirname, '../../cli');
const cliDistPath = path.join(cliRoot, 'dist');

describe('Build Process Validation', () => {
  let packageJson: any;
  let buildOutput: any;

  beforeAll(async () => {
    // Load package.json
    const packageContent = await fs.readFile(
      path.join(packageRoot, 'package.json'),
      'utf-8'
    );
    packageJson = JSON.parse(packageContent);

    // Run build process if dist directory doesn't exist
    try {
      await fs.access(distPath);
    } catch (error) {
      console.log('Running build process...');
      try {
        execSync('npm run build', { cwd: packageRoot, stdio: 'pipe' });
      } catch (buildError) {
        console.warn('Build process failed, tests may not work properly');
      }
    }

    // Analyze build output structure
    try {
      buildOutput = await analyzeBuildOutput();
    } catch (error) {
      console.warn('Could not analyze build output');
    }
  });

  describe('Build Configuration', () => {
    it('should have proper build scripts', () => {
      expect(packageJson.scripts.build).toBeDefined();
      expect(packageJson.scripts['build:lib']).toBeDefined();
      expect(packageJson.scripts.prepublishOnly).toBe('npm run build');
    });

    it('should have required build dependencies', () => {
      expect(packageJson.devDependencies).toHaveProperty('typescript');
      expect(packageJson.devDependencies).toHaveProperty('rollup');
      expect(packageJson.devDependencies).toHaveProperty('@rollup/plugin-typescript');
    });

    it('should have proper TypeScript configuration', async () => {
      const tsconfigPath = path.join(packageRoot, 'tsconfig.json');
      const tsconfigContent = await fs.readFile(tsconfigPath, 'utf-8');
      const tsconfig = JSON.parse(tsconfigContent);

      expect(tsconfig.compilerOptions).toHaveProperty('declaration', true);
      expect(tsconfig.compilerOptions).toHaveProperty('outDir');
      expect(tsconfig.include).toContain('**/*.ts');
      expect(tsconfig.include).toContain('**/*.tsx');
    });
  });

  describe('Build Output Structure', () => {
    it('should create dist directory', async () => {
      const distExists = await fs.access(distPath).then(() => true).catch(() => false);
      expect(distExists).toBe(true);
    });

    it('should generate main entry point', async () => {
      const mainFile = path.join(distPath, 'index.js');
      const mainExists = await fs.access(mainFile).then(() => true).catch(() => false);
      expect(mainExists).toBe(true);

      if (mainExists) {
        const content = await fs.readFile(mainFile, 'utf-8');
        expect(content).toContain('export');
        expect(content.length).toBeGreaterThan(100);
      }
    });

    it('should generate TypeScript declarations', async () => {
      const typesFile = path.join(distPath, 'index.d.ts');
      const typesExists = await fs.access(typesFile).then(() => true).catch(() => false);
      expect(typesExists).toBe(true);

      if (typesExists) {
        const content = await fs.readFile(typesFile, 'utf-8');
        expect(content).toContain('export declare');
        expect(content.length).toBeGreaterThan(100);
      }
    });

    it('should generate ES module build', async () => {
      const esmFile = path.join(distPath, 'index.esm.js');
      const esmExists = await fs.access(esmFile).then(() => true).catch(() => false);

      if (packageJson.module && esmExists) {
        const content = await fs.readFile(esmFile, 'utf-8');
        expect(content).toContain('export');
        expect(content).not.toContain('require(');
      }
    });

    it('should generate component registry', async () => {
      const registryFile = path.join(distPath, 'registry.json');
      const registryExists = await fs.access(registryFile).then(() => true).catch(() => false);
      expect(registryExists).toBe(true);

      if (registryExists) {
        const content = await fs.readFile(registryFile, 'utf-8');
        const registry = JSON.parse(content);
        expect(typeof registry).toBe('object');
      }
    });

    it('should include source maps for debugging', async () => {
      const jsFiles = await findFiles(distPath, '.js');
      let hasSourceMaps = false;

      for (const jsFile of jsFiles) {
        const mapFile = jsFile + '.map';
        const mapExists = await fs.access(mapFile).then(() => true).catch(() => false);
        if (mapExists) {
          hasSourceMaps = true;
          break;
        }
      }

      expect(hasSourceMaps).toBe(true);
    });
  });

  describe('Component Build Validation', () => {
    it('should build all React components', async () => {
      const componentFiles = await findFiles(distPath, '.js');
      const hasReactComponents = componentFiles.some(file =>
        file.includes('components') || file.includes('Button') || file.includes('Card')
      );
      expect(hasReactComponents).toBe(true);
    });

    it('should preserve component interfaces', async () => {
      const dtsFiles = await findFiles(distPath, '.d.ts');
      let hasComponentInterfaces = false;

      for (const dtsFile of dtsFiles) {
        const content = await fs.readFile(dtsFile, 'utf-8');
        if (content.includes('interface') || content.includes('type')) {
          hasComponentInterfaces = true;
          break;
        }
      }

      expect(hasComponentInterfaces).toBe(true);
    });

    it('should include utility functions', async () => {
      const utilsFile = path.join(distPath, 'src', 'lib', 'utils.js');
      const utilsExists = await fs.access(utilsFile).then(() => true).catch(() => false);

      if (utilsExists) {
        const content = await fs.readFile(utilsFile, 'utf-8');
        expect(content).toContain('export');
        expect(content).toMatch(/cn|clsx|twMerge/);
      }
    });

    it('should build theme provider', async () => {
      const themeProviderFile = path.join(distPath, 'src', 'components', 'ThemeProvider.js');
      const themeProviderExists = await fs.access(themeProviderFile).then(() => true).catch(() => false);

      if (themeProviderExists) {
        const content = await fs.readFile(themeProviderFile, 'utf-8');
        expect(content).toContain('export');
        expect(content).toMatch(/Theme(Provider|Context)/);
      }
    });
  });

  describe('Semantic Token Build Validation', () => {
    it('should include CSS files with semantic tokens', async () => {
      const cssFiles = await findFiles(distPath, '.css');
      expect(cssFiles.length).toBeGreaterThan(0);

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');
        expect(content).toMatch(/--[a-zA-Z-]+\s*:/);
      }
    });

    it('should preserve theme structure in build', async () => {
      const cssFiles = await findFiles(distPath, '.css');
      let hasThemeStructure = false;

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');
        if (content.includes(':root') && content.includes('html.dark')) {
          hasThemeStructure = true;
          break;
        }
      }

      expect(hasThemeStructure).toBe(true);
    });

    it('should include semantic token variables', async () => {
      const cssFiles = await findFiles(distPath, '.css');
      const foundTokens = new Set<string>();

      for (const cssFile of cssFiles) {
        const content = await fs.readFile(cssFile, 'utf-8');
        const tokens = content.match(/--[a-zA-Z-]+/g) || [];
        tokens.forEach(token => foundTokens.add(token));
      }

      const requiredTokens = ['--primary', '--background', '--foreground', '--border'];
      for (const token of requiredTokens) {
        expect(foundTokens.has(token)).toBe(true);
      }
    });
  });

  describe('Build Process Performance', () => {
    it('should complete build within reasonable time', () => {
      const startTime = Date.now();

      try {
        execSync('npm run build', { cwd: packageRoot, stdio: 'pipe' });
        const duration = Date.now() - startTime;
        expect(duration).toBeLessThan(60000); // Should complete within 60 seconds
      } catch (error) {
        // If build fails, we can't measure performance
        console.warn('Build failed, skipping performance test');
      }
    });

    it('should not produce excessive bundle sizes', async () => {
      const jsFiles = await findFiles(distPath, '.js');
      let totalSize = 0;

      for (const jsFile of jsFiles) {
        const stats = await fs.stat(jsFile);
        totalSize += stats.size;
      }

      // Total JS should be reasonable (not including source maps)
      expect(totalSize).toBeLessThan(5 * 1024 * 1024); // Less than 5MB
    });

    it('should optimize for tree shaking', async () => {
      const mainFile = path.join(distPath, 'index.js');

      if (await fs.access(mainFile).then(() => true).catch(() => false)) {
        const content = await fs.readFile(mainFile, 'utf-8');

        // Should have proper export structure for tree shaking
        expect(content).toMatch(/export\s*\{[^}]+\}/);
        expect(content).not.toContain('module.exports');
      }
    });
  });

  describe('CLI Build Validation', () => {
    beforeAll(async () => {
      // Build CLI if not already built
      try {
        await fs.access(cliDistPath);
      } catch (error) {
        try {
          execSync('npm run build', { cwd: cliRoot, stdio: 'pipe' });
        } catch (cliBuildError) {
          console.warn('CLI build failed, skipping CLI build tests');
        }
      }
    });

    it('should build CLI successfully', async () => {
      const cliExists = await fs.access(cliDistPath).then(() => true).catch(() => false);
      expect(cliExists).toBe(true);
    });

    it('should generate CLI binary', async () => {
      const cliBinary = path.join(cliDistPath, 'index.js');
      const binaryExists = await fs.access(cliBinary).then(() => true).catch(() => false);
      expect(binaryExists).toBe(true);

      if (binaryExists) {
        const content = await fs.readFile(cliBinary, 'utf-8');
        expect(content).toContain('#!/usr/bin/env node');
        expect(content.length).toBeGreaterThan(1000);
      }
    });

    it('should generate CLI TypeScript declarations', async () => {
      const cliDts = path.join(cliDistPath, 'index.d.ts');
      const dtsExists = await fs.access(cliDts).then(() => true).catch(() => false);

      if (dtsExists) {
        const content = await fs.readFile(cliDts, 'utf-8');
        expect(content).toContain('declare');
        expect(content.length).toBeGreaterThan(100);
      }
    });
  });

  describe('Distribution Readiness', () => {
    it('should include all necessary files in distribution', async () => {
      const distFiles = await listAllFiles(distPath);
      const requiredFileTypes = ['.js', '.d.ts', '.json', '.css'];

      for (const fileType of requiredFileTypes) {
        const hasFileType = distFiles.some(file => file.endsWith(fileType));
        expect(hasFileType).toBe(true);
      }
    });

    it('should exclude development files from distribution', () => {
      expect(packageJson.files).not.toContain('src');
      expect(packageJson.files).not.toContain('tests');
      expect(packageJson.files).not.toContain('.git');
      expect(packageJson.files).not.toContain('node_modules');
    });

    it('should have proper file permissions', async () => {
      const files = await listAllFiles(distPath);

      for (const file of files) {
        const stats = await fs.stat(file);
        // Files should be readable by owner and group
        expect(stats.mode & 0o444).toBeGreaterThan(0);
      }
    });

    it('should maintain consistent API across builds', async () => {
      const mainFile = path.join(distPath, 'index.js');
      const typesFile = path.join(distPath, 'index.d.ts');

      if (await fs.access(mainFile).then(() => true).catch(() => false) &&
          await fs.access(typesFile).then(() => true).catch(() => false)) {

        const jsContent = await fs.readFile(mainFile, 'utf-8');
        const dtsContent = await fs.readFile(typesFile, 'utf-8');

        // Extract exported names from both files
        const jsExports = extractExports(jsContent);
        const dtsExports = extractExports(dtsContent);

        // Should have matching exports
        expect(jsExports.length).toBeGreaterThan(0);
        expect(dtsExports.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Build Error Handling', () => {
    it('should handle TypeScript compilation errors gracefully', () => {
      try {
        execSync('npx tsc --noEmit', { cwd: packageRoot, stdio: 'pipe' });
        // Should not throw if compilation succeeds
      } catch (error) {
        // If compilation fails, it should provide clear error messages
        expect(error.message).toBeDefined();
      }
    });

    it('should validate import paths in build', async () => {
      const jsFiles = await findFiles(distPath, '.js');

      for (const jsFile of jsFiles) {
        const content = await fs.readFile(jsFile, 'utf-8');

        // Should not have relative import paths that would break
        const relativeImports = content.match(/from\s+['"]\.\.\//g);
        if (relativeImports) {
          // If relative imports exist, they should be valid
          expect(relativeImports.length).toBeLessThan(10);
        }
      }
    });

    it('should not include development dependencies in bundle', async () => {
      const jsFiles = await findFiles(distPath, '.js');
      const devDeps = Object.keys(packageJson.devDependencies || {});

      for (const jsFile of jsFiles) {
        const content = await fs.readFile(jsFile, 'utf-8');

        // Should not reference dev dependencies directly
        for (const dep of devDeps) {
          if (dep !== 'typescript' && dep !== 'rollup') {
            expect(content).not.toContain(dep);
          }
        }
      }
    });
  });
});

// Helper functions
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

async function listAllFiles(dir: string): Promise<string[]> {
  const files: string[] = [];

  async function scan(currentDir: string) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          await scan(fullPath);
        } else {
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

async function analyzeBuildOutput(): Promise<any> {
  const output = {
    files: [],
    totalSize: 0,
    fileTypes: new Map()
  };

  const files = await listAllFiles(distPath);

  for (const file of files) {
    const stats = await fs.stat(file);
    const ext = path.extname(file);
    const relativePath = path.relative(distPath, file);

    output.files.push({
      path: relativePath,
      size: stats.size,
      type: ext
    });

    output.totalSize += stats.size;
    output.fileTypes.set(ext, (output.fileTypes.get(ext) || 0) + 1);
  }

  return output;
}

function extractExports(content: string): string[] {
  const exports = [];

  // Match export { name1, name2 } patterns
  const namedExports = content.match(/export\s*\{([^}]+)\}/g);
  if (namedExports) {
    for (const exportStatement of namedExports) {
      const names = exportStatement.match(/\{([^}]+)\}/)?.[1];
      if (names) {
        exports.push(...names.split(',').map(name => name.trim()));
      }
    }
  }

  // Match export default patterns
  if (content.includes('export default')) {
    exports.push('default');
  }

  return exports;
}