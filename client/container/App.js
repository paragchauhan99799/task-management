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
      <div style={{"padding":"10px"}}>
        <div>
          <div><h4>Task Name: </h4><input value={ this.state.task.taskName } onChange={ (e) => { this.onChange('taskName',e.target.value)} } /></div>
          <div><h4>Created by: </h4><input value={ this.state.task.createdBy } onChange={ (e) => { this.onChange('createdBy',e.target.value)} } /></div>
          <div><h4>Task Description: </h4><input value={ this.state.task.description } onChange={ (e) => { this.onChange('description',e.target.value)} } /></div>
          <div><button onClick={() => {this.onSubmit()}} >Add</button></div>
        </div>
        <div>
          {
            this.state.data.map((data, index) => {
              return(
                <div key={index}>
                  <h3>{data.taskName}</h3>
                  <h4>{data.taskName}</h4>
                  <p>{data.description}</p>
                  <button onClick={() => {this.onDelete(data._id) } } >Remove</button>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default App;