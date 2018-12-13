import React, { Component } from 'react';
// import { saveFavoriteExercise } from '../../api/Favorites';
import Fab from '../FloatingActionButton/FloatingActionButton';

import './RoutineModal.css';
import "@material/button/dist/mdc.button.min.css";

class RoutineModal extends Component {

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
    const favorites = user.favorites;

    favorites[muscleGroup] = favorites[muscleGroup] || [];

    if (favorites[muscleGroup].indexOf(exercise) === -1) {
      // saveFavoriteExercise(user.id, muscleGroup, exercise)
      //   .then(() => {
      //     favorites[muscleGroup].push(exercise);
      //     this.props.handleFavoritesChange(user);
      //   })
      //   .catch(err => console.error('Error adding exercise to favorites.', err));
    }
  }

  // TODO: Move to class object.
  getFavoriteExercisesViewModel(favorites = {}) {
    return Object.entries(favorites).map(favorite => {
      return {
        muscle: favorite[0],
        exercises: favorite[1]
      }
    });
  }

  addExercise = (muscle, exercise) => {
    console.log(`Adding ${exercise} to routine for muscle group ${muscle}.`);
    // const workoutDay = this.props.workoutDay;
    const workoutDay = 'Friday';
    const routine = this.props.user.routine[workoutDay][muscle] || {};

    routine[exercise] = {
      weight: 0,
      reps: 0,
      sets: 0
    };

    console.log(this.props.user.routine);
  }

  render() {
    const onClick = this.state.show ? this.closeModal : this.showModal;
    const label = this.state.show ? 'close' : 'add';
    const favoritesVm = this.getFavoriteExercisesViewModel(this.props.user.favorites);

    return (
      <div className='FavoritesModal'>
        <div className={`content ${this.state.show ? 'show' : ''}`}>
          {favoritesVm.map (favorite => {
            return (
              <div key={favorite.muscle} className='exercises'>
                <h3>{favorite.muscle}</h3>
                {favorite.exercises.map(exercise =>
                  <div onClick={e => this.addExercise(favorite.muscle, exercise)} key={exercise} className='exercise-label'>{exercise}</div>
                )}
              </div>
            )
          })}
        </div>
        <Fab handleClick={onClick} label={label} />
      </div>
    );
  }
}

export default RoutineModal;
