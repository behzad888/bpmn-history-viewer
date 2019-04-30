'use strict';

module.exports = {
 
  // transform: {
  //   '.*': require.resolve('./preprocessor.js'),
  // },
  testRegex: '/__tests__/[^/]*(\\.js|\\.coffee|[^d]\\.ts)$',
  moduleFileExtensions: ['js', 'json', 'node', 'coffee', 'ts'],
  rootDir: process.cwd(),
  collectCoverageFrom: [
    'src/**/*.js',
  ],
  timers: 'fake',
};
