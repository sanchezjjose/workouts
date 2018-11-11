import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className='Landing'>
      <div className='content'>
        <h2 className='welcome-message'><span>Welcome to Workouts.</span></h2>
        <p className='description'>
          {
            `Create workouts, track your progress, and easily adjust your routines on the go.

              Features:

              - Add workouts
              - Adjust weight, reps and sets quickly and easily
              - Track your progress over time

              Please visit your workouts page to get started.`
          }
        </p>
      </div>
    </div>
  );
};

export default Landing;