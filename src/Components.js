import React, {Component} from 'react';
import moment from 'moment';
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
  constructor(props){
    super(props);
    this.state = {
      isRinging: (this.props.time <= moment()),
    };
    let timeUntilRing = (this.props.time - moment());
    // console.log(timeUntilRing); // .seconds() + " (will ring in) ");
   this.alarmTimeout = setTimeout(() => {
    this.setState({ isRinging: true })
   },  timeUntilRing);
  }

  render(){
    if (this.props.isActive && this.state.isRinging) {
      return( <Ringer /> );
    } else {
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
