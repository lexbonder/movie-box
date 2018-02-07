import React, { Component } from "react";
import ReduxThunk from 'redux-thunk'
import { connect } from "react-redux";
import { toggleFavorite, addFavorite } from "../../actions";

export class Card extends Component {

  handleClick = id => {
    this.props.toggleFavorites(id);
    const favorites = this.props.movies.filter(movie => movie.favorite);
    console.log(favorites)
    favorites.forEach( favorite => {
      this.props.addToFavorites(favorite);
    })
  };

  render() {
    const { movies, toggleFavorites, favorites, addToFavorites } = this.props;
    const renderedMovies = movies.map((movie, index) => {
      return (
        <div key={index}>
          <button
            id={movie.id}
            onClick={event => this.handleClick(event.target.id)}
          >
            Favorite
          </button>
          <h1>{movie.title}</h1>
          <h2>Release Date: {movie.date}</h2>
          <img src={movie.poster} />
          <p>{movie.overview}</p>
        </div>
      );
    });
    return <div>{renderedMovies}</div>;
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
