import React, { Component } from 'react';
import Routine from '../Routine/Routine';

import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className='Home'>
        <div className='content-wrapper'>
          <div className='content'>
            <Routine user={this.props.user} userObj={this.props.userObj} handleUserChange={this.props.handleUserChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
