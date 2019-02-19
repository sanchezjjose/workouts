import React, { Component } from 'react';
import FavoritesModal from '../FavoritesModal/FavoritesModal'
import { removeFavoriteExercise } from '../../api/Favorites';
import { compareNames } from '../../lib/Util';

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

  removeExercise(routineType, workoutName, exercise) {
    const props = this.props;
    const exercises = props.favorites[routineType][workoutName];
    const updatedExercises = exercises.filter(e => e !== exercise);

    props.favorites[routineType][workoutName] = updatedExercises;

    if (updatedExercises.length === 0) {
      delete props.favorites[routineType][workoutName];
    }

    removeFavoriteExercise(props.userId, routineType, workoutName, updatedExercises)
      .then(() => {
        this.props.handleFavoritesChange(props.favorites);
        this.displayMessage(`Deleted ${exercise} from favorites.`);
      });
  }

  render() {
    const props = this.props;
    const favoritesVm = props.favorites.get();
    const editMode = props.editMode;

    return (
      <div className='Favorites'>
        <div className='content-wrapper'>
          <div className='content'>
          {this.state.message.length > 0 &&
            <div className={`success-banner`}>{this.state.message}</div>
          }
          <h2>Favorite Exercises</h2>
          {favoritesVm.map (favorite =>
            favorite.workouts.sort(compareNames).map(workout =>
              <div key={workout.name} className='exercises'>
                <h3 className='workout-title'>{workout.name}</h3>
                {workout.exercises.sort().map(exercise =>
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
        <FavoritesModal
          user={props.user}

          userId={props.userId}
          favoritesVm={favoritesVm}
          handleFavoritesChange={props.handleFavoritesChange}
          displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Favorites;
