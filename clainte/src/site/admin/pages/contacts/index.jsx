import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  useTheme,
  Button,
  Breadcrumbs,
  CircularProgress,
} from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../../../theme'
import Header from '../../../../components/Header'
import { useGetAllContactsQuery } from '../../../../features/services/contactApiSlice'
import dateFormatter from '../../../../helpers/dateFormatter'
import Model from '../../../../components/ui/Model'

const Contacts = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode)
  const [openModel, setOpenModel] = useState(false)
  const [modelData, setModelData] = useState({})
  const { data: contacts = [], isFetching: isFetchingContacts } =
    useGetAllContactsQuery()
  const handleClick = (id) => {
    let contact = contacts.find((contact) => contact.id === id)
    setModelData(contact)
    setOpenModel(true)
  }
  const columns = [
    { field: 'id', headerName: 'Id', width: 50 },
    {
      field: 'first_name',
      headerName: 'Name',
      cellClassName: 'name-column--cell',
      width: 200,
      renderCell: ({ row: { id, first_name, last_name } }) => {
        return (
          <Typography
            sx={{ color: colors.greenAccent[400] }}
            onClick={() => handleClick(id)}
            className="cursor-pointer"
          >
            {first_name} {last_name}
          </Typography>
        )
      },
    },
    {
      field: 'created',
      headerName: 'Added At',
      width: 120,
      renderCell: ({ row: { created } }) => {
        return <Typography>{dateFormatter(new Date(created))}</Typography>
      },
    },
    { field: 'phone_number', headerName: 'Phone Number', width: 120 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'description',
      headerName: 'Description',
      width: 550,
      renderCell: ({ row: { id, description } }) => {
        return (
          <Typography
            onClick={() => handleClick(id)}
            className="cursor-pointer"
          >
            {description}
          </Typography>
        )
      },
    },
  ]
  return (
    <Box className="flex flex-col gap-4 md:gap-8 md:mt-20">
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle={`${modelData?.first_name} ${modelData?.last_name}`}
      >
        <Typography className="">{modelData?.description}</Typography>
      </Model>
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
        <Header title="CONTACTS" subtitle="welcome to you Contacts" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box
          m="8px 0 0 0"
          width="100%"
          height="80vh"
          backgroundColor={colors.primary[400]}
          className="h-[80vh] rounded-lg p-4"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
              width: '100%',
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiChackbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          {!isFetchingContacts ? (
            contacts?.length ? (
              <DataGrid
                density="comfortable"
                rows={contacts}
                columns={columns}
                autoPageSize
                // checkboxSelection
                components={{ Toolbar: GridToolbar }}
              />
            ) : (
              <Box className="w-full flex items-center justify-center h-full min-h-40">
                <Typography>No data</Typography>
              </Box>
            )
          ) : (
            <Box className="w-full flex items-center justify-center h-full min-h-40">
              <CircularProgress color="secondary" />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Contacts
