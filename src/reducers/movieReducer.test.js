import todosReducer, { movieReducer } from './movieReducer';
import * as actions from '../actions';

describe('movieReducer', () => {

    it('return default state', () => {
        const expected = [];
        expect(movieReducer(undefined, {})).toEqual(expected);
    });

    it('returns new state for addMovie', () => {
        const movie = {
            title: 'the greatest movie',
            date: 'nunya',
            overview: 'dogs are cute',
            poster: 'fakepic.png',
            id: 4
        }
        const expected = [{...movie, favorite: false}];
        expect(movieReducer(undefined, actions.addMovie(movie))).toEqual(expected);
    });

    it('returns new state for toggleFavorite', () => {
        const id = 4;
        const movie = {
            title: 'the greatest movie',
            date: 'nunya',
            overview: 'dogs are cute',
            poster: 'fakepic.png',
            id: 4
        }
        const expected = [{...movie, favorite: true}];
        expect(movieReducer(undefined, actions.toggleFavorite(id))).toEqual(expected);
    });

});