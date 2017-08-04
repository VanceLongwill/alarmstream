import React, { Component } from 'react';
import moment from 'moment';

export default class CurrentTime extends Component {
  state = {
    time: moment(),
  }
  componentDidMount() {
    this.interval = setInterval(this.setTime, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  setTime = () => {
    this.setState({
      time: moment(),
    });
  }
  render() {
    return (
      <div id="currentTime">
        {this.state.time.format('Mo MMMM, HH:mm')}
      </div>
    );
  }
}
