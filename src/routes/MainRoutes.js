import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import {Navigate} from 'react-router';
import AddHouse from 'ui-component/ManageHouse/AddHouse';
import DeleteHouse from 'ui-component/ManageHouse/DeleteHouse';
import UpdateHouse from 'ui-component/ManageHouse/UpdateHouse';

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
          element: <AddHouse />
    },
    {
          path: 'manage/delete',
          element: <DeleteHouse />
    },{
          path: 'manage/update',
          element: <UpdateHouse />
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
