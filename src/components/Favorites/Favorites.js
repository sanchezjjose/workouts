import React, { Component } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal'
import { removeFavoriteExercise } from '../../api/Favorites';

import './Favorites.css';

class Favorites extends Component {

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

  removeExercise(workoutType, muscle, exercise) {
    const user = this.props.user;
    const exercises = user.favorites[workoutType][muscle];
    const updatedExercises = exercises.filter(e => e !== exercise);

    user.favorites[workoutType][muscle] = updatedExercises;

    if (updatedExercises.length === 0) {
      delete user.favorites[workoutType][muscle];
    }

    this.props.handleFavoritesChange(user);

    removeFavoriteExercise(user.id, workoutType, muscle, updatedExercises);
  }

  render() {
    const favoritesVm = this.getFavoriteExercisesViewModel(this.props.user.favorites);

    return (
      <div className='Favorites'>
        <div className='content-wrapper'>
          <div className='content'>
          <h2>Favorite Exercises.</h2>
          {favoritesVm.map (favorite =>
            favorite.workouts.map(workout =>
              <div key={workout.muscle} className='exercises'>
                <h3 className='workout-title'>{workout.muscle}</h3>
                {workout.exercises.map(exercise =>
                  <div key={exercise} className='exercise-group'>
                    <button onClick={e => this.removeExercise(favorite.type, workout.muscle, exercise)} className="remove-button mdc-icon-button material-icons">clear</button>
                    <div key={exercise} className='exercise-label'>{exercise}</div>
                  </div>
                )}
              </div>
            )
          )}
          </div>
        </div>
        <FavoritesModal user={this.props.user} handleFavoritesChange={this.props.handleFavoritesChange} />
      </div>
    );
  }
}

export default Favorites;
