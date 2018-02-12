/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  let wrapper;
  let mockUser;
  let mockHistory;
  beforeEach(() => {
    mockHistory = {location: {state: ''}}
    mockUser = {id: 1, name:'bob'}
    wrapper = shallow(<LoginForm user={mockUser} history={mockHistory} />)
  })

  it('should match the snapshot when the login button is clicked', () => {
    wrapper.find('.login-button').simulate('click')
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when the signUp button is clicked', () => {
    wrapper.find('.sign-up-button').simulate('click')
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleLoginButtonClick', () => {
    it('should call clearName, clearError and toggleButtons when it is called', () => {
      wrapper.instance().clearName = jest.fn()
      wrapper.instance().clearError = jest.fn()
      wrapper.instance().toggleButtons = jest.fn()
      
      wrapper.instance().handleLoginButtonClick()

      expect(wrapper.instance().clearName).toHaveBeenCalled()
      expect(wrapper.instance().clearError).toHaveBeenCalled()
      expect(wrapper.instance().toggleButtons).toHaveBeenCalledWith('loginButton')
    })
  })

  describe('handleSignUpButtonClick', () => {
    it('should call clearName and toggleButtons when called', () => {
      wrapper.instance().clearError = jest.fn()
      wrapper.instance().toggleButtons = jest.fn()
      
      wrapper.instance().handleSignUpButtonClick()

      expect(wrapper.instance().clearError).toHaveBeenCalled()
      expect(wrapper.instance().toggleButtons).toHaveBeenCalledWith('signUpButton')
    })
  })

  describe('clearName', () => {
    it('should clear the name from state when run', () => {
      wrapper.setState({name: 'Ricardo'})
      wrapper.instance().clearName()
      expect(wrapper.state().name).toEqual('')
    })
  })

  describe('clearError', () => {
    it('should clear the error message from state when run', () => {
      wrapper.setState({error: 'Yea, something broke'})
      wrapper.instance().clearError()
      expect(wrapper.state().error).toEqual('')
    })
  })

  describe('handleInputs', () => {
    it('changes the value of state for email name or password based on the input that changes', () => {
      const mockNameChange = {target: {name: 'name', value: 'abcde'}}
      const mockEmailChange = {target: {name: 'email', value: 'fghij'}}
      const mockPasswordChange = {target: {name: 'password', value: 'klmno'}}
      
      wrapper.instance().handleInputs(mockNameChange); 
      wrapper.instance().handleInputs(mockEmailChange); 
      wrapper.instance().handleInputs(mockPasswordChange); 

      expect(wrapper.state().name).toEqual('abcde')
      expect(wrapper.state().email).toEqual('fghij')
      expect(wrapper.state().password).toEqual('klmno')
    })
  })

  describe('handleSubmit', () => {
    let mockEvent;
    
    beforeEach(() => {
      mockEvent = {preventDefault: jest.fn()}
      wrapper.instance().handleSignUpError = jest.fn()
    })
    
    it('calls handleSignUpError if this.state.name is an empty string', () => {
      wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.instance().handleSignUpError).toHaveBeenCalled()
    })

    it.skip('passes the response from createUser to handleSignUpError if there is a name in state', async () => {
      wrapper.setState({name: 'a', email: 'a@a.com', password: 'a'})
      
      wrapper.createUser = async () => await {word: 'yo'}

      expect(wrapper.instance().handleSignUpError).toHaveBeenCalledWith({success: 'you rock'})
    })
  })

  describe('handleSignUpError', () => {
    it('should set state as an error if the response is an error', () => {
      const mockResponse = {status: 'error'}
      wrapper.instance().handleSignUpError(mockResponse)

      expect(wrapper.state().error).toEqual('E-mail already exists')
    })

    it('should call loginUser if the response is successful', () => {
      const mockResponse = {status: 'success'}
      wrapper.instance().loginUser = jest.fn()
      wrapper.instance().handleSignUpError(mockResponse)

      expect(wrapper.instance().loginUser).toHaveBeenCalled()
    })
  })

  describe('loginUser', () => {
    it.skip('should set an error message in state if email and password dont match', () => {
      const mockParams = {password: 'a', email: 'a@a.com'}
      wrapper.userLogin = async (mockParams) => await {object: 'stuff'}

      expect(wrapper.state().error).toEqual('hello')
    })
  })
})