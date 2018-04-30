import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { updateMovie } from './actions';
import { shallow } from 'enzyme';

describe('App ', () => {
  global.localStorage = {
    getItem() {},
    setItem() {},
    removeItem() {}
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when the user clicks login/signup', () => {
    const wrapper = shallow(<App />)
    wrapper.find('.login').simulate('click')
    expect(wrapper).toMatchSnapshot()
  })

  describe('sendMoviesToStore', () => {
    it('should take in an array of movies and call changeStore for each movie', () => {
      const mockMovieArray = [{movie: 'movie1'}, {movie: 'movie2'}, {movie: 'movie3'}]
      const changeStore = jest.fn()
      const wrapper = shallow(<App changeStore={changeStore} />)

      wrapper.instance().sendMoviesToStore(mockMovieArray)
    
      expect(changeStore.mock.calls.length).toEqual(3)
    })
  })

  describe('handleLogout', () => {
    it('should run logOut', () => {
      const mockLogOut = jest.fn()
      const wrapper = shallow(<App logOut={mockLogOut} />)

      wrapper.instance().handleLogout()

      expect(mockLogOut).toHaveBeenCalled()
    })
  })

  describe('toggleLogin', () => {
    it('should match the snapshot when a user is not logged in', () => {
      const mockUser = undefined
      const wrapper = (<App user={mockUser} />)

      expect(wrapper).toMatchSnapshot()
    })

    it('should match the snapshot when a user is logged in', () => {
      const mockUser = {id: 1, name: 'joe'}
      const wrapper = (<App user={mockUser} />)

      expect(wrapper).toMatchSnapshot()
    })
  })

  it('map the store correctly with MDTP', () => {
    const wrapper = shallow(<App />);
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.changeStore();
    expect(mockDispatch).toHaveBeenCalled();
  });

});