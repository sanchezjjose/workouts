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
        type: favorite[0],
        workouts: Object.entries(favorite[1]).map(workout => {
          return {
            muscle: workout[0],
            exercises: workout[1]
          };
        })
      };
    });
  }

  addExercise = (workoutType, muscle, exercise) => {
    const props = this.props;
    const user = props.user;
    const workoutDay = props.workoutDay;
    const muscleGroupExercises = user.routine[workoutDay][workoutType][muscle] || {};
    const initialMetrics = workoutType === 'weight' ?
      { weight: '0', reps: '0', sets: '0', done: false } : { time: '0', distance: '0', calories: '0', done: false };

    // TODO: Move to object that has an addExerciseToRoutine() method.
    // Then, pass object to parent to update state.
    muscleGroupExercises[exercise] = initialMetrics;
    user.routine[workoutDay][workoutType][muscle] = muscleGroupExercises;

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
          {favoritesVm.map (favorite => 
            favorite.workouts.map(workout => 
              <div key={workout.muscle} className='exercises'>
                <h3>{workout.muscle}</h3>
                {workout.exercises.map(exercise =>
                  <div onClick={e => this.addExercise(favorite.type, workout.muscle, exercise)} key={exercise} className='exercise-label'>{exercise}</div>
                )}
              </div>
            )
          )}
        </div>
        <Fab handleClick={onClick} label={label} />
      </div>
    );
  }
}

export default RoutineModal;
