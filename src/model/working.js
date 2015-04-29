'use strict';

import mongoose, {Schema} from 'mongoose';

var working = mongoose.model('Working', new Schema({
  worker: { type: String },
  timeFrom: { type: Date },
  timeTo: { type: Date },
  workTime: { type: Number },
  remarks: { type: String },
  text: { type: String, required: 'テキストを入力してください'}
}));

function emit(socket, event, doc){
  console.log(event);
  socket.emit(event, doc);
}

working.register = function(socket) {
  console.log('working register');
  working.schema.post('save', (doc) => emit(socket, 'working:save', doc));
  working.schema.post('remove', (doc) => emit(socket, 'working:remove', doc));
}

export default working;
