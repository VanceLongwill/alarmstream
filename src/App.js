import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { AppFeed } from './AppFeed';
import { AppForm } from './AppForm';
import './App.css';

class App extends Component {
  render(){
    return(
      <main>
      <div className="AlarmApp">
        <div className="middle">

          <Switch>
              <Route exact path='/' component={AppFeed} />
              <Route exact path='/edit' component={AppForm} />
              <Route exact path='/new/*' component={AppForm} />
              <Route exact path='/new' component={AppForm} />
          </Switch>

      </div>
      </div>
      </main>
    );
  }
}

export default App;
