import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Main = () => (
  <div id='AlarmApp'>
    <Header />
    <App />
  </div>
);

ReactDOM.render( <Main />,
  document.getElementById('root'));
registerServiceWorker();
