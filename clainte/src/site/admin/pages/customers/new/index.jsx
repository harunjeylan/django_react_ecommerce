import React from 'react'
import { Box, Button, Breadcrumbs, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../../components/Header'
import { useTheme } from '@emotion/react'
import { tokens } from '../../../../../theme'
import UserRegisterForm from '../../../../../components/UserRegisterForm'

const NewCustomer = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">New Product</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="CREATE USER" subtitle="Create a New User Profile" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="">
          <UserRegisterForm isAdminPage />
        </Box>
      </Box>
    </Box>
  )
}

export default NewCustomer
