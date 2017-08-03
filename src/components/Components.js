import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react';

export const AlarmIconToggle = (props) => (
  const iconToggle = props.isActive ? "alarm" : "alarm mute";
  <Icon name={iconToggle} onClick={props.onToggleAlarm} size="large" />
)

export const AlarmFormOpenButton = (props) => (
  <Button color='black' id='bottomButton' onClick={props.onClick}><Icon name="plus" size="large" /></Button>
);
