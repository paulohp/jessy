/**
 * Javascript Portugol
 * https://github.com/moacir/jspt
 *
 * Copyright (c) 2013 Moacir de Oliveira
 * Licensed under the MIT license.
 */

(function () {

'use strict';

var std = require('jspt').createContext(),
    slice = Array.prototype.slice;

std.setFunction('imprima', function () {
    var args = slice.call(arguments, 0);

    if (args.length > 0) {
      return args.join('');
    }
});

exports.module = std;

})();
