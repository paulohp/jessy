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
  console.log('New client connected!');

	socket.on('newCode', function (code, callback) {
    setTimeout(function(){
      try {
        var result = jspt.execute(code);
      } catch (e) {
        return callback(e.message, null);
      }
    }, 500);
	});
});
