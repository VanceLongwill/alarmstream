import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppFeed } from './AppFeed';
import { AppForm } from './AppForm';
import './App.css';

class App extends Component {
  render(){
    return(
      <div className="AlarmApp">
        <div className="middle">
          <div className="alarm-container">
        <main>
          <Switch>
              <Route exact path='/' component={AppFeed} />
              <Route exact path='/edit' component={AppForm} />
              <Route exact path='/new' component={AppForm} />
          </Switch>
        </main>
      </div>
    </div>
      </div>
    );
  }
}

export default App;
