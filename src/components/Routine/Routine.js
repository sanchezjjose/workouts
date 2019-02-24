import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';
import RoutineModal from '../RoutineModal/RoutineModal';
import { saveRoutine } from '../../api/Routine';

import './Routine.css';

class Routine extends Component {

  state = {
    message: '',
    activeVideo: '',
    transitionClassName: 'hidden'
  }

  componentDidMount() {
    // Delay workaround to ensure transition is set on safari browser
    setTimeout(() => {
      this.setState({ transitionClassName: '' });
    }, 100);
  }

  displayMessage = (message) => {
    this.setState({ 
      message: message 
    });

    // TODO: Remove message state variable. Causes a re-render of all metrics when message banner dissapears.
    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);
  }

  handleStartWorkout = (e) => {
    e.preventDefault();

    const dayOfWeek = this.props.dayOfWeek;
    const routine = this.props.userObj.getRoutineByDay(dayOfWeek);
    const today = new Date();
    const todayDateFormatted = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
    const user = this.props.user;

    // Set date on workout for historical purposes
    user.routines[dayOfWeek].date = todayDateFormatted;

    // Reset all exercise status
    routine.forEach(routineType => {
      routineType.workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          user.routines[dayOfWeek][routineType.type][workout.name][exercise.name].done = false;
        });
      });
    });

    saveRoutine(user.id, user.routines[dayOfWeek], dayOfWeek)
      .then(() => {
        this.props.handleUserChange(user, false, false);
      });
  }

  handleVideoClick = (e) => {
    e.preventDefault();
    this.setState({ activeVideo: e.target.name });
  }

  isTodaysWorkoutStarted = (workoutDateFormatted) => {
    const today = new Date();
    const todayDateFormatted = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;

    return todayDateFormatted === workoutDateFormatted;
  }

  render() {
    const dayOfWeek = this.props.dayOfWeek;
    const routine = this.props.userObj.getRoutineByDay(dayOfWeek);
    const workoutDateFormatted = this.props.userObj.getWorkoutDate(dayOfWeek);
    const workoutStartedToday = this.isTodaysWorkoutStarted(workoutDateFormatted);
    const didWorkout = typeof workoutDateFormatted !== 'undefined';
    // const hasWorkouts = (routine[0].workouts.length + routine[1].workouts.length) > 0;
    const workoutDateClassName = (typeof workoutDateFormatted === 'string') ? 'show' : 'hide';
    const workoutButtonClassName = (!workoutStartedToday) ? 'show' : 'hide';
    const workoutStartedClassName = workoutStartedToday ? 'workout-started' : '';

    const workouts = this.props.workouts;
    const workoutsVm = workouts.getViewModel(dayOfWeek);

    return (
      <div className={`Routine ${this.state.transitionClassName} ${workoutStartedClassName}`}>
        {this.state.message.length > 0 &&
          <div className={`success-banner`}>{this.state.message}</div>
        }
        {workoutsVm.length > 0 ? (
          <div className={`routine-heading`}>
            <div className='weekday'>{routine.day} Routine</div>
            <div className={`subtitle ${workoutDateClassName}`}>{workoutDateFormatted}</div>
            <button className={`start-workout-button ${workoutButtonClassName}`} onClick={this.handleStartWorkout}>Start Workout</button>
          </div>
        ) : (
          <div className='empty-routine-message'>
            Enjoy a well deserved day off. <br/>
            Otherwise, get motived! <br/><br/>
            <div className='motivation-links'>
              <div className='motivation-video'>
                <a onClick={this.handleVideoClick} name='jocko' href='https://www.youtube.com/watch?v=z3ScszkzJqk'>Jocko Willink Motivation.</a>
                <iframe className={`embedded ${this.state.activeVideo === 'jocko' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/z3ScszkzJqk"
                  title="Jocko Motivation" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className='motivation-video'>
                <a onClick={this.handleVideoClick} name='goggins' href='https://www.youtube.com/watch?v=eClN__7Avuk'>David Goggins Motivation.</a>
                <iframe className={`embedded ${this.state.activeVideo === 'goggins' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/eClN__7Avuk"
                  title="Goggins Motivation" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
              <div className='motivation-video'>
                <a onClick={this.handleVideoClick} name='rogan' href='https://www.youtube.com/watch?v=X6_O-zOFBFg'>Joe Rogan Motivation.</a>
                <iframe className={`embedded ${this.state.activeVideo === 'rogan' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/X6_O-zOFBFg"
                  title="Rogan Motivation" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </div>
          </div>
        )}
        {workoutsVm.map (workoutVm =>
          workoutVm.workouts.map (workout =>
            <div key={workout.group} className='group'>
              {workoutVm.type === 'weight' ? (
                <div className='header'>
                  <div className='workout-name'>{workout.group}</div>
                  <span className='weight'>Weight</span>
                  <span className='reps'>Reps</span>
                  <span className='sets'>Sets</span>
                </div>
              ) : (
                <div className='header'>
                  <div className='workout-name'>{workout.group}</div>
                  <span className='weight'>Time</span>
                  <span className='reps'>Dist.</span>
                  <span className='sets'>Kcal.</span>
                </div>
              )}
              {workout.exercises.map (exercise =>
                <div>{exercise.name}</div>
                // <Exercise
                //   key={`${dayOfWeek}-${exercise.name}`}
                //   userId={this.props.user.id}
                //   workouts={this.props.workouts}
                //   forceGlobalUpdate={this.props.forceGlobalUpdate}

                //   user={this.props.user}
                //   userObj={this.props.userObj}
                //   cancelMode={this.props.cancelMode}
                //   editMode={this.props.editMode}
                //   saveMode={this.props.saveMode}
                //   handleUserChange={this.props.handleUserChange} 
                //   displayMessage={this.displayMessage}
                //   didWorkout={didWorkout}
                //   workoutStartedToday={workoutStartedToday}
                //   dayOfWeek={dayOfWeek}
                //   routine={routine}
                //   routineType={routineType.type}
                //   workout={workout}
                //   exercise={exercise} />
              )}
            </div>
          )
        )}
        <RoutineModal 
          user={this.props.user}
          userObj={this.props.userObj}
          favorites={this.props.favorites}
          dayOfWeek={routine.day}
          handleUserChange={this.props.handleUserChange}
          displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Routine;
