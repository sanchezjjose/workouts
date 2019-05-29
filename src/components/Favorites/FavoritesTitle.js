import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import { editWorkout } from '../../api/Workouts';

class FavoritesTitle extends Component {
  static contextType = UserContext;

  state = {
    workoutGroupName: this.props.workout.group,
    editing: false,
    edited: false
  }

  handleOnChange(e) {
    this.setState({
      workoutGroupName: e.target.value,
      edited: true
    });
  }

  handleEdit() {
    this.setState({ editing: true });
    this.props.handleEditingText(true);
    this.context.updateMode(true, false, false);
  }

  handleOnBlur() {
    this.setState({ editing: false });
  }

  componentDidUpdate() {
    if (this.state.edited) {
      if (this.context.saveMode) {
        console.log(`Saving name change from ${this.props.workout.group} to ${this.state.workoutGroupName}`);

        // this.context.workouts.setGroup(this.props.workout.id, this.state.workoutGroupName);

        // const userId = this.context.user.id;
        // const updatedWorkout = this.context.workouts.get(this.props.workout.id);

        // editWorkout(userId, updatedWorkout)
        //   .then(() => {
            this.setState({ editing: false, edited: false });
            this.props.handleEditingText(false);
            this.context.updateMode(false, false, false);
          // });

      } else if (this.context.cancelMode) {
        console.log(`Cancelling name change from ${this.state.workoutGroupName} to ${this.props.workout.group}`);

        this.setState({ editing: false, edited: false, workoutGroupName: this.props.workout.group });
        this.props.handleEditingText(false);
        this.context.updateMode(false, false, false);
      }
    }
  }

  render() {
    const workoutGroupName = this.state.workoutGroupName;

    return (
      <div className='workout-group-heading'>
        <input type='text'
          className={`workout-title ${this.state.editing ? 'editing' : ''}`}
          placeholder='Add a group name'
          value={workoutGroupName}
          onClick={() => this.handleEdit()}
          onFocus={() => this.handleEdit()}
          onBlur={() => this.handleOnBlur()}
          onChange={(e) => this.handleOnChange(e)}
          readOnly={false} />
        <span className='input-border'></span>
      </div>
    );
  }
}

export default FavoritesTitle;
