import React, { Component } from 'react';
// import ReduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, NavLink } from 'react-router-dom';
import { createUser, userLogin }  from '../../apiCall';
import { getUser } from '../../actions';
import './LoginForm.css';

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
  }

  clearName = () => {
    this.setState({name: ''});
  }

  clearError = () => {
    this.setState({error: ''});
  }

  handleInputs = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { name } = this.state;
    let createUserResponse;
    if (name !== '') {
      createUserResponse = await createUser(this.state); 
    } 
    this.handleSignUpError(createUserResponse); // First gate for errors
    // this.props.history.push('/') <-- This is the other way to redirect
    // Once we have error handling we'll see which we prefer to use
  };

  handleSignUpError = (response) => {
    if (response && response.status !== 'success') {
      const {error} = response;
      this.setState({error});
    } else {
      this.loginUser();
    }
  }

  loginUser = async () => {
    const { password, email } = this.state;
    const userLoginResponse = await userLogin({password, email});
    if (typeof(userLoginResponse) === 'string') {
      this.setState({error: userLoginResponse});
    } else { 
      this.props.getUser(userLoginResponse);
      localStorage.setItem('UserId', userLoginResponse.id);
      this.props.history.push('/');
    }
  }



  // backToHome = () => {
  //   if(this.props.user.id) {
  //     return <Redirect to='/' />
  //   }
  // }

  render() {
    return (
      <section className='login-wrap'>
        <NavLink to='/login/'>
          <button
            onClick={this.handleLoginClick}
            name='logIn'>
              Log In
          </button>
        </NavLink>
        <NavLink to='/login/sign-up'>
          <button
            onClick={this.clearError}
            name='signUp'>
              Sign Up
          </button>
        </NavLink>
        <article className="signUp">
          <form onSubmit={this.handleSubmit}>
            {/* This is where the error message conmes up*/}
            <h3>{this.state.error}</h3>
            <Route exact path='/login/sign-up' render={() => { 
              return (
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
              );
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
        {/*{this.backToHome()}*/}
      </section>
    );
  }
}

export const mapStateToProps = ({user}) => ({user});

export const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
