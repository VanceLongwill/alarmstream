import React, { Component } from 'react';
import moment from 'moment';
import {Confirm, Icon, Grid, Feed } from 'semantic-ui-react';
import { AlarmClock, AlarmIconToggle } from './Components';

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
    const alarmWillRingText = this.props.time.isBefore(moment()) ? `Alarm rang ${this.props.time.fromNow()}`  : `Alarm will ring in ${this.props.time.toNow(true)}`;
    const willRing = this.props.active ? (<p><a>{alarmWillRingText}</a></p>) : (<p><a>Alarm is disabled</a></p>);
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

        <AlarmClock time={this.props.time} tone={this.props.tone} isActive={this.props.active} onDisableAlarm={this.handleToggle}/>
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
            tone={alarm.tone}
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
