import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Main extends Component {
  render() {
    return(
        <div id='AlarmApp'>
          <Header />
          <App />
        </div>
    );
  }
}

ReactDOM.render( <Main />,

document.getElementById('root'));
registerServiceWorker();
