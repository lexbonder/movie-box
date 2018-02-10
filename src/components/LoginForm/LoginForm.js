import React, { Component } from 'react';
// import ReduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import { createUser, userLogin, getFavArray }  from '../../apiCall';
import { getUser } from '../../actions'
import './LoginForm.css';

export class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      email: '',
    };
  }

  clearNameState = () => {
    this.setState({name: ''})
  }

  handleInputs = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    const { name, password, email } = this.state
    event.preventDefault();
    if (name === '') {
      const user = await userLogin({password, email});
      this.props.getUser(user)
      
    } else {
      // Should we be clever and put a 'confirm password field'?
      createUser(this.state);
    }
    this.backToHome()
  };

  backToHome = () => {
    // Redirect user to homepage '/'
    // history.push('/')
  }

  render() {
    return (
      <section className='login-wrap'>
        <NavLink to='/login/'>
          <button
            onClick={this.clearNameState}
            name='logIn'>
              Log In
          </button>
        </NavLink>
        <NavLink to='/login/sign-up'>
          <button
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
      </section>
    );
  }
}

export const mapStateToProps = store => ({});

export const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user))
});

export default connect(null, mapDispatchToProps)(LoginForm);
