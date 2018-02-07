import React, { Component } from "react";
import apiKey from './apiKey.js';
import logo from "./logo.svg";
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
      console.log(movieData.results);
    } catch (error) {
      throw new Error('error') 
    }
  }

  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
