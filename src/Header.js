import React, { Component } from 'react';
import {Button, Card, Icon, Grid, Feed, Form, TextArea, Sidebar, Modal, Segment, Header, Container, Input, Popup, Radio} from 'semantic-ui-react';

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
