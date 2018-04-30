/* eslint-disable */
import { favoritesReducer } from '../favoritesReducer';
import * as actions from '../../actions';

describe('favoritesReducer', () => {
  it('should return state by default', () => {
    expect(favoritesReducer(undefined, {})).toEqual([])
  })

  it('should add a favorite into state if the type is ADD_FAVORITE', () => {
    const mockAction = {type: 'ADD_FAVORITE', movies: [{title: 'minions'}]}
    expect(favoritesReducer(undefined, mockAction)).toEqual([{title: 'minions'}])
  })
})