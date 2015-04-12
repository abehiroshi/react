'use strict'

import io from 'socket.io-client';
import AppDispatcher from '../dispatcher/AppDispatcher';

let WorkingAction = {
  load(){
    console.log('action load');
    if (!this.socket){
      console.log('action socket init');
      this.socket = io();
      this.socket.on('working:find', (data) => AppDispatcher.emit('load working', data));
      this.socket.on('working:save', () => this.socket.emit('find working'));
      this.socket.on('working:remove', () => this.socket.emit('find working'));
      this.socket.on('error', console.log);
    }

    this.socket.emit('find working');
  },

  add(text){
    console.log('action add : ' + text);
    this.socket.emit('add working', {text: text});
  },

  remove(id){
    console.log('action remove : ' + id);
    this.socket.emit('remove working', id);
  }
};

export default WorkingAction;
