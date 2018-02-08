import React from 'react';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { updateMovie } from './actions';
import { shallow } from 'enzyme';

describe('App ', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })

  // it('calls updateMovie when sendMoviesToStore is called', () => {
  //   const mockUpdateMovie = jest.fn()
  //   const mockMovies = [{movie: 'name'}]
  //   const wrapper = shallow(<App updateMovie={mockUpdateMovie} />);
  //   wrapper.instance().sendMoviesToStore(mockMovies);
  //   expect(mockUpdateMovie).toHaveBeenCalled();
  // })

  it('map the store correctly with MSTP', () => {
    const wrapper = shallow(<App />);
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.changeStore();
    expect(mockDispatch).toHaveBeenCalled();
  });

});