import React, { Component } from 'react';
import '../App.css';

class AdminPanel extends Component {

    constructor(props){
        super(props);

        this.state = {
            City: '',
            MinTemp: '',
            MaxTemp: '',
            Date: '',
            formErros: false,
          };

          this.onCityChange = this.onCityChange.bind(this);
          this.onMinTempChange = this.onMinTempChange.bind(this);
          this.onMaxTempChange = this.onMaxTempChange.bind(this);
          this.onDateChange = this.onDateChange.bind(this);
    }

    
  onCityChange(event) {
    this.setState({ City: event.target.value });
  }
  
  onMinTempChange(event) {
    this.setState({ MinTemp: event.target.value });
  }

  onMaxTempChange(event) {
    this.setState({ MaxTemp: event.target.value });
  }

  onDateChange(event) {
    this.setState({ Date: event.target.value });
  }

  viewTable(){
        window.location.href = "/standard_table";
  }

    render(){
        if(localStorage.username != undefined && localStorage.admin === "1"){
            return(
        <div className="Login">
            {this.state.formErrors && <div className="form-invalid">Input Fields Cannot Be NULL</div>}
            City: <input className = "form-input" type="text" name="City" value={this.state.City} onChange={this.onCityChange}/><br />
            Date: <input className = "form-input" type="date" id="start" name="trip-start" value={this.state.Date} onChange={this.onDateChange}/><br/>
            Minimum Temperature: <input className = "form-input" type="number" name="MinTemp" value={this.state.MinTemp} onChange={this.onMinTempChange}/><br />
            Maximum Temperature: <input className = "form-input" type="number" name="MaxTemp" value={this.state.MaxTemp} onChange={this.onMaxTempChange}/><br />
        <button className = "form-button" onClick={this.submitInfo}> Submit </button> <button className = "form-button" onClick={this.viewTable}> View Table </button>
                </div>
      );
        }
        else if (localStorage.admin === "0")
        return(<h1> Not Enough Permissions</h1>);
        else
        return(<h1>Please login first</h1>);
    }

    submitInfo = () =>{
        if(this.state.City === '' ||  this.state.Date === '' || this.state.MinTemp === '' || this.state.MaxTemp === ''){
            this.setState({formErrors: true});
            return;
        }
        fetch('/addWeatherDay', {
            method: 'POST',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             },
             body: JSON.stringify({City: this.state.City, Date: this.state.Date, MinTemp: this.state.MinTemp, MaxTemp: this.state.MaxTemp})
            })
             .then(response => {
              if(response.status === response.ok){
              window.location.href = "/successful_add";
              this.setState({formErrors: false});
              }
              else
              window.location.href = "/successful_add";
            });
    }
}

export default AdminPanel;