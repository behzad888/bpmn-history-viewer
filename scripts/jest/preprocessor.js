'use strict';

const path = require('path');

const babel = require('@babel/core');

// Use require.resolve to be resilient to file moves, npm updates, etc
const pathToBabel = path.join(
  require.resolve('@babel/core'),
  '..',
  'package.json'
);

const pathToBabelPluginAsyncToGenerator = require.resolve(
  'babel-plugin-transform-async-to-generator'
);
const pathToBabelrc = path.join(__dirname, '..', '..', '.babelrc');

const babelOptions = {
  plugins: [
    require.resolve('babel-plugin-transform-es2015-modules-commonjs'),
  ],
  retainLines: true,
};

module.exports = {
  process: function(src, filePath) {
    if (filePath.match(/\.ts$/) && !filePath.match(/\.d\.ts$/)) {
      return tsPreprocessor.compile(src, filePath);
    }
    if (!filePath.match(/\/third_party\//)) {
      // for test files, we also apply the async-await transform, but we want to
      // make sure we don't accidentally apply that transform to product code.
      const isTestFile = !!filePath.match(/\/__tests__\//);
      return babel.transform(
        src,
        Object.assign(
          {filename: path.relative(process.cwd(), filePath)},
          babelOptions,
          isTestFile
            ? {
                plugins: [pathToBabelPluginAsyncToGenerator].concat(
                  babelOptions.plugins
                ),
              }
            : {}
        )
      ).code;
    }
    return src;
  },
};
