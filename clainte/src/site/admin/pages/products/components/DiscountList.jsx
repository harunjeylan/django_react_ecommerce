import React from "react";
import {
  Box,
  Typography,
  CardActionArea,
  IconButton,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { tokens } from "../../../../../theme";
import { useTheme } from "@emotion/react";
import Discount from "./Discount";
import dayjs from "dayjs";
const DiscountList = ({
  discounts,
  readOnly,
  setEditingDiscount,
  handleAddDiscount,
  handleSetDiscount,
  highlightDiscountId,
  setMessages,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="w-full">
      <Box className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {discounts?.map((discount, index) => (
          <Discount
            key={`discount-${discount.name}-discounts-${discount.id}-${index}`}
            discount={discount}
            highlightDiscountId={highlightDiscountId}
            handleSetDiscount={handleSetDiscount}
            setEditingDiscount={setEditingDiscount}
            setMessages={setMessages}
            readOnly={readOnly}
          />
        ))}
      </Box>
      {!readOnly && (
        <Button
          onClick={handleAddDiscount}
          type="button"
          color="secondary"
          variant="outlined"
          className={`w-full mt-4`}
        >
          Add New
        </Button>
      )}
    </Box>
  );
};

export default DiscountList;
