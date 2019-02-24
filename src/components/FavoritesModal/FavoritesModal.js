import React, { Component } from 'react';
import { saveWorkout } from '../../api/Workouts';
import Fab from '../FloatingActionButton/FloatingActionButton';

import './FavoritesModal.css';
import "@material/button/dist/mdc.button.min.css";

class FavoritesModal extends Component {

  state = {
    show: false,
    group: '',
    workout: '',
    workoutType: 'weight'
  }

  showModal = () => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  }

  clearInput = (e) => {
    e.target.value = '';
    this.setState({
      [e.target.name]: ''
    });
  }

  onGroupChange = (e) => {
    this.setState({ group: e.target.value });
  }

  onWorkoutChange = (e) => {
    this.setState({ workout: e.target.value });
  }

  onWorkoutTypeChange = (e) => {
    this.setState({ workoutType: e.target.value });
  }

  saveWorkout = (e) => {
    e.preventDefault();

    const props = this.props;
    const group = this.state.group;
    const workout = this.state.workout;
    const workoutType = this.state.workoutType;

    props.workouts.addWorkout(group, workout, workoutType);

    saveWorkout(props.userId, props.workouts.get())
      .then(() => {
        props.forceGlobalUpdate();
        props.displayMessage(`Added ${workout} to favorites.`);
      })
      .catch(err => { 
        console.error(`Error adding ${workout} to favorites.`, err);
      });
  }

  render() {
    const onClick = this.state.show ? this.closeModal : this.showModal;
    const label = this.state.show ? 'close' : 'add';

    return (
      <div className='FavoritesModal'>
        <div className={`content ${this.state.show ? 'show' : ''}`}>
          <span onClick={this.closeModal} className='close'>&times;</span>
          <div className='metric'>
            <div className='label'>Group</div>
            <input onChange={this.onGroupChange} type='text' name='group' placeholder='e.g, Chest, Running, Abs, Other'></input>
          </div>
          <div className='metric'>
            <div className='label'>Workout</div>
            <input onChange={this.onWorkoutChange} type='text' name='workout' placeholder='e.g, Push Ups, Treadmill, Plank, Sauna'></input>
          </div>
          <div className='metric type'>
            <div className='label'>Type</div>
            <div className='options'>
              <div>
                <input onChange={this.onWorkoutTypeChange} type='radio' value='weight' checked={this.state.workoutType === 'weight'} />
                <label htmlFor='weight'>Weight Training</label>
              </div>
              <div>
                <input onChange={this.onWorkoutTypeChange} type='radio' value='time' checked={this.state.workoutType === 'time'} />
                <label htmlFor='time'>Time Based</label>
              </div>
            </div>
          </div>
          <button onClick={this.saveWorkout} className="save-workout-button mdc-button">Save</button>
        </div>
        <Fab handleClick={onClick} label={label} />
      </div>
    );
  }
}

export default FavoritesModal;
