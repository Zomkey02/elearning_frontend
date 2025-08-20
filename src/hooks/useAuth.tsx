import { useContext, useMemo } from 'react'
import { AuthContext } from '../context/AuthProvider';

type Role= 'admin' | 'writer' | 'user';

export function useAuth() {

    const {auth, setAuth} = useContext(AuthContext);
    const user = auth.data;

    const derived = useMemo(() => {
        const isLoading = auth.status === 'loading';
        const isLoggedIn = auth.status === 'loggedIn' && !! user;
        const isLoggedOut = auth.status === 'loggedOut' || !user;

        const role = user?.role;
        const isAdmin = role === 'admin';
        const isWriter = role === 'writer';

        const hasRole = (...roles: Role[]) =>
            !!role && roles.includes(role);

        return { user, isLoading, isLoggedIn, isLoggedOut, role, isAdmin, isWriter, hasRole}

    }, [auth.status, user]);

  return {
    auth,
    setAuth,
    ...derived,
  };
}
