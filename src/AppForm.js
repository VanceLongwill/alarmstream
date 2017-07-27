import React, { Component} from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
// import { hashHistory } from 'react-router';
import moment from 'moment';
import { Header, Button, Icon } from 'semantic-ui-react';
import { Clock } from './Components';
import { TitleInput, DateInput, TimeInput, NoteInput } from './Inputs';

class SlideForm extends Component {
  state = {
    progress: 0,
    rootURL: "/new"
  };
  prevStep = () => {
    this.setState({
      progress: this.state.progress + -1,
    });
    this.props.history.push(`${this.state.rootURL}/${this.state.progress}`);
  }
  nextStep = () => {
    // console.log(this.props.location.pathname);
    // let page = this.props.location.pathname.substr(1);
    this.setState({
      progress: this.state.progress + 1,
    });
    this.props.history.push(`${this.state.rootURL}/${this.state.progress}`);
  }

  handleAlarmFormSubmit = (attrs) => {
    console.log(attrs);
  }

  render() {
    return(
      <div className="alarm-form-container">
        <Header>
          Create a new alarm
        </Header>
        <AlarmForm step={this.state.progress} onSubmit={this.handleAlarmFormSubmit} next={this.nextStep} prev={this.prevStep} />
      </div>
    )
  }
}

// export class AppForm extends Component {
//     render(){
//       return(
//
//           <Route  path = "/new/" component={AlarmForm}>
//             <Route path = "1" component={DateSelect} />
//             <Route path = "2" component={TimeSelect} />
//           </Route>
//         </div>
//       );
//     }
// }

class AlarmForm extends Component {
  state = {
    "title": this.props.title || null,
    "note": this.props.note || null,
    "time": this.props.time || moment(),
    "id": this.props.id || null,
    "isActive": this.props.isActive || true,
    "dateCreated": this.props.dateCreated || null,
  }

  handleSubmit = () => {
    if (this.state.id===null) {
      this.props.onSubmit(this.state);
    } else {
      // ADD UPDATE FUNCTION FOR EDITING ALARMS
    }
  }
  handleDateUpdate = (date) => {
      const newMoment = moment(date, "MMM DD YYYY");
      const timeFromMoment = {
        hour:  this.state.time.hour(),
        minutes: this.state.time.minutes(),
        seconds: this.state.time.seconds(),
      };
      this.setState({
        time: newMoment.set(timeFromMoment),
      });
    }

    handleTitleUpdate = (titleInput) => {
      this.setState({
        title: titleInput || null,
      });
    }
    handleNoteUpdate= (noteInput) => {
      this.setState({
        note: noteInput || null,
      });
    }
    handleTimeUpdate = (timeInputMoment) => {
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

    handleForward = () => {
      this.props.next();
    }

  render() {
    const components = [
      <DateSelect moment={moment()} onUpdate={this.handleDateUpdate}/>,
      <TimeSelect moment={moment()} onUpdate={this.handleUpdate} />,
      <TitleSelect value={this.state.title} onSubmit={this.handleTitleUpdate}/>,
      <NoteSelect value={this.state.note} onSubmit={this.handleNoteUpdate} />,
      <AlarmFormSuccess
         note={this.state.note}
         time={this.state.time}
         title={this.state.title}
         onSubmit={this.handleSubmit}
      />
    ];

    return (
      <div> {/* SWIPABLE DIV */}
        {components[this.props.step]}
        <p onClick={this.handleForward}>CLICK ME!</p>
      </div>
    );
}
}

const DateSelect = (props) => (
    <div>
      <h5>Choose a date: </h5>
      <DateInput moment={props.moment} onUpdate={props.onUpdate} />
    </div>
);

const TimeSelect = (props) => (
    <div>
      <h5>Now, add a time: </h5>
      <TimeInput moment={props.moment} onUpdate={props.onUpdate} />
    </div>
);

const TitleSelect = (props) => (
  <div>
    <h5>Give your alarm a name: </h5>
    <TitleInput value={props.value} onSubmit={props.onSubmit}/>
  </div>
);

const NoteSelect = (props) => (
  <div>
    <h5>Finally, add a note to your alarm: </h5>
    <NoteInput value={props.value} onSubmit={props.onSubmit}/>
  </div>
);

const AlarmFormSuccess = (props) => (
  <div id="alarm-form-success">
    <h3>{props.title}</h3>
    <p>{props.note}</p>
    <Clock time={props.time}/>
    <Button positive onClick={props.onSubmit} fluid>
          Swipe up to confirm your alarm <Icon name='alarm' />
    </Button>
  </div>
);

export const AppForm = withRouter(SlideForm);
