import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TemperaturePanel from './TemperaturePanel/TemperaturePanel'
import AdminPanel from './AdminPanel/AdminPanel';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.redirect = this.redirect.bind(this);
    this.Login = this.Login.bind(this);

    this.state = {
      password: '',
      username: '',
      badlogin: false,
    };
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }
  
  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  
  render() {
    return (
      <Router>
        <Route path="/standard_table" exact component={this.table} />
        <Route path="/successful_add" exact component={this.success} />
        <Route path="/unsuccessful_add" exact component={this.unsuccess} />
        <Route path="/admin_table" exact component={this.admintable} />
        <Route path="/" exact component={this.defaultLogin} />
      </Router>
  );
  }

  success = () =>{
    return(<div><h1 className="announce">Sucessfull Add</h1>
    <button className="form-button-retrocede" onClick = {this.redirect} >Go Back</button></div>);
  }

  unsuccess= () =>{
    return(<div><h1 className="announce">Could Not Add</h1>
      <button className="form-button-retrocede" onClick = {this.redirect} >Go Back</button></div>);
  }

  redirect(){
    window.location.href = "/admin_table";
  }

  admintable = () =>{
    return(<AdminPanel />);
  }

  defaultLogin= () => {
    return(<div>{this.state.badlogin && <div className="form-invalid">Bad Login</div>}<div className="Login">
    Username: <input className = "form-input" type="text" name="Username" value={this.state.username} onChange={this.onUsernameChange}/><br />
    Password: <input className = "form-input" type="password" name="Password" value={this.state.password} onChange={this.onPasswordChange}/><br/>
    <button className = "form-button" onClick={this.Login}> Login </button>
    </div>
  </div>);
  }

  table(){
    return(<TemperaturePanel />);
  }

  Login(){
    fetch('/login', {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify({Username: this.state.username, Password: this.state.password})
      })
       .then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        if(data == null){
          this.setState({badlogin: true});
          return;
        }
        else
          if(data["Admin"] === 1){
          localStorage.setItem("admin", 1);
          localStorage.setItem("username", data["Username"]);
          window.location.href = "/admin_table";
          }
          else
          {
            localStorage.setItem("admin", 0);
            localStorage.setItem("username", data["Username"]);
            window.location.href = "/standard_table";
          }


      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
  }

  
}

export default App;
