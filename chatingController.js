var express =require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


//Chat router
var chating = function(req, res){
res.sendFile('index.html', { root: path.join(__dirname, '../views') });
};

module.exports = {
  chating: chating
};
