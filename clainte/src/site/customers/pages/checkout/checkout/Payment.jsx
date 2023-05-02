import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import useAlert from "../../../../../components/ui/useAlert";
import { useEffect } from "react";

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  const [CustomAlert, setMessages] = useAlert();
  useEffect(() => {
    setMessages([
      {
        id: 1,
        variant: "info",
        title: "Payment",
        description: "Payment Integrations goes hear!",
        timeout: 5 * 60 * 1000,
      },
    ]);
  }, []);
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box className="flex flex-col gap-4">
        <CustomAlert />
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
