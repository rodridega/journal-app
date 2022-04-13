import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({children, redirectTo, loggedIn}) => {
  return loggedIn ? children : <Navigate to={redirectTo} />;
}
