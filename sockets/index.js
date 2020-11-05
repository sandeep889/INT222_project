var express =require('express');
var app = express();
var socketIO = require('socket.io');
var http = require('http').Server(app);

module.exports = function (http){

  var io = socketIO(http);
io.on('connection', function(socket){
  console.log('Access to user chat room')
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
};
