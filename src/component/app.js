'use strict';

import React from 'react/addons';
import WorkingAction from '../action/WorkingAction';
import WorkingStore from '../store/WorkingStore';

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState(){
    return { text: '', workings: [] };
  },

  componentDidMount(){
    this.action = WorkingAction;
    this.store = WorkingStore;
    this.load = this.load.bind(this);

    this.store.on('change working', this.load);
    this.action.load();
  },

  componentWillUnmount(){
    this.store.removeEventListener('change working', this.load);
  },

  load(){
    console.log('component load');
    this.setState({workings: this.store.getData()});
  },

  add(){
    if (!this.state.text) return;
    console.log('component add : ' + this.state.text);
    this.action.add(this.state.text);
    this.clearText();
  },

  clearText(){
    this.setState({text: ''});
    React.findDOMNode(this.refs.text).focus();
  },

  remove(id){
    console.log('component remove : ' + id)
    this.action.remove(id);
  },

  render: function(){
    return (
      <div>
        <div>
          <input type="text" placeholder="input.." ref="text" valueLink={this.linkState('text')} />
          <input type="button" value="add" onClick={this.add} />
        </div>
        <div>working</div>
        <ol>
          {this.state.workings.map((value, i) => {
            return (
              <li key={value._id}>
                <input key={value._id} type="button" value="delete" onClick={()=>this.remove(value._id)} />
                {value.text}
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
});
