/**
 * * Copyright (c) Behzad Abbasi and its affiliates.
 * * bpmn-viewer v0.0.1
 * * This source code is licensed under the MIT license found in the
 * * LICENSE file in the root directory of this source tree.
 * * Date: 2019-04-30
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.BpmnJS = factory());
}(this, function () { 'use strict';

  var DEFAULT_OPTIONS = {
    width: '100%',
    height: '100%',
    position: 'relative'
  };

  function Viewer(options) {
    options = assign({}, DEFAULT_OPTIONS, options);
    alert('salam');
  }

  return Viewer;

}));
