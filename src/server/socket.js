'use strict';

import io from 'socket.io';
import working from '../model/working';

function handleError(err){
  if (!err) return false;
  console.log('socket error : ' + err);
  socket.emit('error', err);
  return true;
}

export default function(server){
  io(server).on('connection', function(socket){
    console.log('socket connection');
    working.register(socket);
    socket
      .on('find working', (msg)=>{
        console.log('socket load working');
        working.find(msg || {}, (err, items)=>{
          if (handleError(err)) return;
          socket.emit('working:find', items);
        });
      })
      .on('add working', (msg)=>{
        console.log('socket add working: ' + msg);
        new working(msg).save(handleError);
      })
      .on('remove working', (msg)=>{
        console.log('socket remove working : ' + msg);
        working.findById(msg, (err, doc)=>{
          if (handleError(err)) return;
          doc.remove(handleError);
        });
      })
      .on('disconnect', function(msg){
        console.log('socket disconnect');
      });
  });
}
