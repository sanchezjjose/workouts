import React, { Component } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal'

import './Favorites.css';

class Favorites extends Component {

  state = {
    showModal: false
  }

  getFavoriteExercisesViewModel(favorites = {}) {
    return Object.entries(favorites).map(favorite => {
      return {
        muscle: favorite[0],
        exercises: favorite[1]
      }
    });
  }

  addExercise = () => {
    this.setState({ showModal: true });
  };

  render() {
    const favoritesVm = this.getFavoriteExercisesViewModel(this.props.favorites);

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
                    <div key={exercise}>{exercise}</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <FavoritesModal show={this.state.showModal} />
        <button onClick={this.addExercise} className="mdc-fab add-button" aria-label="Add">
          <span className="mdc-fab__icon material-icons">add</span>
        </button>
      </div>
    );
  }
}

export default Favorites;
