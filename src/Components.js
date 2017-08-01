import React, {Component} from 'react';
import moment from 'moment';
import {Segment, Icon, Button, Transition, Menu} from 'semantic-ui-react';
import Sound from 'react-sound';
import { AlarmTones } from './alarmTones';

class TonePicker extends Component {
  handleSelect = (e, {name}) => {
    this.props.onUpdate(name);
  }

  render(){
    return(
      <Menu
        compact
        widths={AlarmTones.length}
      >
        {
          AlarmTones.map((tone, index) => {
            return(
              <Menu.Item
                key={tone.name}
                name={tone.name}
                active={this.props.tone === tone.name}
                onClick={this.handleSelect}
              >
                <Icon name={tone.iconName}></Icon>
                {tone.name}

              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }
}

class Ringer extends Component {

  state={
    visible: false,
    animationIntervalId: null,
  }

  componentDidMount(){
    const animationId = setInterval(() => this.setState({visible: !this.state.visible}),1500);
    this.setState({
      visible: true,
      animationIntervalId: animationId,
    });
  }

  componentWillUnmount(){
    clearInterval(this.state.animationIntervalId);
  }

  render(){
    const toneUrl = AlarmTones.find(tone => tone.name === this.props.toneName).source;
    return(
      <Segment id="alarm-segment">
        <Transition animation={'shake'} duration={500} visible={this.state.visible}>
          <Icon size="massive" name="alarm" />
        </Transition>
        <Sound
          url={toneUrl}
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
      return(<Ringer onSnooze={this.handleSnooze} toneName={this.props.tone} onTurnOff={this.handleTurnOff}/>);
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


const AlarmFormOpenButton = (props) => (
  <Button color='black' id='bottomButton' onClick={props.onClick}><Icon name="plus" size="large" /></Button>
);


export { Clock, AlarmIconToggle, AlarmFormOpenButton, Ringer, AlarmClock, TonePicker};
