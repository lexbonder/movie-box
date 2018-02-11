import React, { Component } from 'react';
// import ReduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { addFavorite, getFavArray, removeFavorite } from '../../apiCall';
import './Card.css';
import { addFavArray } from '../../actions/';
import { LoginForm } from '../LoginForm/LoginForm';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

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

    id ? this.toggleFavorite(id, movie) : this.setState({favWithoutUser: true});
  };

  toggleFavorite = async (id, movie) => {
    const currentFavs = await getFavArray(id);
    const favMovieIds = currentFavs.data.map(fav => fav.movie_id);

    favMovieIds.includes(movie.movie_id)
      ? await removeFavorite(movie.movie_id, id)
      : await addFavorite({ ...movie, user_id: id });
    const updatedFavs = await getFavArray(id);
    this.props.addFavArray(updatedFavs.data);

  }

  render() {
    if (this.state.favWithoutUser === true) {
        return <Redirect to={{
                              pathname:'/login/',
                              state: {needLogin: true}
                            }} />
    } else {
      //console.log(this.props.match);
      
      let movies;

      if (this.props.match.path === '/' ){
        movies = this.props.movies;
      } else if (this.props.match.path === '/favorites'){ 
        movies = this.props.favorites;
      }

      // const { movies } = this.props
      const renderedMovies = movies.map((movie, index) => {
        return (
          <div className="Card flip-container" key={index}>
            <div className="posterWrapper flipper">
              <button className="front">&#9733;</button>
              <button
                className="back"
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
      return <div className="cardWrapper">{renderedMovies}</div>;
    }
    // <Route
    //           exact
    //           path="/favorites"
    //           render={() => {
    //             return (
    //               <label>
    //                 <input
    //                   required
    //                   className={this.state.toggleName}
    //                   name="name"
    //                   value={this.state.name}
    //                   type="text"
    //                   onChange={this.handleInputs}
    //                   placeholder="Your Name"
    //                 />
    //               </label>
    //             );
    //           }}
    //         />
  }
}

export const mapStateToProps = store => ({
  movies: store.movies,
  user: store.user,
  favorites: store.favorites
});

export const mapDispatchToProps = dispatch => ({
  addFavArray: newFavArray => dispatch(addFavArray(newFavArray))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
