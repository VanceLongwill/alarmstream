import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Top from './components/Top'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Main = () => (
  <div id='AlarmApp'>
    <Top />
    <App />
  </div>
);

ReactDOM.render( <Main />,
  document.getElementById('root'));
registerServiceWorker();
