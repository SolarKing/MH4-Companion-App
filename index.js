var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.argv[2] || 3000;

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.send(socket.id);
  console.log(socket.id + " connected...");
  socket.on('chat message', function(data) {
    console.log("User " + data.senderid + " emitted a message...");
    io.emit('chat message', data);
  });
});

http.listen(port, function() {
  console.log('listening on *:%s', port);
});