import { combineReducers } from 'redux';


const movieReducer = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_MOVIE':
    return [...state, { ...action, favorite: false }];
  default:
    return state;
  }
};

export const rootReducer = combineReducers({
  movies: movieReducer
});
