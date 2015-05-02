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

    let now = moment();
    let working = { worker: worker, text: text, timeFrom: now, timeTo: now };
    _.reduce(
      [
        {
          pattern: '[01]?[0-9]/[0-2]?[0-9]',
          convert: v => {
            var d = moment(v, 'MM/DD');
            working.timeFrom = working.timeFrom.set({ month: d.month(), date: d.date() });
            working.timeTo   = moment(working.timeFrom);
          }
        },
        {
          pattern: '[0-2]?[0-9]:[0-5]?[0-9]',
          convert: v => {
            var m = moment(v, 'HH:mm');
              working.timeFrom = working.timeFrom.set({ hour: m.hour(), minute: m.minute() });
              working.timeTo   = moment(working.timeFrom);
          }
        },
        {
          pattern: '[0-2]?[0-9]:[0-5]?[0-9]',
          convert: v => {
            var m = moment(v, 'HH:mm');
            working.timeTo = working.timeTo.set({ hour: m.hour(), minute: m.minute() });
            if (working.timeTo.diff(working.timeFrom) < 0){
              working.timeTo.add(1, 'days');
            }
          }
        },
        {
          pattern: '[0-9]+[.]?[0-9]*[hH]',
          convert: v => {
            working.workTime = v.substring(0, v.length-1);
          }
        },
        {
          key: 'remarks',
          pattern: '.*',
          convert: v => {
            working.remarks = v;
            if (!working.workTime){
              working.workTime = Math.round(working.timeTo.diff(working.timeFrom, 'hours', true) * 10) / 10;
            }
          }
        }
      ],
      (result, val)=>{
        let matched = result.match('(.*?)(' + val.pattern + ')(.*)');
        if (matched){
          console.log(val.key + ': ' + JSON.stringify(matched[2]));
          val.convert(matched[2]);
          result = matched[1] + matched[3];
        }
        return result;
      },
      text
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
