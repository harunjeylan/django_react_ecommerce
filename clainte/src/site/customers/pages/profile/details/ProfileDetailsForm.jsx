import { getIn } from 'formik'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Dropzone, FileItem, FullScreenPreview } from '@dropzone-ui/react'
import { useState } from 'react'
import { useTheme } from '@emotion/react'
import { tokens } from '../../../../../theme'
import countries from '../../../../../data/countries'
const PersonalDetails = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [imageSrc, setImageSrc] = useState(undefined)
  const handleClean = (image) => {
    console.log('list cleaned', image)
  }
  // these functions allow for better code readability
  const formattedName = (field) => `${field}`

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    )

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field))
  return (
    <>
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={() => setImageSrc(undefined)}
      />
      <Box
        display="grid"
        gap="15px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
        }}
      >
        <Box sx={{ gridColumn: 'span 4' }}>
          <Typography variant="h6" fontWeight="bold" className="my-2">
            Profile Images
          </Typography>
          <Dropzone
            style={{
              minHeight: '200px',
              minWidth: '100%',
              backgroundColor: colors.primary[400],
            }}
            label="Drop your Display images here or click to browse"
            onChange={(incomingImages) =>
              setFieldValue('images', incomingImages)
            }
            onClean={handleClean}
            value={values.images}
            maxFiles={1}
            maxFileSize={2998000}
            accept=".png,image/*"
            uploadingMessage={'Uploading...'}
          >
            {values.images?.length &&
              values.images?.map((file) => (
                <FileItem
                  {...file}
                  key={file.id}
                  onDelete={(id) =>
                    setFieldValue(
                      'images',
                      values.images.filter((x) => x.id !== id)
                    )
                  }
                  onSee={(imageSource) => setImageSrc(imageSource)}
                  resultOnTooltip
                  preview
                  info
                  hd
                />
              ))}
          </Dropzone>
        </Box>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="First Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.first_name}
          name={formattedName('first_name')}
          error={formattedError('first_name')}
          helperText={formattedHelper('first_name')}
          sx={{ gridColumn: 'span 2' }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Last Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.last_name}
          name={formattedName('last_name')}
          error={formattedError('last_name')}
          helperText={formattedHelper('last_name')}
          sx={{ gridColumn: 'span 2' }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Username"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.username}
          name={formattedName('username')}
          error={formattedError('username')}
          helperText={formattedHelper('username')}
          sx={{ gridColumn: 'span 4' }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="email"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name={formattedName('email')}
          error={formattedError('email')}
          helperText={formattedHelper('email')}
          sx={{ gridColumn: 'span 4' }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phone_number}
          name={formattedName('phone_number')}
          error={formattedError('phone_number')}
          helperText={formattedHelper('phone_number')}
          sx={{ gridColumn: 'span 4' }}
        />
        {/* <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Country"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.country}
          name={formattedName('country')}
          error={formattedError('country')}
          helperText={formattedHelper('country')}
          sx={{ gridColumn: 'span 4' }}
        /> */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 4' }}>
          <InputLabel id="country-select-label">Country</InputLabel>

          <Select
            fullWidth
            variant="filled"
            type="text"
            label="Country"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.country}
            name={formattedName('country')}
            error={formattedError('country')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {countries?.map((country, index) => (
              <MenuItem
                key={`country-${country.name}-${index}`}
                value={country.name}
              >
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Street Address"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.street1}
          name={formattedName('street1')}
          error={formattedError('street1')}
          helperText={formattedHelper('street1')}
          sx={{ gridColumn: 'span 2' }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Street Address 2 (optional)"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.street2}
          name={formattedName('street2')}
          error={formattedError('street2')}
          helperText={formattedHelper('street2')}
          sx={{ gridColumn: 'span 2' }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="City"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.city}
          name={formattedName('city')}
          error={formattedError('city')}
          helperText={formattedHelper('city')}
          sx={{ gridColumn: 'span 2' }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="State"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.state}
          name={formattedName('state')}
          error={formattedError('state')}
          helperText={formattedHelper('state')}
          sx={{ gridColumn: '1fr' }}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Zip Code"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.zipcode}
          name={formattedName('zipcode')}
          error={formattedError('zipcode')}
          helperText={formattedHelper('zipcode')}
          sx={{ gridColumn: '1fr' }}
        />
      </Box>
    </>
  )
}

export default PersonalDetails
