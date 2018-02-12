import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, NavLink } from 'react-router-dom';
import { createUser, userLogin } from '../../apiCall';
import { getUser } from '../../actions';
import './LoginForm.css';
import PropTypes from 'prop-types';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      email: '',
      error: '',
      loginButton: '',
      signUpButton: 'non-focused'
    };
  }

  handleLoginButtonClick = () => {
    this.clearName();
    this.clearError();
    this.toggleButtons('loginButton');
  }

  handleSignUpButtonClick = () => {
    this.clearError();
    this.toggleButtons('signUpButton');
  }

  clearName = () => {
    this.setState({ name: '' });
  }

  clearError = () => {
    this.setState({ error: '' });
  }

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
      createUserResponse = await createUser({name, password, email});
    } 
    this.handleSignUpError(createUserResponse); // First gate for errors
  }

  handleSignUpError = (response) => {
    if (response && response.status !== 'success') {
      const error = 'E-mail already exists';
      this.setState({error});
    } else {
      this.loginUser();
    }
  }

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
  }

  toggleButtons = (button) => {
    if (button === 'loginButton') {
      this.setState({loginButton: '', signUpButton: 'non-focused'});
    } else { 
      this.setState({loginButton: 'non-focused', signUpButton: ''});
    }
  }


  render() {
    let message;

    if (this.props.history.location.state) {
      message = 'Please login or sign up to favorite a movie';
    }
    return (
      <section className='login-wrap'>
        <NavLink to='/login/'>
          <button
            className={`login-button ${this.state.loginButton}`}
            onClick={this.handleLoginButtonClick}
            name='logIn'>
              Log In
          </button>
        </NavLink>
        <NavLink to='/login/sign-up'>
          <button
            className={`sign-up-button ${this.state.signUpButton}`}
            onClick={this.handleSignUpButtonClick}
            name='signUp'>
              Sign Up
          </button>
        </NavLink>
        <article className="signUp">
          <form onSubmit={this.handleSubmit}>
            <h3 className='error-message'>{message}</h3>
            <h3 className='error-message'>{this.state.error}</h3>
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
                name="email"
                value={this.state.email}
                type="email"
                onChange={this.handleInputs}
                placeholder="example@email.com"
              />
            </label>
            <br />
            <label> Password:
              <input required
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

const { shape, number, string, func, bool, oneOfType } = PropTypes;

LoginForm.propTypes = {
  user: shape({
    id: number,
    name: string,
    password: string,
    email: string
  }),
  getUser: func,
  history: shape({
    push: func,
    location: shape({
      state: oneOfType([
        string,
        shape({
          needLogin: bool
        })
      ])
    })
  })
};

export const mapStateToProps = ({ user }) => ({ user });

export const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
