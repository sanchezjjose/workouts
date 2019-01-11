import React, { Component } from 'react';

import './NavigationBar.css';

class NavigationBar extends Component {

  handleEdit = (e) => {
    e.preventDefault();
    this.props.handleUserChange(this.props.user, true, false);
  }

  handleSave = (e) => {
    e.preventDefault();
    this.props.handleUserChange(this.props.user, false, true);
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.handleUserChange(this.props.user, false, false);
  }

  render() {
    return (
      <header className='NavigationBar top-app-bar'>
        <section className='top-app-bar__section--align-start'>
          <span className='title'>Workouts</span>
        </section>
        <section className={`top-app-bar__section--align-end ${this.props.editMode ? 'editing' : ''}`}>
        {this.props.editMode ? (
          <section className='editing'>
            <button onClick={this.handleSave} className='mdc-top-app-bar__action-item'>Save</button>
            <button onClick={this.handleCancel} className='material-icons mdc-top-app-bar__action-item'>cancel</button>
          </section>
        ) : (
          <section>
            <button onClick={this.handleEdit} className='material-icons mdc-top-app-bar__action-item'>edit</button>
          </section>
        )}
        <button onClick={this.handleEdit} className='material-icons mdc-top-app-bar__action-item'>more_horiz</button>
        </section>
      </header>
    );
  }
}

export default NavigationBar;
