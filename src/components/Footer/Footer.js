import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';
import homeNavIcon from './home-nav-icon.svg';
import progressNavIcon from './progress-nav-icon.svg';

const Footer = ({ userId }) => {
	return (
    <div className='Footer'>
      <Link className='link-home' to={`/${userId}`}>
        <div className='footer-button'>
            <img src={homeNavIcon} className="tab-icon" alt="home" />
            <span className='footer-text'> home </span>
        </div>
      </Link>
      <Link to={`/${userId}/favorites`}>
        <div className='footer-button'>
            <img src={progressNavIcon} className="tab-icon" alt="progress" />
            <span className='footer-text'> favorites </span>
        </div>
      </Link>
    </div>
	);
}

export default Footer;
