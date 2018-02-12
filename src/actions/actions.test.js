/* eslint-disable */
import * as actions from './index';

describe('addMoive', () => {
  it('return a type of ADD_MOVIE and with a movie', () => {
    const movie = {
      title: 'the greatest movie',
      date: 'nunya',
      overview: 'dogs are cute',
      poster: 'fakepic.png',
      id: 4
    }
    const expected = {
      type: 'ADD_MOVIE',
      movie
    }
    expect(expected).toEqual(actions.addMovie(movie));
  });
});

describe('toggleFavorite', () => {
  it('return a type of ADD_MOVIE and with a movie', () => {
    const id = 0;
    const expected = {
      type: 'TOGGLE_FAVORITE',
      id
    }
    expect(actions.toggleFavorite(id)).toEqual(expected);
  });
});

describe('addFavArray', () => {
  it('should return a type of ADD_FAVORITE with an array of movies', () => {
    const movies = [{title: 'a bugs life'}, {title: 'the matrix'}]
    const expected  = {
      type: 'ADD_FAVORITE',
      movies
    }
    expect(actions.addFavArray(movies)).toEqual(expected)
  })
})

describe('removeFavorite', () => {
  it('should return a type of REMOVE_FAVORITE, with a movie object', () => {
    const movie = {title: 'groundhogs day'}
    const expected = {
      type: 'REMOVE_FAVORITE',
      movie
    }
    expect(actions.removeFavorite(movie)).toEqual(expected)
  })
})

describe('getUser', () => {
  it('should return a type of GET_USER and a user object', () => {
    const user = {name: 'Goku'}
    const expected = {
      type: 'GET_USER',
      user
    }
    expect(actions.getUser(user)).toEqual(expected)
  })
})

describe('logOut', () => {
  it('should return a type of LOG_OUT when called', () => {
    const expected = {type: 'LOG_OUT'}
    expect(actions.logOut()).toEqual(expected)
  })
})
