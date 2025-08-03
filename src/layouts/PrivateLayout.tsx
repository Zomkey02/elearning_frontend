import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const PrivateLayout = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();


  return auth.status === 'loading' ? '...Loading' : auth.status === 'loggedIn' ? (
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