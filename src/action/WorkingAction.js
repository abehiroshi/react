'use strict'

import io from 'socket.io-client';
import {appDispatcher} from '../dispatcher/AppDispatcher';

export default class WorkingAction {
  init() {
console.log(11)
    this.socket = io();
console.log(12)
    this.socket.emit('load data');
console.log(13)
    this.socket.on('all data', (data) => appDispatcher.emit('data', data));
console.log(14)
  }

  add(text) {
    this.socket.emit('add', text);
  }

  delete(index) {
    this.socket.emit('delete', index);
  }
}

export var workingAction = new WorkingAction();
