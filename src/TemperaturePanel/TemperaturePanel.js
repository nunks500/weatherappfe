import React, { Component } from 'react';
import '../App.css';

class TemperaturePanel extends Component {
  componentDidMount(){
    fetch("/getWeatherByDate", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
       .then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        this.setState({data:data});

      }).catch(err => {
        // Do something for an error here
        console.log("Error Reading data " + err);
      });
  }

  redirect(){
    window.location.href = "/admin_table";
  }

  render() {
    if (this.state === null) {
      // Render loading state ...
      return (
        <div>
          <h1> . . .</h1>
        </div>
      );  
    }
    else{
      if(localStorage.username != undefined){
      return(
        <React.Fragment>
      <h1 className="announce" >Data Temperature</h1>
      <h3 className="announce-li" >City | Date | Minimum Temperature | Maximum Temperature</h3>
      {this.state.data.map(function(x, index){
        const y = new Date(x.Date);
       return(<h3 className="announce-li" key={index}>{x.City} | {y.getDate()} - {y.getMonth() + 1} - {y.getFullYear()} | {x.MinTemp} º | {x.MaxTemp} º</h3>); 
      })}
      {localStorage.admin === "1" &&
      (<button onClick={this.redirect} className="form-button-retrocede">Add Data</button>)}
      </React.Fragment>
      );
    }
    else
      return(<h1> Please login first</h1>);
    } 
  }
}

export default TemperaturePanel;
