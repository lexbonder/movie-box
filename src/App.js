import React, { Component } from "react";
import apiKey from './apiKey.js';
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state ={}
  }

  componentDidMount = async() => {
    try {
      const initalFetch = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`)
      const movieData = await initalFetch.json();
      this.cleanData(movieData.results)
    } catch (error) {
      throw new Error('error') 
    }
  }

  cleanData = (movieArray) => {
    movieArray.map(movie => ({
        title: movie.title,
        date: movie.release_date,
        overview: movie.overview,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
        id: movie.id
    }))
  }

  render() {
    return (
      <div className="App">
        <h1>movie tracker beyotch</h1>
      </div>
    );
  }
}

export default App;
