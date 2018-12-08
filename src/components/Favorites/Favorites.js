import React, { Component } from 'react';
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

  closeModal = () => {
    this.setState({ showModal: false });
  }

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
        <div className={`modal ${this.state.showModal ? 'show' : ''}`}>
          <span onClick={this.closeModal} className='close'>&times;</span>
          <p>Some text in the Modal..</p>
        </div>
        <button onClick={this.addExercise} className="mdc-fab add-exercise-button" aria-label="Add">
          <span className="mdc-fab__icon material-icons">add</span>
        </button>
      </div>
    );
  }
}

export default Favorites;
