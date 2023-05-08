import React from 'react'
import { Box, CardContent, IconButton, Typography } from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { useTheme } from '@emotion/react'

import { tokens } from '../../../../../../theme'

const OrganizeItems = ({ organize, setEditingOrganize }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box className="flex flex-col gap-8">
      <Box
        className="flex justify-between items-center h-fit py-2"
        backgroundColor={colors.primary[600]}
      >
        <Typography
          variant="h4"
          color={colors.grey[100]}
          fontWeight="bold"
          className={`text-lg md:text-xl px-4 text-left`}
        >
          Organize
        </Typography>
      </Box>

      <Box className="w-full">
        <Box className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <Box className="flex flex-col  w-full  bg-slate-400/10 rounded-lg">
            <Box
              className="flex justify-between items-center p-2 h-10 rounded-t-lg"
              backgroundColor={colors.primary[300]}
            >
              <Typography variant="h5" fontWeight="bold">
                Category
              </Typography>
              <Box className="flex gap-1">
                <IconButton
                  color="warning"
                  onClick={() => setEditingOrganize('categories')}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            <CardContent className="h-full w-full p-2">
              <Box className={`w-full grid grid-cols-2 gap-4`}>
                {organize?.categories?.map((category, index2) => (
                  <Typography
                    key={`variant-${category.name}-category-${category.id}-${index2}`}
                    backgroundColor={colors.primary[400]}
                    sx={{
                      border: `1.5px solid ${colors.neutral[500]}`,
                    }}
                    className="flex justify-center items-center p-2 rounded-sm"
                  >
                    {category.name}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Box>
          <Box className="flex flex-col  w-full  bg-slate-400/10 rounded-lg">
            <Box
              className="flex justify-between items-center p-2 h-10 rounded-t-lg"
              backgroundColor={colors.primary[300]}
            >
              <Typography variant="h5" fontWeight="bold">
                Venders
              </Typography>
              <Box className="flex gap-1">
                <IconButton
                  color="warning"
                  onClick={() => setEditingOrganize('vendors')}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            <CardContent
              // onClick={() => handleSetVariant(variant.id)}
              className="h-full w-full p-2"
            >
              <Box className={`w-full grid grid-cols-2 gap-4`}>
                {organize?.vendors?.map((vendor, index2) => (
                  <Typography
                    key={`variant-${vendor.name}-vendor-${vendor.id}-${index2}`}
                    backgroundColor={colors.primary[400]}
                    sx={{
                      border: `1.5px solid ${colors.neutral[500]}`,
                    }}
                    className="flex justify-center items-center p-2 rounded-sm"
                  >
                    {vendor.name}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Box>
          <Box className="flex flex-col  w-full  bg-slate-400/10 rounded-lg">
            <Box
              className="flex justify-between items-center p-2 h-10 rounded-t-lg"
              backgroundColor={colors.primary[300]}
            >
              <Typography variant="h5" fontWeight="bold">
                Collection
              </Typography>
              <Box className="flex gap-1">
                <IconButton
                  color="warning"
                  onClick={() => setEditingOrganize('collections')}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            <CardContent
              // onClick={() => handleSetVariant(variant.id)}
              className="h-full w-full p-2"
            >
              <Box className={`w-full grid grid-cols-2 gap-4`}>
                {organize?.collections?.map((collection, index2) => (
                  <Typography
                    key={`variant-${collection.name}-collection-${collection.id}-${index2}`}
                    backgroundColor={colors.primary[400]}
                    sx={{
                      border: `1.5px solid ${colors.neutral[500]}`,
                    }}
                    className="flex justify-center items-center p-2 rounded-sm"
                  >
                    {collection.name}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Box>
          <Box className="flex flex-col  w-full  bg-slate-400/10 rounded-lg">
            <Box
              className="flex justify-between items-center p-2 h-10 rounded-t-lg"
              backgroundColor={colors.primary[300]}
            >
              <Typography variant="h5" fontWeight="bold">
                Tags
              </Typography>
              <Box className="flex gap-1">
                <IconButton
                  color="warning"
                  onClick={() => setEditingOrganize('tags')}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
            <CardContent
              // onClick={() => handleSetVariant(variant.id)}
              className="h-full w-full p-2"
            >
              <Box className={`w-full grid grid-cols-2 gap-4`}>
                {organize?.tags?.map((tag, index2) => (
                  <Typography
                    key={`variant-${tag.name}-tag-${tag.id}-${index2}`}
                    backgroundColor={colors.primary[400]}
                    sx={{
                      border: `1.5px solid ${colors.neutral[500]}`,
                    }}
                    className="flex justify-center items-center p-2 rounded-sm"
                  >
                    {tag.name}
                  </Typography>
                ))}
              </Box>
            </CardContent>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default OrganizeItems
