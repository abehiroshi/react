'use strict'

import io from 'socket.io-client';
import _ from 'lodash';
import moment from 'moment';
import AppDispatcher from '../dispatcher/AppDispatcher';

let WorkingAction = {
  init(){
    this.dispatcher = AppDispatcher;

    console.log('action socket init');
    this.socket = io();
    this.socket.on('working:find', (data) => this.dispatcher.emit('load working', data));
    this.socket.on('working:save', () => this.socket.emit('find working'));
    this.socket.on('working:remove', () => this.socket.emit('find working'));
    this.socket.on('error', console.log);

    this.init = null;
  },

  load(){
    console.log('action load');
    this.socket.emit('find working');
  },

  add(worker, text){
    console.log('action add : ' + text);

    let working = { worker: worker, text: text, timeFrom: moment(), timeTo: moment() };
    working = _.reduce(
      {
        timeFrom: {
          pattern: '(?:[01]?[0-9]/[0-2]?[0-9] )?[0-2]?[0-9]:[0-5]?[0-9]',
          convert: v => v.length > 5 ? moment(v, 'MM/DD HH:mm') : moment(v, 'HH:mm')
        },
        timeTo: {
          pattern: '[0-2]?[0-9]:[0-5]?[0-9]',
          convert: v => moment(v, 'HH:mm').set({year: working.timeFrom.year(), month: working.timeFrom.month(), date: working.timeFrom.date()})
        },
        workTime: {
          pattern: '[0-9]+[.]?[0-9]*[hH]',
          convert: v => v
        },
        remarks: {
          pattern: '.*',
          convert: v => v
        }
      },
      (result, attribute, key)=>{
        let matched = text.match('(.*?)(' + attribute.pattern + ')(.*)');
        if (matched){
          console.log(key + ': ' + JSON.stringify(matched[2]));
          result[key] = attribute.convert(matched[2]);
          text = matched[1] + matched[3];
        }
        return result;
      },
      working
    );

    // 日付入力ない場合は当日
    if (!working.date) working.date = moment().toDate();

    this.socket.emit('add working', working);
  },

  remove(id){
    console.log('action remove : ' + id);
    this.socket.emit('remove working', id);
  },

  filter(condition){
    this.dispatcher.emit('filter working', condition);
  }
};

WorkingAction.init();

export default WorkingAction;
