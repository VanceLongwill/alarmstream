import React, {Component} from 'react';
import {Segment, Icon, Button} from 'semantic-ui-react';

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

export { Clock, AlarmIconToggle, AlarmFormSuccess };
