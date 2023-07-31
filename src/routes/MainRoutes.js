import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import {Navigate} from 'react-router';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

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
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: isAuth ?  <UtilsTypography /> : <Navigate to="/login"/>
        }
      ]
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
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: isAuth ?  <UtilsShadow /> : <Navigate to="/login"/>
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
    {
      path: 'sample-page',
      element: isAuth ?  <SamplePage /> : <Navigate to="/login"/>
    }
  ]
}};

export default MainRoutes;
