import React, { Component } from 'react';
import {Button, Card, Icon, Grid, Feed, Form, TextArea, Sidebar, Modal, Segment, Header, Container, Input, Popup, Radio} from 'semantic-ui-react';
import moment from 'moment';
import {createNewAlarm} from './Helpers';
import { AlarmForm } from './AppForm';
import { AlarmsFeed} from './AppFeed';
import {AlarmFormOpenButton} from './Components';
import './App.css';
import './main.css';

export class App extends Component {
  state = {
    alarmFormOpen: false,
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
          },
          {
              "title": "Clear paper jam",
              "note": "Office Chores",
              "time": moment("2017-08-08 09:30"),
              "id": "a78c1d19-f32d-4aff-b470-cea4e792406a",
              "isActive": false,
              "dateCreated": moment("2017-06-08 02:30")
          },
          {
              "title": "Clear paper jam",
              "note": "Office Chores",
              "time": moment("2017-08-08 09:30"),
              "id": "a79c1d19-f32d-4aff-b470-cea4e792406a",
              "isActive": false,
              "dateCreated": moment("2017-06-08 02:30")
          },
          {
              "title": "Clear paper jam",
              "note": "Office Chores",
              "time": moment("2017-08-08 09:30"),
              "id": "a74c1d19-f32d-4aff-b470-cea4e792406a",
              "isActive": false,
              "dateCreated": moment("2017-06-08 02:30")
          }
      ].sort((a, b) => (b.dateCreated - a.dateCreated)),
  }

  handleFormSubmit = (attrs) => {
    this.createAlarm(attrs);
    this.toggleAlarmFormVisibility();
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
  toggleAlarmFormVisibility = () => this.setState({ alarmFormOpen: !this.state.alarmFormOpen })
  render() {
    if (this.state.alarmFormOpen) {
      return (
        <AlarmForm
          onSubmit={this.handleFormSubmit}
        />
      );
    } else {
      return (
            <div className="alarm-container">
              <Container>
                <AlarmsFeed alarms={this.state.alarms}
                  onToggleAlarm={this.handleAlarmToggle}
                  onDeleteAlarm={this.handleAlarmDelete}
                />
              </Container>
              <div id="bottom">
                <AlarmFormOpenButton
                  onClick={this.toggleAlarmFormVisibility}
                />
              </div>

            </div>
      );
    }

  }
}

export default App;
