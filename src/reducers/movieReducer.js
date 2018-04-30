export const movieReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_MOVIE':
    return [...state, { ...action.movie, favorite: false }];
  case 'TOGGLE_FAVORITE':
    return state.map(movie => {
      return movie.id === parseInt(action.id, 10)
        ? { ...movie, favorite: !movie.favorite }
        : movie;
    });
  default:
    return state;
  }
};
