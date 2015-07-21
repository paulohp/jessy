var fs = require('fs');

var createContext = function() {
  return require('./modules/std').module;
}

var openFile = function (file, fn) {
  fs.readFile(file, 'utf8', function(error, data) {
    if (error) {
      throw new Error(error);
    }
    fn(data);
  });
}

module.exports = {
  createContext: createContext,
  openFile: openFile
};