import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import moment from 'moment';
import { createNewAlarm } from './Helpers';
import { AlarmForm } from './AppForm';
import { AlarmsFeed} from './AppFeed';
import {AlarmFormOpenButton} from './Components';
import { exampleAlarms } from './exampleAlarmData';
import './App.css';
import './main.css';


export class App extends Component {

  state = {
    version: 0.1,
    currentTime: moment(),
    alarmFormOpen: false,
    alarms:  [],
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ currentTime: moment() })
      this.updateStore();
    }, 1000);
    this.populateAlarms();
 }

 updateStore = () => {
   //console.log("stored");
   localStorage.setItem('alarms', this.alarmsToJson(this.state.alarms));
 }

 alarmsToJson = (alarms) => {
   return JSON.stringify(
     alarms.map(
       (alarm, index) => {
         return Object.assign({}, alarm, {
           time: alarm.time.unix(),
           dateCreated: alarm.dateCreated.unix()
         });
       }
     )
   );
 }

  populateAlarms = () => {

   const cachedAlarms = localStorage.getItem('alarms');
   if (cachedAlarms) {
     console.log('using cache');
     let cachedAlarmsData = JSON.parse(cachedAlarms);
     this.setState(
       {
         alarms: this.sortAlarmsByMostRecent( cachedAlarmsData.map(
           (alarm, index) => {
             return Object.assign({}, alarm, {
               time: moment.unix(alarm.time),
               dateCreated: moment.unix(alarm.dateCreated)
             });
           }
         ))
       });
   } else {
     this.setState(
       {
         alarms: this.sortAlarmsByMostRecent( exampleAlarms.map(
           (alarm, index) => {
             return Object.assign({}, alarm, {
               time: moment.unix(alarm.time),
               dateCreated: moment.unix(alarm.dateCreated)
             });
           }
         ))
       });
     localStorage.setItem('alarms', JSON.stringify(exampleAlarms));
   }
 }
  sortAlarmsByMostRecent = (alarms) => {
    return alarms.sort((a, b) => (b.dateCreated - a.dateCreated));
  }
  handleFormSubmit = (attrs) => {
    this.createAlarm(attrs);
    this.toggleAlarmFormVisibility();
  }

  createAlarm = (attrs) => {
    let newAlarms = this.state.alarms.concat( createNewAlarm(attrs) ).sort((a, b) => (b.dateCreated - a.dateCreated));

    this.setState({
      alarms: newAlarms
    });

    localStorage.setItem('alarms', this.alarmsToJson(newAlarms));
  }

  handleAlarmDelete = (alarmId) => {
    let filteredAlarms = this.state.alarms.filter(a => a.id !== alarmId)
    this.setState({
      alarms: filteredAlarms,
    });

   localStorage.setItem('alarms', this.alarmsToJson(filteredAlarms));
  }

  handleAlarmToggle = (alarmId) => {
    this.toggleAlarm(alarmId);
  }

  toggleAlarm = (alarmId) => {
    this.setState({
      alarms: this.state.alarms.map((alarm)=>{
        if (alarm.id === alarmId) {
          //console.log("activated alarm: " + (!alarm.isActive));
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
              <div id="currentTime">
                {this.state.currentTime.format("Mo MMMM, HH:mm")}
              </div>
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
