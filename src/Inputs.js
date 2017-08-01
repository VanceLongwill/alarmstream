import React, { Component } from 'react';
// import logo from './logo.svg';
import { TextArea, Input, Grid, Icon} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export class TitleInput extends Component {
  state = {
    value: this.props.value || "",
  }
  handleChange = (e, data) => {
    this.props.onSubmit(data.value);
    this.setState({
      value: data.value,
    });
  }
  componentWillUnmount = () => {
    this.props.onSubmit(this.state.value);
  }
  render(){
  const inputStyle = {
    margin: '0px auto',
    width: '60vw',
    'font-size': '1.3em',
  };
    return(
      <Input placeholder='Enter a title'
        id='titleInput'
        type='text'
        value={this.state.value}
        style={inputStyle}
        transparent fluid
        onChange={this.handleChange}
      />
    );
  }
}

export class NoteInput extends Component {
  state = {
    value: this.props.value || "",
  }
  handleChange = (e, data) => {
    // ADD : 150 char limit?
    this.setState({
      value: data.value,
    });
    this.props.onSubmit(data.value);
  }
  componentWillUnmount = () => {
    this.props.onSubmit(this.state.value);
  }
  render(){
    return(
      <TextArea
        placeholder='Write a note (optional)'
        id="noteInput"
        rows={8}
        autoHeight={false}
        onChange={this.handleChange}
        value={this.state.value}
      />
    );
  }
}

export class DateInput extends Component {
  state = {
    selectedDay: this.props.moment.day(),
  }

  handleDayClick = (day, { selected }) => {
    if (selected) {
      // Unselect the day if already selected
      this.setState({
        selectedDay: undefined,
      });
      return;
    }
    this.setState({
      selectedDay: day,
    });
    //this.props.onClose(day)
    //console.log(day);
    // {day} has format of Tue Jul 04 2017 12:00:00 GMT+0200 (CEST)
    this.props.onUpdate(day);
  };

  render() {
      return(
        <div className="date-input-container">
          <p>{this.props.moment.format("Do MMM")} </p>
          <DayPicker
            onDayClick={this.handleDayClick}
            selectedDay={this.state.selectedDay}
            disabledDays={ { before: new Date() } }
          />
        </div>
      );
  }
}
// export class AltTimeInput extends Component {
//   state = {
//     time: this.props.moment
//   }
//   handleHourIncrement = () => {
//     this.setState({
//       time: this.state.time.add(1, 'hours')
//     });
//   }
//   handleMinIncrement = () => {
//     this.setState({
//       time: this.state.time.add(1, 'minutes')
//     });
//   }
//   handleHourDecrement = () => {
//     this.setState({
//       time: this.state.time.subtract(1, 'hours')
//     });
//   }
//   handleMinDecrement = () => {
//     this.setState({
//         time: this.state.time.subtract(1, 'minutes')
//     });
//   }
//   render() {
//     const hours = this.state.time.format("HH");
//     const mins =  this.state.time.format("mm");
//     return(
//       <div className="timeInput">
//         <br />
//         <Grid columns={2}>
//           <Grid.Row id="incrementButtons">
//             <Grid.Column>
//               <Icon name="chevron up" onClick={this.handleHourIncrement}/>
//             </Grid.Column>
//             <Grid.Column>
//               <Icon name="chevron up" onClick={this.handleMinIncrement}/>
//             </Grid.Column>
//           </Grid.Row>
//           <Grid.Row id='timeInputRow'>
//             <Grid.Column>
//               <span>{hours}</span>
//             </Grid.Column>
//             <Grid.Column>
//               <span>{mins}</span>
//             </Grid.Column>
//           </Grid.Row>
//           <Grid.Row id="decrementButtons">
//             <Grid.Column>
//               <Icon name="chevron down" onClick={this.handleHourDecrement}/>
//             </Grid.Column>
//             <Grid.Column>
//               <Icon name="chevron down" onClick={this.handleMinDecrement}/>
//             </Grid.Column>
//           </Grid.Row>
//         </Grid>
//
//       </div>
//     )
//   }
// }


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
