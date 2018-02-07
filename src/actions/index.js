//Add Favorites
//Toggle Favorites
//Set Filter

export const addMovie = (movie) => ({
  type: 'ADD_MOVIE',
  movie
});

export const toggleFavorite = id => ({
  type: 'TOGGLE_FAVORITE',
  id
})
