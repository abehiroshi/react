'use strict';

import moment from 'moment';
import React from 'react/addons';
import WorkingAction from '../action/WorkingAction';
import WorkingStore from '../store/WorkingStore';
import {Table, Button, Input, Row, Col} from 'react-bootstrap';

export default React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState(){
    return { worker: '', input: '', workings: [] };
  },

  componentDidMount(){
    this.action = WorkingAction;
    this.store = WorkingStore;

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
        <div className="form-horizontal">
          <Input wrapperClassName="wrapper">
            <Row>
              <Col xs={3} lg={3}>
                <Input type="text" label="名前" placeholder="Your name"
                  hasFeedback labelClassName="col-xs-4 col-lg-4" wrapperClassName="col-xs-6 col-lg-6"
                  ref="worker" valueLink={this.linkState("worker")}
                  onBlur={this.handleChangeWorker} />
              </Col>
              <Col xs={6} lg={6}>
                <Input type="text" label="入力" placeholder="4/10 9:00 18:00 8h project" addonAfter="Enter"
                  hasFeedback labelClassName="col-xs-2 col-lg-2" wrapperClassName="col-xs-8 col-lg-8"
                  ref="input" valueLink={this.linkState("input")} onKeyDown={this.handleKeyDownInput} />
              </Col>
            </Row>
          </Input>
        </div>
        <Table striped condensed hover responsive>
          <thead>
            <tr>
              <th className="col-xs-2 col-lg-2">日時</th>
              <th className="col-xs-1 col-lg-1">時間</th>
              <th className="col-xs-3 col-lg-3">摘要</th>
              <th className="col-xs-2 col-lg-2">名前</th>
            </tr>
          </thead>
          <tbody>
            {this.state.workings.map((v, i) => {
              return (
                <tr key={v._id}>
                  <td>
                    <Button bsStyle="danger" bsSize="xsmall" style={{marginTop: '0px', marginBottom: '0px'}}
                      onClick={()=>this.remove(v._id)}>&times;</Button>
                    {moment(v.timeFrom).format('MM/DD HH:mm')} - {moment(v.timeTo).format('HH:mm')}
                  </td>
                  <td>{v.workTime} h</td>
                  <td>{v.remarks}</td>
                  <td>{v.worker}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
});
