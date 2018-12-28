import React, { Component } from 'react';
import { saveFavoriteExercise } from '../../api/Favorites';
import Fab from '../FloatingActionButton/FloatingActionButton';

import './FavoritesModal.css';
import "@material/button/dist/mdc.button.min.css";

class FavoritesModal extends Component {

  state = {
    show: false,
    muscleGroup: '',
    exerciseName: '',
    workoutType: 'weight'
  }

  showModal = () => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  }

  onMuscleGroupChange = (e) => {
    this.setState({ muscleGroup: e.target.value });
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
    const muscleGroup = this.state.muscleGroup;
    const exercise = this.state.exerciseName;
    const user = this.props.user;
    const favorites = user.favorites;
    
    favorites[workoutType][muscleGroup] = favorites[workoutType][muscleGroup] || [];

    if (favorites[workoutType][muscleGroup].indexOf(exercise) === -1) {
      saveFavoriteExercise(user.id, workoutType, muscleGroup, exercise)
        .then(() => {
          favorites[workoutType][muscleGroup].push(exercise);
          this.props.handleUserChange(user);
          this.props.displayMessage(`Added ${exercise} to favorites.`);
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
          <div className='metric weight'>
            <div className='label'>Workout</div>
            <input onChange={this.onMuscleGroupChange} type='text' name='muscle' placeholder='e.g, Chest, Running, Abs, Other'></input>
          </div>
          <div className='metric name'>
            <div className='label'>Exercise</div>
            <input onChange={this.onExerciseNameChange} type='text' name='exercise' placeholder='e.g, Push Ups, Treadmill, Plank, Sauna'></input>
          </div>
          <div className='metric type'>
            <div className='label'>Type</div>
            <div className='options'>
              <div>
                <input onChange={this.onWorkoutTypeChange} type='radio' id='weight' name='type' value='weight' checked={this.state.workoutType === 'weight'} />
                <label htmlFor='weight'>Weight Training</label>
              </div>
              <div>
                <input onChange={this.onWorkoutTypeChange} type='radio' id='time' name='type' value='time' checked={this.state.workoutType === 'time'} />
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
