import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import {Navigate} from 'react-router';
import UserDichVu from 'ui-component/UserDichVu';
import AddHopDong from 'ui-component/UserDichVu/AddHopDong';
import HoaDonUnpaid from 'ui-component/UserDichVu/HoaDonUnpaid';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const UserRoutes = (isAuth) => {return {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: isAuth ?  <DashboardDefault /> : <Navigate to="/login"/>
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: isAuth ?  <DashboardDefault /> : <Navigate to="/login"/>
        }
      ]
    },
    {
       path: 'services',
       element: isAuth ? <UserDichVu /> : <Navigate to="/login" />
    },
    {
       path: 'services/add',
       element: isAuth ? <AddHopDong /> : <Navigate to="/login" />
    },{
      path: 'services/unpaid',
      element: isAuth ? <HoaDonUnpaid /> : <Navigate to="/login" />
   },
   {
     path: '*',
     element: <p>404</p>
   }
  ]
}};

export default UserRoutes;
