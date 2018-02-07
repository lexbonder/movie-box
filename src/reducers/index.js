import { combineReducers } from 'redux';

const movieReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_MOVIE':
    return [...state, { ...action.movie, favorite: false }];
  case 'TOGGLE_FAVORITE':
    return state.map( movie => {
      return movie.id === parseInt(action.id) ? {...movie, favorite: !movie.favorite } : movie
    })   
    default:
    return state;
  }
};

export const rootReducer = combineReducers({
  movies: movieReducer
});
