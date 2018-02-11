import React, { Component } from "react";
import { connect } from "react-redux";
import Card from '../Card/Card';

export class Favorites extends Component {

  render() {
   
    const movies = await getFavArray(id);

    const buildFavs = <Card movies={movie}
    return (
        <div>
        { buildFavs }
        </div>
    )
  }
}

export const mapStateToProps = store => ({
  movies: store.movies
});

export const mapDispatchToProps = dispatch => ({
  toggleFavorites: id => dispatch(toggleFavorite(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
