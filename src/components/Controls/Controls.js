import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import {userLogin}  from '../../apiCall';
import './Controls.css';

export class Controls extends Component {
  constructor() {
    super(),
    this.state = {
      name: '',
      password: '',
      email: ''
    };
  }

  handleInputs = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    
    event.preventDefault();
    userLogin(this.state);

  };

  render() {
    return (
      <article className="login">
        <form onSubmit={this.handleSubmit}>
          <label>
            
            <input
              name="name"
              value={this.state.name}
              type="text"
              onChange={this.handleInputs}
            />
          </label>
          <label>
          
            <input
              name="email"
              value={this.state.email}
              type="text"
              onChange={this.handleInputs}
            />
          </label>
          <br />
          <label>
            
            <input
              name="password"
              value={this.state.password}
              type="text"
              onChange={this.handleInputs}
            />
          </label>
          <button>Submit</button>
        </form>
      </article>
    );
  }
}

export const mapStateToProps = store => ({});

export const mapDispatchToProps = dispatch => ({});

export default connect(null, null)(Controls);
