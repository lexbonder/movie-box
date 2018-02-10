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

  toggleLogin = () => {
    console.log('am i even happening?')
    const logIn = (
      <NavLink to="/login/" className="login">
        Login / Sign up
      </NavLink>
    );
    const logOut =(
      <div className='log-out login'>
        <h1> Welcome, {this.props.user.name}!</h1>
        <a>
          Log Out
        </a>
      </div>
    )
    return !this.props.user.id ? logIn : logOut
  }

  render() {
    return (
      <section className="App">
        <header>
          <NavLink to="/" className="logo">
            Movie Tracker Beyotch
          </NavLink>
          {this.toggleLogin()}
          {/*<NavLink to='/favorites' className='nav'>Favorites</NavLink>*/}
        </header>
        {/* <Route exact path='/favorites' component={Favorites} /> */}
        <Route exact path="/" component={Card} />
        <Route strict path="/login/" component={LoginForm} />
      </section>
    );
  }
}

export const mapStateToProps = ({user}) => ({user})

export const mapDispatchToProps = dispatch => ({
  changeStore: movie => dispatch(addMovie(movie))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
