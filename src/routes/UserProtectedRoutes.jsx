import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoutes = () => {
  const {user} = useContext(AuthContext);

  if(!user){
    return <Navigate to="/login" replace/>;
  }
  return <Outlet/>
}

export default UserProtectedRoutes
