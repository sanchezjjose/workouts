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
    routineType: 'weight'
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

  onWorkoutChange = (e) => {
    this.setState({ workout: e.target.value });
  }

  onExerciseNameChange = (e) => {
    this.setState({ exerciseName: e.target.value });
  }

  onRoutineTypeChange = (e) => {
    this.setState({ routineType: e.target.value });
  }

  saveExercise = (e) => {
    e.preventDefault();

    const props = this.props;
    const routineType = this.state.routineType;
    const workout = this.state.workout;
    const exerciseName = this.state.exerciseName;
    const favorites = props.favorites;

    favorites[routineType][workout] = favorites[routineType][workout] || [];

    if (favorites[routineType][workout].indexOf(exerciseName) === -1) {
      saveFavoriteExercise(props.userId, routineType, workout, exerciseName)
        .then(() => {
          favorites[routineType][workout].push(exerciseName);
          props.handleFavoritesChange(favorites);
          props.displayMessage(`Added ${exerciseName} to favorites.`);
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
            <input onChange={this.onWorkoutChange} type='text' name='workout' placeholder='e.g, Chest, Running, Abs, Other'></input>
          </div>
          <div className='metric'>
            <div className='label'>Exercise Name</div>
            <input onChange={this.onExerciseNameChange} type='text' name='exerciseName' placeholder='e.g, Push Ups, Treadmill, Plank, Sauna'></input>
          </div>
          <div className='metric type'>
            <div className='label'>Type</div>
            <div className='options'>
              <div>
                <input onChange={this.onRoutineTypeChange} type='radio' value='weight' checked={this.state.routineType === 'weight'} />
                <label htmlFor='weight'>Weight Training</label>
              </div>
              <div>
                <input onChange={this.onRoutineTypeChange} type='radio' value='time' checked={this.state.routineType === 'time'} />
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
