import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import {Navigate} from 'react-router';
import AddHouse from 'ui-component/ManageHouse/AddHouse';
import DeleteHouse from 'ui-component/ManageHouse/DeleteHouse';
import UpdateHouse from 'ui-component/ManageHouse/UpdateHouse';
import AddDichVu from 'ui-component/ManagerDichVu/AddDichVu';
import DeleteDichVu from 'ui-component/ManagerDichVu/DeleteDichVu';
import UpdateDichVu from 'ui-component/ManagerDichVu/UpdateDichVu';
import AddHopDong from 'ui-component/UserDichVu/AddHopDong';
import AddHoaDon from 'ui-component/ManagerHoaDon/AddHoaDon';
import AddHopDongAdmin from 'ui-component/ManagerHopDong/AddHopDongAdmin';
import DeleteHopDong from 'ui-component/ManagerHopDong/DeleteHopDong';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = (isAuth) => {return {
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
          path: 'manage/add',
          element: isAuth ? <AddHouse /> : <Navigate to="/login" />
    },
    {
          path: 'manage/delete',
          element: isAuth ? <DeleteHouse /> : <Navigate to="/login" />
    },{
          path: 'manage/update',
          element: isAuth ? <UpdateHouse /> : <Navigate to="/login" />
    },
    {
          path: 'manageDV/add',
          element: isAuth ? <AddDichVu /> : <Navigate to="/login" />
    },
    {
          path: 'manageDV/delete',
          element: isAuth ? <DeleteDichVu /> : <Navigate to="/login" />
    },{
          path: 'manageDV/update',
          element: isAuth ? <UpdateDichVu /> : <Navigate to="/login"/>
    },{
      path: 'manageHD/add',
      element: isAuth ? <AddHopDongAdmin /> : <Navigate to="/login"/>
    },{
      path: 'manageHD/update',
      element: isAuth ? <DeleteHopDong/> : <Navigate to="/login"/>
    },{
      path: 'managehoadon/add',
      element: isAuth ? <AddHoaDon/> : <Navigate to="/login"/>
    },
    
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: isAuth ?  <UtilsColor /> : <Navigate to="/login"/>
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: isAuth ?  <UtilsTablerIcons /> : <Navigate to="/login"/>
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: isAuth ?  <UtilsMaterialIcons /> : <Navigate to="/login"/>
        }
      ]
    },
  ]
}};

export default MainRoutes;
