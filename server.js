var path = require('path');
var fs = require('fs');
var express = require('express');
var jspt = require('jspt');

// Server part
var app = express();
app.use('/', express.static(path.join(__dirname, 'public')));

var server = app.listen(3000);
console.log('Server listening on port 3000');

// Socket.IO part
var io = require('socket.io')(server);

io.on('connection', function (socket) {

	socket.on('newCode', function (code, callback) {
    var fileName = path.resolve('./tmp/', socket.id+'.alg');
    setTimeout(function(){
      fs.writeFileSync(fileName, code);
      openFile(fileName, function (data) {
        try {
          var result = jspt.execute(data, createContext());
          return callback(null, result)
        } catch (e) {
          return callback(e.message, null);
        }
      });
    }, 700)
	});
});

function createContext() {
  return require('./lib/modules/std').module;
}


function openFile(file, fn) {
  fs.readFile(file, function(error, data) {
      if (error) {
          throw new Error(error);
      }

      fn(data.toString('utf8'));
  });
}
