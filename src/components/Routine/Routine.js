import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';
import RoutineModal from '../RoutineModal/RoutineModal';
import { saveRoutine } from '../../api/Routine';

import './Routine.css';

class Routine extends Component {

  state = {
    saveMode: false,
    editMode: false
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ editMode: true });
  }

  handleSave = (e) => {
    e.preventDefault();
    this.setState({ saveMode: true });
    this.setState({ editMode: false });
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({ editMode: false });
  }

  handleStartWorkout = (e, workout) => {
    e.preventDefault();

    const today = new Date();
    const date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
    const props = this.props;
    const workoutDay = workout.day;

    // Set date on workout for historical purposes
    props.user.routine[workoutDay].date = date;

    // Reset all exercise status
    workout.forEach(w => {
      w.routine.forEach(r => {
        r.exercises.forEach(e => {
          props.user.routine[workoutDay][w.type][r.muscle][e.name].done = false;
        });
      });
    });

    saveRoutine(props.user.id, props.user.routine[workoutDay], workoutDay)
      .then(() => {
        props.handleUserChange(props.user);
      });
  }

  handleSaveSubmit = () => {
    if (this.state.saveMode === true) {
      this.setState({ saveMode: false });
    }
  }

  render() {
    const workout = this.props.userObj.getWorkouts('Friday');

    return (
      <div className='Routine'>
        <div className={`routine-heading ${this.state.editMode ? 'save-mode' : ''}`}>
          <h2 className='weekday'>{workout.day}</h2>
          {this.state.editMode ? (
            <div className='mode-button-container editing'>
              <button onClick={this.handleSave} className='mode-button save'>Save</button>
              <button onClick={this.handleCancel} className='mode-button cancel'>Cancel</button>
            </div>
          ) : (
            <div className='mode-button-container'>
              <button onClick={(e) => this.handleStartWorkout(e, workout)} className='mode-button reset'>Start Workout</button>
              <button onClick={this.handleEdit} className='mode-button edit'>Edit</button>
            </div>
          )}
        </div>
        {workout.map (w =>
          w.routine.map (r =>
            <div key={r.muscle} className='group'>
              {w.type === 'weight' ? (
                <div className='header'>
                  <h3 className='muscle'>{r.muscle}</h3>
                  <span className='weight'>Weight</span>
                  <span className='reps'>Reps</span>
                  <span className='sets'>Sets</span>
                </div>
              ) : (
                <div className='header'>
                  <h3 className='muscle'>{r.muscle}</h3>
                  <span className='weight'>Time</span>
                  <span className='reps'>Distance</span>
                  <span className='sets'>Kcal</span>
                </div>
              )}
              {r.exercises.map (exercise =>
                <Exercise key={exercise.name}
                  user={this.props.user}
                  workout={workout}
                  workoutType={w.type}
                  routine={r}
                  exercise={exercise}
                  edit={this.state.editMode}
                  save={this.state.saveMode}
                  handleUserChange={this.props.handleUserChange}
                  handleSaveSubmit={this.handleSaveSubmit} />
              )}
            </div>
          )
        )}
        <RoutineModal user={this.props.user} userObj={this.props.userObj} workoutDay={workout.day} handleUserChange={this.props.handleUserChange}/>
      </div>
    );
  }
}

export default Routine;
