import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';
import RoutineModal from '../RoutineModal/RoutineModal';
import { saveDates } from '../../api/History';
import { formatDate } from '../../lib/Util';

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

  handleVideoClick = (e) => {
    e.preventDefault();
    this.setState({ activeVideo: e.target.name });
  }

  handleStartWorkout = (e) => {
    e.preventDefault();

    const today = formatDate(new Date());
    const dayOfWeek = this.props.dayOfWeek;
    const userId = this.props.userId;
    const history = this.props.history;

    history.addDate(today, dayOfWeek);

    // TODO: Reset all exercise status

    saveDates(userId, history.getDates())
      .then(() => {
        this.props.forceGlobalUpdate();
      });
  }

  render() {
    const dayOfWeek = this.props.dayOfWeek;
    const workouts = this.props.workouts;
    const history = this.props.history;

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
                  <span className='time'>Time</span>
                  <span className='dist'>Dist.</span>
                  <span className='kcal'>Kcal.</span>
                </div>
              )}
              {workout.exercises.map (exercise =>
                <Exercise
                  key={`${dayOfWeek}-${exercise.name}`}
                  userId={this.props.userId}
                  workouts={this.props.workouts}
                  history={this.props.history}
                  exercise={exercise}
                  forceGlobalUpdate={this.props.forceGlobalUpdate}
                  workoutInProgress={workoutInProgress}
                  cancelMode={this.props.cancelMode}
                  editMode={this.props.editMode}
                  saveMode={this.props.saveMode}
                  displayMessage={this.displayMessage}
                  dayOfWeek={dayOfWeek}

                  // TODO: Maybe pass this down instead of workouts?
                  workout={workout}
                />
              )}
            </div>
          )
        )}
        <RoutineModal
          userId={this.props.userId}
          workouts={this.props.workouts}
          forceGlobalUpdate={this.props.forceGlobalUpdate}
          dayOfWeek={dayOfWeek}
          displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Routine;
