import React, { Component, PureComponent} from 'react';
import moment from 'moment';
import {Confirm, Button, Card, Icon, Grid, Feed, Form, TextArea, Sidebar, Modal, Segment, Header, Container, Input, Popup, Radio} from 'semantic-ui-react';
import { AlarmClock, AlarmIconToggle, AlarmFormSuccess, Clock } from './Components';

const animations = [{
  prop: 'scale',
  stops: [
    [-200, 0.85],
    [0, 1],
    [200, 0.85]
  ]
}, {
  prop: 'opacity',
  stops: [
    [-200, 0.15],
    [0, 1],
    [200, 0.15]
  ]
}];

class Alarm extends Component {
  state = {
    showConfirmDelete: false,
  }

  toggleConfirmDeleteAlert = () => {
    this.setState({showConfirmDelete: !this.state.showConfirmDelete});
  }

  handleToggle = () => {
    this.props.onToggleAlarm(this.props.id);
  }

  handleTrashClick = () => {
    this.toggleConfirmDeleteAlert();
  }
  handleConfirmDelete = () => {
    this.toggleConfirmDeleteAlert();
    this.props.onDeleteAlarm(this.props.id);
  }

  render() {
    const willRing = this.props.active ? (<p>Alarm will ring in <a>{this.props.time.toNow(true)}</a></p>) : (<p><a>Alarm is disabled</a></p>);
    return (
<Feed.Event className="">
  <Feed.Label>
    <AlarmIconToggle onToggleAlarm={this.handleToggle} isActive={this.props.active}/>
  </Feed.Label>
  <Feed.Content>
    <Feed.Summary>
      <a>{this.props.title}</a>
      <Feed.Date>{this.props.dateCreated.fromNow()}</Feed.Date>
    </Feed.Summary>
    <Feed.Extra>
      <p>{this.props.note}</p>
      <Grid columns={3}>

        <AlarmClock time={this.props.time} isActive={this.props.active}/>
        <Icon name="trash" size="large" onClick={this.handleTrashClick}/>
        <Confirm
          open={this.state.showConfirmDelete}
          onCancel={this.toggleConfirmDeleteAlert}
          onConfirm={this.handleConfirmDelete}
        />
      </Grid>

    </Feed.Extra>
    <Feed.Meta>
      {willRing}
    </Feed.Meta>
  </Feed.Content>
</Feed.Event>

  );
  }
  }

  export class AlarmsFeed extends Component {
    render() {

      const feedItemsList = this.props.alarms.map((alarm)=>{
        return(
          <Alarm
            title={alarm.title}
            key={alarm.id}
            id={alarm.id}
            note={alarm.note}
            time={alarm.time}
            active={alarm.isActive}
            dateCreated={alarm.dateCreated}
            onToggleAlarm={this.props.onToggleAlarm}
            onDeleteAlarm={this.props.onDeleteAlarm}
          />
        )
      });
      return(
      <Feed>
        {feedItemsList}
      </Feed>

    );
  }
}
