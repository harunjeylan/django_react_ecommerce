import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { TextField, Box, Typography, Divider, Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { setUser } from '../features/auth/authSlice'
import { useRegisterMutation } from '../features/auth/authApiSlice'
import useAlert from './ui/useAlert'
import { useSnackbar } from 'notistack'

const UserRegisterForm = ({
  isAdminPage,
  handleCloseAccountDialog,
  handleClickOpenAccountDialog,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [CustomAlert, setMessages] = useAlert()
  const { enqueueSnackbar } = useSnackbar()

  const initialValues = {
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  }

  const [register] = useRegisterMutation()
  const handleFormSubmit = (values, { resetForm }) => {
    register({ ...values }).then((data) => {
      if (data?.error?.data) {
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
        enqueueSnackbar(`You have registered in successfully!`, {
          variant: 'success',
        })
        resetForm()
        if (!isAdminPage) {
          dispatch(setUser(data.data))
          if (handleCloseAccountDialog !== undefined) {
            handleCloseAccountDialog()
          } else {
            navigate(from, { replace: true })
          }
        }
      }
    })
  }
  return (
    <Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box className="flex flex-col gap-4 drop-shadow-lg  rounded-lg">
              <Box className="flex flex-col gap-4 px-4 py-2 ">
                <CustomAlert />
                <TextField
                  fullWidth
                  variant="filled"
                  type="first_name"
                  label="first name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.first_name}
                  name={'first_name'}
                  error={!!touched.first_name && !!errors.first_name}
                  helperText={touched.first_name && errors.first_name}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="last_name"
                  label="last name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.last_name}
                  name={'last_name'}
                  error={!!touched.last_name && !!errors.last_name}
                  helperText={touched.last_name && errors.last_name}
                />
                <TextField
                  fullWidth
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
                  value={values.newPassword}
                  name={'password'}
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="repeat Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.newPassword}
                  name={'password2'}
                  error={!!touched.password2 && !!errors.password2}
                  helperText={touched.password2 && errors.password2}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className="w-full py-2"
                >
                  Register
                </Button>
                {!isAdminPage && (
                  <Box className="flex justify-start px-4 pt-2 ">
                    <Typography>Remember me</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Divider />
          </form>
        )}
      </Formik>
      {!isAdminPage && (
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
              <Typography>I have already account </Typography>{' '}
              <Button
                onClick={() => {
                  handleClickOpenAccountDialog !== undefined
                    ? handleClickOpenAccountDialog('login')
                    : navigate('/auth/login')
                }}
                className=""
                color="secondary"
                variant="link"
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
const checkoutSchema = yup.object().shape({
  first_name: yup.string().required('required'),
  last_name: yup.string().required('required'),
  username: yup.string().required('required'),
  password: yup
    .string()
    .required('required')
    .matches(
      /(?=.*[a-zA-Z])/,
      'The string must contain at least 1 alphabetical character'
    )
    .matches(
      /(?=.*[0-9])/,
      'The string must contain at least 1 numeric character'
    )
    .matches(
      /(?=.*[!@#%^&*<>/_?,.:"'$%^&*)=+()])/,
      'The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict'
    )
    .matches(/(?=.{8,})/, 'The string must be eight characters or longer'),
  password2: yup
    .string()
    .required('required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export default UserRegisterForm
