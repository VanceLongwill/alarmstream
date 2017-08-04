import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

import TonePicker from './TonePicker';
import Clock from './Clock';

export default class AlarmFormSuccess extends Component {
  state = {
    tone: this.props.tone,
  }

  handleToneUpdate = (name) => {
    this.setState({
      tone: name,
    });
    this.props.onToneUpdate(name);
  }

  handleSubmit = () => {
    this.props.onSubmit();
  }

  render() {
    return (
      <div id="alarmFormSuccess">
        <TonePicker tone={this.state.tone} onUpdate={this.handleToneUpdate} />
        <Icon name="alarm" size="massive" />
        <h3>{this.props.title}</h3>
        <p>{this.props.note}</p>
        <Clock time={this.props.time} />
        <Button positive onClick={this.handleSubmit} id="alarmConfirmButton" fluid>
          Tap to add your alarm
        </Button>
      </div>
    );
  }
}
