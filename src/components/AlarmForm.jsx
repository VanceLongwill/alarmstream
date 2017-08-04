import React, { Component } from 'react';
import moment from 'moment';
import { Grid, Icon } from 'semantic-ui-react';
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import uuid from 'react-native-uuid';

import TitleInput from './TitleInput';
import DateInput from './DateInput';
import NoteInput from './NoteInput';
import TimeInput from './TimeInput';
import AlarmFormSuccess from './AlarmFormSuccess';

const animations = [{
  prop: 'scale',
  stops: [
    [-200, 0.85],
    [0, 1],
    [200, 0.85],
  ],
}, {
  prop: 'opacity',
  stops: [
    [-200, 0.15],
    [0, 1],
    [200, 0.15],
  ],
}];

// Alarm form with animation
export default class AlarmForm extends Component {
  state = {
    title: this.props.title || null,
    note: this.props.note || null,
    time: this.props.time || moment(),
    id: this.props.id || null,
    isActive: this.props.isActive || true,
    dateCreated: this.props.dateCreated || null,
    tone: this.props.tone || 'beep',
    progress: 0,
  }

  handleDateUpdate = (date) => {
    const newMoment = moment(date, 'MMM DD YYYY');
    const timeFromMoment = {
      hour: this.state.time.hour(),
      minutes: this.state.time.minutes(),
      seconds: this.state.time.seconds(),
    };
    this.setState({
      time: newMoment.set(timeFromMoment),
    });
  }
    handleAlarmSubmit = () => {
      if (this.state.id === null) {
        this.props.onSubmit(this.state);
      } else {
        // ADD UPDATE FUNCTION FOR EDITING ALARMS
      }
    }
    handleTitleUpdate = (titleInput) => {
      this.setState({
        title: titleInput,
      });
    }
    handleNoteUpdate = (noteInput) => {
      this.setState({
        note: noteInput,
      });
    }
    handleTimeUpdate = (timeInputMoment) => {
      this.setState({
        time: timeInputMoment,
      });
    }
    handleToneUpdate = (toneName) => {
      this.setState({
        tone: toneName,
      });
    }

    render() {
      const components = [
        <DateSelect moment={this.state.time} onUpdate={this.handleDateUpdate} />,
        <TimeSelect moment={this.state.time} onUpdate={this.handleTimeUpdate} />,
        <TitleSelect value={this.state.title} onSubmit={this.handleTitleUpdate} />,
        <NoteSelect value={this.state.note} onSubmit={this.handleNoteUpdate} />,
        <AlarmFormSuccess
          note={this.state.note}
          time={this.state.time}
          title={this.state.title}
          tone={this.state.tone}
          onSubmit={this.handleAlarmSubmit}
          onToneUpdate={this.handleToneUpdate}
        />,
      ];

      return (
        <ViewPager id="viewPager">
          <Frame id="frame" className="frame" accessibility={false}>
            <Track
              ref={
                (c) => { this.track = c; }
              }
              axis="y"
              animations={animations}
              swipe // currentView={this.props.currentView}
              className="track track-y"
            >
              {
                components.map(component => (
                  <View className="view" key={uuid.v4()}>
                    <div className="vh-center">
                      {component}
                    </div>
                  </View>
                ))
              }
            </Track>
          </Frame>
          <Grid id="pagerControls" columns={2}>

            <a
              role="button"
              id="prevSlide"
              onClick={() => this.track.prev()}
            >
              <Icon name="angle double up" />
              Previous
            </a>
            <a
              role="button"
              id="nextSlide"
              onClick={() => this.track.next()}
            >
              <Icon name="angle double down" />
              Next
            </a>
          </Grid>
        </ViewPager>
      );
    }
}

const DateSelect = props => (
  <div>
    <h5>Select a date, then swipe down or click the next button</h5>
    <DateInput moment={props.moment} onUpdate={props.onUpdate} />
  </div>
);

const TimeSelect = props => (
  <div>
    <h5>Now, enter a time for your alarm </h5>
    <TimeInput moment={props.moment} onUpdate={props.onUpdate} />
  </div>
);

const TitleSelect = props => (
  <div>
    <h5>Give your alarm a name (or skip)</h5>
    <br /><br /><br /><br />
    <TitleInput value={props.value} onSubmit={props.onSubmit} />
  </div>
);

const NoteSelect = props => (
  <div>
    <h5>Finally, add a note to your alarm (or skip)</h5>
    <br /><br /><br /><br />
    <NoteInput value={props.value} onSubmit={props.onSubmit} />
  </div>
);
