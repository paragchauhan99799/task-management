import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import './App.scss';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.scss';

class AddTask extends Component {
  render(){
      let task = this.props.task;
      let onChange = this.props.onChange;
      let onSubmit = this.props.onSubmit;
      return(
        <div className="row col-md-12 col-xs-12">
          <div className="col-md-2 col-xs-hidden"></div>
          <div className="createTask col-md-8 col-xs-12">
            <div className="flex padding10">
              <small className="flex1">Name: </small>
              <div className="flex2">
                <input className="inputStyle flex1" value={ task.taskName } onChange={ (e) => { onChange('taskName',e.target.value)} } />
              </div>
            </div>
            <div className="flex padding10">
              <small className="flex1">Created: </small>
              <div className="flex2">
                <input className="inputStyle" value={ task.createdBy } onChange={ (e) => { onChange('createdBy',e.target.value)} } />
              </div>
            </div>
            <div className="flex padding10">
              <small className="flex1">Description: </small>
              <div className="flex2">
                <input className="inputStyle" value={ task.description } onChange={ (e) => { onChange('description',e.target.value)} } />
              </div>
            </div>
            <div className="flex padding10">
              <small className="flex1">Start Date: </small>
              <div className="flex2">
                <DatePicker
                  className="inputStyle"
                  placeholderText="DD-MM-YYYY"
                  selected={task.creationTimestamp || moment()}
                  dateFormat="DD/MM/YYYY"
                  onChange={(d) => { onChange("creationTimestamp", d) }}
                />
              </div>
            </div>
            <div className="flex padding10">
              <small className="flex1">End Date: </small>
              <div className="flex2">
                <DatePicker
                  className="inputStyle"
                  placeholderText="DD-MM-YYYY"
                  selected={task.endDate || moment()}
                  dateFormat="DD/MM/YYYY"
                  onChange={(d) => { onChange("endDate", d) }}
                />
              </div>
            </div>
            <div className="flex paddingTop10" style={{"justifyContent":"center"}}>
              <button onClick={() => { onSubmit(); }}  type="button" className="pt-button pt-minimal pt-icon-add pt-intent-success">
                Add
              </button>
            </div>
          </div>
          <div className="col-md-2 col-xs-hidden"></div>
        </div>);
  }  
}
export default AddTask;