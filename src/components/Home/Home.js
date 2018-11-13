import React, { Component } from 'react';

import './Home.css';

class Home extends Component {

  render () {
    const routine = this.props.routine || {};

    return (
      <div className='Home'>
        <h1>Jose's Workouts</h1> 
        <div className='content-wrapper'>
          <div className='content'>
            <h2 className='weekday'>Tuesday</h2>
            <div className='group'>
              <h3 className='part'>Biceps</h3>
              <div className='workout 1'>
                <div className='type'>Curls (bands)</div>
                <div className='weight'>-</div>
                <div className='reps'>10</div>
                <div className='sets'>3</div>
              </div>
              <div className='workout 2'>
                <div className='type'>Chin-Ups</div>
                <div className='weight'>-</div>
                <div className='reps'>8</div>
                <div className='sets'>3</div>
              </div>
              <div className='workout 3'>
                <div className='type'>Dumbbell Curls</div>
                <div className='weight'>25 (lbs)</div>
                <div className='reps'>8</div>
                <div className='sets'>3</div>
              </div>
            </div>
            <div className='group'>
              <h3 className='part'>Triceps</h3>
              <div className='workout 1'>
                <div className='type'>Dips</div>
                <div className='weight'>-</div>
                <div className='reps'>15 (lbs)</div>
                <div className='sets'>3</div>
              </div>
              <div className='workout 2'>
                <div className='type'>Tricep Pushdown (rope)</div>
                <div className='weight'>110 (lbs)</div>
                <div className='reps'>8</div>
                <div className='sets'>3</div>
              </div>
              <div className='workout 3'>
                <div className='type'>Overhead Extension Machine</div>
                <div className='weight'>60 (lbs)</div>
                <div className='reps'>8</div>
                <div className='sets'>3</div>
              </div>
              <div className='workout 4'>
                <div className='type'>EZ-Bar Standing Overhead</div>
                <div className='weight'>70 (lbs)</div>
                <div className='reps'>8</div>
                <div className='sets'>3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
