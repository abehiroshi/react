'use strict';

import React from 'react';
import Immutable from 'immutable';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { record: Immutable.List.of() };
  }

  load() {
    this.setState({
      text: '',
      record: Immutable.List.of('a','b','c')
    });
  }

  handleChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  add() {
    this.setState({
      record: this.state.record.push(this.state.text)
    });
    this.state.text = '';
    this.refs.text.getDOMNode().focus();
  }

  delete(index) {
    this.setState({
      record: this.state.record.delete(index)
    });
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
