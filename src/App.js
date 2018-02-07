import React, { Component } from 'react';
import fetchApi from './apiCall.js';
import { connect } from 'react-redux';
import { addMovie } from './actions';
import Card from './components/Card/Card'
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
    return (
      <div className="App">
        <h1>movie tracker beyotch</h1>
        <Card />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  changeStore: movie => dispatch(addMovie(movie))
});

export default connect(null, mapDispatchToProps)(App);

