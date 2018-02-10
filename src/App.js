import React, { Component } from 'react';
import fetchApi from './apiCall.js';
import { connect } from 'react-redux';
import { addMovie } from './actions';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import LoginForm from './components/LoginForm/LoginForm';
import Card from './components/Card/Card';
import Favorites from './components/Favorites/Favorites';
import './App.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = async () => {
    const moviesArray = await fetchApi();
    this.sendMoviesToStore(moviesArray);
  };

  sendMoviesToStore = moviesArray => {
    moviesArray.forEach(movie => {
      this.props.changeStore(movie);
    });
  };

  render() {
    return (
      <section className="App">
        <header>
          <NavLink to="/" className="logo">
            Movie Tracker Beyotch
          </NavLink>
          <NavLink to="/login/" className="login">
            Login / Sign up
          </NavLink>
          {/*<NavLink to='/favorites' className='nav'>Favorites</NavLink>*/}
        </header>
        {/* <Route exact path='/favorites' component={Favorites} /> */}
        <Route exact path="/" component={Card} />
        <Route strict path="/login/" component={LoginForm} />
      </section>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  changeStore: movie => dispatch(addMovie(movie))
});

export default withRouter(connect(null, mapDispatchToProps)(App));
