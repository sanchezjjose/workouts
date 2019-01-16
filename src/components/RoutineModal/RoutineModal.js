import React, { Component } from 'react';
import { saveRoutine } from '../../api/Routine';
import Fab from '../FloatingActionButton/FloatingActionButton';

import './RoutineModal.css';
import "@material/button/dist/mdc.button.min.css";

class RoutineModal extends Component {

  state = {
    show: false
  }

  showModal = () => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  }

  addExercise = (routineType, workoutName, exercise) => {
    const props = this.props;
    const user = props.user;
    const dayOfWeek = props.dayOfWeek;
    const exercises = user.routines[dayOfWeek][routineType][workoutName] || {};
    const initialMetrics = routineType === 'weight' ?
      { 
        weight: {
          value: '-',
          unit: this.props.user.settings.units['weight']
        }, 
        reps: {
          value: '-',
          unit: '-'
        }, 
        sets: {
          value: '-',
          unit: '-'
        },
        done: false
      } : { 
        time: {
          value: '-',
          unit: this.props.user.settings.units['time']
        }, 
        distance: {
          value: '-',
          unit: this.props.user.settings.units['distance']
        }, 
        kcal: {
          value: '-',
          unit: '-'
        },
        done: false
      };

    // TODO: Move to object that has an addExerciseToRoutine() method.
    // Then, pass object to parent to update state.
    exercises[exercise] = initialMetrics;
    user.routines[dayOfWeek][routineType][workoutName] = exercises;

    saveRoutine(user.id, user.routines[dayOfWeek], dayOfWeek)
      .then(() => {
        props.handleUserChange(user);
        props.displayMessage(`Added ${exercise} to routine.`);

      }).catch(err => {
        console.error(`Error adding exercise to workout.`, err);
      });
  }

  render() {
    const onClick = this.state.show ? this.closeModal : this.showModal;
    const label = this.state.show ? 'close' : 'add';
    const favoritesVm = this.props.userObj.getFavorites();
    const hasFavorites = (favoritesVm[0].workouts.length + favoritesVm[1].workouts.length) > 0;

    return (
      <div className='RoutineModal'>
        <div className={`content ${this.state.show ? 'show' : ''}`}>
          {!hasFavorites &&
            <div className='description'>
              <p className='message'>
                This will show a list of exercises to add to your routine
                from your Favorites list.
              </p>
              <div>
              <a className='link-favorites' href={`${this.props.user.id}/favorites`}>ADD FAVORITE EXERCISES</a>
              </div>
            </div>
          }
          {favoritesVm.map (favorite => 
            favorite.workouts.map(workout => 
              <div key={workout.name} className='exercises'>
                <h3>{workout.name}</h3>
                {workout.exercises.map(exercise =>
                  <div onClick={e => this.addExercise(favorite.type, workout.name, exercise)} key={exercise} className='exercise-label'>{exercise}</div>
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
