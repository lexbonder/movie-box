import React, { Component } from "react";
import fetchApi from './apiCall.js';
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state ={}
  }

  componentDidMount = async() => {
    await fetchApi();
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
