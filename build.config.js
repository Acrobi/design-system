/**
 * Build Configuration for @acrobi/design-system
 *
 * This configuration provides build scripts and utilities for the design system.
 * It includes theme processing, asset optimization, and distribution preparation.
 */

const fs = require('fs');
const path = require('path');

class BuildConfig {
  constructor() {
    this.rootDir = process.cwd();
    this.srcDir = path.join(this.rootDir, 'src');
    this.distDir = path.join(this.rootDir, 'dist');
    this.publicDir = path.join(this.rootDir, 'public');
    this.themesDir = path.join(this.publicDir, 'themes');
  }

  /**
   * Clean the distribution directory
   */
  clean() {
    console.log('🧹 Cleaning dist directory...');
    if (fs.existsSync(this.distDir)) {
      fs.rmSync(this.distDir, { recursive: true, force: true });
    }
    fs.mkdirSync(this.distDir, { recursive: true });
    console.log('✅ Dist directory cleaned');
  }

  /**
   * Copy static assets to dist directory
   */
  copyAssets() {
    console.log('📦 Copying assets...');

    // Copy theme CSS files
    if (fs.existsSync(this.themesDir)) {
      const distThemesDir = path.join(this.distDir, 'themes');
      fs.mkdirSync(distThemesDir, { recursive: true });

      const themes = fs.readdirSync(this.themesDir);
      themes.forEach(theme => {
        const srcPath = path.join(this.themesDir, theme);
        const destPath = path.join(distThemesDir, theme);
        fs.copyFileSync(srcPath, destPath);
      });

      console.log(`✅ Copied ${themes.length} theme files`);
    }

    // Copy registry JSON
    const registryPath = path.join(this.rootDir, 'registry.json');
    if (fs.existsSync(registryPath)) {
      fs.copyFileSync(registryPath, path.join(this.distDir, 'registry.json'));
      console.log('✅ Copied registry.json');
    }

    // Copy public assets
    const publicAssets = ['file.svg', 'globe.svg', 'next.svg', 'vercel.svg', 'window.svg'];
    const distPublicDir = path.join(this.distDir, 'public');
    fs.mkdirSync(distPublicDir, { recursive: true });

    publicAssets.forEach(asset => {
      const srcPath = path.join(this.publicDir, asset);
      if (fs.existsSync(srcPath)) {
        const destPath = path.join(distPublicDir, asset);
        fs.copyFileSync(srcPath, destPath);
      }
    });

    console.log('✅ Copied public assets');
  }

  /**
   * Generate package manifest with build information
   */
  generateManifest() {
    console.log('📋 Generating build manifest...');

    const packageJson = JSON.parse(fs.readFileSync(path.join(this.rootDir, 'package.json'), 'utf8'));
    const manifest = {
      name: packageJson.name,
      version: packageJson.version,
      buildDate: new Date().toISOString(),
      buildType: 'distribution',
      files: this.getDirectoryFiles(this.distDir),
      themes: this.getAvailableThemes(),
      dependencies: Object.keys(packageJson.dependencies || {}),
      peerDependencies: Object.keys(packageJson.peerDependencies || {}),
    };

    fs.writeFileSync(
      path.join(this.distDir, 'build-manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    console.log('✅ Build manifest generated');
  }

  /**
   * Get all files in directory recursively
   */
  getDirectoryFiles(dir, relativePath = '') {
    const files = [];
    if (!fs.existsSync(dir)) return files;

    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const relativeItemPath = path.join(relativePath, item);

      if (fs.statSync(itemPath).isDirectory()) {
        files.push(...this.getDirectoryFiles(itemPath, relativeItemPath));
      } else {
        files.push(relativeItemPath);
      }
    });

    return files;
  }

  /**
   * Get available themes
   */
  getAvailableThemes() {
    if (!fs.existsSync(this.themesDir)) return [];

    return fs.readdirSync(this.themesDir)
      .filter(file => file.endsWith('.css'))
      .map(file => file.replace('.css', ''));
  }

  /**
   * Validate the build output
   */
  validate() {
    console.log('🔍 Validating build output...');

    const requiredFiles = [
      'index.js',
      'index.esm.js',
      'index.d.ts',
      'build-manifest.json'
    ];

    const missingFiles = requiredFiles.filter(file => {
      return !fs.existsSync(path.join(this.distDir, file));
    });

    if (missingFiles.length > 0) {
      console.error('❌ Build validation failed. Missing files:');
      missingFiles.forEach(file => console.error(`  - ${file}`));
      return false;
    }

    console.log('✅ Build validation passed');
    return true;
  }

  /**
   * Get build statistics
   */
  getStats() {
    if (!fs.existsSync(this.distDir)) {
      return null;
    }

    const stats = {
      totalFiles: 0,
      totalSize: 0,
      fileTypes: {},
      largestFiles: []
    };

    const files = this.getDirectoryFiles(this.distDir);

    files.forEach(file => {
      const filePath = path.join(this.distDir, file);
      const fileStat = fs.statSync(filePath);
      const ext = path.extname(file) || 'no-extension';

      stats.totalFiles++;
      stats.totalSize += fileStat.size;

      stats.fileTypes[ext] = (stats.fileTypes[ext] || 0) + 1;

      stats.largestFiles.push({
        file,
        size: fileStat.size,
        sizeKB: (fileStat.size / 1024).toFixed(2)
      });
    });

    // Sort largest files and keep top 10
    stats.largestFiles.sort((a, b) => b.size - a.size);
    stats.largestFiles = stats.largestFiles.slice(0, 10);
    stats.totalSizeKB = (stats.totalSize / 1024).toFixed(2);

    return stats;
  }

  /**
   * Print build summary
   */
  printSummary() {
    const stats = this.getStats();
    if (!stats) {
      console.log('❌ No build statistics available');
      return;
    }

    console.log('\n📊 Build Summary:');
    console.log(`  Total files: ${stats.totalFiles}`);
    console.log(`  Total size: ${stats.totalSizeKB} KB`);
    console.log(`  Themes: ${this.getAvailableThemes().length}`);

    console.log('\n📁 File types:');
    Object.entries(stats.fileTypes).forEach(([ext, count]) => {
      console.log(`  ${ext}: ${count}`);
    });

    console.log('\n📈 Largest files:');
    stats.largestFiles.slice(0, 5).forEach(({ file, sizeKB }) => {
      console.log(`  ${file}: ${sizeKB} KB`);
    });
  }
}

// Export for use in scripts
module.exports = BuildConfig;

// If run directly, execute build
if (require.main === module) {
  const build = new BuildConfig();

  console.log('🚀 Starting build process...\n');

  try {
    build.clean();
    build.copyAssets();
    build.generateManifest();

    if (build.validate()) {
      build.printSummary();
      console.log('\n✅ Build completed successfully!');
    } else {
      console.log('\n❌ Build failed validation!');
      process.exit(1);
    }
  } catch (error) {
    console.error('\n❌ Build error:', error.message);
    process.exit(1);
  }
}