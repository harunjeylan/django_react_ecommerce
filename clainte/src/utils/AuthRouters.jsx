import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import {
  selectCurrentToken,
  selectCurrentUser,
} from '../features/auth/authSlice'
const AuthRouters = ({ children, ...rest }) => {
  const token = useSelector(selectCurrentToken)
  const user = useSelector(selectCurrentUser)
  const location = useLocation()
  if (token && user) {
    return <Navigate to="/" state={{ from: location }} replace />
  } else {
    return <Outlet />
  }
}

export default AuthRouters
