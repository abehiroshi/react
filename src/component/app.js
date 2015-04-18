'use strict';

import React from 'react/addons';
import WorkingAction from '../action/WorkingAction';
import WorkingStore from '../store/WorkingStore';
import {Table, Button, Input} from 'react-bootstrap';

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
        <form className="form-inline">
          <Input type="text" label="worktime" placeholder="4/10 1h meeting" ref="text" valueLink={this.linkState("text")} />
          <Button onClick={this.add} bsStyle="primary" bsSize="small">追加</Button>
        </form>
        <Table striped condensed hover>
          <thead>
            <tr>
              <th className="col-xs-1">#</th><th>content</th>
            </tr>
          </thead>
          <tbody>
            {this.state.workings.map((value, i) => {
              return (
                <tr>
                  <td>
                    {i+1}
                    <Button onClick={()=>this.remove(value._id)} className="close">&times;</Button>
                  </td>
                  <td>{value.text}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
});
