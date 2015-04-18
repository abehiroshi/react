'use strict'

import io from 'socket.io-client';
import _ from 'lodash';
import moment from 'moment';
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

    let working = _.reduce(
      {
        date: '[01]?[0-9][-/][0-2]?[0-9]|[0-9]{4}',
        timeFrom: '[0-2]?[0-9]:[0-5]?[0-9]|[0-9]{4}',
        timeTo: '[0-2]?[0-9]:[0-5]?[0-9]|[0-9]{4}',
        workTime: '[0-9]+[.]?[0-9]*[hH]',
        remarks: '.*'
      },
      (result, pattern, key)=>{
        let matched = text.match('(.*?)(' + pattern + ')(.*)');
        if (matched){
          console.log(key + ': ' + JSON.stringify(matched));
          result[key] = matched[2];
          text = matched[1] + matched[3];
        }
        return result;
      },
      {text: text}
    );

    // 日付入力ない場合は当日
    if (!working.date) working.date = moment().format('M/D');

    this.socket.emit('add working', working);
  },

  remove(id){
    console.log('action remove : ' + id);
    this.socket.emit('remove working', id);
  }
};

export default WorkingAction;
