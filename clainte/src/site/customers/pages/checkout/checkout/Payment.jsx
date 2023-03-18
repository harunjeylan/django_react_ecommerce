import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box className="flex flex-col gap-4">
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Info
        </Typography>
        <Box>
          <Typography variant="h1">Pyment</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
