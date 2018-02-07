import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleFavorite } from '../../actions'

export class Card extends Component {
  render() {
    console.log(this.props.movies)
      const { movies, toggleFavorites } = this.props;
      const renderedMovies = movies.map((movie, index) => {
        return (
          <div key={index}>
            <button 
              id={movie.id}
              onClick={event => toggleFavorites(event.target.id)}
            >
              Favorite
            </button>
            <h1>{movie.title}</h1>
            <h2>Release Date: {movie.date}</h2>
            <img src={movie.poster} />
            <p>{movie.overview}</p>
          </div>
        )
      });
    return (
      <div>
        {renderedMovies}
      </div>
    )
  }
}

export const mapStateToProps = store => ({
  movies: store.movies
})

export const mapDispatchToProps = dispatch => ({
  toggleFavorites: id => dispatch(toggleFavorite(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)