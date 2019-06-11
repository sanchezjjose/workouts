import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import FavoritesModal from '../FavoritesModal/FavoritesModal';
import FavoritesGroup from './FavoritesGroup';
import FavoritesName from './FavoritesName';
import { deleteWorkout } from '../../api/Workouts';

import './Favorites.css';

class Favorites extends Component {
  static contextType = UserContext;

  state = {
    // TODO: remove from state, causes re-render
    message: '',
    editingText: false
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

  handleEditingText = (editingText) => {
    this.setState({ editingText: editingText });
  }

  render() {
    const editMode = this.context.editMode && !this.state.editingText;
    const workoutsVm = this.context.workouts.getViewModel();

    return (
      <div className={`Favorites ${this.state.editingText ? 'editing' : ''}`}>
        <div className='content-wrapper'>
          <div className='content'>
          {this.state.message.length > 0 &&
            <div className={`success-banner`}>{this.state.message}</div>
          }
          <h2>Favorites</h2>
          {workoutsVm.map (workoutVm =>
            workoutVm.workouts.map (workout =>
              <div key={workout.group} className='workouts'>
                <FavoritesGroup workout={workout} handleEditingText={this.handleEditingText} />
                {workout.exercises.map(exercise =>
                  <div key={exercise.id} className={`workout-names ${editMode ? 'editing' : ''}`}>
                    {editMode &&
                      <button onClick={() => this.removeWorkout(exercise)} className="delete-button mdc-icon-button material-icons">clear</button>
                    }
                    <FavoritesName key={exercise.id} id={exercise.id} name={exercise.name} handleEditingText={this.handleEditingText} />
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
