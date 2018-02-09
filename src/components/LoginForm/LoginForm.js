import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import {userLogin}  from '../../apiCall';
import './LoginForm.css';

export class LoginForm extends Component {
  constructor() {
    super(),
    this.state = {
      name: '',
      password: '',
      email: '',
    };
  }

  handleInputs = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    const { name, password, email } = this.state
    event.preventDefault();
    console.log(name)
    if (name === '') {
      console.log('user login would go here') 
      // userLogin({password, email})
    } else {
      // This is the sign-up funciton since it takes name password and email.
      // Should we be clever and put a 'confirm password field'?
      // // userSignUp(this.state)
      userLogin(this.state);
    }
  };

  render() {
    return (
      <div>
        <NavLink to='/login/'>
          <button
            name='logIn'>
              Log In
          </button>
        </NavLink>
        <NavLink to='/login/sign-up'>
          <button
            onClick={this.toggleNameField}
            name='signUp'>
              Sign Up
          </button>
        </NavLink>
        <article className="signUp">
          <form onSubmit={this.handleSubmit}>
            <Route exact path='/login/sign-up' render={() => { 
              return(
                <label>
                  <input required
                    className={this.state.toggleName}
                    name="name"
                    value={this.state.name}
                    type="text"
                    onChange={this.handleInputs}
                    placeholder='Your Name'
                  />
                </label>
              )
            }} />
            <label>
              <input required
                name="email"
                value={this.state.email}
                type="email"
                onChange={this.handleInputs}
                placeholder='example@email.com'
              />
            </label>
            <br />
            <label>
              <input required
                name="password"
                value={this.state.password}
                type="password"
                onChange={this.handleInputs}
                placeholder='password'
              />
            </label>
            <input type='submit' />
          </form>
        </article>
      </div>
    );
  }
}

export const mapStateToProps = store => ({});

export const mapDispatchToProps = dispatch => ({});

export default connect(null, null)(LoginForm);
