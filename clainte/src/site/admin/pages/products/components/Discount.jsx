import React from "react";
import { Box, CardActionArea, IconButton, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { tokens } from "../../../../../theme";
import { useTheme } from "@emotion/react";
import { useDeleteDiscountMutation } from "../../../../../features/services/discountApiSlice";
import { useSnackbar } from "notistack";
const Discount = ({
  discount,
  readOnly,
  setEditingDiscount,
  handleSetDiscount,
  setModelMessages,
  highlightDiscountId = null,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();
  const [deleteDiscount, { isLoading: isDeleting }] =
    useDeleteDiscountMutation();

  const handleDelete = () => {
    deleteDiscount({ post: { id: discount.id } }).then((data) => {
      if (data?.error?.status === 400) {
        Object.keys(data.error.data).forEach((key) => {
          setModelMessages((prev) => [
            ...prev,
            { id: key, variant: "error", description: data.error.data[key] },
          ]);
        });
      } else {
        enqueueSnackbar(
          `Discount -> ${discount.name} is deleted successfully!`,
          {
            variant: "success",
          }
        );
      }
    });
  };
  return (
    <Box
      key={discount.id}
      className="flex flex-col  w-full  bg-slate-400/10 rounded-lg"
    >
      <Box
        className="flex justify-between items-center p-2 h-10 rounded-t-lg"
        backgroundColor={
          highlightDiscountId === discount.id
            ? colors.greenAccent[600]
            : colors.primary[300]
        }
      >
        <Typography variant="h5" fontWeight="bold">
          {discount.name}
        </Typography>
        {!readOnly && (
          <Box className="flex gap-1">
            <IconButton
              color="warning"
              onClick={() => setEditingDiscount(discount)}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton color="error" onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <CardActionArea
        onClick={() => handleSetDiscount(discount.id)}
        className="flex flex-col items-start gap-4 px-4 py-2"
      >
        <Typography variant="h5" fontWeight="bold">
          <strong>Discount: </strong>
          {discount.amount}%
        </Typography>
        <Typography variant="p">
          <strong>Start at: </strong>
          {discount.start_date}
        </Typography>
        <Typography variant="p">
          <strong>End at: </strong>
          {discount.end_date}
        </Typography>
      </CardActionArea>
    </Box>
  );
};

export default Discount;
