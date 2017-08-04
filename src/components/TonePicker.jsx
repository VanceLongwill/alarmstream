import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import AlarmTones from '../AlarmTones';

export default class TonePicker extends Component {
  handleSelect = (e, { name }) => {
    this.props.onUpdate(name);
  }

  render() {
    return (
      <Menu
        compact
        widths={AlarmTones.length}
      >
        {
          AlarmTones.map(tone => (
            <Menu.Item
              key={tone.name}
              name={tone.name}
              active={this.props.tone === tone.name}
              onClick={this.handleSelect}
            >
              <Icon name={tone.iconName} />
              {tone.name}

            </Menu.Item>
          ))
        }
      </Menu>
    );
  }
}
