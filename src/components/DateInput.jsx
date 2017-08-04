import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default class DateInput extends Component {
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
    // this.props.onClose(day)
    // console.log(day);
    // {day} has format of Tue Jul 04 2017 12:00:00 GMT+0200 (CEST)
    this.props.onUpdate(day);
  };

  render() {
    return (
      <div className="date-input-container">
        <p>{this.props.moment.format('Do MMM')} </p>
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDay={this.state.selectedDay}
          disabledDays={{ before: new Date() }}
        />
      </div>
    );
  }
}
