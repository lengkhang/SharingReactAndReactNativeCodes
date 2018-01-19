import React, { Component } from 'react';
import styles from './LabelButton.css';

class LabelButton extends Component {
  render() {
    return (
      <div className="labelButtonComponent">
        <label>==> That is a button&nbsp;</label>
        <button>Hello button</button>
      </div>
    );
  }
}

export default LabelButton;
