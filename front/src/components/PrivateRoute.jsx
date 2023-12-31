// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error('Auth context is not available');
    return <Navigate to="/login" />;
  }

  const { isAuthenticated } = authContext;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
