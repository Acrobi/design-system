/**
 * Comprehensive Dark Mode Test
 * This script validates the dark mode functionality by:
 * 1. Checking CSS variable definitions
 * 2. Testing theme toggle functionality
 * 3. Verifying color format consistency
 * 4. Checking for CSS errors
 */

console.log('🧪 COMPREHENSIVE DARK MODE TEST');
console.log('=====================================\n');

// Test results storage
const testResults = {
  cssVariablesDefined: false,
  themeToggleWorks: false,
  colorsChange: false,
  systemPreferenceWorks: false,
  noCSSErrors: false,
  colorFormatConsistent: false
};

// Helper function to test CSS variables
function testCSSVariables() {
  console.log('📋 Test 1: CSS Variables Definition');
  console.log('-----------------------------------');

  const requiredVariables = [
    '--background',
    '--foreground',
    '--card',
    '--primary',
    '--secondary',
    '--muted',
    '--accent',
    '--border',
    '--ring'
  ];

  let allDefined = true;
  const root = getComputedStyle(document.documentElement);

  requiredVariables.forEach(variable => {
    const value = root.getPropertyValue(variable).trim();
    const isDefined = value !== '';
    console.log(`  ${variable}: ${isDefined ? '✅' : '❌'} ${value || 'UNDEFINED'}`);
    if (!isDefined) allDefined = false;
  });

  testResults.cssVariablesDefined = allDefined;
  console.log(`\n  Result: ${allDefined ? '✅ ALL CSS VARIABLES DEFINED' : '❌ SOME VARIABLES MISSING'}\n`);

  return allDefined;
}

// Helper function to test theme toggle
function testThemeToggle() {
  console.log('🔄 Test 2: Theme Toggle Functionality');
  console.log('------------------------------------');

  const root = document.documentElement;
  const rootStyles = getComputedStyle(root);

  // Get initial state
  const initialBackground = rootStyles.getPropertyValue('--background').trim();
  const initialHasDark = root.classList.contains('dark');

  console.log(`  Initial state:`);
  console.log(`    Background: ${initialBackground}`);
  console.log(`    Has .dark class: ${initialHasDark}`);

  // Test adding dark class
  root.classList.add('dark');
  const darkBackground = rootStyles.getPropertyValue('--background').trim();
  const darkHasDark = root.classList.contains('dark');

  console.log(`  After adding .dark:`);
  console.log(`    Background: ${darkBackground}`);
  console.log(`    Has .dark class: ${darkHasDark}`);

  // Test removing dark class
  root.classList.remove('dark');
  const lightBackground = rootStyles.getPropertyValue('--background').trim();
  const lightHasDark = root.classList.contains('dark');

  console.log(`  After removing .dark:`);
  console.log(`    Background: ${lightBackground}`);
  console.log(`    Has .dark class: ${lightHasDark}`);

  // Check if colors actually changed
  const backgroundChanged = initialBackground !== darkBackground;
  const classTogglesCorrectly = initialHasDark !== darkHasDark && darkHasDark !== lightHasDark;

  console.log(`  Results:`);
  console.log(`    Background changes: ${backgroundChanged ? '✅' : '❌'}`);
  console.log(`    Class toggles correctly: ${classTogglesCorrectly ? '✅' : '❌'}`);

  testResults.themeToggleWorks = classTogglesCorrectly;
  testResults.colorsChange = backgroundChanged;

  console.log(`  Result: ${backgroundChanged && classTogglesCorrectly ? '✅ THEME TOGGLE WORKS' : '❌ THEME TOGGLE BROKEN'}\n`);

  return backgroundChanged && classTogglesCorrectly;
}

// Helper function to test system preference
function testSystemPreference() {
  console.log('🖥️ Test 3: System Preference Detection');
  console.log('-------------------------------------');

  try {
    // Test media query
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');

    console.log(`  System prefers dark: ${darkQuery.matches}`);
    console.log(`  System prefers light: ${lightQuery.matches}`);
    console.log(`  Media query support: ✅`);

    testResults.systemPreferenceWorks = true;
    console.log(`  Result: ✅ SYSTEM PREFERENCE DETECTION WORKS\n`);

    return true;
  } catch (error) {
    console.log(`  Error: ${error.message}`);
    console.log(`  Result: ❌ SYSTEM PREFERENCE DETECTION BROKEN\n`);
    return false;
  }
}

// Helper function to test color format consistency
function testColorFormatConsistency() {
  console.log('🎨 Test 4: Color Format Consistency');
  console.log('----------------------------------');

  const root = getComputedStyle(document.documentElement);
  const colorVariables = ['--background', '--foreground', '--primary', '--secondary'];

  let consistentFormat = true;
  let formatCounts = { hsl: 0, hex: 0, rgb: 0, other: 0 };

  colorVariables.forEach(variable => {
    const value = root.getPropertyValue(variable).trim();
    if (value) {
      if (value.includes('hsl')) formatCounts.hsl++;
      else if (value.startsWith('#')) formatCounts.hex++;
      else if (value.includes('rgb')) formatCounts.rgb++;
      else formatCounts.other++;
    }
  });

  console.log(`  Format distribution:`);
  console.log(`    HSL: ${formatCounts.hsl}`);
  console.log(`    Hex: ${formatCounts.hex}`);
  console.log(`    RGB: ${formatCounts.rgb}`);
  console.log(`    Other: ${formatCounts.other}`);

  // Check if we have a consistent format (preferably HSL for CSS variables)
  const total = formatCounts.hsl + formatCounts.hex + formatCounts.rgb;
  const hslDominant = formatCounts.hsl > total / 2;

  if (hslDominant) {
    console.log(`  Result: ✅ COLORS USE CONSISTENT HSL FORMAT\n`);
    consistentFormat = true;
  } else {
    console.log(`  Result: ❌ COLORS HAVE INCONSISTENT FORMAT\n`);
    consistentFormat = false;
  }

  testResults.colorFormatConsistent = consistentFormat;
  return consistentFormat;
}

