import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [{
        id: 0,
        todo: "Check Todo"
      }],
      idToDelete: ''
    }
    this.handleCallJsonServer = this.handleCallJsonServer.bind(this);
    this.handleAddTodosToState = this.handleAddTodosToState.bind(this);
    this.handlePostTodo = this.handlePostTodo.bind(this);
    this.handleDeleteIdChange = this.handleDeleteIdChange.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  componentWillMount(){
    this.handleCallJsonServer();
  }

  handleAddTodosToState(todoId){
    const {todos}=this.state;
    this.setState({
      todos:{
        ...todos,
        todoId
      }
    })
  }

  handleDeleteTodo(){
    fetch('http://localhost:3001/Todos/'+this.state.idToDelete,{
        method: "DELETE",
    })
    .then((response) => {
        return response.json();
    })
    .then((recurso) => {
      return recurso;
    })
    this.handleCallJsonServer();
  }

  handleDeleteIdChange(event){
    this.setState({idToDelete: event.target.value});
  }

  handlePostTodo(){
    var todonew = {
      todo: "asdasds",
    };

    var  data = JSON.stringify( todonew ) ;

    fetch('http://localhost:3001/Todos/',{
        method: "POST",
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: data
    })
    .then((response) => {
        return response.json();
    })
    .then((recurso) => {
      return recurso;
    })

    this.handleCallJsonServer();
  }

  handleCallJsonServer(){
    fetch('http://localhost:3001/Todos')
    .then((response) => {
        return response.json()
    })
    .then((recurso) => {
        this.setState({ todos: recurso })
    })
  }
  render() {

    if (this.state.todos.length > 0 ){
    var stationComponents = this.state.todos.map(function(station) {
               return <div className="station" key={station.id}>{station.todo}</div>;
           });
    }


    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          {stationComponents}
        </div>

            <button onClick={this.handleCallJsonServer}> call api </button>
            <button onClick={this.handlePostTodo}> post TODO </button>
            <input type="text" value={this.state.idToDelete} onChange={this.handleDeleteIdChange}  />
            <button onClick={this.handelDeleteTodo}> Delete TODO </button>


      </div>
    );
  }
}

export default App;
