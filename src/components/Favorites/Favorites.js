import React, { Component } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal'
import { deleteWorkout } from '../../api/Workouts';

import './Favorites.css';

class Favorites extends Component {

  state = {
    // TODO: remove from state, causes re-render
    message: ''
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
    deleteWorkout(this.props.userId, workout.id)
      .then(() => {
        const workouts = this.props.workouts;
        workouts.deleteWorkout(workout.id);
        this.props.forceGlobalUpdate();
        this.displayMessage(`Deleted ${workout.name}.`);
      });
  }

  render() {
    const props = this.props;
    const editMode = props.editMode;
    const workoutsVm = props.workouts.getViewModel();

    return (
      <div className='Favorites'>
        <div className='content-wrapper'>
          <div className='content'>
          {this.state.message.length > 0 &&
            <div className={`success-banner`}>{this.state.message}</div>
          }
          <h2>Favorites</h2>
          {workoutsVm.map (workoutVm =>
            workoutVm.workouts.map (workout =>
              <div key={workout.group} className='workouts'>
                <h3 className='workout-title'>{workout.group}</h3>
                {workout.exercises.map(exercise =>
                  <div key={exercise.id} className={`workout-group ${editMode ? 'editing' : ''}`}>
                    {editMode &&
                      <button onClick={e => this.removeWorkout(exercise)} className="delete-button mdc-icon-button material-icons">clear</button>
                    }
                    <div key={exercise.id} className='workout-label'>{exercise.name}</div>
                  </div>
                )}
              </div>
            )
          )}
          </div>
        </div>
        <FavoritesModal
          userId={props.userId}
          workouts={props.workouts}
          forceGlobalUpdate={props.forceGlobalUpdate}
          displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Favorites;
