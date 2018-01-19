import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
//import LabelButton from './components/LabelButton/LabelButton';

import LandingPage from './pages/LandingPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <span>Sharing component between web and native</span>

        <LandingPage />
      </div>
    );
  }
}

export default App;
