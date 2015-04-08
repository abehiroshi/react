'use strict';

import React from 'react';
import Immutable from 'immutable';
import {workingAction} from './action/WorkingAction';
import {workingStore} from './store/WorkingStore';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '', record: Immutable.List() };
  }

  componentDidMount(){
console.log(1)
    workingAction.init();
console.log(2)
    workingStore.on('change', this.load.bind(this));
console.log(3)
  }

  load(store) {
console.log(4)
console.log(store)
console.log(store.getData())
    this.setState({record: store.getData()});
console.log(5)
  }

  handleChangeText(e) {
console.log(6)
    let value = e.target.value;
console.log(value)
    this.setState({text: value});
console.log(7)
  }

  add() {
    let text = React.findDOMNode(this.refs.text);
    workingAction.add(text.value);
    this.setState({text: ''});
    text.focus();
  }

  delete(index) {
    workingAction.delete(index);
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
