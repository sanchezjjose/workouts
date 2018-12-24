import React, { Component } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal'
import { removeFavoriteExercise } from '../../api/Favorites';

import './Favorites.css';

class Favorites extends Component {

  removeExercise(workoutType, muscle, exercise) {
    const user = this.props.user;
    const exercises = user.favorites[workoutType][muscle];
    const updatedExercises = exercises.filter(e => e !== exercise);

    user.favorites[workoutType][muscle] = updatedExercises;

    if (updatedExercises.length === 0) {
      delete user.favorites[workoutType][muscle];
    }

    this.props.handleUserChange(user);

    removeFavoriteExercise(user.id, workoutType, muscle, updatedExercises);
  }

  render() {
    const favoritesVm = this.props.userObj.getFavorites();

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
        <FavoritesModal user={this.props.user} handleUserChange={this.props.handleUserChange} />
      </div>
    );
  }
}

export default Favorites;
