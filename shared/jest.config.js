module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@acrobi/design-tokens$': '<rootDir>/../tokens/src',
    '^@acrobi/design-primitives$': '<rootDir>/../primitives/src',
    '^@acrobi/design-composites$': '<rootDir>/../composites/src',
    '^@acrobi/design-icons$': '<rootDir>/../icons/src',
    '^@acrobi/design-sensory$': '<rootDir>/../sensory/src',
    '\\.(css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/../../shared/jest.setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
  ],
  coverageThresholds: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
