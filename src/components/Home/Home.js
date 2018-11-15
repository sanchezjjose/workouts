import React, { Component } from 'react';

import './Home.css';

class Home extends Component {

  render () {
    const workout = this.props.workout;

    return (
      <div className='Home'>
        <h1>Jose's Workouts</h1> 
        <div className='content-wrapper'>
        {workout.routine && workout.routine.length > 0 && 
          <div className='content'>
            <h2 className='weekday'>{workout.day}</h2>
            {workout.routine.map (routine => {
              return (
                <div key={routine.muscle} className='group'>
                  <div className='header'>
                    <h3 className='muscle'>{routine.muscle}</h3>
                    <span className='weight'>Weight <span className='unit'>(lbs)</span></span>
                    <span className='reps'>Reps</span>
                    <span className='sets'>Sets</span>
                  </div>
                  {routine.exercises.map (exercise => {
                    return (
                      <div key={exercise[0]} className='workout'>
                        <div className='type'>{exercise[0]}</div>
                        <div className='weight'>{exercise[1].weight}</div>
                        <div className='reps'>{exercise[1].reps}</div>
                        <div className='sets'>{exercise[1].sets}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        }
        </div>
      </div>
    );
  }
}

export default Home;
