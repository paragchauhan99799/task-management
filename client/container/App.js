import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import './App.scss';
const asyncActions = require("../action/asyncActions");

class App extends Component{
  constructor(){
    super();
    this.state = {
      data: [],
      task: {
        taskName: '',
        createdBy: '',
        description: '',
      },
    }
  }

  onChange(key,value){
    var taskObject = this.state.task;
    const newData = _.assign({}, _.set(taskObject, key, value))
    this.setState({ task: newData });
    console.log('State onChange: ', this.state.task);
  }

  onSubmit(){
    asyncActions.createTask(this.state.task)
    .then((data) => {
      let stateData = this.state.data;
      console.log('on Submit reponse', data);
      stateData = [...stateData, ...data];
      this.setState({ data: stateData });
    })
    console.log('State onSubmit: ', this.state.task);
  }

  onDelete(taskId){
    asyncActions.deleteTask(taskId)
    .then((data) => {
      console.log('on Delete reponse', data);
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
        
        <div className="row col-md-12 col-xs-12">
          <div className="col-md-2 col-xs-hidden"></div>
          <div className="createTask col-md-8 col-xs-12">
            <small><center>Task Details</center></small>
            <div className="flex padding10">
              <small className="flex1">Name: </small>
              <div className="flex2">
                <input className="inputStyle flex1" value={ this.state.task.taskName } onChange={ (e) => { this.onChange('taskName',e.target.value)} } />
              </div>
            </div>
            <div className="flex padding10">
              <small className="flex1">Created: </small>
              <div className="flex2">
                <input className="inputStyle" value={ this.state.task.createdBy } onChange={ (e) => { this.onChange('createdBy',e.target.value)} } />
              </div>
            </div>
            <div className="flex padding10">
              <small className="flex1">Description: </small>
              <div className="flex2">
                <input className="inputStyle" value={ this.state.task.description } onChange={ (e) => { this.onChange('description',e.target.value)} } />
              </div>
            </div>
            <div className="flex paddingTop10" style={{"justifyContent":"center"}}>
              <button onClick={() => {this.onSubmit()}}  type="button" className="pt-button pt-minimal pt-icon-add pt-intent-success">
                Add
              </button>
            </div>
          </div>
          <div className="col-md-2 col-xs-hidden"></div>
        </div>
        
        <div className="row col-md-12 col-xs-12">
          <div className="col-md-2 col-xs-hidden"></div>
          <div className="col-md-8 col-xs-12 taskData">
            <div className="row">
          {
            this.state.data.map((data, index) => {
              return(
                <div className="taskObject col-md-4 col-xs-12" key={index}>
                  <div className="row" style={{"border":"1px solid black","margin":"0px","padding":"10px"}}>
                      <div className="flex"><small>Name: </small><h4>{data.taskName}</h4></div>
                      <div className="flex"><small>Created: </small><h4>{data.createdBy}</h4></div>
                      <div className="flex"><small>Description: </small><p>{data.description}</p></div>
                      <div><button onClick={() => {this.onDelete(data._id) } } >Remove</button></div>
                  </div>
                </div>
              )
            })
          }
            </div>
          </div>
          <div className="col-md-2 col-xs-hidden"></div>
        </div>
      </div>
    )
  }
}
export default App;