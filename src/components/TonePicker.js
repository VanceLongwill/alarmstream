import React, {Component} from 'react';
import { Icon, Menu} from 'semantic-ui-react';
import { alarmTones } from './AlarmTones';

export class TonePicker extends Component {
  handleSelect = (e, {name}) => {
    this.props.onUpdate(name);
  }

  render(){
    return(
      <Menu
        compact
        widths={AlarmTones.length}
      >
        {
          alarmTones.map((tone, index) => {
            return(
              <Menu.Item
                key={tone.name}
                name={tone.name}
                active={this.props.tone === tone.name}
                onClick={this.handleSelect}
              >
                <Icon name={tone.iconName}></Icon>
                {tone.name}

              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }
}
