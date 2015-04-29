'use strict';

import moment from 'moment';
import React from 'react/addons';
import WorkingAction from '../action/WorkingAction';
import WorkingStore from '../store/WorkingStore';
import {Table, Button, Input} from 'react-bootstrap';

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState(){
    return { worker: '', input: '', workings: [] };
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
    if (!this.state.input) return;
    console.log('component add : ' + this.state.input);
    this.action.add(this.state.worker, this.state.input);

    this.setState({input: ''});
    React.findDOMNode(this.refs.input).focus();
  },

  remove(id){
    console.log('component remove : ' + id)
    this.action.remove(id);
  },

  handleChangeWorker(e){
    console.log('component change worker : ' + this.state.worker);
    if (this.state.worker){
      this.action.filter({worker: this.state.worker});
    } else {
      this.action.filter({});
    }
  },

  handleKeyDownInput(e){
    if (e.key == 'Enter') this.add();
  },

  render: function(){
    return (
      <div>
        <div className="form-inline">
          <Input type="text" placeholder="Your name" ref="worker" valueLink={this.linkState("worker")}
            hasFeedback wrapperClassName="col-xs-4" onBlur={this.handleChangeWorker} />
          <Input type="text" placeholder="4/10 9:00 18:00 8h project" ref="input" valueLink={this.linkState("input")}
            hasFeedback wrapperClassName="col-xs-8" onKeyDown={this.handleKeyDownInput} />
          <Button onClick={this.add} bsStyle="primary" bsSize="small">追加</Button>
        </div>
        <Table striped condensed hover>
          <thead>
            <tr>
              <th className="col-xs-1">#</th>
              <th className="col-xs-1">名前</th>
              <th className="col-xs-2">日時</th>
              <th className="col-xs-1">時間</th>
              <th className="col-xs-3">摘要</th>
              <th className="col-xs-5">入力値</th>
            </tr>
          </thead>
          <tbody>
            {this.state.workings.map((value, i) => {
              return (
                <tr>
                  <td>{i+1}<Button onClick={()=>this.remove(value._id)} className="close">&times;</Button></td>
                  <td>{value.worker}</td>
                  <td>{moment(value.timeFrom).format('MM/DD')} {moment(value.timeFrom).format('HH:mm')} - {moment(value.timeTo).format('HH:mm')}</td>
                  <td>{value.workTime}</td>
                  <td>{value.remarks}</td>
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
