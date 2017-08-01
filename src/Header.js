import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

export default class Top extends Component {
  render(){
    return(
      <div className="top">
        <Header>
          <span id="lobster">AlarmStream</span>
        </Header>
      </div>
    );
  }
}
