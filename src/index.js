import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';
import './css/App.css';
import './css/Main.css';

ReactDOM.render(<Main />,
  document.getElementById('root'));
registerServiceWorker();
