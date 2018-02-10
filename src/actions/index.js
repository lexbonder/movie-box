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

export const addFavorite = movie => ({
  type: 'ADD_FAVORITE',
  movie
})

export const removeFavorite = movie => ({
  type: 'REMOVE_FAVORITE',
  movie
})

export const getUser = user => ({
  type: 'GET_USER',
  user
})

export const logOut = () => ({
  type: 'LOG_OUT'
})