import React, { Component } from 'react';

import './NavigationBar.css';

class NavigationBar extends Component {

  state = {
    menuOpen: false
  }

  handleEditClick = () => {
    this.props.handleUserChange(this.props.user, true, false);
  }

  handleSaveClick = () => {
    this.props.handleUserChange(this.props.user, false, true);
  }

  handleCancelClick = () => {
    this.props.handleUserChange(this.props.user, false, false);
  }

  handleMenuClick = () => {
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }))
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
        <div className='menu-drop-down'>
          <button onClick={this.handleMenuClick} className='material-icons mdc-top-app-bar__action-item'>
            {this.state.menuOpen ? 'more_vert' : 'more_horiz' }
          </button>
        </div>
        </section>
      </header>
    );
  }
}

export default NavigationBar;
