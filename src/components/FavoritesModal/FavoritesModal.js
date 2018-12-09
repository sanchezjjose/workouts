import React, { Component } from 'react';
import './FavoritesModal.css';

class FavoritesModal extends Component {

  state = {
    show: this.props.show
  }

  closeModal = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <div className={`FavoritesModal ${this.state.show ? 'show' : ''}`}>
        <span onClick={this.closeModal} className='close'>&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    );
  }
}

export default FavoritesModal;
