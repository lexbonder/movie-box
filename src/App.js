import React, { Component } from 'react';
import fetchApi from './apiCall.js';
import { connect } from 'react-redux';
import { updateMovie } from './actions';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const movies = await fetchApi();
    this.sendMoviesToStore(movies);
  };

  sendMoviesToStore = (movies) => {
    movies.forEach(movie => {
      this.props.addMovie(movie)
    });
  }

  render() {
    console.log(this.props);
    //url root for images = https://image.tmdb.org/t/p/w500/
    return (
      <div className="App">
        <h1>movie tracker beyotch</h1>
        
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  movies: state.movies
});

export const mapDispatchToProps = dispatch => ({
  addMovie: movie => dispatch(updateMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

