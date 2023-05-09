import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { TextField, Box, Typography, Divider, Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

import { setCredentials, setUserData } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'
import { endpoints as authEndpoints } from '../features/auth/authApiSlice'
import { useSnackbar } from 'notistack'
import useAlert from './ui/useAlert'

const UserLoginForm = ({
  handleCloseAccountDialog = undefined,
  handleClickOpenAccountDialog = undefined,
}) => {
  const userRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  const [CustomAlert, setMessages] = useAlert()
  const from = location.state?.from?.pathname || '/'
  useEffect(() => {
    userRef.current.focus()
  }, [])

  const initialValues = {
    username: '',
    password: '',
  }

  const loginSchema = yup.object().shape({
    username: yup.string().required('required'),
    password: yup.string().required('required'),
  })

  const [login] = useLoginMutation()

  const handleFormSubmit = (values, { resetForm }) => {
    login({ ...values }).then((data) => {
      if (data?.error) {
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            {
              id: key,
              variant: 'error',
              description: data.error.data[key],
            },
          ])
        })
      } else {
        dispatch(setCredentials(data.data))
        dispatch(authEndpoints.getUseData.initiate()).then((response) => {
          if (response.isSuccess) {
            dispatch(setUserData(response.data))
            enqueueSnackbar(`You have logged in successfully!`, {
              variant: 'success',
            })
            if (handleCloseAccountDialog !== undefined) {
              handleCloseAccountDialog()
            } else {
              navigate(from, { replace: true })
            }
          }
          resetForm()
        })
      }
    })
  }
  return (
    <Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={(newValues) => handleSubmit(newValues, resetForm)}>
            <Box className="flex flex-col gap-4 drop-shadow-lg  rounded-lg">
              <Box className="flex flex-col gap-4 px-4 py-2 ">
                <CustomAlert />
                <TextField
                  fullWidth
                  ref={userRef}
                  variant="filled"
                  type="username"
                  label="User name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name={'username'}
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name={'password'}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className="w-full py-2"
                >
                  Login
                </Button>
                <Box className="flex justify-end px-4 pt-2 ">
                  <Typography>Forgat Password</Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
          </form>
        )}
      </Formik>
      <Box className="flex flex-col gap-4 px-4 py-2 my-4 mb-8">
        <Box className="flex flex-col gap-4">
          <Button
            variant="outlined"
            color="error"
            size="medium"
            startIcon={<GoogleIcon className="text-red" size="large" />}
            className="w-full py-2"
          >
            Google
          </Button>
        </Box>
        <Box>
          <Box className="flex justify-start items-center gap-4 px-4 pt-2 mb-4">
            <Typography>I don't have anchorEl account </Typography>{' '}
            <Button
              onClick={() => {
                handleClickOpenAccountDialog !== undefined
                  ? handleClickOpenAccountDialog('register')
                  : navigate('/auth/register')
              }}
              className=""
              color="secondary"
              variant="link"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default UserLoginForm
