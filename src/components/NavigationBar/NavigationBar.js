import React, { Component } from 'react';

import './NavigationBar.css';

class NavigationBar extends Component {

  render() {
    return (
      <header className='NavigationBar top-app-bar'>
        <section class='top-app-bar__section--align-start'>
          <span class='title'>Workouts</span>
        </section>
        <section class='top-app-bar__section--align-end'>
          <a href='#' class='mdc-top-app-bar__action-item' aria-label='Start Workout' alt='Start Workout'>Start Workout</a>
          <a href='#' class='material-icons mdc-top-app-bar__action-item' aria-label='Edit' alt='Edit'>edit</a>
        </section>
      </header>
    );
  }
}

export default NavigationBar;
