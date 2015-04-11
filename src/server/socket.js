'use strict';

var Immutable = require('immutable');

export default function Socket(io){
  var data = Immutable.List();

  io.on('connection', function(socket){
    console.log('connected');
    socket
      .on('load data', function(msg){
        console.log('load data');
        this.emit('all data', data);
      })
      .on('add', function(msg){
        console.log('add: ' + msg);
        if (msg){
          data = data.push(msg);
          this.emit('all data', data);
          this.broadcast.emit('all data', data);
        }
      })
      .on('remove', function(msg){
        console.log('remove: ' + msg);
        if (msg){
          data = data.remove(msg);
          this.emit('all data', data);
          this.broadcast.emit('all data', data);
        }
      })
      .on('log', function(msg){
        console.log('log: ' + msg);
      })
      .on('disconnect', function(msg){
        console.log('disconnected');
      });
  });
}
