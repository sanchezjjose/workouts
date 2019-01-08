import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import homeNavIcon from './outline-home-24px.svg';
import './Footer.css';

class Footer extends Component {

  handleClick = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const userId = this.props.userId;
    const homeTabActive = this.props.activeTab === 'home';
    const favTabActive = this.props.activeTab === 'favorites';

    return (
      <div className='Footer'>
        <Link onClick={() => this.handleClick('home')} className={`link-home ${homeTabActive ? 'active' : '' }`} to={`/${userId}`}>
          <div className='footer-button'>
              {homeTabActive ?
                <button className="tab-icon mdc-icon-button material-icons">home</button> :
                <img src={homeNavIcon} className="tab-icon" alt="home" />
              }
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
      </div>
    );
  }
}

export default Footer;
