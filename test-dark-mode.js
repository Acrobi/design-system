// Dark Mode Test Script
// This script tests the dark mode functionality programmatically

console.log('🧪 Testing Dark Mode Functionality...\n');

// Test 1: Check if CSS variables are properly defined
console.log('📋 Test 1: Checking CSS Variables...');
const cssVariables = [
  '--background',
  '--foreground',
  '--card',
  '--primary',
  '--secondary',
  '--muted',
  '--accent',
  '--border'
];

cssVariables.forEach(variable => {
  const lightValue = getComputedStyle(document.documentElement).getPropertyValue(variable);
  console.log(`  ${variable}: ${lightValue || 'UNDEFINED'}`);
});

// Test 2: Test dark mode class application
console.log('\n🌙 Test 2: Testing Dark Mode Class Application...');

// Get initial state
const initialBackground = getComputedStyle(document.documentElement).getPropertyValue('--background');
console.log(`  Initial background: ${initialBackground}`);

// Apply dark class
document.documentElement.classList.add('dark');
const darkBackground = getComputedStyle(document.documentElement).getPropertyValue('--background');
console.log(`  Dark background: ${darkBackground}`);

// Remove dark class
document.documentElement.classList.remove('dark');
const lightBackground = getComputedStyle(document.documentElement).getPropertyValue('--background');
console.log(`  Light background: ${lightBackground}`);

// Test 3: Verify the changes are different
console.log('\n🔄 Test 3: Verifying Theme Changes...');
const backgroundChanged = initialBackground !== darkBackground;
console.log(`  Background changes between modes: ${backgroundChanged ? '✅ YES' : '❌ NO'}`);

if (backgroundChanged) {
  console.log('  ✅ Dark mode CSS variables are working!');
} else {
  console.log('  ❌ Dark mode CSS variables are NOT working');
  console.log('  This indicates the CSS file may have issues');
}

// Test 4: Check for color format consistency
console.log('\n🎨 Test 4: Checking Color Format Consistency...');
const hasColorMix = document.documentElement.style.cssText.includes('color-mix') ||
                   document.querySelector('style').textContent.includes('color-mix');
console.log(`  Uses color-mix() function: ${hasColorMix ? '✅ YES' : '❌ NO'}`);

// Test 5: Check console for errors
console.log('\n🔍 Test 5: Checking for CSS Errors...');
const originalError = console.error;
let cssErrors = [];
console.error = function(...args) {
  if (args[0] && typeof args[0] === 'string' &&
      (args[0].includes('CSS') || args[0].includes('--') || args[0].includes('color'))) {
    cssErrors.push(args.join(' '));
  }
  originalError.apply(console, args);
};

// Trigger a style recalculation to catch any CSS errors
document.documentElement.style.display = 'none';
document.documentElement.offsetHeight; // Force reflow
document.documentElement.style.display = '';

console.error = originalError;
console.log(`  CSS errors detected: ${cssErrors.length}`);
if (cssErrors.length > 0) {
  cssErrors.forEach(error => console.log(`    - ${error}`));
} else {
  console.log('  ✅ No CSS errors detected');
}

console.log('\n🎯 Dark Mode Test Complete!');

// Return results for programmatic access
return {
  cssVariablesDefined: cssVariables.every(v => getComputedStyle(document.documentElement).getPropertyValue(v)),
  darkModeWorks: backgroundChanged,
  cssErrors: cssErrors.length,
  recommendations: backgroundChanged ?
    ['Dark mode is working correctly!'] :
    ['Check CSS file for circular references', 'Verify @theme block syntax', 'Ensure hex values are properly formatted']
};