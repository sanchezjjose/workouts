import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = ({ userId }) => {
	return (
    <div className='Footer'>
      <Link className='link-home' to={`/${userId}`}>
        <div className='footer-button'>
            <button className="tab-icon mdc-icon-button material-icons">home</button>
            <span className='footer-text'> home </span>
        </div>
      </Link>
      <Link to={`/${userId}/favorites`}>
        <div className='footer-button'>
            <button className="tab-icon mdc-icon-button material-icons">star_rate</button>
            <span className='footer-text'> favorites </span>
        </div>
      </Link>
    </div>
	);
}

export default Footer;
