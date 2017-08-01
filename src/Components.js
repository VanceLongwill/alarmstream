import React, {Component} from 'react';
import moment from 'moment';
import {Segment, Icon, Button, Transition} from 'semantic-ui-react';
import Sound from 'react-sound';

class Ringer extends Component {

  state={
    visible: false,
    animationIntervalId: null,
  }

  componentDidMount(){
    const animationIntervalId = setInterval(() => this.setState({visible: !this.state.visible}),1500);
    this.setState({visible: true});
  }

  componentWillUnmount(){
    clearInterval(this.state.animationIntervalId);
  }

  render(){
    return(
      <Segment id="alarm-segment">
        <Transition animation={'shake'} duration={500} visible={this.state.visible}>
          <Icon size="massive" name="alarm" />
        </Transition>
        <Sound
          url='http://soundbible.com/mp3/analog-watch-alarm_daniel-simion.mp3'
          playStatus={Sound.status.PLAYING}
          playFromPosition={0}
          volume={40}
          // onLoading={}
          // onPlaying={}
          // onFinishedPlaying={}
        />
        <br /><br />
        <div id="alarmButtons">
          <Button basic fluid onClick={this.props.onSnooze}>Snooze</Button>
          <Button negative fluid onClick={this.props.onTurnOff} >Turn Off</Button>
        </div>

      </Segment>
    );
  }
}

class Clock extends Component {

  render() {
    return(
      <Segment className="clock-segment">
        <span className="clock">
          {this.props.time.format("HH:mm")}
        </span>
        {this.props.snoozed ? <p id="snoozeText"><br /><br />Alarm snoozed for 10 mins</p> : ("")}
      </Segment>
    );
  }

}

class AlarmClock extends Component {
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
      return( <Ringer onSnooze={this.handleSnooze} onTurnOff={this.handleTurnOff}/> );
    } else {
      return(
        <Clock time={this.props.time} snoozed={this.state.snoozeVisible}/>
      );
    }
  }
}



class AlarmIconToggle extends Component {
  render() {
    const iconToggle = this.props.isActive ? "alarm" : "alarm mute";
    return(
      <Icon name={iconToggle} onClick={this.props.onToggleAlarm} size="large"></Icon>
    );
  }
}

class AlarmFormSuccess extends Component {
  render(){
    return(
      <div id="alarm-form-success">
        <h3>{this.props.title}</h3>
        <p>{this.props.note}</p>
        <Clock time={this.props.time}/>
        <Button positive onClick={this.props.onSubmit} fluid>
          Add your alarm <Icon name='alarm' />
        </Button>
      </div>
    );
  }
}

const AlarmFormOpenButton = (props) => (
  <Button color='black' id='bottomButton' onClick={props.onClick}><Icon name="plus" size="large" /></Button>
);


export { Clock, AlarmIconToggle, AlarmFormSuccess, AlarmFormOpenButton, Ringer, AlarmClock};
