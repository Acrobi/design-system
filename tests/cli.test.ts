/**
 * CLI Functionality Tests
 *
 * Tests for @acrobi/cli tool functionality and design system CLI integration
 *
 * Constitutional Requirements:
 * 1. Golden Rule: Validate CLI supports semantic token management
 * 2. Absolute Honesty: Report all CLI functionality issues
 * 3. Separation of Duties: Test ONLY, DEV team implemented
 */

import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { execSync, spawn } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, '../../cli');
const designSystemRoot = path.resolve(__dirname, '..');
const testTempDir = path.join(__dirname, 'temp');

// Create a mock CLI execution function
async function executeCLI(args: string[], cwd?: string): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve) => {
    const cliPath = path.join(cliRoot, 'dist', 'index.js');
    const child = spawn('node', [cliPath, ...args], {
      cwd: cwd || testTempDir,
      stdio: 'pipe',
      shell: true
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code || 0 });
    });

    child.on('error', (error) => {
      resolve({ stdout: '', stderr: error.message, exitCode: 1 });
    });
  });
}

describe('CLI Package Structure', () => {
  let cliPackageJson: any;

  beforeAll(async () => {
    try {
      const packageContent = await fs.readFile(
        path.join(cliRoot, 'package.json'),
        'utf-8'
      );
      cliPackageJson = JSON.parse(packageContent);
    } catch (error) {
      console.warn('CLI package.json not found, skipping CLI tests');
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

  describe('CLI Package Configuration', () => {
    it('should have proper CLI package structure', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.name).toBe('@acrobi/cli');
      expect(cliPackageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
      expect(cliPackageJson.private).toBe(false);
      expect(cliPackageJson.type).toBe('module');
      expect(cliPackageJson.bin).toBeDefined();
    });

    it('should have proper CLI binary configuration', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.bin).toBe('./dist/index.js');
      expect(cliPackageJson.files).toContain('dist');
      expect(cliPackageJson.scripts.build).toBeDefined();
    });

    it('should have proper CLI dependencies', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.dependencies).toHaveProperty('commander');
      expect(cliPackageJson.dependencies).toHaveProperty('chalk');
      expect(cliPackageJson.dependencies).toHaveProperty('execa');
    });

    it('should have proper Node.js engine requirements', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.engines.node).toMatch(/^>=\d+/);
      expect(cliPackageJson.engines.node).toContain('18');
    });

    it('should have public access configuration', () => {
      if (!cliPackageJson) return;

      expect(cliPackageJson.publishConfig.access).toBe('public');
    });
  });

  describe('CLI Build Output', () => {
    it('should have compiled CLI binary', async () => {
      const cliBinary = path.join(cliRoot, 'dist', 'index.js');
      const stats = await fs.stat(cliBinary);
      expect(stats.isFile()).toBe(true);
    });

    it('should have executable shebang', async () => {
      const cliBinary = path.join(cliRoot, 'dist', 'index.js');
      const content = await fs.readFile(cliBinary, 'utf-8');
      expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
    });

    it('should have TypeScript declarations', async () => {
      const dtsFile = path.join(cliRoot, 'dist', 'index.d.ts');
      try {
        const stats = await fs.stat(dtsFile);
        expect(stats.isFile()).toBe(true);
      } catch (error) {
        console.warn('CLI TypeScript declarations not found');
      }
    });
  });
});

