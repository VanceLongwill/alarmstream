import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import moment from 'moment';

import createNewAlarm from '../Helpers';
import { AlarmFormOpenButton } from './Components';

import AlarmForm from './AlarmForm';
import AlarmFeed from './AlarmFeed';
import ExampleAlarms from '../ExampleAlarmData';
import CurrentTime from './CurrentTime';

export default class AlarmApp extends Component {
  state = {
    version: 0.1,
    currentTime: moment(),
    alarmFormOpen: false,
    alarms: [],
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      // this.setState({ currentTime: moment() });
      this.updateStore();
    }, 1000);
    this.populateAlarms();
  }

  updateStore = () => {
    // console.log("stored");
    localStorage.setItem('alarms', this.alarmsToJson(this.state.alarms));
  };

  alarmsToJson = alarms => JSON.stringify(
    alarms.map(alarm => Object.assign({}, alarm, {
      time: alarm.time.unix(),
      dateCreated: alarm.dateCreated.unix(),
    })),
  );

  populateAlarms = () => {
    const cachedAlarms = localStorage.getItem('alarms');
    if (cachedAlarms) {
      const cachedAlarmsData = JSON.parse(cachedAlarms);
      this.setState({
        alarms: this.sortAlarmsByMostRecent(
          cachedAlarmsData.map(alarm => Object.assign({}, alarm, {
            time: moment.unix(alarm.time),
            dateCreated: moment.unix(alarm.dateCreated),
          })),
        ),
      });
    } else {
      this.setState({
        alarms: this.sortAlarmsByMostRecent(
          ExampleAlarms.map(alarm => Object.assign({}, alarm, {
            time: moment.unix(alarm.time),
            dateCreated: moment.unix(alarm.dateCreated),
          })),
        ),
      });
      localStorage.setItem('alarms', JSON.stringify(ExampleAlarms));
    }
  };
  sortAlarmsByMostRecent = alarms => alarms.sort((a, b) => b.dateCreated - a.dateCreated);
  handleFormSubmit = (attrs) => {
    this.createAlarm(attrs);
    this.toggleAlarmFormVisibility();
  };

  createAlarm = (attrs) => {
    const newAlarms = this.state.alarms
      .concat(createNewAlarm(attrs))
      .sort((a, b) => b.dateCreated - a.dateCreated);

    this.setState({
      alarms: newAlarms,
    });

    localStorage.setItem('alarms', this.alarmsToJson(newAlarms));
  };

  handleAlarmDelete = (alarmId) => {
    const filteredAlarms = this.state.alarms.filter(a => a.id !== alarmId);
    this.setState({
      alarms: filteredAlarms,
    });

    localStorage.setItem('alarms', this.alarmsToJson(filteredAlarms));
  };

  handleAlarmToggle = (alarmId) => {
    this.toggleAlarm(alarmId);
  };

  toggleAlarm = (alarmId) => {
    this.setState({
      alarms: this.state.alarms.map((alarm) => {
        if (alarm.id === alarmId) {
          // console.log("activated alarm: " + (!alarm.isActive));
          return Object.assign({}, alarm, {
            isActive: !alarm.isActive,
          });
        }
        return alarm;
      }),
    });
  };
  toggleAlarmFormVisibility = () =>
    this.setState({ alarmFormOpen: !this.state.alarmFormOpen });

  render() {
    if (this.state.alarmFormOpen) {
      return <AlarmForm onSubmit={this.handleFormSubmit} />;
    }
    return (
      <div className="alarm-container">
        <CurrentTime />
        <Container>
          <AlarmFeed
            alarms={this.state.alarms}
            onToggleAlarm={this.handleAlarmToggle}
            onDeleteAlarm={this.handleAlarmDelete}
          />
        </Container>
        <div id="bottom">
          <AlarmFormOpenButton onClick={this.toggleAlarmFormVisibility} />
        </div>
      </div>
    );
  }
}
