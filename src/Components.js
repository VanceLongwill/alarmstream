import React, {Component} from 'react';
import {Segment, Icon, Button, Transition} from 'semantic-ui-react';

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
      <Segment className="alarm-segment">
        <Transition animation={'shake'} duration={500} visible={this.state.visible}>
          <Icon size="massive" name="alarm" />
        </Transition>
      </Segment>
    );
  }
}

class Clock extends Component {

  checkRing = () => {
    let now = new Date();
    let alarmTime = this.props.time;
    // console.log(now-alarmTime);
    if (now>=alarmTime) {
      this.setState({isRinging: true})
    }
  }

  render() {
    return(
      <Segment className="clock-segment">
        <span className="clock">
          {this.props.time.format("HH:mm")}
        </span>
      </Segment>
    );
  }

}

class AlarmClock extends Component {
  state = {
    isRinging: false,
    intervalId: null,
  }
  componentWillUpdate() {
    console.log('component will update');
    let isRing = (new Date() >= this.props.time);
    if (this.state.isRinging !== isRing ) {
      this.setState({isRinging: isRing});
    }
  }
  componentDidMount() {
    if (this.props.isActive) {
      // console.log(this.props.time.format("llll") + 'alarm active');
      let intervalId = setInterval(this.isTimeUp, 1000 );
      this.setState({intervalId: intervalId})
    } else {
      // console.log(this.props.time.format("llll")  + ': Alarm not active');
      if (this.state.intervalId!==null){
        clearInterval(this.state.intervalId);
      }
    }
  }
  isTimeUp = () => {
    let now = new Date();
    if (this.state.isRinging) {
      // console.log(" already ringing -- removing interval ");
      clearInterval(this.state.intervalId);
    } else {
      const isRingingNow =  (now>=this.props.time);
      // console.log("Not ringing right now, should be ? " + isRingingNow)
      if (isRingingNow){
        this.setState({
          isRinging: isRingingNow
        });
      }
    }
  }

  render(){
    console.log('new render');
    if (this.props.isActive) {
      //console.log('render: is active')
      const ringing = this.state.isRinging ?  <Ringer /> : <Clock time={this.props.time} />;
      return( ringing );
    } else {
      //console.log("render: not active")
      return(
        <Clock time={this.props.time} />
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

class ButtonStepGroup extends Component {
  render(){
    const {backButtonText, forwardButtonText, onBack, onForward} = this.props;
    return(
      <div className="buttons-form-bottom">
        <Button color='yellow' onClick={onBack} inverted>
          <Icon name='arrow left' /> {backButtonText}
        </Button>
        <Button color='green' onClick={onForward} inverted>
          {forwardButtonText} <Icon name='arrow right' />
        </Button>
      </div>
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
