export const favoritesReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_FAVORITE':
  console.log(action)
      return [...state, action.movie]
  default:
    return state;
  }
}