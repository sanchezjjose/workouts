import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import { MDCRipple } from '@material/ripple';
import SettingsModal from '../SettingsModal/SettingsModal';
import MotivationVideosModal from '../MotivationVideosModal/MotivationVideosModal'

import './NavigationBar.css';

class NavigationBar extends Component {
  static contextType = UserContext;

  state = {
    menuOpen: false,
    settingsOpen: false,
    motivationVideosOpen: false
  }

  componentDidUpdate() {
    const btnSelector = document.querySelector('.menu-drop-down .mdc-top-app-bar__action-item');
    if (btnSelector) {
      new MDCRipple(btnSelector);
    }
  }

  handleEditClick = () => {
    this.context.updateMode(true, false, false);
  }

  handleSaveClick = () => {
    this.context.updateMode(false, true, false);
  }

  handleCancelClick = () => {
    this.context.updateMode(false, false, true);
  }

  handleMenuClick = () => {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  handleSettingsOpen = () => {
    this.setState({ settingsOpen: true });
    this.setState({ menuOpen: false });
  }

  handleSettingsClose = () => {
    this.setState({ settingsOpen: false });
  }

  handleMotivationVideosOpen = () => {
    this.setState({ motivationVideosOpen: true });
    this.setState({ menuOpen: false });
  }

  handleMotivationVideosClose = () => {
    this.setState({ motivationVideosOpen: false });
  }

  render() {
    return (
      <header className='NavigationBar top-app-bar'>
        <section className='top-app-bar__section--align-start'>
          <span className='title'>Workouts</span>
        </section>
        <section className={`top-app-bar__section--align-end ${this.context.editMode ? 'editing' : ''}`}>
          {this.context.editMode ? (
            <section className='action-buttons'>
              <button onClick={this.handleSaveClick} className='mdc-top-app-bar__action-item'>Save</button>
              <button onClick={this.handleCancelClick} className='material-icons mdc-top-app-bar__action-item'>cancel</button>
            </section>
          ) : (
            <section className='action-buttons'>
              <button onClick={this.handleEditClick} className='material-icons mdc-top-app-bar__action-item'>edit</button>
            </section>
          )}
          <div className={`menu-drop-down ${this.state.menuOpen ? 'open' : ''}`}>
            <button onClick={this.handleMenuClick} className='mdc-icon-button material-icons mdc-top-app-bar__action-item'>more_vert</button>
            {this.state.menuOpen &&
              <ul className='menu-items'>
                <li onClick={this.handleSettingsOpen}>
                  Settings
                </li>
                <li onClick={this.handleMotivationVideosOpen}>
                  Motivation
                </li>
                <li>
                  <a href='/'>Logout</a>
                </li>
              </ul>
            }
          </div>
        </section>
        {this.state.settingsOpen &&
          <SettingsModal handleClose={this.handleSettingsClose} />
        }
        {this.state.motivationVideosOpen &&
          <MotivationVideosModal handleClose={this.handleMotivationVideosClose} />
        }
      </header>
    );
  }
}

export default NavigationBar;
