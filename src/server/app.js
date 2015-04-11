'use strict';

import Express from 'express';
import {Server} from 'http';
import Socketio from 'socket.io';
import Immutable from 'immutable';
import socket from './socket';

var app = Express();
var http = Server(app);
var io = Socketio(http);

export default function App(dirname){
  app.get('/', (req, res)=>{
    res.redirect('/view/index.html');
  });

  app.use('/view', (req, res, next)=>{
    console.log(req.path);
    res.sendFile(dirname + req.path);
  });

  socket(io);

  http.listen(3000, ()=>{
    console.log('listening on *:3000');
  });
}
