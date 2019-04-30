'use strict';

module.exports = {
  transform: {
    '.*': require.resolve('./preprocessor.js'),
  },
  testRegex: '/__tests__/[^/]*(\\.js|\\.coffee|[^d]\\.ts)$',
  moduleFileExtensions: ['js', 'json', 'node', 'coffee', 'ts'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/src', '<rootDir>/scripts'],
  testPathIgnorePatterns: ['/node_modules/', '-test.internal.js$'],
  // Exclude the build output from transforms
  transformIgnorePatterns: ['/node_modules/', '<rootDir>/build/'],
  collectCoverageFrom: ['src/**/*.js'],
  testEnvironment: 'jsdom',
  timers: 'fake',
};
