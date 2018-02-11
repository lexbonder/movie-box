export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_FAVORITE':
    return [...action.movies];
  default:
    return state;
  }
};