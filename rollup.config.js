import { uglify } from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import license from 'rollup-plugin-license';
import replace from 'rollup-plugin-replace';

import pkg from './package.json';

const outputDir = 'dist';

const dist = [
  {
    input: 'Viewer',
    output: 'bpmn-viewer'
  },
];

const configs = dist.reduce(function (configs, distro) {
  const {
    input,
    output
  } = distro;

  return [
    ...configs,
    {
      input: `./src/${input}.js`,
      output: {
        name: 'BpmnJS',
        file: `${outputDir}/${output}.development.js`,
        format: 'umd'
      },
      plugins: pgl([
        banner(output)
      ])
    },
    {
      input: `./src/${input}.js`,
      output: {
        name: 'BpmnJS',
        file: `${outputDir}/${output}.production.min.js`,
        format: 'umd'
      },
      plugins: pgl([
        banner(output, true),
        uglify({
          output: {
            comments: /license|@preserve/
          }
        })
      ])
    }
  ];
}, []);

export default configs;


// helpers //////////////////////

function banner(bundleName, minified) {

  const banner = ` * Copyright (c) Behzad Abbasi and its affiliates.
  * ${bundleName} v${pkg.version}
  * This source code is licensed under the MIT license found in the
  * LICENSE file in the root directory of this source tree.
  * Date: ${today()} `;

  return license({
    banner
  });
}

function pgl(plugins = []) {
  return [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    nodeResolve({
      module: true,
      main: true,
      browser: true
    }),
    commonjs(),
    json(),
    ...plugins
  ];
}

function pad(n) {
  if (n < 10) {
    return '0' + n;
  } else {
    return n;
  }
}

function today() {
  const d = new Date();

  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate())
  ].join('-');
}

function processTemplate(str, args) {
  return str.replace(/\{\{\s*([^\s]+)\s*\}\}/g, function (_, n) {

    var replacement = args[n];

    if (!replacement) {
      throw new Error('unknown template {{ ' + n + '}}');
    }

    return replacement;
  });
}