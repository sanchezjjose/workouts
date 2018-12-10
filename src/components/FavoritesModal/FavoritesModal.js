import React, { Component } from 'react';
import Fab from '../FloatingActionButton/FloatingActionButton';

import './FavoritesModal.css';

class FavoritesModal extends Component {

  state = {
    show: false
  }

  addExercise = () => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  }

  render() {
    const onClick = this.state.show ? this.closeModal : this.addExercise;
    const label = this.state.show ? 'close' : 'add';

    return (
      <div>
        <div className={`FavoritesModal ${this.state.show ? 'show' : ''}`}>
          <span onClick={this.closeModal} className='close'>&times;</span>
          <p>Some text in the Modal..</p>
        </div>
        <Fab handleClick={onClick} label={label} />
      </div>
    );
  }
}

export default FavoritesModal;
