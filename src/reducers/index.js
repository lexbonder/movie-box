import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { favoritesReducer } from './favoritesReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  movies: movieReducer,
  favorites: favoritesReducer,
  user: userReducer
});
