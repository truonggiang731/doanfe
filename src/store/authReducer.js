import * as actionTypes from './actions';
import Cookies from 'js-cookie';

export const initialState = {
  isLogin: Cookies.get('token') ? true : false,
  isAdmin: JSON.parse(Cookies.get('roles') || '[]').includes("ROLE_ADMIN")
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      Cookies.set('token', action.payload.token);
      Cookies.set('roles', JSON.stringify(action.payload.roles));
      console.log(action.payload.roles.includes("ROLE_ADMIN"));
      return {
        ...state,
        isLogin: true,
        isAdmin: action.payload.roles.includes("ROLE_ADMIN")
      };
    case actionTypes.LOGOUT:
      Cookies.remove('token');
      Cookies.remove('roles');
      return {
        ...state,
        isLogin: false
      };
    default:
      return state;
  }
};

export default authReducer;
