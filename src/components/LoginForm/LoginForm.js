import React, { Component } from 'react';
// import ReduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, NavLink } from 'react-router-dom';
import { createUser, userLogin } from '../../apiCall';
import { getUser } from '../../actions';
import './LoginForm.css';
import { log } from 'util';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      email: '',
      error: '' // This state is the words that will show in the error <h3>
    };
  }

  handleLoginClick = () => {
    this.clearName();
    this.clearError();
  };

  clearName = () => {
    this.setState({ name: '' });
  };

  clearError = () => {
    this.setState({ error: '' });
  };

  handleInputs = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { name, password, email } = this.state;
    let createUserResponse;
    if (name !== '') {
<<<<<<< HEAD
      createUserResponse = await this.getUserResponse({name, email, password}); 
    } 
    debugger;
=======
      createUserResponse = await createUser(this.state);
    }
>>>>>>> Update favs functionality
    this.handleSignUpError(createUserResponse); // First gate for errors
  }

  getUserResponse = async (userObject) => {
    return await createUser(userObject)
  }

  handleSignUpError = response => {
    if (response && response.status !== 'success') {
<<<<<<< HEAD
      const error = 'E-mail already exists';
      this.setState({error});
=======
      const { error } = response;
      this.setState({ error });
>>>>>>> Update favs functionality
    } else {
      this.loginUser();
    }
  };

  loginUser = async () => {
    const { password, email } = this.state;
    const userLoginResponse = await userLogin({ password, email });
    if (typeof userLoginResponse === 'string') {
      this.setState({ error: userLoginResponse });
    } else {
      this.props.getUser(userLoginResponse);
      localStorage.setItem('UserId', userLoginResponse.id);
      this.props.history.push('/');
    }
<<<<<<< HEAD
  }
=======
  };

  // backToHome = () => {
  //   if(this.props.user.id) {
  //     return <Redirect to='/' />
  //   }
  // }
>>>>>>> Update favs functionality

  render() {
    let message;

    if (this.props.history.location.state) {
      message = 'Please login or sign up to favorite a movie';
    }
    return (
<<<<<<< HEAD
      <section className='login-wrap'>
        <NavLink to='/login/'>
          <button
            className={`login-button ${this.state.loginClicked}`}
            onClick={this.handleLoginClick}
            name='logIn'>
              Log In
          </button>
        </NavLink>
        <NavLink to='/login/sign-up'>
          <button
            className={`sign-up-button ${this.state.signUpClicked}`}
            onClick={this.clearError}
            name='signUp'>
              Sign Up
=======
      <section className="login-wrap">
        <NavLink to="/login/">
          <button onClick={this.handleLoginClick} name="logIn">
            Log In
          </button>
        </NavLink>
        <NavLink to="/login/sign-up">
          <button onClick={this.clearError} name="signUp">
            Sign Up
>>>>>>> Update favs functionality
          </button>
        </NavLink>
        <article className="signUp">
          <form onSubmit={this.handleSubmit}>
<<<<<<< HEAD
            <h3>{message}</h3>
            <h3>{this.state.error}</h3> {/* This is where the error message conmes up*/}
            <Route exact path='/login/sign-up' render={() => { 
              return (
                <label> Name:
                  <input required
                    className={this.state.toggleName}
                    name="name"
                    value={this.state.name}
                    type="text"
                    onChange={this.handleInputs}
                    placeholder='Your Name'
                  />
                </label>
              );
            }} />
            <label> E-mail:
              <input required
=======
            {/* This is where the error message conmes up*/}
            <h3>{this.state.error}</h3>
            <Route
              exact
              path="/login/sign-up"
              render={() => {
                return (
                  <label>
                    <input
                      required
                      className={this.state.toggleName}
                      name="name"
                      value={this.state.name}
                      type="text"
                      onChange={this.handleInputs}
                      placeholder="Your Name"
                    />
                  </label>
                );
              }}
            />
            <label>
              <input
                required
>>>>>>> Update favs functionality
                name="email"
                value={this.state.email}
                type="email"
                onChange={this.handleInputs}
                placeholder="example@email.com"
              />
            </label>
            <br />
<<<<<<< HEAD
            <label> Password:
              <input required
=======
            <label>
              <input
                required
>>>>>>> Update favs functionality
                name="password"
                value={this.state.password}
                type="password"
                onChange={this.handleInputs}
                placeholder="password"
              />
            </label>
            <input type="submit" />
          </form>
        </article>
      </section>
    );
  }
}

export const mapStateToProps = ({ user }) => ({ user });

export const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
