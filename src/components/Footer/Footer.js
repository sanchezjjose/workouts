import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

class Footer extends Component {

  handleClick = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const userId = this.props.userId;
    const homeTabActive = this.props.activeTab === 'home';
    const progressTabActive = this.props.activeTab === 'progress';
    const favTabActive = this.props.activeTab === 'favorites';

    return (
      <div className='Footer'>
        <Link onClick={() => this.handleClick('home')} className={`link-home ${homeTabActive ? 'active' : '' }`} to={`/${userId}`}>
          <div className='footer-button'>
              <button className="tab-icon mdc-icon-button material-icons">
                {homeTabActive ? 'fitness_center' : 'fitness_center'}
              </button>
              <span className='footer-text'>home</span>
          </div>
        </Link>
        <Link onClick={() => this.handleClick('favorites')} className={`link-favorites ${favTabActive ? 'active' : '' }`} to={`/${userId}/favorites`}>
          <div className='footer-button'>
              <button className="tab-icon mdc-icon-button material-icons">
                {favTabActive ? 'star' : 'star_border'}
              </button>
              <span className='footer-text'>favorites</span>
          </div>
        </Link>
        <Link onClick={() => this.handleClick('progress')} className={`link-progress ${progressTabActive ? 'active' : '' }`} to={`/${userId}/progress`}>
          <div className='footer-button'>
              <button className="tab-icon mdc-icon-button material-icons">
                {progressTabActive ? 'insert_chart' : 'insert_chart_outlined'}
              </button>
              <span className='footer-text'>progress</span>
          </div>
        </Link>
      </div>
    );
  }
}

export default Footer;
