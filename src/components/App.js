import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getUserWorkouts } from '../api/Users';
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Progress from './Progress/Progress';
import Footer from './Footer/Footer';

import './App.css';

class App extends Component {

  state = {
    user: {}
  };

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];

    if (id.length > 0) {
      getUserWorkouts(id).then(user => {
        this.setState({
          user: user
        });
      });
    }
  }

  handleUserChange = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Landing}/> 
          <Route exact={true} path='/:user_id' render={() => (
            <div className='container'>
              {this.state.user.routine ?
                <Home user={this.state.user} handleUserChange={this.handleUserChange} /> :
                <div>Loading...</div>
              }
              <Footer userId={this.state.user.id} />
            </div>
          )}/>
          <Route exact={true} path='/:user_id/progress' render={() => (
            <div className='container'>
              <Progress />
              <Footer userId={this.state.user.id} />
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
