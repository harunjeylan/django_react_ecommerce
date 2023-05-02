import { Box, Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
  const navigate = useNavigate();
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
      <Box className="w-full flex items-center justify-center h-full min-h-40">
        <Button
          onClick={() => navigate(`/shopping`)}
          variant="outlined"
          color="secondary"
          className={` px-[40px] py-4`}
        >
          Shop now
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;
