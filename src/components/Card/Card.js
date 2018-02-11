import React, { Component } from 'react';
// import ReduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { addFavorite, getFavArray, removeFavorite } from '../../apiCall';
import './Card.css';

export class Card extends Component {
  
  toggleFavorite = async (event, movie) => {
    event.preventDefault();
    const { id } = this.props.user;
    const currentFavs = await getFavArray(id);
    const newFav = { ...movie, user_id: id };
    const favMovieIds = currentFavs.data.map(fav => fav.movie_id);
    favMovieIds.includes(movie.movie_id)
      ? removeFavorite(movie.movie_id, id)
      : addFavorite(newFav);
  };

  render() {
    const { movies } = this.props;
    const renderedMovies = movies.map((movie, index) => {
      return (
        <div className="Card flip-container" key={index}>
          <div className="posterWrapper flipper">
            <button className="front">&#9733;</button>
            <button
              className="back"
              id={movie.id}
              onClick={event => this.toggleFavorite(event, movie)}
            >
              &#9733;
            </button>

            <img
              src={movie.poster_path}
              alt={`Movie poster from ${movie.title}`}
              className="front"
            />
            <div className="textBox back">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="date">{movie.release_date}</p>
              <p className="rating">{`Rating: ${movie.vote_average} / 10`}</p>
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
  user: store.user
  //favorites: store.favorites
});

// export const mapDispatchToProps = dispatch => ({
  // toggleFavorites: id => dispatch(toggleFavorite(id)),
  // addToFavorites: movie => dispatch(addFavorite(movie)),
  // removeFavorite: movie => dispatch(removeFavorite(movie))
// });

export default connect(mapStateToProps, null)(Card);
