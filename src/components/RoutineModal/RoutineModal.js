import React, { Component } from 'react';
import { saveRoutine } from '../../api/RoutineWorkouts';
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
    const props = this.props;
    const user = props.user;
    const workoutDay = props.workoutDay;
    const muscleGroupExercises = user.routine[workoutDay][muscle] || {};

    // TODO: Move to object that has an addExerciseToRoutine() method.
    // Then, pass object to parent to update state.
    muscleGroupExercises[exercise] = { weight: 0, reps: 0, sets: 0 };
    user.routine[workoutDay][muscle] = muscleGroupExercises;

    saveRoutine(user.id, user.routine[workoutDay], workoutDay)
      .then(() => {
        props.handleUserChange(user);
      });
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
