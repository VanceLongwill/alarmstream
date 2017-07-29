import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Button, Card, Icon, Grid, Feed, Form, TextArea, Sidebar, Modal, Segment, Header, Container, Input, Popup, Radio} from 'semantic-ui-react';
import {createNewAlarm} from './Helpers';
import { Clock, AlarmIconToggle, AlarmFormSuccess } from './Components'

export class AppFeed extends Component {
  state = {
    alarms:  [
          {
              "title": "Clear paper jam",
              "note": "Office Chores",
              "time": moment("2017-08-08 09:30"),
              "id": "a73c1d19-f32d-4aff-b470-cea4e792406a",
              "isActive": false,
              "dateCreated": moment("2017-06-08 02:30")
          },
          {
              "title": "Vance Updated 2",
              "note": "Now  is new2 ",
              "id": "40f768b0-100b-4a60-924e-f40abf67e35b",
              "time": moment("2017-07-28 19:40"),
              "isActive": false,
              "dateCreated": moment("2017-07-08 15:30")

          },
          {
              "title": "asdasd 2",
              "note": "asdasd 2",
              "id": "cc84ce3b-f597-4b05-aa36-71a775fefcd2",
              "time": moment("2017-07-26 07:30"),
              "isActive": true,
              "dateCreated": moment("2017-07-20 07:30")
          }
      ].sort((a, b) => (b.dateCreated - a.dateCreated)),
  }

  handleFormSubmit = (attrs) => {
    this.createAlarm(attrs)
  }

  createAlarm = (attrs) => {
    this.setState({
      alarms: this.state.alarms.concat(
        createNewAlarm(attrs)
      ).sort((a, b) => (b.dateCreated - a.dateCreated))
    });
  }
  handleAlarmDelete = (alarmId) => {
    this.setState({
      alarms: this.state.alarms.filter(a => a.id !== alarmId),
    });
  }
  handleAlarmToggle = (alarmId) => {
    this.toggleAlarm(alarmId);
  }

  toggleAlarm = (alarmId) => {
    this.setState({
      alarms: this.state.alarms.map((alarm)=>{
        if (alarm.id === alarmId) {
          //console.log("old: " + alarm.isActive+"new: " + (!alarm.isActive))
          return Object.assign({}, alarm, {
            isActive: !alarm.isActive,
          });
        } else {
          return alarm;
        }
    }),
  });
}
  render() {
    return (
          <div className="alarm-container">
            <Container>
              <AlarmsFeed alarms={this.state.alarms}
                onToggleAlarm={this.handleAlarmToggle}
                onDeleteAlarm={this.handleAlarmDelete}
              />
            </Container>
            <AlarmFormOpenButton />
        </div>
    );
  }
}

class Alarm extends Component {
  handleToggle = () => {
    this.props.onToggleAlarm(this.props.id);
  }
  handleTrashClick = () => {
    this.props.onDeleteAlarm(this.props.id);
  }
  render() {
    const willRing = this.props.active ? (<p>Alarm will ring in <a>{this.props.time.toNow(true)}</a></p>) : (<p><a>Alarm is disabled</a></p>);
    return (
      <Feed.Event>
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

              <Clock time={this.props.time}/>
              <Icon name="trash" size="large" onClick={this.handleTrashClick}/>
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

class AlarmsFeed extends Component {
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

class AlarmFormOpenButton extends Component {
  render(){
    return(
      <Link to={'/new'}><Button basic id='bottomButton'><Icon name="plus" size="large" /></Button></Link>
    );
  }
}
