'use strict';

import React from 'react';
import Immutable from 'immutable';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { record: Immutable.List.of() };
  }

  add() {
    let text = React.findDOMNode(this.refs.text);
    this.setState({
      record: this.state.record.push(text.value.trim())
    });
    text.value = '';
    text.focus();
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
          <input type="text" placeholder="" ref="text" />
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
