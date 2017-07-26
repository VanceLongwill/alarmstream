import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Header from './Header'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Routes extends Component {
  render() {
    return(
      <div>
        <Header />
        <App />
      </div>
    );
  }
}

ReactDOM.render(

  <BrowserRouter>
    <Routes />
  </BrowserRouter>,

document.getElementById('root'));
registerServiceWorker();
