import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PageLoader } from '../components/Loading';

const PrivateLayout = () => {
    /* const { auth } = useContext(AuthContext); */
  const { isLoading, isLoggedIn} = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader label='Loading' />;


  return isLoggedIn ? (
    <Outlet />
  ) : (
    <>
      <Navigate 
        to="/login" 
        state={{ from: location }}
        replace />
    </>
  );
};


export default PrivateLayout