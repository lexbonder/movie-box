import React, { Component } from 'react';
import fetchApi from './apiCall.js';
import { connect } from 'react-redux';
import { addMovie } from './actions';
import { Router, NavLink, Route } from 'react-router-dom';
import Card from './components/Card/Card';
// import Favorites from './components/Favorites/Favorites';
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

  sendMoviesToStore = (moviesArray) => {
    moviesArray.forEach(movie => {
      this.props.changeStore(movie)
    });
  }

  render() {
    return <div className="App">
          <header>

          </header>
          <h1 className='heading'>movie tracker beyotch</h1>
            <NavLink to="/Card" className="nav">
              Home
            </NavLink>
            <NavLink to="/favorites" className="nav">
              Favorites
            </NavLink>
        {/* <Route exact path="/favorites" component={Favorites} /> */}
        <Route exact path='/Card' component={Card} />

  
        <div className='card-container'>
          <Card />
        </div>
      </div>;
  }
}

export const mapDispatchToProps = dispatch => ({
  changeStore: movie => dispatch(addMovie(movie))
});

export default connect(null, mapDispatchToProps)(App);

