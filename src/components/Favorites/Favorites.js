import React, { Component } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal'
import { removeFavoriteExercise } from '../../api/Favorites';

import './Favorites.css';

class Favorites extends Component {

  getFavoriteExercisesViewModel(favorites = {}) {
    return Object.entries(favorites).map(favorite => {
      return {
        muscle: favorite[0],
        exercises: favorite[1]
      }
    });
  }

  removeExercise(muscle, exercise) {
    const user = this.props.user;
    const updatedExercises = user.favorites[muscle].filter(e => e !== exercise);

    user.favorites[muscle] = updatedExercises;
    this.props.handleFavoritesChange(user);

    removeFavoriteExercise(user.id, muscle, updatedExercises);
  }

  render() {
    const favoritesVm = this.getFavoriteExercisesViewModel(this.props.user.favorites);

    return (
      <div className='Favorites'>
        <div className='content-wrapper'>
          <div className='content'>
            <h1>Your Favorite Exercises</h1>
            {favoritesVm.map(favorite => {
              return (
                <div key={favorite.muscle} className='exercises'>
                  <h3>{favorite.muscle}</h3>
                  {favorite.exercises.map(exercise =>
                    <div key={exercise} className='exercise-group'>
                      <button onClick={e => this.removeExercise(favorite.muscle, exercise)} className="remove-button mdc-icon-button material-icons">remove_circle_outline</button>
                      <div key={exercise} className='exercise-label'>{exercise}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <FavoritesModal user={this.props.user} handleFavoritesChange={this.props.handleFavoritesChange} />
      </div>
    );
  }
}

export default Favorites;
