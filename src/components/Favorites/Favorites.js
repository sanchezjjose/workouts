import React, { Component } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal'
import { removeFavoriteExercise } from '../../api/Favorites';

import './Favorites.css';

class Favorites extends Component {

  state = {
    message: ''
  }

  displayMessage = (message) => {
    this.setState({ 
      message: message
    });

    setTimeout(() => {
      this.setState({ message: '' });
    }, 1500);
  }

  removeExercise(workoutType, workoutName, exercise) {
    const user = this.props.user;
    const exercises = user.favorites[workoutType][workoutName];
    const updatedExercises = exercises.filter(e => e !== exercise);

    user.favorites[workoutType][workoutName] = updatedExercises;

    if (updatedExercises.length === 0) {
      delete user.favorites[workoutType][workoutName];
    }

    removeFavoriteExercise(user.id, workoutType, workoutName, updatedExercises)
      .then(() => {
        this.props.handleUserChange(user, this.props.editMode);
        this.displayMessage(`Deleted ${exercise} from favorites.`);
      });
  }

  render() {
    const favoritesVm = this.props.userObj.getFavorites();
    const editMode = this.props.editMode;

    return (
      <div className='Favorites'>
        <div className='content-wrapper'>
          <div className='content'>
          {this.state.message.length > 0 &&
            <div className={`success-banner`}>{this.state.message}</div>
          }
          <h2>Favorite Exercises</h2>
          {favoritesVm.map (favorite =>
            favorite.workouts.map(workout =>
              <div key={workout.name} className='exercises'>
                <h3 className='workout-title'>{workout.name}</h3>
                {workout.exercises.map(exercise =>
                  <div key={exercise} className={`exercise-group ${editMode ? 'editing' : ''}`}>
                    {editMode &&
                      <button onClick={e => this.removeExercise(favorite.type, workout.name, exercise)} className="delete-button mdc-icon-button material-icons">clear</button>
                    }
                    <div key={exercise} className='exercise-label'>{exercise}</div>
                  </div>
                )}
              </div>
            )
          )}
          </div>
        </div>
        <FavoritesModal user={this.props.user} handleUserChange={this.props.handleUserChange} displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Favorites;
