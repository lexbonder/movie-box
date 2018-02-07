import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Card extends Component {
  render() {
      const { movies } = this.props;
      const renderedMovies = movies.map((movie, index) => {
        return (
          <div key={index}>
            <h1>{movie.title}</h1>
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

export default connect(mapStateToProps, null)(Card)