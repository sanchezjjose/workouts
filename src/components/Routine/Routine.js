import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Exercise from '../Exercise/Exercise';
import RoutineModal from '../RoutineModal/RoutineModal';
import MotivationVideos from '../MotivationVideos/MotivationVideos';
import { saveDates } from '../../api/History';
import { formatDate } from '../../lib/Util';

import './Routine.css';

class Routine extends Component {
  static contextType = UserContext;

  state = {
    message: '',
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

    const today = formatDate(new Date());
    const dayOfWeek = this.context.dayOfWeek;
    const userId = this.context.user.id;
    const history = this.context.history;

    history.addDate(today, dayOfWeek);

    // TODO: Reset all exercise status

    saveDates(userId, history.getDates())
      .then(() => {
        this.context.updateHistory(history);
      });
  }

  render() {
    const dayOfWeek = this.context.dayOfWeek;
    const workouts = this.context.workouts;
    const history = this.context.history;

    const workoutsVm = workouts.getViewModel(dayOfWeek);
    const today = formatDate(new Date());
    const workoutDate = history.getDate(dayOfWeek);

    const workoutInProgress = today === workoutDate;
    const showWorkoutDate = (typeof workoutDate === 'string') ? 'show' : 'hide';
    const showStartWorkoutButton = workoutInProgress ? 'hide' : 'show';

    return (
      <div className={`Routine ${this.state.transitionClassName}`}>
        {this.state.message.length > 0 &&
          <div className={`success-banner`}>{this.state.message}</div>
        }
        {workoutsVm.length > 0 ? (
          <div className={`routine-heading`}>
            <div className='weekday'>{dayOfWeek} Routine</div>
            <div className={`subtitle ${showWorkoutDate}`}>{workoutDate}</div>
            <button className={`start-workout-button ${showStartWorkoutButton}`} onClick={this.handleStartWorkout}>Start Workout</button>
          </div>
        ) : (
          <div className='empty-routine-message'>
            Enjoy a well deserved day off. <br/>
            Otherwise, get motived! <br/><br/>
            <MotivationVideos /> 
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
                  <span className='time'>Time</span>
                  <span className='dist'>Dist.</span>
                  <span className='kcal'>Kcal.</span>
                </div>
              )}
              {workout.exercises.map (exercise =>
                <Exercise
                  key={`${dayOfWeek}-${exercise.name}`}
                  exercise={exercise}
                  workoutInProgress={workoutInProgress}
                  displayMessage={this.displayMessage}

                  // TODO: Maybe pass this down instead of workouts?
                  workout={workout}
                />
              )}
            </div>
          )
        )}
        <RoutineModal displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Routine;
