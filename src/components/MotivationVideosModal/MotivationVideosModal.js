import React from 'react';
import MotivationVideos from '../MotivationVideos/MotivationVideos';

function MotivationVideosModal(props) {
  return (
    <div className='MotivationVideosModal'>
      <div className='close-icon' onClick={props.handleClose}>(X)</div>
      <MotivationVideos />
    </div>
  )
}

export default MotivationVideosModal;
