'use strict';

import React from 'react';
import Immutable from 'immutable';
import io from 'socket.io-client';

export default class TodoList extends React.Component {
  socket: undefined;

  constructor(props) {
    super(props);
    this.state = { record: Immutable.List.of() };
    this.socket = io();
    this.socket.on('all data', (msg) => this.setState({record: Immutable.fromJS(msg)}));
  }

  load() {
    this.socket.emit('load data');
  }

  handleChangeText(e) {
    this.setState({text: e.target.value});
  }

  add() {
    this.socket.emit('add', this.state.text);
    this.setState({text: ''});
    this.refs.text.getDOMNode().focus();
  }

  delete(index) {
    this.socket.emit('delete', index);
  }

  render() {
    return (
      <div>
        <div>
          <input type="button" value="load data" onClick={this.load.bind(this)} />
        </div>
        <div>
          <input type="text" placeholder="input.." ref="text" value={this.state.text} onChange={this.handleChangeText.bind(this)} />
          <input type="button" value="add" onClick={this.add.bind(this)} />
        </div>
        <ol>
          {this.state.record.map((value, key) => {
            return (
              <li key={key}>
                <input key={key} type="button" value="delete" onClick={this.delete.bind(this, key)} />
                {value}
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}
