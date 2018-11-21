import React, { Component } from 'react';

import './Home.css';

import { addExerciseHistory, deleteExerciseHistory } from '../../api/WorkoutsAPI';

import { MDCRipple } from '@material/ripple';
import "@material/fab/dist/mdc.fab.min.css";
import "@material/icon-button/dist/mdc.icon-button.min.css";


class Home extends Component {

  state = {
    edit: false
  }

  handleMarkDone = (e, muscle, exercise) => {
    const date = new Date();
    const historicalDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    const id = this.props.user.id;

    // TODO: add state variable to manage exercise status
    if (e.target.innerText === 'check_circle_outline') {
      e.target.innerText = 'check_circle';
      e.target.classList.add('fill');

      // Save to history
      addExerciseHistory(id, historicalDate, muscle, exercise)
        .then(result => {
          console.log('Successfully saved workout to history.');
        })
        .catch(e => {
          console.error(e);
        });

    } else {
      e.target.innerText = 'check_circle_outline';
      e.target.classList.remove('fill');

      // Remove from history
      deleteExerciseHistory(id, historicalDate, muscle, exercise)
        .then(result => {
          console.log('Successfully removed workout to history.');
        })
        .catch(e => {
          console.error(e);
        });
    }
  }

  handleEdit = (e) => {
    e.preventDefault();

    console.log('Edit clicked...');

    this.setState({ edit: !this.state.edit });
  }

  handleDelete = (e) => {
    e.preventDefault();

    console.log('Deleting exercise...');
  }

  componentDidUpdate() {
    new MDCRipple(document.querySelector('.mdc-fab'));
  }

  render() {
    const workout = this.props.workout;
    const routines = workout.routines || [];

    return (
      <div className='Home'>
        <h1>{this.props.user.name}'s Workout</h1>
        <div className='content-wrapper'>
        {routines.length > 0 && 
          <div className='content'>
            <div className='routine-heading'>
              <h2 className='weekday'>{workout.day}</h2>
              <button onClick={this.handleEdit} className='edit'>Edit</button>
            </div>
            {routines.map (routine => {
              return (
                <div key={routine.muscle} className='group'>
                  <div className='header'>
                    <h3 className='muscle'>{routine.muscle}</h3>
                    <span className='weight'>Weight</span>
                    <span className='reps'>Reps</span>
                    <span className='sets'>Sets</span>
                  </div>
                  {routine.exercises.map (exercise => {
                    return (
                      <div key={exercise.name} className='exercise'>
                        {this.state.edit &&
                          <button onClick={e => this.handleDelete(e, routine.muscle, exercise)} className="delete-button mdc-icon-button material-icons">delete</button>
                        }
                        <button onClick={e => this.handleMarkDone(e, routine.muscle, exercise)} className="status-button mdc-icon-button material-icons">check_circle_outline</button>
                        <div className='name'>{exercise.name}</div>
                        <div className='weight'>{exercise.metric.weight}</div>
                        <div className='reps'>{exercise.metric.reps}</div>
                        <div className='sets'>{exercise.metric.sets}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <button className="mdc-fab add-exercise-button" aria-label="Add">
              <span className="mdc-fab__icon material-icons">add</span>
            </button>
          </div>
        }
        </div>
      </div>
    );
  }
}

export default Home;
