import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import {
  selectCurrentToken,
  selectCurrentUser,
} from '../features/auth/authSlice'
const AuthRouters = ({ children, ...rest }) => {
  const token = useSelector(selectCurrentToken)
  const user = useSelector(selectCurrentUser)
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const navigate = useNavigate()

  if (token && user) {
    return navigate(from, { replace: true })
  } else {
    return <Outlet />
  }
}

export default AuthRouters
