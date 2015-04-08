'use strict';

import Immutable from 'immutable';
import {EventEmitter} from 'events';
import {appDispatcher} from '../dispatcher/AppDispatcher';

export default class WorkingStore extends EventEmitter {
  constructor(){
    super();
    this.data = Immutable.List();
    appDispatcher.on('data', this.load.bind(this));
  }

  getData(){
    return this.data;
  }

  load(data){
console.log(21)
console.log(data)
    this.data = Immutable.fromJS(data);
console.log(22)
    this.emit('change', this);
console.log(23)
  }
}

export var workingStore = new WorkingStore();
