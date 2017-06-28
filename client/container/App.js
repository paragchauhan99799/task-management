import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { Dialog } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
const asyncActions = require("../action/asyncActions");
import './App.scss';
import AddTask from './AddTask';


class App extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      task: {
        taskName: '',
        createdBy: '',
        description: '',
        endDate:'',
      },
      dialog: false,
    }
  }

  onChange(key,value){
    var taskObject = this.state.task;
    const newData = _.assign({}, _.set(taskObject, key, value))
    this.setState({ task: newData });
    console.log('State onChange: ', this.state.task);

  }

  onSubmit(){
    console.log('State Before Submt: ', this.state.task);
    asyncActions.createTask(this.state.task)
    .then((data) => {
      let stateData = this.state.data;
      console.log('on Submit reponse', data);
      stateData = _.concat(stateData, data);
      this.setState({ data: stateData });
      this.setState({ dialog: false });
    })
    console.log('State onSubmit: ', this.state.task);
  }

  onDelete(taskId){
    asyncActions.deleteTask(taskId)
    .then((data) => {
      console.log('on Delete reponse', data);
      let stateData = this.state.data;
      stateData = _.filter(stateData, x => x._id !== data._id);
      console.log('AfterDelete', stateData);
      this.setState({ data: stateData });
    })
    console.log('State onDelete: ', this.state.task);
  }

  componentWillMount(){
    asyncActions.getAllMedia()
    .then((data) => {
      this.setState({ data });
    })
  }

  render(){
    return(
      <div className="container">
        <div className="row col-md-12 col-xs-12">
          <div className="col-md-2 col-xs-hidden"></div>
          <div className="col-md-8 col-xs-12" style={{"padding":"20px"}}>
            <h2>Task Management</h2>
          </div>
          <div className="col-md-2 col-xs-hidden"></div>
        </div>

        <div className="row col-md-12 col-xs-12" style={{"padding":"0px 10px"}}>
          <div className="col-md-2 col-sm-hidden"></div>
          <div className="col-md-8 col-sm-12" style={{"borderTop":"1px solid rgba(0,0,0,.44)","borderBottom":"1px solid rgba(0,0,0,.44)", "padding":"10px 0px"}}>
            <a href="">Home</a>
            <a href="">Task</a>
            <button onClick={() => { this.setState({dialog: true})}} style={{"float":"right"}} type="button" className="pt-button pt-minimal pt-icon-add pt-intent-success">
              Add New Task
            </button>
          </div>
          <div className="col-md-2 col-sm-hidden"></div>
        </div>

        <div className="row col-md-12 col-xs-12">
          <div className="col-md-2 col-xs-hidden"></div>
          <div className="col-md-8 col-xs-12 taskData">
            <div className="row">
          {
            this.state.data.map((data, index) => {
              return(
                <div className="taskObject col-md-4 col-xs-12" key={index}>
                  <div className="row pt-card pt-elevation-3 flex flexcol" style={{"border":"1px solid black","margin":"0px","padding":"10px"}}>
                      <div className="flex">
                        <small><b>Name: </b></small>
                        <small>{data.taskName}</small>
                      </div>
                      <div className="flex paddingTop10">
                        <small><b>Created: </b></small>
                        <small>{data.createdBy}</small>
                      </div>
                      <div className="flex paddingTop10 flexcol">
                        <small><b>Description: </b></small>
                        <small>{data.description}</small>
                      </div>
                      <div className="flex paddingTop10 flexcol">
                        <small><b>Start Date: </b></small>
                        <small>{(data.creationTimestamp).toString()}</small>
                      </div>
                      <div className="flex paddingTop10 flexcol">
                        <small><b>End Date: </b></small>
                        <small>{(data.endDate).toString()}</small>
                      </div>
                      <div className="paddingTop10">
                         <button onClick={() => {this.onDelete(data._id)}}  type="button" className="pt-button pt-minimal pt-icon-delete pt-intent-danger">
                          Remove
                        </button>
                      </div>
                  </div>
                </div>
              )
            })
          }
            </div>
          </div>
          <div className="col-md-2 col-xs-hidden"></div>
        </div>

        <div className="row col-md-12 col-xs-12">
          <div className="col-md-2 col-xs-hidden"></div>
          <div className="col-md-8 col-xs-12" style={{"padding":"20px"}}>
            {
            <Dialog
              isOpen={this.state.dialog}
              onClose={() => { this.setState({dialog: false}) }}
              title="Task Details"
            >
              <AddTask task={this.state.task} onChange={this.onChange.bind(this)} onSubmit={this.onSubmit.bind(this)} />
            </Dialog>
            }
          </div>
          <div className="col-md-2 col-xs-hidden"></div>
        </div>
      </div>
    )
  }
}
export default App;
