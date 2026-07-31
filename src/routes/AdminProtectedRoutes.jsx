import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoutes = () => {
    const {user} = useContext(AuthContext);

    if(!user){
        return <Navigate to="/login" replace/>
    }

    if(user.role !== 'admin'){
        return <Navigate to="/login" replace />
    }
  return <Outlet/>
}

export default AdminProtectedRoutes
