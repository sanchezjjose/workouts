import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import FavoritesModal from '../FavoritesModal/FavoritesModal'
import { deleteWorkout } from '../../api/Workouts';

import './Favorites.css';

class Favorites extends Component {
  static contextType = UserContext;

  state = {
    // TODO: remove from state, causes re-render
    message: '',
    editFavoriteName: ''
  }

  displayMessage = (message) => {
    this.setState({ 
      message: message
    });

    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);
  }

  removeWorkout(workout) {
    deleteWorkout(this.context.user.id, workout.id)
      .then(() => {
        const workouts = this.context.workouts;
        workouts.deleteWorkout(workout.id);
        this.context.updateWorkouts(workouts);
        this.displayMessage(`Deleted ${workout.name}.`);
      });
  }

  handleEdit(id) {
    this.setState({ editFavoriteName: id });
    this.context.updateMode(true, false, false);
  }

  componentDidUpdate() {
    if (this.context.saveMode === true || this.context.cancelMode === true) {
      this.setState({ editFavoriteName: '' });
      this.context.updateMode(false, false, false);
    }
  }

  render() {
    const editFavoriteName = this.state.editFavoriteName;
    const editMode = this.context.editMode && editFavoriteName.length === 0;
    const workoutsVm = this.context.workouts.getViewModel();

    return (
      <div className={`Favorites ${editFavoriteName.length > 0 ? 'editing' : ''}`}>
        <div className='content-wrapper'>
          <div className='content'>
          {this.state.message.length > 0 &&
            <div className={`success-banner`}>{this.state.message}</div>
          }
          <h2>Favorites</h2>
          {workoutsVm.map (workoutVm =>
            workoutVm.workouts.map (workout =>
              <div key={workout.group} className='workouts'>
                <div className='workout-group-heading'>
                  <input type='text'
                    className={`workout-title ${editFavoriteName === workout.group ? 'editing' : ''}`}
                    placeholder='Add a group name'
                    value={workout.group}
                    onClick={() => this.handleEdit(workout.group)}
                    onChange={() => this.handleEdit(workout.group)}
                    readOnly={false} />
                  <span className='input-border'></span>
                </div>
                {workout.exercises.map(exercise =>
                  <div key={exercise.id} className={`workout-group ${editMode ? 'editing' : ''}`}>
                    {editMode &&
                      <button onClick={() => this.removeWorkout(exercise)} className="delete-button mdc-icon-button material-icons">clear</button>
                    }
                    <div key={exercise.id} onClick={() => this.handleEdit(exercise.id)} className={`workout-label ${editFavoriteName === exercise.id ? 'editing' : ''}`}>{exercise.name}</div>
                  </div>
                )}
              </div>
            )
          )}
          </div>
        </div>
        <FavoritesModal displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Favorites;
