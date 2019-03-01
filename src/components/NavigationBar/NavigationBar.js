import React, { Component } from 'react';
import { MDCRipple } from '@material/ripple';
import SettingsModal from '../SettingsModal/SettingsModal';

import './NavigationBar.css';

class NavigationBar extends Component {

  state = {
    menuOpen: false,
    settingsOpen: false
  }

  componentDidUpdate() {
    const btnSelector = document.querySelector('.menu-drop-down .mdc-top-app-bar__action-item');
    if (btnSelector) {
      new MDCRipple(btnSelector);
    }
  }

  handleEditClick = () => {
    this.props.handleUserChange(this.props.user, true, false);
  }

  handleSaveClick = () => {
    this.props.handleUserChange(this.props.user, false, true);
  }

  handleCancelClick = () => {
    this.props.handleUserChange(this.props.user, false, false, true);
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

  render() {
    return (
      <header className='NavigationBar top-app-bar'>
        <section className='top-app-bar__section--align-start'>
          <span className='title'>Workouts</span>
        </section>
        <section className={`top-app-bar__section--align-end ${this.props.editMode ? 'editing' : ''}`}>
          {this.props.editMode ? (
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
                <li onClick={this.handleSettingsOpen} className='menu-preferences'>
                  Settings
                </li>
                <li className='menu-logout'>
                  <a href='/'>Logout</a>
                </li>
              </ul>
            }
          </div>
        </section>
        {this.state.settingsOpen &&
          <SettingsModal 
            user={this.props.user}
            userObj={this.props.userObj}
            settings={this.props.userObj.settings}
            handleSettingsClose={this.handleSettingsClose} />
        }
      </header>
    );
  }
}

export default NavigationBar;
