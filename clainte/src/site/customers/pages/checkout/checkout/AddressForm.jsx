import { getIn } from 'formik'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import TextField from '@mui/material/TextField'
import useMediaQuery from '@mui/material/useMediaQuery'
import countries from '../../../../../data/countries'

const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery('(min-width:600px)')

  const formattedName = (field) => `${type}.${field}`

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    )

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field))

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
      }}
    >
      <TextField
        fullWidth
        color="secondary"
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
        color="secondary"
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
        color="secondary"
        variant="filled"
        type="text"
        label="Country"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        name={formattedName("country")}
        error={formattedError("country")}
        helperText={formattedHelper("country")}
        sx={{ gridColumn: "span 4" }}
      /> */}
      <FormControl variant="filled" sx={{ gridColumn: 'span 4' }}>
        <InputLabel id="country-select-label">Country</InputLabel>

        <Select
          fullWidth
          color="secondary"
          labelId="country-select-label"
          id="country-select"
          variant="filled"
          value={values?.country}
          onBlur={handleBlur}
          onChange={handleChange}
          error={!!touched.country && !!errors.country}
          name="country"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {countries?.map((country, index) => (
            <MenuItem
              key={`country-${country.code}-${index}`}
              value={country.name}
            >
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        color="secondary"
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
        color="secondary"
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
        color="secondary"
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
        color="secondary"
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
        color="secondary"
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
  )
}

export default AddressForm
