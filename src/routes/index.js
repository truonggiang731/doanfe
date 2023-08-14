import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import UserRoutes from './UserRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const {isLogin, isAdmin} = useSelector((state) => state.auth);

  const mainRoutes = useMemo(() => isAdmin ? MainRoutes(isLogin) : UserRoutes(isLogin), [isLogin, isAdmin])
  const authenticationRoutes = useMemo(() => AuthenticationRoutes(isLogin), [isLogin])

  return useRoutes([mainRoutes, authenticationRoutes]);
}
