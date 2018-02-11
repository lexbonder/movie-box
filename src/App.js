import React, { Component } from 'react';
import { fetchApi, returningUser, getFavArray } from './apiCall.js';
import { connect } from 'react-redux';
import { addMovie, logOut, getUser, addFavArray } from './actions';
import { Route, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import LoginForm from './components/LoginForm/LoginForm';
import Card from './components/Card/Card';
import './App.css';

export class App extends Component {

  componentDidMount = async () => {
    const moviesArray = await fetchApi();
    this.sendMoviesToStore(moviesArray);

    if (localStorage.UserId){
      const loggedIn = await returningUser(localStorage.UserId);
      this.props.getUser(loggedIn); 
      const newFavArray = await getFavArray(localStorage.UserId);
      this.props.addFavArray(newFavArray.data);
    }
  }

  sendMoviesToStore = moviesArray => {
    moviesArray.forEach(movie => {
      this.props.changeStore(movie);
    });
  }

  handleLogout = () => {
    localStorage.removeItem('UserId');
    this.props.logOut();
  }

  toggleLogin = () => {
    const logIn = (
      <NavLink to="/login/" className="login">
        Login / Sign up
      </NavLink>
    );
    const logOut =(
      <div className='log-out login'>
        <h1> Welcome, {this.props.user.name}!</h1>
        <a href='#' onClick={this.handleLogout}>
          Log Out
        </a>
        <NavLink to="/favorites">
          View Favorites
        </NavLink>
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
        </header>
        <Route exact path='/favorites' component={Card} />
        <Route exact path="/" component={Card} />
        <Route strict path="/login/" component={LoginForm} />
      </section>
    );
  }
}

export const mapStateToProps = store => ({
  user: store.user,
  newFavArray: store.newFavArray  
})

export const mapDispatchToProps = dispatch => ({
  changeStore: movie => dispatch(addMovie(movie)),
  logOut: () => dispatch(logOut()),
  getUser: user => dispatch(getUser(user)),
  addFavArray: newFavArray => dispatch(addFavArray(newFavArray))
});

App.defaultProps = {user: {name: ''}}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
