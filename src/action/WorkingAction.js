'use strict'

import io from 'socket.io-client';
import AppDispatcher from '../dispatcher/AppDispatcher';

let WorkingAction = {
  load: function(){
    this.socket = io();
    this.socket.emit('load data');
    this.socket.on('all data', (data) => AppDispatcher.emit('data', data));
  },

  add: function(text){
    this.socket.emit('add', text);
  },

  remove: function(index){
    this.socket.emit('remove', index);
  }
};

export default WorkingAction;
