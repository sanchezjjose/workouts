import React, { Component } from 'react';

import './Home.css';

class Home extends Component {

  render () {
    const workout = this.props.workout;
    const routines = workout.routines || [];

    return (
      <div className='Home'>
        <h1>Jose's Workouts</h1> 
        <div className='content-wrapper'>
        {routines.length > 0 && 
          <div className='content'>
            <h2 className='weekday'>{workout.day}</h2>
            {routines.map (routine => {
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
                      <div key={exercise.name} className='exercise'>
                        <div className='name'>{exercise.name}</div>
                        <div className='weight'>{exercise.metric.weight}</div>
                        <div className='reps'>{exercise.metric.reps}</div>
                        <div className='sets'>{exercise.metric.sets}</div>
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
