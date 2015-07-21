var path = require('path');
var fs = require('fs');
var express = require('express');
var jspt = require('jspt');
var utils = require('./lib/utils')
var app = express();
app.use('/', express.static(path.join(__dirname, 'public')));

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Server listening on port 3000');
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {

	socket.on('newCode', function (code, callback) {
    var fileName = path.resolve('./tmp/', socket.id+'.alg');
    fs.writeFileSync(fileName, code);
    utils.openFile(fileName, function (data) {
      try {
        var result = jspt.execute(data, utils.createContext());
        return callback(null, result)
      } catch (e) {
        return callback(e.message, null);
      }
    });
	});
});
