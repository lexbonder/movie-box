/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { Card } from './Card';

describe('Card', () => {
  let mockMovieArray;
  let mockFavoriteArray;
  let mockUser;
  let mockMovie;
  let mockMatch;

  beforeEach(() => {
    mockMatch = {path: '/'};
    mockMovieArray = [
      {
        title: "The Maze Runner",
        vote_average: 7,
        release_date: "2014",
        overview: "Set in a post-apocalyptic world, young Thomas is deposited in a community of boys after his memory is erased, soon learning they're all trapped in a maze that will require him to join forces with fellow “runners” for a shot at escape.",
        poster_path: "https://image.tmdb.org/t/p/w500/coss7RgL0NH6g4fC2s5atvf3dFO.jpg",
        movie_id: 198663,
        favorite: false
      },
      {
        title: "Minions",
        vote_average: 6.4,
        release_date: "2015",
        overview: "Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
        poster_path: "https://image.tmdb.org/t/p/w500/q0R4crx2SehcEEQEkYObktdeFy.jpg",
        movie_id: 211672,
        favorite: false
      }
    ];
    mockUser = {id: 1, name:'Bob'};
    mockMovie = {
      title: "Minions",
      vote_average: 6.4,
      release_date: "2015",
      overview: "Minions Stuart, Kevin and Bob are recruited by Scarlet Overkill, a super-villain who, alongside her inventor husband Herb, hatches a plot to take over the world.",
      poster_path: "https://image.tmdb.org/t/p/w500/q0R4crx2SehcEEQEkYObktdeFy.jpg",
      movie_id: 211672,
      favorite: false
    }
  })

  it('Should match the snapshot', () => {
    const wrapper = shallow(<Card movies={mockMovieArray} favorites={mockMovieArray} match={mockMatch} />)

    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    const wrapper = shallow(<Card movies={mockMovieArray} favorites={mockMovieArray} match={mockMatch} />)
    const expectedState = {favWithoutUser: false, userFavorites: []}

    expect(wrapper.state()).toEqual(expectedState)
  })

  describe('handleFavClick', () => {
    it('should call toggle favorite if a user is logged in', () => {
      const mockEvent = {preventDefault: jest.fn()}
      const wrapper = shallow(<Card movies={mockMovieArray} favorites={mockMovieArray} user={mockUser} match={mockMatch} />)
      wrapper.instance().toggleFavorite = jest.fn()

      wrapper.instance().handleFavClick(mockEvent, mockMovie)

      expect(wrapper.instance().toggleFavorite).toHaveBeenCalled()
    })

    it('should change the state if a user is not logged in', () => {
      const mockEvent = {preventDefault: jest.fn()}
      const wrapper = shallow(<Card movies={mockMovieArray} favorites={mockMovieArray} user={{undefined}} match={mockMatch} />)

      wrapper.instance().handleFavClick(mockEvent, mockMovie)

      expect(wrapper.state().favWithoutUser).toEqual(true)
    })
  })

  describe('toggleFavorite', () => {
    it.skip('should run add favorite if the movie is not in favorites', () => {
      const wrapper = shallow(<Card match={mockMatch} favorites={mockMovieArray} movies={mockMovieArray} />)
      wrapper.addFavorite = jest.fn()
      const id = 1

      wrapper.instance().toggleFavorite(1, mockMovie)


      expect(wrapper.addFavorite).toHaveBeenCalled()
    })

    it.skip('should run removeFavorite if the movie is alreayd in favorites', () => {
      const wrapper = shallow(<Card match={mockMatch} movies={mockMovieArray} />)
      expect(wrapper.removeFavorite)
    })
  })
})