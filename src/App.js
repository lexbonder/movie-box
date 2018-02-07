import React, { Component } from "react";
import fetchApi from './apiCall.js';
import { connect } from 'react-redux'
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount = async() => {
    await fetchApi();
  }


  render() {
    console.log(this.props)
    return (
      <div className="App">
        <h1>movie tracker beyotch</h1>
      </div>
    );
  }
}

const mapStateToProps = store => ({
   movies: store.movies
})

const mapDispatchToProps = dispatch => {
  return {}
}

connect(mapStateToProps, mapDispatchToProps)(App)
export default App;
