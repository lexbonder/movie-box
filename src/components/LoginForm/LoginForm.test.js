import React from 'react';
import { shallow } from 'enzyme';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<LoginForm />)
  })

  it('should match the snapshot when the login button is clicked', () => {
    wrapper.find('.login-button').simulate('click')
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when the signUp button is clicked', () => {
    wrapper.find('.sign-up-button').simulate('click')
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleLoginClick', () => {
    it('should call clear name and clear error when it is called', () => {
      wrapper.instance().clearName = jest.fn()
      wrapper.instance().clearError = jest.fn()

      wrapper.instance().handleLoginClick()

      expect(wrapper.instance().clearName).toHaveBeenCalled()
      expect(wrapper.instance().clearError).toHaveBeenCalled()
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

    // it.skip('passes the response from createUser to handleSignUpError if there is a name in state', () => {
    //   const mockResponse = {}
    //   wrapper.setState({name: 'a', email: 'a@a.com', password: 'a'})

    //   wrapper.instance().getUserResponse()=>  {}
    //   wrapper.instance().handleSubmit(mockEvent)
    //   expect(wrapper.instance().handleSignUpError).toHaveBeenCalledWith(mockResponse)
    // })

    

    
  })
})