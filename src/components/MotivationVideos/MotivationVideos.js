import React, { Component } from 'react';

import './MotivationVideos.css';

class MotivationVideos extends Component {

  state = {
    activeVideo: this.props.activeVideo || '',
  }

  handleVideoClick = (e) => {
    e.preventDefault();

    const activeVideo = e.target.name === this.state.activeVideo ? '' : e.target.name; 
    this.setState({ activeVideo: activeVideo }); 
  }

  render() {
    return (
      <div className='MotivationVideos'>
        <div className='motivation-video'>
          <a onClick={this.handleVideoClick} name='muhammad-ali' href='https://www.youtube.com/watch?v=V2EfL1j4KYE'>Muhammad Ali Motivation.</a>
          <iframe className={`embedded ${this.state.activeVideo === 'muhammad-ali' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/V2EfL1j4KYE"
            title="Muhammad Ali Motivation" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className='motivation-video'>
          <a onClick={this.handleVideoClick} name='jocko' href='https://www.youtube.com/watch?v=FBHwYaVXH7g'>Jocko Willink Motivation.</a>
          <iframe className={`embedded ${this.state.activeVideo === 'jocko' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/FBHwYaVXH7g"
            title="Jocko Motivation" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className='motivation-video'>
          <a onClick={this.handleVideoClick} name='goggins' href='https://www.youtube.com/watch?v=Zy5c2k3W458'>David Goggins Motivation.</a>
          <iframe className={`embedded ${this.state.activeVideo === 'goggins' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/Zy5c2k3W458"
            title="Goggins Motivation" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className='motivation-video'>
          <a onClick={this.handleVideoClick} name='rogan' href='https://www.youtube.com/watch?v=ysTGb27yCcc'>Joe Rogan Motivation.</a>
          <iframe className={`embedded ${this.state.activeVideo === 'rogan' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/ysTGb27yCcc"
            title="Rogan Motivation" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className='motivation-video'>
          <a onClick={this.handleVideoClick} name='bruce-wayne' href='https://www.youtube.com/watch?v=JJAK_bAX4ro'>Bruce Wayne Motivation.</a>
          <iframe className={`embedded ${this.state.activeVideo === 'bruce-wayne' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/JJAK_bAX4ro"
            title="Bruce Wayne Motivation" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className='motivation-video'>
          <a onClick={this.handleVideoClick} name='the-will-to-act' href='https://www.youtube.com/watch?v=pD3T7WNsw6k'>The Will To Act.</a>
          <iframe className={`embedded ${this.state.activeVideo === 'the-will-to-act' ? 'visible': ''}`} width="100%" height="315" src="https://www.youtube.com/embed/pD3T7WNsw6k"
            title="The Will To Act" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
    );
  }
};

export default MotivationVideos;
