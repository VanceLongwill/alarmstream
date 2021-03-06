import React from 'react';
import { Segment } from 'semantic-ui-react';

const Clock = props => (
  <Segment className="clock-segment">
    <div id="alarmDate">
      {props.time.format('DD/MM/YY')}
    </div>
    <div className="clock">
      {props.time.format('HH:mm')}
    </div>
    {props.snoozed ? <p id="snoozeText"><br /><br />Alarm snoozed for 10 mins</p> : ('')}
  </Segment>
);

export default Clock;
