import React, {Component} from 'react';

export class AlarmClock extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRinging: (this.props.time <= moment()),
      snoozeVisible: false,
    };
    let timeUntilRing = (this.props.time - moment());
    // console.log(timeUntilRing); // .seconds() + " (will ring in) ");
   this.alarmTimeout = setTimeout(() => {
    this.setState({ isRinging: true })
   },  timeUntilRing);
  }

  handleSnooze = () => {
    this.setState({
      isRinging: false,
      snoozeVisible: true,
    });
    const tenMins = 600000; // 10 minutes in milliseconds
    this.alarmTimeout = setTimeout(() => {
      if (this.props.isActive){
        this.setState({ isRinging: true});
      }
    }, tenMins);
    //alert("Alarm snoozed for 10 minutes");
  }

  handleTurnOff = () => {
    this.setState({
      isRinging: false,
      snoozeVisible: false,
    });
    this.props.onDisableAlarm();
  }

  render(){
    if (this.props.isActive && this.state.isRinging) {
      return(<Ringer onSnooze={this.handleSnooze} toneName={this.props.tone} onTurnOff={this.handleTurnOff}/>);
    } else {
      return(
        <Clock time={this.props.time} snoozed={this.state.snoozeVisible}/>
      );
    }
  }
}
