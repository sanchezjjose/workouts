import React, { Component } from 'react';
import { MDCRipple } from '@material/ripple';

import './FloatingActionButton.css';
import "@material/fab/dist/mdc.fab.min.css";

class FloatingActionButton extends Component {

  componentDidUpdate() {
    const fabButtonSelector = document.querySelector('.mdc-fab');
    if (fabButtonSelector) {
      new MDCRipple(fabButtonSelector);
    }
  }

  render() {
    return (
      <button onClick={this.props.handleClick} className="Fab mdc-fab" aria-label={this.props.label}>
        <span className="mdc-fab__icon material-icons">{this.props.label}</span>
      </button>
    );
  }
}

export default FloatingActionButton;
