import React, { Component } from "react";
import { Feed } from "semantic-ui-react";
import { AlarmFeedItem } from './AlarmFeedItem';

export class AlarmFeed extends Component {
  render() {
    const feedItemsList = this.props.alarms.map(alarm => {
      return (
        <AlarmFeedItem
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
      );
    });
    return (
      <Feed>
        {feedItemsList}
        <br />
        <br />
        <br />
        <br />
        <br />
      </Feed>
    );
  }
}
