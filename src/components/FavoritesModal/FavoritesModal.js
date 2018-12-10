import React, { Component } from 'react';
import Fab from '../FloatingActionButton/FloatingActionButton';

import './FavoritesModal.css';
import "@material/button/dist/mdc.button.min.css";

class FavoritesModal extends Component {

  state = {
    show: false,
    muscleGroup: '',
    exerciseName: '',
    workoutType: 'strength'
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

    const muscleGroup = this.state.muscleGroup;
    const exercise = this.state.exerciseName;
    const user = this.props.user;
    const favorites = user.exercises;

    favorites[muscleGroup] = favorites[muscleGroup] || [];

    if (favorites[muscleGroup].indexOf(exercise) === -1) {
      console.log(`Adding ${exercise} to ${favorites[muscleGroup]} favorites...`);
      favorites[muscleGroup].push(exercise);

      // TODO: Save change to DB
      this.props.handleFavoritesChange(user);
    }
  }

  render() {
    const onClick = this.state.show ? this.closeModal : this.showModal;
    const label = this.state.show ? 'close' : 'add';

    return (
      <div className='FavoritesModal'>
        <div className={`content ${this.state.show ? 'show' : ''}`}>
          <span onClick={this.closeModal} className='close'>&times;</span>
          <button onClick={this.saveExercise} className="save-exercise-button mdc-button">Save</button>
          <div>
            <span label='Muscle'>Muscle Group: </span>
            <input onChange={this.onMuscleGroupChange} type='text' name='muscle' placeholder='Chest'></input>
          </div>
          <div>
            <span label='Exercise'>Exercise Name: </span>
            <input onChange={this.onExerciseNameChange} type='text' name='exercise' placeholder='Push Ups'></input>
          </div>
          <div>
            <span label='Type'>Workout Type: </span>
            <div>
              <input onChange={this.onWorkoutTypeChange} type='radio' id='strength' name='type' value='strength' checked={this.state.workoutType === 'strength'} />
              <label htmlFor='strength'>Strength</label>
              <input onChange={this.onWorkoutTypeChange} type='radio' id='cardio' name='type' value='cardio' checked={this.state.workoutType === 'cardio'} />
              <label htmlFor='cardio'>Cardio</label>
            </div>
          </div>
        </div>
        <Fab handleClick={onClick} label={label} />
      </div>
    );
  }
}

export default FavoritesModal;
