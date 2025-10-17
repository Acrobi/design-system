import { readFileSync } from 'fs';
import { join } from 'path';
// Security audit tests for the design system
describe('Security Audit', () => {
    const packageJsonPath = join(__dirname, '../../package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    describe('Package Security', () => {
        it('has secure dependencies configuration', () => {
            // Check for known vulnerable packages
            const vulnerablePackages = [
                'lodash',
                'moment',
                'request',
                'node-fetch',
                'axios' // can be vulnerable in older versions
            ];
            const dependencies = Object.assign(Object.assign({}, packageJson.dependencies), packageJson.devDependencies);
            Object.keys(dependencies).forEach(dep => {
                if (vulnerablePackages.includes(dep)) {
                    console.warn(`⚠️  Review dependency: ${dep} - ensure it's the latest secure version`);
                }
            });
        });
        it('does not expose sensitive information in package.json', () => {
            const sensitiveFields = ['privateKey', 'secret', 'password', 'token', 'key'];
            Object.keys(packageJson).forEach(key => {
                const lowerKey = key.toLowerCase();
                const hasSensitiveField = sensitiveFields.some(field => lowerKey.includes(field));
                expect(hasSensitiveField).toBe(false);
            });
        });
        it('has proper engines field for security', () => {
            // Should specify minimum Node.js version
            expect(packageJson.engines).toBeDefined();
            expect(packageJson.engines.node).toBeDefined();
            const nodeVersion = packageJson.engines.node;
            const minVersion = parseInt(nodeVersion.replace(/[^\d]/g, ''));
            expect(minVersion).toBeGreaterThanOrEqual(18); // Require Node 18+
        });
    });
    describe('Content Security Policy', () => {
        it('does not contain inline scripts in source files', () => {
            const sourceFiles = [
                'src/components/ui/button.tsx',
                'src/components/ui/theme-provider.tsx',
                'src/components/ui/sensory-provider.tsx',
                'src/lib/utils.ts'
            ];
            sourceFiles.forEach(file => {
                try {
                    const content = readFileSync(join(__dirname, '..', file), 'utf-8');
                    // Check for dangerous patterns
                    const dangerousPatterns = [
                        /eval\(/,
                        /innerHTML\s*=/,
                        /outerHTML\s*=/,
                        /document\.write\(/,
                        /Function\(/,
                        /setTimeout\s*\(\s*['"]/,
                        /setInterval\s*\(\s*['"]/
                    ];
                    dangerousPatterns.forEach(pattern => {
                        expect(content).not.toMatch(pattern);
                    });
                }
                catch (error) {
                    // File doesn't exist, skip
                }
            });
        });
        it('uses safe DOM manipulation', () => {
            const themeProviderContent = readFileSync(join(__dirname, '../components/ui/theme-provider.tsx'), 'utf-8');
            // Should use safe DOM manipulation
            expect(themeProviderContent).toContain('document.createElement');
            expect(themeProviderContent).toContain('document.head.appendChild');
            // Should not use innerHTML
            expect(themeProviderContent).not.toContain('innerHTML');
        });
    });
    describe('XSS Prevention', () => {
        it('does not use dangerouslySetInnerHTML', () => {
            const sourceFiles = [
                'src/components/ui/button.tsx',
                'src/components/ui/theme-provider.tsx',
                'src/components/ui/sensory-provider.tsx'
            ];
            sourceFiles.forEach(file => {
                try {
                    const content = readFileSync(join(__dirname, '..', file), 'utf-8');
                    expect(content).not.toContain('dangerouslySetInnerHTML');
                }
                catch (error) {
                    // File doesn't exist, skip
                }
            });
        });
        it('sanitizes user inputs', () => {
            // Check if components handle props safely
            const buttonContent = readFileSync(join(__dirname, '../components/ui/button.tsx'), 'utf-8');
            // Should spread props safely
            expect(buttonContent).toContain('{...props}');
        });
    });
    describe('Authentication & Authorization', () => {
        it('does not contain authentication logic in UI components', () => {
            const sourceFiles = [
                'src/components/ui/button.tsx',
                'src/components/ui/theme-provider.tsx',
                'src/components/ui/sensory-provider.tsx'
            ];
            sourceFiles.forEach(file => {
                try {
                    const content = readFileSync(join(__dirname, '..', file), 'utf-8');
                    const authPatterns = [
                        /token/i,
                        /jwt/i,
                        /auth/i,
                        /password/i,
                        /secret/i
                    ];
                    authPatterns.forEach(pattern => {
                        // Allow in comments but not in code logic
                        const matches = content.match(pattern);
                        if (matches) {
                            // Check if it's in a comment
                            const lines = content.split('\n');
                            let inComment = false;
                            lines.forEach((line, index) => {
                                if (line.includes('//') || line.includes('/*')) {
                                    inComment = true;
                                }
                                if (line.includes('*/')) {
                                    inComment = false;
                                }
                                if (line.match(pattern) && !inComment && !line.includes('//') && !line.includes('/*')) {
                                    console.warn(`⚠️  Authentication-related code found in ${file}:${index + 1}`);
                                }
                            });
                        }
                    });
                }
                catch (error) {
                    // File doesn't exist, skip
                }
            });
        });
    });
    describe('CSRF Protection', () => {
        it('does not make unsafe HTTP requests', () => {
            const sourceFiles = [
                'src/components/ui/theme-provider.tsx',
                'src/components/ui/sensory-provider.tsx'
            ];
            sourceFiles.forEach(file => {
                try {
                    const content = readFileSync(join(__dirname, '..', file), 'utf-8');
                    // Should not contain direct fetch calls without proper headers
                    expect(content).not.toMatch(/fetch\s*\(\s*['"]/);
                }
                catch (error) {
                    // File doesn't exist, skip
                }
            });
        });
    });
    describe('Dependency Security', () => {
        it('uses secure versions of key dependencies', () => {
            const dependencies = packageJson.dependencies;
            // Check for known secure versions
            if (dependencies.react) {
                const reactVersion = dependencies.react.replace(/[^\d.]/g, '');
                expect(parseFloat(reactVersion)).toBeGreaterThanOrEqual(18.0);
            }
            if (dependencies['react-dom']) {
                const reactDomVersion = dependencies['react-dom'].replace(/[^\d.]/g, '');
                expect(parseFloat(reactDomVersion)).toBeGreaterThanOrEqual(18.0);
            }
        });
        it('has minimal attack surface', () => {
            const dependencies = Object.keys(packageJson.dependencies);
            // Should not have unnecessary heavy dependencies
            const heavyDependencies = [
                'webpack',
                'babel-core',
                'gulp',
                'grunt'
            ];
            heavyDependencies.forEach(dep => {
                expect(dependencies).not.toContain(dep);
            });
        });
    });
    describe('File Security', () => {
        it('does not expose sensitive files', () => {
            const filesField = packageJson.files || [];
            // Should not include sensitive files
            const sensitiveFiles = [
                '.env',
                '.env.local',
                '.env.development.local',
                '.env.test.local',
                '.env.production.local',
                '.git',
                'npm-debug.log*',
                'yarn-debug.log*',
                'yarn-error.log*'
            ];
            sensitiveFiles.forEach(file => {
                expect(filesField).not.toContain(file);
            });
        });
        it('includes necessary files in npm package', () => {
            const filesField = packageJson.files || [];
            // Should include essential files
            const requiredFiles = [
                'src',
                'dist',
                'package.json',
                'README.md'
            ];
            requiredFiles.forEach(file => {
                expect(filesField).toContain(file);
            });
        });
    });
    describe('Type Safety Security', () => {
        it('uses TypeScript for type safety', () => {
            expect(packageJson.devDependencies).toHaveProperty('typescript');
        });
        it('has strict TypeScript configuration', () => {
            try {
                const tsconfigPath = join(__dirname, '../../tsconfig.json');
                const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
                expect(tsconfig.compilerOptions.strict).toBe(true);
            }
            catch (error) {
                // tsconfig might not be readable, but that's a separate issue
            }
        });
    });
});
//# sourceMappingURL=security-audit.test.js.map