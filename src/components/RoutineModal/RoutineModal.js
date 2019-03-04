import React, { Component } from 'react';
import { saveWorkout } from '../../api/Workouts';
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

  addExercise = (id, name) => {
    const day = this.props.dayOfWeek;
    const userId = this.props.userId;
    const workouts = this.props.workouts;
    
    workouts.addWorkoutDay(id, day);

    saveWorkout(userId, workouts.get())
      .then(() => {
        this.props.forceGlobalUpdate();
        this.props.displayMessage(`Added ${name}.`);

      }).catch(err => {
        console.error(`Error adding exercise to routine.`, err);
      });
  }

  render() {
    const onClick = this.state.show ? this.closeModal : this.showModal;
    const label = this.state.show ? 'close' : 'add';
    const workouts = this.props.workouts;
    const workoutsVm = workouts.getViewModel();

    return (
      <div className='RoutineModal'>
        <div className={`content ${this.state.show ? 'show' : ''}`}>
          {!workoutsVm.length > 0 &&
            <div className='description'>
              <p className='no-favorites-message'>
                This will show a list of your favorite exercises to add to your routine.
              </p>
              <div>
              <a className='link-favorites' href={`${this.props.userId}/favorites`}>CREATE FAVORITES</a>
              </div>
            </div>
          }
          {workoutsVm.map (workoutVm => 
            workoutVm.workouts.map(workout => 
              <div key={workout.group} className='exercises'>
                <h3>{workout.group}</h3>
                {workout.exercises.map(exercise =>
                  <div onClick={e => this.addExercise(exercise.id, exercise.name)} key={exercise.id} className='exercise-label'>{exercise.name}</div>
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
