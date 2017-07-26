import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Button, Card, Icon, Grid, Feed, Form, TextArea, Sidebar, Modal, Segment, Header, Container, Input, Popup, Radio} from 'semantic-ui-react';
import {createNewAlarm} from './Helpers.js';
import { TitleInput, DateInput, TimeInput, NoteInput } from './Inputs.js';

export class AppFeed extends Component {
  render(){
    return(
      <AlarmApp />
    );
  }
}



class AlarmApp extends Component {
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
      <div className="AlarmApp">
          <div className="middle" fluid>
            <div className="alarm-container">
              <AlarmsFeed alarms={this.state.alarms}
                onToggleAlarm={this.handleAlarmToggle}
                onDeleteAlarm={this.handleAlarmDelete}
               />
              <ToggleableAlarmForm onAlarmFormSubmit={this.handleFormSubmit}/>
            </div>
          </div>
        </div>

    );
  }
}

class Clock extends Component {
  render(){
    return(
      <Segment className="clock-segment">
        <span className="clock">
          {this.props.time.format("HH:mm")}
        </span>
      </Segment>
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
    const willRing = this.props.active ? (<p>Alarm will ring in <a>{this.props.time.toNow(true)}</a></p>) : (<a>Alarm is disabled</a>);
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

class AlarmIconToggle extends Component {
  render() {
    const iconToggle = this.props.isActive ? "alarm" : "alarm mute";
    return(
      <Icon name={iconToggle} onClick={this.props.onToggleAlarm} size="large"></Icon>
    );
  }
}

class ToggleableAlarmForm extends Component {

  state = {
    modalOpen: false,
    step: 0,
  }

    handleOpen = (e) => this.setState({
      modalOpen: true,
    })
    handleClose = (e) => this.setState({
      modalOpen: false,
    })
    handleBack = (e) => this.setState({
      step: this.state.step - 1,
    })
    handleForward = (e) => this.setState({
       step: this.state.step + 1,
     })

     handleAlarmFormSubmit = (attrs) => {
       this.setState({
         modalOpen: false,
         step: 0,
       });
      this.props.onAlarmFormSubmit(attrs);
     }

    render() {
      const stepForm = [
        {
          step: 0,
          message:  "Choose a date: ",
          button:
            <Button color='green' onClick={this.handleForward} inverted>
                  Choose a time <Icon name='arrow right' />
            </Button>,
        },
        {
          step: 1,
          message:  "Now, add a time: ",
          button:
            <ButtonStepGroup
              onBack={this.handleBack}
              onForward={this.handleForward}
              backButtonText="Back to date"
              forwardButtonText="Name your alarm"
            />,
        },
        {
          step: 2,
          message:  "Give your alarm a name: ",
          button:
            <ButtonStepGroup
              onBack={this.handleBack}
              onForward={this.handleForward}
              backButtonText="Back to title"
              forwardButtonText="Add a note"
            />,
        },
        {
          step: 3,
          message: "Finally, add a note to your alarm: ",
          button:
            <ButtonStepGroup
              onBack={this.handleBack}
              onForward={this.handleForward}
              backButtonText="Back to note"
              forwardButtonText="Confirm"
            />,
        },
        {
          step: 4,
          message: "Confirm your alarm",
          button:
            <Button color='yellow' onClick={this.handleBack} float="left" inverted>
                 <Icon name='arrow left' /> Go back to change something
              </Button>,
        },
      ];
      const activeStep = stepForm[this.state.step];
      return (
        <Modal
          trigger={<Button basic big onClick={this.handleOpen}><Icon name="plus" size="large" /></Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small'
        >
          <Header>
            Create a new alarm
          </Header>
          <Modal.Content>
            <h5>{activeStep.message}</h5>
            <AlarmForm step={this.state.step} onAlarmSubmit={this.handleAlarmFormSubmit} />
          </Modal.Content>
          <Modal.Actions>
              {activeStep.button}
          </Modal.Actions>
        </Modal>
      )
    }
}

class ButtonStepGroup extends Component {
  render(){
    const {backButtonText, forwardButtonText, onBack, onForward} = this.props;
    return(
      <div className="buttons-form-bottom">
        <Button color='yellow' onClick={onBack} inverted>
               <Icon name='arrow left' /> {backButtonText}
        </Button>
        <Button color='green' onClick={onForward} inverted>
              {forwardButtonText} <Icon name='arrow right' />
        </Button>
      </div>
    );
  }
}

class AlarmForm extends Component {
  state = {
    "title": this.props.title || "",
    "note": this.props.note || null,
    "time": this.props.time || moment(),
    "id": this.props.id || null,
    "isActive": this.props.isActive || true,
    "dateCreated": this.props.dateCreated || null,
  }

  handleDayChange = (day) => {
    const newMoment = moment(day, "MMM DD YYYY");
    const timeFromMoment = {
      hour:  this.state.time.hour(),
      minutes: this.state.time.minutes(),
      seconds: this.state.time.seconds(),
    };
    this.setState({
      time: newMoment.set(timeFromMoment),
    });
  }
  handleTitleChange = (titleInput) => {
    this.setState({
      title: titleInput || null,
    });
  }
  handleNoteChange = (noteInput) => {
    this.setState({
      note: noteInput || null,
    });
  }
  handleTimeChange = (timeInputMoment) => {
    this.setState({
      time: timeInputMoment,
    });
  }
  // componentWillUnmount() {
  //   this.onUnmount={}
  // }
  handleAlarmSubmit = () => {
    if (this.state.id===null) {
      this.props.onAlarmSubmit(this.state);
    } else {
      // ADD UPDATE FUNCTION FOR EDITING ALARMS
    }
  }

  render() {
    const formSteps = [
      <DateInput moment={this.state.time} onUpdate={this.handleDayChange} />,
      <TimeInput moment={this.state.time} onUpdate={this.handleTimeChange}/>,
      <TitleInput onTitleSubmit={this.handleTitleChange}/>,
      <NoteInput onNoteSubmit={this.handleNoteChange} />,
      <AlarmFormSuccess
         note={this.state.note}
         time={this.state.time}
         title={this.state.title}
         onSubmit={this.handleAlarmSubmit}
      />,
    ];
    const activeFormStep = formSteps[this.props.step];
    return(
      activeFormStep
    );
  }
}

class AlarmFormSuccess extends Component {
  render(){
    return(
      <div id="alarm-form-success">
        <h3>{this.props.title}</h3>
        <p>{this.props.note}</p>
        <Clock time={this.props.time}/>
        <Button positive onClick={this.props.onSubmit} fluid>
              Add your alarm <Icon name='alarm' />
        </Button>
      </div>
    );
  }
}

class OldAlarm extends Component {
  render() {
      let humanDate = this.props.time.format('dddd, MMMM Do');
      let humanHours = this.props.time.format('hh');
      let humanMins = this.props.time.format('mm');
      return (
        <Card className="dashboardCard">
          <Card.Content>
            <Card.Header>
              <AlarmIconToggle isActive={this.props.isActive} />
              <div className="title">
                {this.props.title}
              </div>
              <div className="note">
                {this.props.note}
              </div>
            </Card.Header>
            <Card.Content>
              <h3 className="alarm-clock-date">{humanDate}</h3>
              <div className="clock">
                <span className="timePrint">{humanHours}</span>
                <span>:</span>
                <span className="timePrint">{humanMins}</span>
              </div>

            </Card.Content>
          </Card.Content>

          <Button.Group attached="bottom" compact className="cardButtons">
            <Button positive>Edit</Button>
            <Button negative>Remove</Button>
          </Button.Group>

        </Card>
    );
  }
}
