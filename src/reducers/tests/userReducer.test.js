/* eslint-disable */
import { userReducer } from '../userReducer';
import * as actions from '../../actions';

describe('userReducer', () => {
  it('should return the default state', () => {
    expect(userReducer(undefined, {})).toEqual({});
  })

  it('should add a user object into state if the type is GET_USER', () => {
    const mockAction = {type: 'GET_USER', user: {name: 'alex'}}
    expect(userReducer(undefined, mockAction)).toEqual({name: 'alex'})
  })

  it('should remove a user from state if the type is LOG_OUT', () => {
    const mockState = {name: 'alex'}
    const mockAction = {type: 'LOG_OUT'}
    expect(userReducer(mockState, mockAction)).toEqual({})
  })
})