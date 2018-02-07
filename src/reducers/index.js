import { combineReducers } from 'redux';

const movieReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_MOVIE':
    return [...state, { ...action.movie, favorite: false }];
  default:
    return state;
  }
};

export const rootReducer = combineReducers({
  movies: movieReducer
});
