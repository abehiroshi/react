'use strict';

import Immutable from 'immutable';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';

let storeData = Immutable.List();

let WorkingStore = assign({}, EventEmitter.prototype, {
  getData(){
    console.log('store getData');
    return storeData;
  },

  load(data){
    console.log('store load');
    storeData = Immutable.fromJS(data);
    this.emit('change');
  }
});

AppDispatcher.on('data', WorkingStore.load.bind(WorkingStore));

export default WorkingStore;
