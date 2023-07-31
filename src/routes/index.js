import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const {isLogin} = useSelector((state) => state.auth);

  const mainRoutes = useMemo(() => MainRoutes(isLogin), [isLogin])
  const authenticationRoutes = useMemo(() => AuthenticationRoutes(isLogin), [isLogin])

  return useRoutes([mainRoutes, authenticationRoutes]);
}
