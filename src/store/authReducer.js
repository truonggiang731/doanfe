import * as actionTypes from './actions';
import Cookies from 'js-cookie';

export const initialState = {
  isLogin: Cookies.get('token') ? true : false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      Cookies.set('token', action.payload.token);
      return {
        ...state,
        isLogin: true
      };
    case actionTypes.LOGOUT:
      Cookies.remove('token');
      return {
        ...state,
        isLogin: false
      };
    default:
      return state;
  }
};

export default authReducer;