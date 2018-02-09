export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_FAVORITE':
    console.log('in reducer');
    
    var favArray = state.filter(movie => movie.favorite === action.movie.favorite);
    console.log(favArray);
    
    return [...state, action.movie]
  default:
    return state;
  }
}