// Helper function to test for CSS errors
function testCSSErrors() {
  console.log('🔍 Test 5: CSS Error Detection');
  console.log('-------------------------------');

  let cssErrors = [];

  // Override console.error temporarily
  const originalError = console.error;
  console.error = function(...args) {
    const message = args.join(' ');
    if (message.includes('CSS') || message.includes('--') || message.includes('color') || message.includes('theme')) {
      cssErrors.push(message);
    }
    originalError.apply(console, args);
  };

  // Force style recalculation to trigger any CSS errors
  const testElement = document.createElement('div');
  testElement.style.display = 'none';
  testElement.style.color = 'var(--nonexistent-variable)';
  document.body.appendChild(testElement);

  // Force reflow
  testElement.offsetHeight;

  // Clean up
  document.body.removeChild(testElement);
  console.error = originalError;

  console.log(`  CSS errors detected: ${cssErrors.length}`);
  if (cssErrors.length > 0) {
    cssErrors.forEach(error => console.log(`    - ${error}`));
  }

  testResults.noCSSErrors = cssErrors.length === 0;
  console.log(`  Result: ${cssErrors.length === 0 ? '✅ NO CSS ERRORS' : '❌ CSS ERRORS DETECTED'}\n`);

  return cssErrors.length === 0;
}

// Helper function to test the @theme block functionality
function testThemeBlock() {
  console.log('🎯 Test 6: Tailwind @theme Block');
  console.log('--------------------------------');

  try {
    // Check if @theme block is working by testing Tailwind utilities
    const testDiv = document.createElement('div');
    testDiv.className = 'bg-background text-foreground';
    testDiv.style.display = 'none';
    document.body.appendChild(testDiv);

    const computedStyle = getComputedStyle(testDiv);
    const backgroundColor = computedStyle.backgroundColor;
    const textColor = computedStyle.color;

    document.body.removeChild(testDiv);

    console.log(`  bg-background computed: ${backgroundColor}`);
    console.log(`  text-foreground computed: ${textColor}`);

    const themeBlockWorks = backgroundColor !== 'rgba(0, 0, 0, 0)' && textColor !== 'rgba(0, 0, 0, 0)';
    console.log(`  Result: ${themeBlockWorks ? '✅ @THEME BLOCK WORKS' : '❌ @THEME BLOCK BROKEN'}\n`);

    return themeBlockWorks;
  } catch (error) {
    console.log(`  Error: ${error.message}`);
    console.log(`  Result: ❌ @THEME BLOCK BROKEN\n`);
    return false;
  }
}

// Main test function
function runComprehensiveTests() {
  console.log('Starting comprehensive dark mode tests...\n');

  // Run all tests
  testCSSVariables();
  testThemeToggle();
  testSystemPreference();
  testColorFormatConsistency();
  testCSSErrors();
  const themeBlockWorks = testThemeBlock();

  // Summary
  console.log('📊 FINAL TEST RESULTS');
  console.log('=====================');

  const passedTests = Object.values(testResults).filter(Boolean).length + (themeBlockWorks ? 1 : 0);
  const totalTests = Object.keys(testResults).length + 1;
  const allPassed = passedTests === totalTests;

  console.log(`Tests passed: ${passedTests}/${totalTests}`);
  console.log(`Overall result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

  if (!allPassed) {
    console.log('\n🔧 RECOMMENDATIONS:');
    if (!testResults.cssVariablesDefined) {
      console.log('  - Check CSS file for missing variable definitions');
      console.log('  - Verify @theme block syntax is correct');
    }
    if (!testResults.themeToggleWorks) {
      console.log('  - Check ThemeProvider implementation');
      console.log('  - Verify DOM class manipulation');
    }
    if (!testResults.colorsChange) {
      console.log('  - Check dark mode CSS overrides');
      console.log('  - Verify color values are different between themes');
    }
    if (!testResults.colorFormatConsistent) {
      console.log('  - Ensure all colors use consistent HSL format');
      console.log('  - Check for mixed hex/HSL color formats');
    }
    if (!testResults.noCSSErrors) {
      console.log('  - Fix CSS syntax errors');
      console.log('  - Check for circular variable references');
    }
    if (!themeBlockWorks) {
      console.log('  - Verify @theme block syntax');
      console.log('  - Check Tailwind CSS v4 configuration');
    }
  }

  console.log('\n🎯 Dark mode testing complete!');

  return {
    allPassed,
    testResults: { ...testResults, themeBlockWorks },
    recommendations: allPassed ? [] : [
      'Check CSS file for circular references',
      'Verify @theme block syntax',
      'Ensure hex values are properly formatted',
      'Test in browser with developer tools'
    ]
  };
}

// Wait for page to load before running tests
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runComprehensiveTests);
} else {
  runComprehensiveTests();
}