import { favoritesReducer } from '../favoritesReducer';
import * as actions from '../../actions';

describe('favoritesReducer', () => {
  it('should return state by default', () => {
    expect(favoritesReducer(undefined, {})).toEqual([])
  })

  it('should add a favorite into state if the type is ADD_FAVORITE', () => {
    const mockAction = {type: 'ADD_FAVORITE', movie: {title: 'minions'}}
    expect(favoritesReducer(undefined, mockAction)).toEqual([{title: 'minions'}])
  })

  it('should remove a movie from state if the type is REMOVE_FAVORITE', () => {
    const mockAction = {type: 'REMOVE_FAVORITE', movie: {movie_id: 'minions'}};
    const mockState = [{movie_id: 'minions'}, {movie_id: 'matrix'}]
    expect(favoritesReducer(mockState, mockAction)).toEqual([{movie_id: 'matrix'}])
  })
})