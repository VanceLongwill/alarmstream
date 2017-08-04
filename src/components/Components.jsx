import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

const AlarmIconToggle = props => (
  // const iconToggle = props.isActive ? "alarm" : "alarm mute";
  <Icon
    name={props.isActive ? 'alarm' : 'alarm mute'}
    onClick={props.onToggleAlarm}
    size="large"
  />
);

const AlarmFormOpenButton = props => (
  <Button color="black" id="bottomButton" onClick={props.onClick}><Icon name="plus" size="large" /></Button>
);

export { AlarmIconToggle, AlarmFormOpenButton };
