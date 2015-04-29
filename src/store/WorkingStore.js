'use strict';

import {EventEmitter} from 'events';
import _ from 'lodash';
import assign from 'object-assign';
import AppDispatcher from '../dispatcher/AppDispatcher';

let allWorkingData = [];
let workingData = null;
let filterCondition = {};

let WorkingStore = assign({}, EventEmitter.prototype, {
  getData(){
    console.log('store getWorkingData');
    if (!workingData){
      workingData = _.sortBy(_.filter(allWorkingData, filterCondition), 'timeFrom');
    }
    return workingData;
  },

  load(data){
    console.log('store load working : ' + data.length);
    allWorkingData = data;
    workingData = null;
    this.emit('change working');
  },

  filter(condition){
    console.log('store filter working : ' + JSON.stringify(condition));
    filterCondition = condition;
    workingData = null;
    this.emit('change working');
  }
});

AppDispatcher.on('load working', WorkingStore.load.bind(WorkingStore));
AppDispatcher.on('filter working', WorkingStore.filter.bind(WorkingStore));

export default WorkingStore;
