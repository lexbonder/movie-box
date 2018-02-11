/* eslint-disable */
import React from 'react';
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

