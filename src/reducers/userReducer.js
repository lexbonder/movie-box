export const userReducer = ( state={}, action ) => {
  switch (action.type){
  case 'GET_USER':
    return action.user;
  case 'LOG_OUT':
    return {};
  default:
    return state;
  }
};