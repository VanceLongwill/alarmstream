import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default class Top extends Component {
  render(){
    return(
      <div className="top">
        <Header>
          <Icon name="tasks"/>
        </Header>
      </div>
    );
  }
}
