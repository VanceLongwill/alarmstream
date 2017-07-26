import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Header} from 'semantic-ui-react';
import { TitleInput, DateInput, TimeInput, NoteInput } from './Inputs';

export const AppForm = ({ match }) => (
  <div className="alarm-form-container">
    <Header>
      Create a new alarm
    </Header>
    <Route
      path={match.url + '/1'}
      component={DateSelect}
    />
  </div>
);

const DateSelect = () => {
  <div>
    <h5>Choose a date: </h5>
  </div>
}

const TimeSelect = () => {
  <div>
    <h5>Now, add a time: </h5>
  </div>
}

const TitleSelect = () => {
  <div>
    <h5>Give your alarm a name: </h5>
  </div>
}

const NoteSelect = () => {
  <div>
    <h5>Finally, add a note to your alarm: </h5>
  </div>
}
