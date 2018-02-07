import {combineReducers} from 'redux';
import updateMovie from '../actions';

const movieReducer = (movies = [], updateMovie) => {
    return [...movies, {...updateMovie, favorite: false}]
}

const rootReducer = combineReducers({
movies: movieReducer
})

export default rootReducer;

