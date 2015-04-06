'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Immutable = require('immutable');

app.get('/*', function(req, res){
  res.sendFile(__dirname + '/public' + req.path);
});

var data = Immutable.List.of();

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('load data', function(){
    console.log('load data');
    socket.emit('all data', data);
  });
  socket.on('add', function(msg){
    console.log('add: ' + msg);
    if (msg){
      data = data.push(msg);
      socket.emit('all data', data);
      socket.broadcast.emit('all data', data);
    }
  });
  socket.on('delete', function(msg){
    console.log('delete: ' + msg);
    if (msg){
      data = data.delete(msg);
      socket.emit('all data', data);
      socket.broadcast.emit('all data', data);
    }
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
