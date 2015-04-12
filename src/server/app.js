'use strict';

import Express from 'express';
import {Server} from 'http';
import mongoose from 'mongoose';
import config from '../config';
import socket from './socket';

var app = Express();
var http = Server(app);
socket(http);
mongoose.connect(config.mongo.uri);

export default function(dirname){
  app.get('/', (req, res)=>{
    console.log('request : ' + req.path);
    res.redirect('/view/');
  });

  app.use('/view', (req, res, next)=>{
    console.log('request : ' + req.path);
    res.sendFile(dirname + req.path);
  });

  http.listen(config.port, ()=>{
    console.log('listening on *:' + config.port);
  });
}
