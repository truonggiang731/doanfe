import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import {Navigate} from 'react-router';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = (isAuth) => {return {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: isAuth ? <Navigate to={'/dashboard/default'} /> : <AuthLogin3 />
    },
    {
      path: '/register',
      element: isAuth ? <Navigate to={'/dashboard/default'} /> : <AuthRegister3 />
    }
  ]
}};

export default AuthenticationRoutes;
