'use strict';

import React from 'react/addons';
import Immutable from 'immutable';
import WorkingAction from '../action/WorkingAction';
import WorkingStore from '../store/WorkingStore';

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function(){
    return { text: '', record: Immutable.List() };
  },

  componentDidMount: function(){
    this.action = WorkingAction;
    this.store = WorkingStore;
    this.load = this.load.bind(this);

    this.store.on('change', this.load);
    this.action.load();
  },

  componentWillUnmount: function(){
    WokingStore.removeEventListener('change', this.load);
  },

  load: function(){
    console.log('component load');
    this.setState({record: this.store.getData()});
  },

  add: function(){
    this.action.add(this.state.text);
    this.clearText();
  },

  clearText: function(){
    this.setState({text: ''});
    React.findDOMNode(this.refs.text).focus();
  },

  remove: function(i){
    this.action.remove(i);
  },

  render: function(){
    return (
      <div>
        <div>
          <input type="text" placeholder="input.." ref="text" valueLink={this.linkState('text')} />
          <input type="button" value="add" onClick={this.add} />
        </div>
        <ol>
          {this.state.record.map((value, i) => {
            return (
              <li key={i}>
                <input key={i} type="button" value="delete" onClick={()=>this.remove(i)} />
                {value}
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
});
