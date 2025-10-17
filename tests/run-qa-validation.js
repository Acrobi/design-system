#!/usr/bin/env node

/**
 * QA Validation Runner
 *
 * Comprehensive test runner for @acrobi/design-system package validation
 * Executes all test suites and generates validation report
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting QA Validation for @acrobi/design-system\n');

// Test suites to run
const testSuites = [
  {
    name: 'Package Structure Validation',
    file: 'package.test.ts',
    description: 'Validates package metadata and distribution structure'
  },
  {
    name: 'CLI Functionality Tests',
    file: 'cli.test.ts',
    description: 'Tests CLI commands and integration'
  },
  {
    name: 'Build Process Validation',
    file: 'build.test.ts',
    description: 'Validates build process and output integrity'
  },
  {
    name: 'NPM Publishing Tests',
    file: 'npm-publishing.test.ts',
    description: 'Tests NPM publishing configuration and readiness'
  },
  {
    name: 'Export Structure Tests',
    file: 'export-structure.test.ts',
    description: 'Validates export structure (main, module, types)'
  },
  {
    name: 'Semantic Token Tests',
    file: 'semantic-tokens.test.ts',
    description: 'Tests semantic token support (Golden Rule)'
  }
];

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  suites: []
};

async function runTestSuite(suite) {
  console.log(`\n📋 Running: ${suite.name}`);
  console.log(`   ${suite.description}`);
  console.log('   '.padEnd(50, '-'));

  try {
    const startTime = Date.now();

    // Run Jest for the specific test file
    const output = execSync(
      `npx jest "${suite.file}" --verbose --no-coverage`,
      {
        encoding: 'utf8',
        stdio: 'pipe',
        cwd: path.dirname(__dirname)
      }
    );

    const duration = Date.now() - startTime;

    // Parse Jest output
    const lines = output.split('\n');
    const testResults = parseJestOutput(lines);

    results.suites.push({
      name: suite.name,
      status: 'PASSED',
      duration,
      ...testResults
    });

    results.total += testResults.total;
    results.passed += testResults.passed;

    console.log(`   ✅ PASSED (${testResults.passed}/${testResults.total} tests) - ${duration}ms`);

  } catch (error) {
    const duration = Date.now() - startTime;
    const output = error.stdout || error.message;
    const lines = output.split('\n');
    const testResults = parseJestOutput(lines);

    results.suites.push({
      name: suite.name,
      status: 'FAILED',
      duration,
      error: error.message,
      ...testResults
    });

    results.total += testResults.total;
    results.failed += testResults.failed;

    console.log(`   ❌ FAILED (${testResults.failed} failures) - ${duration}ms`);
    console.log(`   Error: ${error.message.split('\n')[0]}`);
  }
}

function parseJestOutput(lines) {
  const testResults = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0
  };

  for (const line of lines) {
    // Look for test summary
    if (line.includes('Tests:')) {
      const match = line.match(/Tests:\s+(\d+)\s+passed,\s+(\d+)\s+failed/);
      if (match) {
        testResults.passed = parseInt(match[1]);
        testResults.failed = parseInt(match[2]);
        testResults.total = testResults.passed + testResults.failed;
      }
    }

    // Look for skipped tests
    if (line.includes('skipped')) {
      const match = line.match(/(\d+)\s+skipped/);
      if (match) {
        testResults.skipped = parseInt(match[1]);
      }
    }
  }

  // If parsing failed, set default values
  if (testResults.total === 0) {
    testResults.total = 1;
    testResults.passed = testResults.failed === 0 ? 1 : 0;
    testResults.failed = testResults.failed === 0 ? 0 : 1;
  }

  return testResults;
}

function generateSummaryReport() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 QA VALIDATION SUMMARY REPORT');
  console.log('='.repeat(60));

  console.log(`\nTotal Tests: ${results.total}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⏭️  Skipped: ${results.skipped}`);

  const successRate = results.total > 0 ? ((results.passed / results.total) * 100).toFixed(1) : 0;
  console.log(`\nSuccess Rate: ${successRate}%`);

  console.log('\n📋 Test Suite Results:');
  console.log('-'.repeat(60));

  for (const suite of results.suites) {
    const status = suite.status === 'PASSED' ? '✅' : '❌';
    const duration = suite.duration ? `${suite.duration}ms` : 'N/A';
    console.log(`${status} ${suite.name.padEnd(30)} ${duration}`);
  }

  // Overall validation status
  const allPassed = results.suites.every(suite => suite.status === 'PASSED');

  console.log('\n' + '='.repeat(60));
  if (allPassed) {
    console.log('🎉 VALIDATION PASSED');
    console.log('✅ Package is ready for distribution');
    console.log('\n📖 View detailed report: tests/QA-VALIDATION-REPORT.md');
  } else {
    console.log('❌ VALIDATION FAILED');
    console.log('⚠️  Issues found - review test results');
    console.log('\n🔧 Fix issues before distribution');
  }
  console.log('='.repeat(60));

  return allPassed;
}

async function main() {
  try {
    // Check if Jest dependencies are available
    try {
      execSync('npx jest --version', { stdio: 'pipe' });
    } catch (error) {
      console.error('❌ Jest not found. Please install dependencies:');
      console.error('   npm install --save-dev jest ts-jest @types/jest');
      process.exit(1);
    }

    // Run all test suites
    for (const suite of testSuites) {
      await runTestSuite(suite);
    }

    // Generate summary report
    const isValid = generateSummaryReport();

    // Exit with appropriate code
    process.exit(isValid ? 0 : 1);

  } catch (error) {
    console.error('\n❌ QA Validation failed to run:');
    console.error(error.message);
    process.exit(1);
  }
}

// Run the validation
if (require.main === module) {
  main();
}

module.exports = { runTestSuite, generateSummaryReport };