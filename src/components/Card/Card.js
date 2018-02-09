import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { toggleFavorite, addFavorite } from '../../actions';
import './Card.css';

export class Card extends Component {
  handleClick = async id => {
   await this.props.toggleFavorites(id);
    const favorites = this.props.movies.filter(movie => movie.favorite);
   
    favorites.forEach(async favorite => {
     await this.props.addToFavorites(favorite);
     
    });
    //console.log(favorites);
  };

  render() {
    const { movies, toggleFavorites, favorites, addToFavorites } = this.props;
    const renderedMovies = movies.map((movie, index) => {
      return (
        <div className="Card flip-container" key={index}>
          <div className="posterWrapper flipper">
            <button
              className='front'
              id={movie.id}
              onClick={event => this.handleClick(event.target.id)}
            >
              &#9733;
            </button>
            <button
              className='back'
              id={movie.id}
              onClick={event => this.handleClick(event.target.id)}
            >
              &#9733;
            </button>

            <img src={movie.poster}
              className='front' />
            <div className='textBox back'>
              <h1 className='movie-title'>{movie.title}</h1>
              <p className='date'>{movie.date}</p>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      );
    });
    return <div className="cardWrapper">{renderedMovies}</div>;
  }
}

export const mapStateToProps = store => ({
  movies: store.movies,
  favorites: store.favorites
});

export const mapDispatchToProps = dispatch => ({
  toggleFavorites: id => dispatch(toggleFavorite(id)),
  addToFavorites: movie => dispatch(addFavorite(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
