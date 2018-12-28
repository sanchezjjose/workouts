import React, { Component } from 'react';
import { saveFavoriteExercise } from '../../api/Favorites';
import Fab from '../FloatingActionButton/FloatingActionButton';

import './FavoritesModal.css';
import "@material/button/dist/mdc.button.min.css";

class FavoritesModal extends Component {

  state = {
    show: false,
    workout: '',
    exerciseName: '',
    workoutType: 'weight'
  }

  showModal = () => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  }

  onWorkoutChange = (e) => {
    this.setState({ workout: e.target.value });
  }

  onExerciseNameChange = (e) => {
    this.setState({ exerciseName: e.target.value });
  }

  onWorkoutTypeChange = (e) => {
    this.setState({ workoutType: e.target.value });
  }

  saveExercise = (e) => {
    e.preventDefault();

    const workoutType = this.state.workoutType;
    const workout = this.state.workout;
    const exerciseName = this.state.exerciseName;
    const user = this.props.user;
    const favorites = user.favorites;

    favorites[workoutType][workout] = favorites[workoutType][workout] || [];

    if (favorites[workoutType][workout].indexOf(exerciseName) === -1) {
      saveFavoriteExercise(user.id, workoutType, workout, exerciseName)
        .then(() => {
          favorites[workoutType][workout].push(exerciseName);
          this.props.handleUserChange(user);
          this.props.displayMessage(`Added ${exerciseName} to favorites.`);
        })
        .catch(err => { 
          console.error('Error adding exercise to favorites.', err);
        });
    }
  }

  render() {
    const onClick = this.state.show ? this.closeModal : this.showModal;
    const label = this.state.show ? 'close' : 'add';

    return (
      <div className='FavoritesModal'>
        <div className={`content ${this.state.show ? 'show' : ''}`}>
          <span onClick={this.closeModal} className='close'>&times;</span>
          <div className='metric'>
            <div className='label'>Workout</div>
            <input onChange={this.onWorkoutChange} type='text' placeholder='e.g, Chest, Running, Abs, Other'></input>
          </div>
          <div className='metric'>
            <div className='label'>Exercise Name</div>
            <input onChange={this.onExerciseNameChange} type='text' placeholder='e.g, Push Ups, Treadmill, Plank, Sauna'></input>
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
          <button onClick={this.saveExercise} className="save-exercise-button mdc-button">Save</button>
        </div>
        <Fab handleClick={onClick} label={label} />
      </div>
    );
  }
}

export default FavoritesModal;
