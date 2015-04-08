'use strict';

import {EventEmitter} from 'events';

export default class AppDispatcher extends EventEmitter {
  constructor(){
    super();

  }
}

export var appDispatcher = new AppDispatcher();
