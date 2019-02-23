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
        this.props.handleWorkoutsChange(workouts);
        this.displayMessage(`Deleted ${workout.name}.`);
      });
  }

  render() {
    const props = this.props;
    // const favoritesVm = props.favorites.getViewModel();
    const editMode = props.editMode;

    const favoritesVm = props.workouts.getViewModel();

    return (
      <div className='Favorites'>
        <div className='content-wrapper'>
          <div className='content'>
          {this.state.message.length > 0 &&
            <div className={`success-banner`}>{this.state.message}</div>
          }
          <h2>Favorite Exercises</h2>
          {favoritesVm.map (favorite =>
            // favorite.workouts.sort(compareNames).map(workout =>
              <div key={favorite.name} className='exercises'>
                <h3 className='workout-title'>{favorite.name}</h3>
                {favorite.exercises.map(exercise =>
                  <div key={exercise.id} className={`exercise-group ${editMode ? 'editing' : ''}`}>
                    {editMode &&
                      <button onClick={e => this.removeWorkout(exercise)} className="delete-button mdc-icon-button material-icons">clear</button>
                    }
                    <div key={exercise.id} className='exercise-label'>{exercise.name}</div>
                  </div>
                )}
              </div>
            // )
          )}
          </div>
        </div>
        {/* <FavoritesModal
          userId={props.userId}
          favorites={props.favorites}
          handleFavoritesChange={props.handleFavoritesChange}
          displayMessage={this.displayMessage} /> */}
      </div>
    );
  }
}

export default Favorites;
