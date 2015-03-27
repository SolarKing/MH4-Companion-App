var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = process.argv[2] || 80;

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

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);

app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");  