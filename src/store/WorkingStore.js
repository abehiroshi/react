'use strict';

import {EventEmitter} from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';

let workingData = [];

let WorkingStore = assign({}, EventEmitter.prototype, {
  getData(){
    console.log('store getWorkingData');
    return workingData;
  },

  load(data){
    console.log('store load working : ' + data.length);
    workingData = data;
    this.emit('change working');
  }
});

AppDispatcher.on('load working', WorkingStore.load.bind(WorkingStore));

export default WorkingStore;
