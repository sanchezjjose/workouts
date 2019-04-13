import React from 'react';
import MotivationVideos from '../MotivationVideos/MotivationVideos';

import './MotivationVideosModal.css';

function MotivationVideosModal(props) {
  return (
    <div className='MotivationVideosModal'>
      <div onClick={props.handleClose} className='close-modal'>&times;</div>
      <h1>Motivation</h1>
      <MotivationVideos activeVideo='muhammad-ali' />
    </div>
  )
}

export default MotivationVideosModal;
