import React from "react";
import {
  Box,
  CardActionArea,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { tokens } from "../../../../../theme";
import { useTheme } from "@emotion/react";
import { useDeleteVariantMutation } from "../../../../../features/services/variantApiSlice";
import { useSnackbar } from "notistack";

const Variant = ({
  variant,
  highlightVariantId,
  setEditingVariant,
  handleSetVariant,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { enqueueSnackbar } = useSnackbar();

  const [deleteVariant] = useDeleteVariantMutation();
  const handleDelete = () => {
    deleteVariant({ post: { id: variant.id } }).then((data) => {
      if (data?.error?.status === 400) {
        Object.keys(data.error.data).forEach((key) => {
          setModelMessages((prev) => [
            ...prev,
            { id: key, variant: "error", description: data.error.data[key] },
          ]);
        });
      } else {
        enqueueSnackbar(
          `Variant -> ${variant.label} is deleted successfully!`,
          {
            variant: "success",
          }
        );
      }
    });
  };
  return (
    <Box className="flex flex-col  w-full  bg-slate-400/10 rounded-lg">
      <Box
        className="flex justify-between items-center p-2 h-10 rounded-t-lg"
        backgroundColor={
          highlightVariantId ? colors.greenAccent[600] : colors.primary[300]
        }
      >
        <Typography variant="h5" fontWeight="bold">
          {variant.label}
        </Typography>
        <Box className="flex gap-1">
          <IconButton
            color="warning"
            onClick={() => setEditingVariant(variant)}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
      <CardActionArea
        onClick={() => handleSetVariant(variant.id)}
        className="h-full w-full p-2"
      >
        <List>
          {variant?.options?.map((option, index2) => (
            <ListItem
              key={`variant-${option.label}-options-${option.id}-${index2}`}
            >
              {option.label}
            </ListItem>
          ))}
        </List>
      </CardActionArea>
    </Box>
  );
};

export default Variant;
