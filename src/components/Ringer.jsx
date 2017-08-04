import React, { Component } from 'react';
import { Segment, Icon, Button, Transition } from 'semantic-ui-react';
import Sound from 'react-sound';
import AlarmTones from '../AlarmTones';

export default class Ringer extends Component {
  state={
    visible: false,
    animationIntervalId: null,
  }

  componentWillMount() {
    const animationId = setInterval(() => this.setState({ visible: !this.state.visible }), 1500);
    this.setState({
      visible: true,
      animationIntervalId: animationId,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.animationIntervalId);
  }

  render() {
    const toneUrl = AlarmTones.find(tone => tone.name === this.props.toneName).source;
    return (
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
