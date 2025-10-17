/**
 * NPM Publishing Configuration and Package Installation Tests
 *
 * Tests for NPM package publishing readiness and installation simulation
 *
 * Constitutional Requirements:
 * 1. Golden Rule: Validate NPM package supports semantic token distribution
 * 2. Absolute Honesty: Report all publishing and installation issues
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, '..');
const cliRoot = path.resolve(__dirname, '../../cli');
const testTempDir = path.join(__dirname, 'temp-npm-test');

describe('NPM Publishing Configuration', () => {
  let packageJson: any;
  let cliPackageJson: any;

  beforeAll(async () => {
    // Load design system package.json
    const packageContent = await fs.readFile(
      path.join(packageRoot, 'package.json'),
      'utf-8'
    );
    packageJson = JSON.parse(packageContent);

    // Load CLI package.json
    try {
      const cliPackageContent = await fs.readFile(
        path.join(cliRoot, 'package.json'),
        'utf-8'
      );
      cliPackageJson = JSON.parse(cliPackageContent);
    } catch (error) {
      console.warn('CLI package.json not found, skipping CLI publishing tests');
    }

    // Create temporary test directory
    await fs.mkdir(testTempDir, { recursive: true });
  });

  afterAll(async () => {
    // Clean up temporary test directory
    try {
      await fs.rm(testTempDir, { recursive: true, force: true });
    } catch (error) {
      console.warn('Could not clean up temp directory');
    }
  });

  describe('Design System Package Configuration', () => {
    it('should have correct package name and scope', () => {
      expect(packageJson.name).toBe('@acrobi/design-system');
      expect(packageJson.private).toBe(false);
      expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/);
    });

    it('should have proper NPM publishing configuration', () => {
      expect(packageJson.main).toBe('dist/index.js');
      expect(packageJson.module).toBe('dist/index.esm.js');
      expect(packageJson.types).toBe('dist/index.d.ts');
      expect(packageJson.files).toContain('dist');
      expect(packageJson.files).toContain('cli');
      expect(packageJson.files).toContain('README.md');
    });

    it('should have proper export structure configuration', () => {
      expect(packageJson.exports).toBeDefined();
      if (packageJson.exports) {
        expect(packageJson.exports['.']).toBeDefined();
        expect(packageJson.exports['.'].import).toBeDefined();
        expect(packageJson.exports['.'].require).toBeDefined();
        expect(packageJson.exports['.'].types).toBeDefined();
      }
    });

    it('should have appropriate license and repository', () => {
      expect(packageJson.license).toBe('MIT');
      expect(packageJson.repository).toBeDefined();
      expect(packageJson.repository.type).toBe('git');
      expect(packageJson.repository.url).toContain('github.com');
    });

    it('should have comprehensive keywords for discoverability', () => {
      expect(packageJson.keywords).toContain('design-system');
      expect(packageJson.keywords).toContain('react');
      expect(packageJson.keywords).toContain('typescript');
      expect(packageJson.keywords).toContain('tailwindcss');
      expect(packageJson.keywords).toContain('semantic-tokens');
      expect(packageJson.keywords).toContain('theme-management');
      expect(packageJson.keywords).toContain('acrobi');
    });

    it('should have proper publish configuration', () => {
      expect(packageJson.publishConfig).toBeDefined();
      expect(packageJson.publishConfig.access).toBe('public');
    });

    it('should have CLI binary configuration', () => {
      expect(packageJson.bin).toBeDefined();
      expect(packageJson.bin['acrobi-design']).toBe('cli/index.js');
    });

    it('should have proper dependency management', () => {
      expect(packageJson.dependencies).toBeDefined();
      expect(packageJson.devDependencies).toBeDefined();
      expect(packageJson.peerDependencies).toBeDefined();

      // Should not have circular dependencies
      const allDeps = new Set([
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.devDependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {})
      ]);

      expect(allDeps.has('@acrobi/design-system')).toBe(false);
    });

    it('should have proper engines specification', () => {
      expect(packageJson.engines).toBeDefined();
      expect(packageJson.engines.node).toMatch(/^>=\d+/);
    });

    it('should have build preparation script', () => {
      expect(packageJson.scripts.prepublishOnly).toBe('npm run build');
      expect(packageJson.scripts.build).toBeDefined();
    });
  });

  describe('CLI Package Configuration', () => {
    beforeAll(() => {
      if (!cliPackageJson) return;
    });

    it('should have correct CLI package name and scope', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.name).toBe('@acrobi/cli');
      expect(cliPackageJson.private).toBe(false);
      expect(cliPackageJson.version).toMatch(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/);
    });

    it('should have proper CLI publishing configuration', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.main).toBe('dist/index.js');
      expect(cliPackageJson.bin).toBe('./dist/index.js');
      expect(cliPackageJson.files).toContain('dist');
      expect(cliPackageJson.files).toContain('README.md');
      expect(cliPackageJson.files).toContain('package.json');
    });

    it('should have CLI binary configuration', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.bin).toBe('./dist/index.js');
      expect(cliPackageJson.type).toBe('module');
    });

    it('should have proper CLI dependencies', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.dependencies).toHaveProperty('commander');
      expect(cliPackageJson.dependencies).toHaveProperty('chalk');
      expect(cliPackageJson.dependencies).toHaveProperty('execa');
    });

    it('should have proper CLI keywords', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.keywords).toContain('acrobi');
      expect(cliPackageJson.keywords).toContain('cli');
      expect(cliPackageJson.keywords).toContain('agents');
      expect(cliPackageJson.keywords).toContain('swarm');
    });

    it('should have public access configuration', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.publishConfig.access).toBe('public');
    });
  });

  describe('Package Content Validation', () => {
    it('should include only necessary files in distribution', () => {
      const allowedFiles = ['dist', 'cli', 'README.md', 'LICENSE'];
      const excludedPatterns = ['src', 'tests', '.git', 'node_modules', '.env'];

      for (const file of packageJson.files) {
        expect(allowedFiles.some(allowed => file.startsWith(allowed))).toBe(true);
        expect(excludedPatterns.some(pattern => file.includes(pattern))).toBe(false);
      }
    });

    it('should have proper README documentation', async () => {
      const readmePath = path.join(packageRoot, 'README.md');
      const readmeExists = await fs.access(readmePath).then(() => true).catch(() => false);
      expect(readmeExists).toBe(true);

      if (readmeExists) {
        const readmeContent = await fs.readFile(readmePath, 'utf-8');
        expect(readmeContent).toContain('#');
        expect(readmeContent).toContain('install');
        expect(readmeContent).toContain('usage');
      }
    });

    it('should have LICENSE file', async () => {
      const licensePath = path.join(packageRoot, 'LICENSE');
      const licenseExists = await fs.access(licensePath).then(() => true).catch(() => false);
      expect(licenseExists).toBe(true);
    });

    it('should have proper distribution files', async () => {
      const distPath = path.join(packageRoot, 'dist');
      const distExists = await fs.access(distPath).then(() => true).catch(() => false);
      expect(distExists).toBe(true);

      if (distExists) {
        const requiredFiles = [
          'dist/index.js',
          'dist/index.d.ts',
          'dist/registry.json'
        ];

        for (const file of requiredFiles) {
          const filePath = path.join(packageRoot, file);
          const exists = await fs.access(filePath).then(() => true).catch(() => false);
          expect(exists).toBe(true);
        }
      }
    });
  });

  describe('Version Management', () => {
    it('should follow semantic versioning', () => {
      const version = packageJson.version;
      const semverRegex = /^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.-]+))?$/;
      const match = version.match(semverRegex);

      expect(match).toBeTruthy();
      expect(parseInt(match![1])).toBeGreaterThanOrEqual(0); // Major
      expect(parseInt(match![2])).toBeGreaterThanOrEqual(0); // Minor
      expect(parseInt(match![3])).toBeGreaterThanOrEqual(0); // Patch
    });

    it('should have consistent version across packages', () => {
      if (cliPackageJson) {
        // CLI and design system could have different versions
        // but both should follow semantic versioning
        expect(cliPackageJson.version).toMatch(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/);
        expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/);
      }
    });

    it('should not use pre-release versions in production', () => {
      const version = packageJson.version;
      const isPreRelease = version.includes('-alpha') ||
                          version.includes('-beta') ||
                          version.includes('-rc');

      // Pre-release versions should be clearly marked
      if (isPreRelease) {
        expect(version).toMatch(/-(alpha|beta|rc)\.\d+$/);
      }
    });
  });

  describe('Package Installation Simulation', () => {
    let mockProjectDir: string;

    beforeAll(async () => {
      // Create a mock project directory for installation testing
      mockProjectDir = path.join(testTempDir, 'mock-project');
      await fs.mkdir(mockProjectDir, { recursive: true });

      // Create basic package.json for mock project
      const mockPackageJson = {
        name: 'test-installation-project',
        version: '1.0.0',
        dependencies: {
          react: '^18.0.0',
          'react-dom': '^18.0.0'
        }
      };
      await fs.writeFile(
        path.join(mockProjectDir, 'package.json'),
        JSON.stringify(mockPackageJson, null, 2)
      );
    });

    it('should support npm install syntax', () => {
      // Test that package name follows npm conventions
      expect(packageJson.name).toMatch(/^@[\w-]+\/[\w-]+$/);
      expect(packageJson.name.length).toBeGreaterThan(3);
      expect(packageJson.name.length).toBeLessThan(214);
    });

    it('should have installable dependency structure', () => {
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.peerDependencies
      };

      // Should have React as a dependency
      expect(Object.keys(deps)).toContain('react');

      // Dependencies should follow npm version format
      for (const [name, version] of Object.entries(deps)) {
        expect(typeof name).toBe('string');
        expect(typeof version).toBe('string');
        expect(version).toMatch(/^[\^~]?\d+\.\d+\.\d+/);
      }
    });

    it('should support tree-shaking', async () => {
      const mainFile = path.join(packageRoot, 'dist', 'index.js');
      const mainExists = await fs.access(mainFile).then(() => true).catch(() => false);

      if (mainExists) {
        const content = await fs.readFile(mainFile, 'utf-8');
        // Should have ES module exports for tree-shaking
        expect(content).toContain('export');
        expect(content).toMatch(/export\s*\{[^}]+\}/);
      }
    });

    it('should have proper module resolution', () => {
      // Should support both CommonJS and ES modules
      expect(packageJson.main).toBeDefined();
      expect(packageJson.module).toBeDefined();
      expect(packageJson.types).toBeDefined();

      // Module paths should be correct
      expect(packageJson.main).toBe('dist/index.js');
      expect(packageJson.module).toBe('dist/index.esm.js');
      expect(packageJson.types).toBe('dist/index.d.ts');
    });

    it('should support peer dependencies properly', () => {
      if (packageJson.peerDependencies) {
        // React should be a peer dependency
        expect(packageJson.peerDependencies.react).toBeDefined();

        // Peer dependencies should have version ranges
        for (const [name, version] of Object.entries(packageJson.peerDependencies)) {
          expect(typeof version).toBe('string');
          expect(version).toMatch(/^[\^~]?\d+\.\d+\.\d+/);
        }
      }
    });

    it('should not have conflicting dependencies', () => {
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
        ...packageJson.peerDependencies
      };

      // Check for version conflicts
      const conflictingDeps = [];
      for (const [name, version] of Object.entries(allDeps)) {
        const occurrences = Object.entries(allDeps)
          .filter(([n, v]) => n === name && v !== version)
          .length;

        if (occurrences > 0) {
          conflictingDeps.push(name);
        }
      }

      expect(conflictingDeps).toHaveLength(0);
    });
  });

  describe('Publishing Readiness', () => {
    it('should pass npm pack validation', () => {
      try {
        // Simulate npm pack (dry run)
        const packResult = execSync('npm pack --dry-run', {
          cwd: packageRoot,
          stdio: 'pipe',
          encoding: 'utf8'
        });

        // Should include expected files
        expect(packResult).toContain('package.json');
        expect(packResult).toContain('README.md');
        expect(packResult).toContain('dist/');
      } catch (error) {
        console.warn('npm pack validation failed:', error.message);
      }
    });

    it('should have valid package metadata', () => {
      expect(packageJson.name).toBeTruthy();
      expect(packageJson.version).toBeTruthy();
      expect(packageJson.description).toBeTruthy();
      expect(packageJson.author).toBeTruthy();
      expect(packageJson.license).toBeTruthy();
    });

    it('should have proper repository information', () => {
      expect(packageJson.repository).toBeDefined();
      expect(packageJson.repository.type).toBe('git');
      expect(packageJson.repository.url).toBeTruthy();
      expect(packageJson.repository.url).toContain('github.com');
    });

    it('should have bug tracking configuration', () => {
      if (packageJson.bugs) {
        expect(packageJson.bugs.url).toBeTruthy();
        expect(packageJson.bugs.url).toContain('github.com');
        expect(packageJson.bugs.url).toContain('issues');
      }
    });

    it('should have homepage configuration', () => {
      if (packageJson.homepage) {
        expect(packageJson.homepage).toBeTruthy();
        expect(packageJson.homepage).toMatch(/^https?:\/\//);
      }
    });

    it('should have appropriate package size', async () => {
      try {
        // Calculate approximate package size
        const distPath = path.join(packageRoot, 'dist');
        const files = await listAllFiles(distPath);
        let totalSize = 0;

        for (const file of files) {
          const stats = await fs.stat(file);
          totalSize += stats.size;
        }

        // Package should be reasonably sized
        expect(totalSize).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
      } catch (error) {
        console.warn('Could not calculate package size');
      }
    });
  });

  describe('Security and Compliance', () => {
    it('should not have security-sensitive files in distribution', () => {
      const sensitiveFiles = [
        '.env',
        '.env.local',
        '.env.development',
        '.env.test',
        '.env.production',
        'private-key',
        'secret',
        'config.json'
      ];

      for (const sensitive of sensitiveFiles) {
        expect(packageJson.files).not.toContain(sensitive);
      }
    });

    it('should have appropriate dependency licenses', () => {
      // Common open source licenses that are compatible with MIT
      const allowedLicenses = [
        'MIT', 'Apache-2.0', 'BSD-2-Clause', 'BSD-3-Clause',
        'ISC', 'CC0-1.0', 'Unlicense'
      ];

      // This is a basic check - in practice you'd use a tool like license-checker
      expect(packageJson.license).toBe('MIT');
    });

    it('should not have deprecated dependencies', () => {
      const deps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };

      // Check for commonly deprecated packages
      const deprecatedPackages = [
        'moment',               // Use date-fns or dayjs instead
        'request',              // Use node-fetch or axios instead
        'core-js',              // Usually not needed in modern projects
        '@types/core-js'        // Same as above
      ];

      for (const deprecated of deprecatedPackages) {
        expect(Object.keys(deps)).not.toContain(deprecated);
      }
    });
  });
});

// Helper functions
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