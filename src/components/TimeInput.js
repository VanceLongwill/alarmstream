import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export class TimeInput extends Component {
  state = {
    time: this.props.moment,
  }

  handleHoursChange = (event) => {

    const inputHours = event.target.value;
    let updatedHoursMoment = this.props.moment.clone();
    const firstAndSecond = Number(inputHours.substr(0,2));
    const secondAndThird = Number(inputHours.substr(1,3));
    const firstAndLast = Number( inputHours.substr(0,1) + inputHours.substr(2,3));
    let validatedHours;
    if (secondAndThird < 24) {
      validatedHours = secondAndThird;
    } else if (firstAndLast < 24){
      validatedHours = firstAndLast;
    } else {
      validatedHours = firstAndSecond;
    }
    this.setState({time: updatedHoursMoment.set('hour', validatedHours)});

  }

  handleMinsChange = (event) => {

    const inputMins = event.target.value;
    console.log(inputMins);
    let updatedMinsMoment = this.props.moment.clone();
    const firstAndSecond = Number(inputMins.substr(0,2));
    const secondAndThird = Number(inputMins.substr(1,3));
    const firstAndLast = Number( inputMins.substr(0,1) + inputMins.substr(2,3));
    let validatedMins;

    if (secondAndThird < 60) {
      validatedMins = secondAndThird;
    } else if (firstAndLast < 60){
      validatedMins = firstAndLast;
    } else if (firstAndSecond > 60 && secondAndThird < 60) {
      validatedMins = secondAndThird;
    } else {
      validatedMins = firstAndSecond;
    }
    this.setState({time: updatedMinsMoment.set('minutes', validatedMins)});

  }

  handleBlur = (event) => {
    this.props.onUpdate(this.state.time);
  }

  render(){
    const hours = this.state.time.format("HH");
    const mins =  this.state.time.format("mm");
    return(
      <div className="timeInput">
        <Input
          className="hoursInput noSelect"
          id="hoursInput"
          type="number"
          // maxlength="4"
          autoComplete="off"
          transparent
          //size="massive"
          //placeholder={placeholder}
          placeholder={hours}
          value={hours}
          // icon="clock"

          onChange={this.handleHoursChange}
          // onBlur={this.handleBlur}
          //onkeypress={this.handleKeyPress}
        />


        <Input
          className="minsInput noSelect"
          id="minsInput"
          type="number"
          labelPosition="left"
          // maxlength="4"
          autoComplete="off"
          transparent
          //size="massive"
          //placeholder={placeholder}
          placeholder={mins}
          value={mins}
          // icon="clock"
          // iconPosition="left"
          onChange={this.handleMinsChange}
          onBlur={this.handleBlur}
          //onkeypress='return event.charCode >= 48 && event.charCode <= 57'
          //action="Enter a new time"
        />
      </div>

    );
  }
}
