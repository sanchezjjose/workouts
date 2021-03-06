import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import { saveWorkout } from '../../api/Workouts';
import Fab from '../FloatingActionButton/FloatingActionButton';

import './FavoritesModal.css';
import "@material/button/dist/mdc.button.min.css";

class FavoritesModal extends Component {
  static contextType = UserContext;

  state = {
    show: false,
    group: '',
    workout: '',
    workoutType: 'weight'
  }

  showModal = () => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  }

  clearInput = (inputName) => {
    this.refs[inputName].value = '';
    this.setState({
      [inputName]: ''
    });
  }

  onGroupChange = (e) => {
    this.setState({ group: e.target.value });
  }

  onWorkoutChange = (e) => {
    this.setState({ workout: e.target.value });
  }

  onWorkoutTypeChange = (e) => {
    this.setState({ workoutType: e.target.value });
  }

  saveWorkout = () => {
    const props = this.props;
    const group = this.state.group.trim();
    const workout = this.state.workout.trim();
    const workoutType = this.state.workoutType;

    if (group.length > 0 && workout.length > 0) {
      this.context.workouts.addWorkout(group, workout, workoutType);

      saveWorkout(this.context.user.id, this.context.workouts.get())
        .then(() => {
          this.context.updateWorkouts(this.context.workouts);
          props.displayMessage(`Added ${workout} to favorites.`);
          this.clearInput('workout');
        })
        .catch(err => {
          console.error(`Error adding ${workout} to favorites.`, err);
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
            <div className='label'>Group</div>
            <input onChange={this.onGroupChange} type='text' name='group' placeholder='Chest, Running, Abs, Other'></input>
          </div>
          <div className='metric'>
            <div className='label'>Workout</div>
            <input onChange={this.onWorkoutChange} type='text' ref='workout' name='workout' placeholder='Push Ups, Treadmill, Plank, Sauna'></input>
          </div>
          <div className='metric type'>
            <div className='label'>Type</div>
            <div className='options'>
              <div>
                <input onChange={this.onWorkoutTypeChange} type='radio' value='weight' checked={this.state.workoutType === 'weight'} />
                <label htmlFor='weight'>Weight Training</label>
              </div>
              <div>
                <input onChange={this.onWorkoutTypeChange} type='radio' value='time' checked={this.state.workoutType === 'time'} />
                <label htmlFor='time'>Time Based</label>
              </div>
            </div>
          </div>
          <button onClick={this.saveWorkout} className="save-workout-button mdc-button">Save</button>
        </div>
        <Fab handleClick={onClick} label={label} />
      </div>
    );
  }
}

export default FavoritesModal;
