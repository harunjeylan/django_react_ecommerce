import React from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Checkbox,
  CardActionArea,
} from "@mui/material";
import { tokens } from "../../../import";
const VariantList = ({
  variants,
  setEditingVariant,
  selected,
  handelChecked,
  handleAddValiant,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box className="w-full">
      <Box className="w-full h-full grid grid-cols-4 gap-4">
        {variants?.map((variant, index) => (
          <Box
            key={`variant-${variant.name}-variants-${variant.id}-${index}`}
            backgroundColor={colors.primary[500]}
            className="w-full h-full flex flex-col gap-2 p-4 rounded-md"
          >
            <Box className="w-full flex  items-center">
              <Checkbox
                checked={Boolean(
                  selected.find(
                    (selectedVariant) => selectedVariant.id === variant.id
                  )
                )}
                onChange={() => handelChecked(variant.id)}
                color="secondary"
                className=""
              />
              <Box className="">
                <Typography variant="h5" fontWeight="bold">
                  {variant.label}
                </Typography>
              </Box>
            </Box>
            <CardActionArea
              onClick={() => setEditingVariant(variant)}
              className="relative h-full w-full p-2"
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
        ))}
        <Box
          backgroundColor={colors.primary[500]}
          className="w-full h-full flex flex-col items-center justify-center p-4 rounded-md"
        >
          <IconButton
            onClick={handleAddValiant}
            size="large"
            className="w-20 h-20"
          >
            +
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
export default VariantList;