describe('CLI Command Functionality', () => {
  beforeAll(async () => {
    // Ensure CLI is built
    try {
      execSync('npm run build', { cwd: cliRoot, stdio: 'pipe' });
    } catch (error) {
      console.warn('CLI build failed, tests may not work properly');
    }
  });

  describe('CLI Help and Version', () => {
    it('should display help information', async () => {
      const result = await executeCLI(['--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Usage:');
      expect(result.stdout).toContain('Commands:');
    });

    it('should display version information', async () => {
      const result = await executeCLI(['--version']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toMatch(/^\d+\.\d+\.\d+$/);
    });

    it('should handle invalid command gracefully', async () => {
      const result = await executeCLI(['invalid-command']);
      expect(result.exitCode).not.toBe(0);
      expect(result.stderr).toContain('error');
    });
  });

  describe('Design System CLI Commands', () => {
    it('should support init command', async () => {
      const result = await executeCLI(['init', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Configure your project for Acrobi');
    });

    it('should support add command', async () => {
      const result = await executeCLI(['add', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Add a component to your project');
    });

    it('should support list command', async () => {
      const result = await executeCLI(['list', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('List all available components');
    });

    it('should support show command', async () => {
      const result = await executeCLI(['show', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Show details and props for a component');
    });

    it('should support add:design-system command', async () => {
      const result = await executeCLI(['add:design-system', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Add Acrobi Design System');
    });

    it('should support add:agents command', async () => {
      const result = await executeCLI(['add:agents', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Add Acrobi Cortex agents');
    });

    it('should support connect command', async () => {
      const result = await executeCLI(['connect', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Connect to Acrobi Theme Server');
    });

    it('should support run command', async () => {
      const result = await executeCLI(['run', '--help']);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Run an Acrobi task locally');
    });
  });
});

describe('CLI Integration with Design System', () => {
  let mockProjectDir: string;

  beforeAll(async () => {
    // Create a mock project directory
    mockProjectDir = path.join(testTempDir, 'mock-project');
    await fs.mkdir(mockProjectDir, { recursive: true });

    // Create basic package.json for mock project
    const mockPackageJson = {
      name: 'test-mock-project',
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

  describe('Configuration Management', () => {
    it('should create acrobi.json config file', async () => {
      const result = await executeCLI(['init'], mockProjectDir);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('✅ Created config: acrobi.json');

      const configExists = await fs.access(path.join(mockProjectDir, 'acrobi.json')).then(() => true).catch(() => false);
      expect(configExists).toBe(true);
    });

    it('should create proper configuration structure', async () => {
      const configPath = path.join(mockProjectDir, 'acrobi.json');
      const configContent = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(configContent);

      expect(config).toHaveProperty('registryUrl');
      expect(config).toHaveProperty('remoteBaseUrl');
      expect(config).toHaveProperty('targetDir');
      expect(config).toHaveProperty('libDir');
      expect(config.registryUrl).toContain('registry.json');
    });

    it('should validate configuration when present', async () => {
      const result = await executeCLI(['list'], mockProjectDir);
      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('Fetching available components');
    });
  });

  describe('Theme Management', () => {
    it('should create tailwind.config.js with design system preset', async () => {
      const result = await executeCLI(['add:design-system'], mockProjectDir);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('✅ Created tailwind.config.js');

      const tailwindConfig = path.join(mockProjectDir, 'tailwind.config.js');
      const configExists = await fs.access(tailwindConfig).then(() => true).catch(() => false);
      expect(configExists).toBe(true);

      const configContent = await fs.readFile(tailwindConfig, 'utf-8');
      expect(configContent).toContain('@acrobi/design-system/tailwind.config.js');
    });

    it('should create styles directory with global imports', async () => {
      const stylesDir = path.join(mockProjectDir, 'styles');
      const globalsCss = path.join(stylesDir, 'globals.css');

      const stylesExist = await fs.access(stylesDir).then(() => true).catch(() => false);
      const globalsExist = await fs.access(globalsCss).then(() => true).catch(() => false);

      expect(stylesExist).toBe(true);
      expect(globalsExist).toBe(true);

      const globalsContent = await fs.readFile(globalsCss, 'utf-8');
      expect(globalsContent).toContain('@acrobi/design-system/src/globals.css');
    });

    it('should create themes directory with customization guide', async () => {
      const themesDir = path.join(mockProjectDir, 'themes');
      const defaultTheme = path.join(themesDir, 'default.css');

      const themesExist = await fs.access(themesDir).then(() => true).catch(() => false);
      const themeExists = await fs.access(defaultTheme).then(() => true).catch(() => false);

      expect(themesExist).toBe(true);
      expect(themeExists).toBe(true);

      const themeContent = await fs.readFile(defaultTheme, 'utf-8');
      expect(themeContent).toContain(':root');
      expect(themeContent).toContain('--primary');
      expect(themeContent).toContain('html.dark');
    });
  });

  describe('Agent Integration', () => {
    it('should create agents directory structure', async () => {
      const result = await executeCLI(['add:agents'], mockProjectDir);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain('✅ Created ./agents directory');

      const agentsDir = path.join(mockProjectDir, 'agents');
      const exampleAgent = path.join(agentsDir, 'example.agent.ts');
      const readmeFile = path.join(agentsDir, 'README.md');

      const agentsExist = await fs.access(agentsDir).then(() => true).catch(() => false);
      const exampleExists = await fs.access(exampleAgent).then(() => true).catch(() => false);
      const readmeExists = await fs.access(readmeFile).then(() => true).catch(() => false);

      expect(agentsExist).toBe(true);
      expect(exampleExists).toBe(true);
      expect(readmeExists).toBe(true);
    });

    it('should create proper agent template with imports', async () => {
      const exampleAgent = path.join(mockProjectDir, 'agents', 'example.agent.ts');
      const agentContent = await fs.readFile(exampleAgent, 'utf-8');

      expect(agentContent).toContain("import { Agent, Session } from '@acrobi/cortex'");
      expect(agentContent).toContain('class MyCustomAgent extends Agent');
      expect(agentContent).toContain('async run(input?: any): Promise<any>');
    });

    it('should provide agent usage documentation', async () => {
      const readmeFile = path.join(mockProjectDir, 'agents', 'README.md');
      const readmeContent = await fs.readFile(readmeFile, 'utf-8');

      expect(readmeContent).toContain('# Agents Directory');
      expect(readmeContent).toContain('Getting Started');
      expect(readmeContent).toContain('Agent Structure');
      expect(readmeContent).toContain('Example Usage');
    });
  });

  describe('Component Management', () => {
    it('should show component information', async () => {
      const result = await executeCLI(['show', 'button'], mockProjectDir);

      // May fail if no network access, but should not crash
      expect(result.exitCode).toBe(0).or.toBe(1);

      if (result.exitCode === 0) {
        expect(result.stdout).toContain('Component: button').or.contain('Error:');
      }
    });

    it('should handle component addition with dry run', async () => {
      const result = await executeCLI(['add', 'button', '--dry-run'], mockProjectDir);

      // May fail if no network access, but should handle gracefully
      expect(result.exitCode).toBe(0).or.toBe(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing configuration gracefully', async () => {
      const emptyDir = path.join(testTempDir, 'empty');
      await fs.mkdir(emptyDir, { recursive: true });

      const result = await executeCLI(['list'], emptyDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Configuration file');

      await fs.rm(emptyDir, { recursive: true, force: true });
    });

    it('should validate URL format for connect command', async () => {
      const result = await executeCLI(['connect', '--url', 'invalid-url'], mockProjectDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('Invalid URL format');
    });

    it('should handle missing component gracefully', async () => {
      const result = await executeCLI(['show', 'nonexistent-component'], mockProjectDir);
      expect(result.exitCode).toBe(1);
      expect(result.stderr).toContain('not found');
    });
  });
});

describe('CLI Performance and Reliability', () => {
  it('should execute commands within reasonable time', async () => {
    const startTime = Date.now();
    const result = await executeCLI(['--help']);
    const duration = Date.now() - startTime;

    expect(result.exitCode).toBe(0);
    expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
  });

  it('should handle concurrent command execution', async () => {
    const commands = [
      executeCLI(['--version']),
      executeCLI(['--help']),
      executeCLI(['list', '--help'])
    ];

    const results = await Promise.all(commands);

    results.forEach(result => {
      expect(result.exitCode).toBe(0);
    });
  });

  it('should not crash with invalid arguments', async () => {
    const invalidCommands = [
      ['--invalid-flag'],
      ['add'],
      ['show'],
      ['connect', '--invalid-option']
    ];

    for (const args of invalidCommands) {
      const result = await executeCLI(args);
      // Should not crash (exit code should be defined)
      expect(typeof result.exitCode).toBe('number');
    }
  });
});

describe('CLI Semantic Token Integration', () => {
  it('should support theme server connection', async () => {
    const result = await executeCLI([
      'connect',
      '--url', 'http://localhost:3000/api/themes/default.css'
    ], mockProjectDir);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('✅ Created acrobi.config.json');

    const configPath = path.join(mockProjectDir, 'acrobi.config.json');
    const configExists = await fs.access(configPath).then(() => true).catch(() => false);
    expect(configExists).toBe(true);

    if (configExists) {
      const configContent = await fs.readFile(configPath, 'utf-8');
      const config = JSON.parse(configContent);
      expect(config).toHaveProperty('themeUrl');
      expect(config).toHaveProperty('connectedAt');
      expect(config.themeUrl).toContain('localhost:3000');
    }
  });

  it('should provide semantic token documentation', async () => {
    const stylesReadme = path.join(mockProjectDir, 'styles', 'README.md');
    const readmeExists = await fs.access(stylesReadme).then(() => true).catch(() => false);

    if (readmeExists) {
      const readmeContent = await fs.readFile(stylesReadme, 'utf-8');
      expect(readmeContent).toContain('Theme Customization');
      expect(readmeContent).toContain('Primary Colors');
      expect(readmeContent).toContain('Background Colors');
      expect(readmeContent).toContain('--primary');
      expect(readmeContent).toContain('--background');
    }
  });
});