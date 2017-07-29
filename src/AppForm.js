import React, { Component, PropTypes} from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
// import { hashHistory } from 'react-router';
import moment from 'moment';
import { Header, Button, Icon } from 'semantic-ui-react';
import { Clock } from './Components';
import { TitleInput, DateInput, TimeInput, NoteInput } from './Inputs';
//import Swipeable from 'react-swipeable';
import { ViewPager, Frame, Track, View, AnimatedView } from 'react-view-pager';
import './main.css';

// import { spring } from 'react-motion';
// import Transition from 'react-motion-ui-pack';
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
}]

class SlideForm extends Component {
  state = {
    progress: 0,
    rootURL: "/new"
  };
  handleAlarmFormSubmit = (attrs) => {
      console.log(attrs);
      this.props.history.push('/');
  }

  prevStep = () => {
    if (this.state.progress < 1) {
      console.log('Go back');
      this.handleAlarmFormSubmit("done");
      this.props.history.push('/');
    }
    this.setState({
      progress: this.state.progress - 1,
    });
    //this.props.history.push(`${this.state.rootURL}/${this.state.progress}`);
  }
  nextStep = () => {
    // console.log(this.props.location.pathname);
    // let page = this.props.location.pathname.substr(1);
    console.log(this.state.progress);
    if (this.state.progress > 3) {
      console.log('Time to submit');
      this.handleAlarmFormSubmit("done");
      this.props.history.push('/');
    }
    this.setState({
      progress: this.state.progress + 1,
    });
  }

  swiping() {

  }

  swiped = (e, deltaX, deltaY, isFlick, velocity) => {
      // console.log('Swiped...', e, deltaX, deltaY, isFlick, velocity)
      // if (isFlick) {
      //   this.nextStep();
      // }
    }
handleUpSwipe = (e, deltaX, deltaY, isFlick, velocity) => {
  console.log('up swipe')
  this.nextStep();
}
handleDownSwipe = (e, deltaX, deltaY, isFlick, velocity) => {
  console.log('down swipe')
  this.prevStep();
}

  render() {
    return(
  <AlarmForm
    onAlarmSubmit={this.handleAlarmFormSubmit}
  />
  )
  }
}



const ProgressBar = ({ progress }) => (
  <div className="progress-container">
    <div
      className="progress-bar"
      style={{
        transform: `scaleX(${Math.max(0, Math.min(1, progress))})`,
      }}
    />
  </div>
)
const colors = ['#209D22', '#106CCC', '#C1146B', '#11BDBF', '#8A19EA']





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
      console.log(this.state)
      this.props.onSubmit(this.state);
    } else {
      // ADD UPDATE FUNCTION FOR EDITING ALARMS
    }
  }
  handleDateUpdate = (date) => {
    console.log(date);
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
    handleAlarmSubmit = () => {
      if (this.state.id===null) {
        this.props.onAlarmSubmit(this.state);
      } else {
        // ADD UPDATE FUNCTION FOR EDITING ALARMS
      }
    }
    handleTitleUpdate = (titleInput) => {
      this.setState({
        title: titleInput || null,
      });
    }
    handleNoteUpdate = (noteInput) => {
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

    handleViewChange = (currentIndicies) => {
      this.setState({ progress: currentIndicies[0] })
    }
    handleSwipeEnd = () => {
      if (this.state.progress > 3) {
        this.handleAlarmSubmit();
      }
    }
  render() {
    const components = [
      <DateSelect moment={this.state.time} onUpdate={this.handleDateUpdate}/>,
      <TimeSelect moment={this.state.time} onUpdate={this.handleTimeUpdate} />,
      <TitleSelect value={this.state.title} onSubmit={this.handleTitleUpdate}/>,
      <NoteSelect value={this.state.note} onSubmit={this.handleNoteUpdate} />,
      <AlarmFormSuccess
        note={this.state.note}
        time={this.state.time}
        title={this.state.title}
        //onSubmit={this.handleSubmit}
      />
    ];

    return (
      <ViewPager>
        <Frame autoSize className="frame" accessibility={false}>
          <Track ref={c => this.track = c} axis="y" animations={animations}
            className="track track-y"    onViewChange={this.handleViewChange} onSwipeEnd={this.handleSwipeEnd}>
            {
              components.map((component, index) => {
                return(
                  <View className="view" key={index}>
                    {component}
                  </View>
                )
              })
            }
          </Track>
        </Frame>
        <p id="swipeBottom">
          {(this.state.progress !== 4) ? "Swipe up to continue" : "Swipe up to confirm your alarm" }
        </p>
      </ViewPager>
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
    {/* <Button positive onClick={props.onSubmit} fluid>
      Swipe up to confirm your alarm <Icon name='alarm' />
    </Button> */}
  </div>
);

export const AppForm = withRouter(SlideForm);
