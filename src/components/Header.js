import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import moment from 'moment';

export default class Top extends Component {
  state = { currentTime: moment() }

  componentDidMount(){
    this.interval = setInterval(() => {
      this.setState({currentTime: moment()});
    }, 1000);
  }

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
