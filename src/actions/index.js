//Add Favorites
//Toggle Favorites
//Set Filter

export const updateMovie = ({title, date, overview, poster, backdrop, id}) => ({
  type: 'UPDATE_MOVIE',
  title,
  date,
  overview,
  poster,
  backdrop,
  id
});
