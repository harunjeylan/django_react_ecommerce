import { getIn } from "formik";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import TextField from "@mui/material/TextField";
const ChangePasswordForm = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // these functions allow for better code readability
  const formattedName = (field) => `${field}`;

  const formattedError = (field) =>
    Boolean(
      getIn(touched, formattedName(field)) &&
        getIn(errors, formattedName(field))
    );

  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <TextField
        fullWidth
        variant="filled"
        type="password"
        label="Old password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.old_password}
        name={formattedName("old_password")}
        error={formattedError("old_password")}
        helperText={formattedHelper("old_password")}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="password"
        label="New password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.new_password}
        name={formattedName("new_password")}
        error={formattedError("new_password")}
        helperText={formattedHelper("new_password")}
        sx={{ gridColumn: "span 4" }}
      />
      <TextField
        fullWidth
        variant="filled"
        type="password"
        label="Retype new password"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.passwordConfirmation}
        name={formattedName("passwordConfirmation")}
        error={formattedError("passwordConfirmation")}
        helperText={formattedHelper("passwordConfirmation")}
        sx={{ gridColumn: "span 4" }}
      />
    </Box>
  );
};

export default ChangePasswordForm;
