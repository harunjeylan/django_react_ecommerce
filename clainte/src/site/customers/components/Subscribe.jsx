import { useRef } from "react";
import { useTheme } from "@emotion/react";
import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { tokens } from "../../../theme";
import { useAddSerializerMutation } from "../../../features/services/subscriberApiSlice";
import { useSnackbar } from "notistack";
import useAlert from "../../../components/ui/useAlert";

const Subscribe = () => {
  const inputRef = useRef();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();
  const [CustomAlert, setMessages] = useAlert();
  const [addSubscriber] = useAddSerializerMutation();
  const handleSubmit = () => {
    addSubscriber({ post: { email: inputRef.current.value } }).then((data) => {
      if (data?.error?.data) {
        Object.keys(data.error.data).forEach((key) => {
          setMessages((prev) => [
            ...prev,
            {
              id: key,
              variant: "error",
              description: data.error.data[key],
            },
          ]);
        });
      } else {
        inputRef.current.value = "";
        enqueueSnackbar(`You have Subscribed in successfully!`, {
          variant: "success",
        });
      }
    });
  };
  return (
    <Box className="w-full flex flex-col gap-2 items-center text-center justify-center">
      <IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h3">Subscribe To Our Newsletter</Typography>
      <Typography>
        and receive $20 coupon for your first order when you checkout
      </Typography>
      <CustomAlert />
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        className="w-full"
        backgroundColor={colors.primary[400]}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
          inputRef={inputRef}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Box
          onClick={handleSubmit}
          sx={{ p: "10px", ":hover": { cursor: "pointer" } }}
        >
          <Typography>Subscribe</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Subscribe;
