import React, { Component } from 'react';
import { UserContext } from '../UserContext';

class FavoritesTitle extends Component {
  static contextType = UserContext;

  state = {
    workoutGroupName: this.props.workoutGroupName,
    editing: false
  }

  handleOnChange(e) {
    this.setState({ workoutGroupName: e.target.value });
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
    if (this.context.saveMode === true || this.context.cancelMode === true) {
      this.setState({ editing: false });
      this.props.handleEditingText(false);
      this.context.updateMode(false, false, false);
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
