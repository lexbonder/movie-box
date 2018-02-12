import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFavorite, getFavArray, removeFavorite } from '../../apiCall';
import './Card.css';
import { addFavArray } from '../../actions/';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Card extends Component {
  constructor() {
    super();
    this.state = {
      favWithoutUser: false,
      userFavorites: []
    };
  }

  handleFavClick = (event, movie) => {
    event.preventDefault();
    const { id } = this.props.user;

    id
      ? this.toggleFavorite(id, movie)
      : this.setState({ favWithoutUser: true });
  };

  toggleFavorite = async (id, movie) => {
    const currentFavs = await getFavArray(id);
    const favMovieIds = currentFavs.data.map(fav => fav.movie_id);

    favMovieIds.includes(movie.movie_id)
      ? await removeFavorite(movie.movie_id, id)
      : await addFavorite({ ...movie, user_id: id });
    const updatedFavs = await getFavArray(id);
    this.props.addFavArray(updatedFavs.data);
  };

  render() {
    if (this.state.favWithoutUser === true) {
      return (
        <Redirect
          to={{
            pathname: '/login/',
            state: { needLogin: true }
          }}
        />
      );
    } else {
      let movies;

      if (this.props.match.path === '/') {
        movies = this.props.movies;
      } else if (this.props.match.path === '/favorites') {
        movies = this.props.favorites;
      }
      const renderedMovies = movies.map((movie, index) => {
        const favIdList = this.props.favorites.map(fav => fav.movie_id);
        const changeClass = favIdList.includes(movie.movie_id) ? 'active' : '';

        return (
          <div className="Card flip-container" key={index}>
            <div className="posterWrapper flipper">
              <button className={`front ${changeClass}`}>&#9733;</button>
              <button
                className={`back ${changeClass}`}
                id={movie.id}
                onClick={event => this.handleFavClick(event, movie)}
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
      return (
        <div>
          {
            this.props.favorites.length === 0 &&
            <h1 className='no-favorites'>{`You don't have any favorites`}</h1>
          }
          <div className="cardWrapper">{renderedMovies}</div>
        </div>
      );
    }
  }
}

const { arrayOf, shape, string, number, bool, func } = PropTypes;

Card.propTypes = {
  movies: arrayOf(
    shape({
      title: string,
      vote_average: number,
      release_date: string,
      overview: string,
      poster_path: string,
      movie_id: number,
      favorite: bool
    })
  ),
  user: shape({
    id: number,
    name: string,
    password: string,
    email: string
  }),
  favorites: arrayOf(
    shape({
      id: number,
      movie_id: number,
      user_id: number,
      title: string,
      poster_path: string,
      release_date: string,
      vote_average: number,
      overview: string
    })
  ),
  addFavArray: func,
  match: shape({
    path: string
  })
};

export const mapStateToProps = store => ({
  movies: store.movies,
  user: store.user,
  favorites: store.favorites
});

export const mapDispatchToProps = dispatch => ({
  addFavArray: newFavArray => dispatch(addFavArray(newFavArray))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
