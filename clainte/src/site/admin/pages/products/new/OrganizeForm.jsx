import React from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  TextField,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  Select,
  OutlinedInput,
  Chip,
  Button,
} from "@mui/material";

import { tokens } from "../../../import";

import { constants } from "./constants";

const OrganizeForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleOpenModel,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      backgroundColor={colors.primary[400]}
      className="drop-shadow-lg  rounded-lg p-4"
    >
      <FormControl
        className="h-full w-full"
        component="fieldset"
        variant="standard"
      >
        <FormLabel>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left my-4`}
          >
            Organize
          </Typography>
        </FormLabel>
        <FormGroup className="w-full grid grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2">
          <Box className="w-full">
            <Box className="w-full flex justify-between px-1 gap-2">
              <Typography variant="h6" fontWeight="bold" className="my-2">
                Category
              </Typography>
              <Typography
                onClick={() =>
                  handleOpenModel({
                    inputLabel: "category",
                    modelTitle: "Add Category",
                  })
                }
                variant="h6"
                fontWeight="bold"
                className={`my-2 cursor-pointer hover:text-green-400`}
                color={colors.blueAccent[400]}
              >
                Add new category
              </Typography>
            </Box>
            <FormControl variant="filled" className="w-full">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                fullWidth
                color="secondary"
                labelId="category-select-label"
                id="categories-select"
                variant="filled"
                value={values.category}
                onBlur={handleBlur}
                onChange={handleChange}
                name="category"
              >
                {constants.categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="w-full">
            <Box className="w-full flex justify-between px-1 gap-2">
              <Typography variant="h6" fontWeight="bold" className="my-2">
                Vendor
              </Typography>
              <Typography
                onClick={() =>
                  handleOpenModel({
                    inputLabel: "vender",
                    modelTitle: "Add Vender",
                  })
                }
                variant="h6"
                fontWeight="bold"
                className={`my-2 cursor-pointer hover:text-green-400`}
                color={colors.blueAccent[400]}
              >
                Add new vendor
              </Typography>
            </Box>
            <FormControl variant="filled" className="w-full">
              <InputLabel id="vendor-select-label">Vendor</InputLabel>
              <Select
                fullWidth
                color="secondary"
                labelId="vendor-select-label"
                id="vendor-select"
                variant="filled"
                value={values.vendor}
                onBlur={handleBlur}
                onChange={handleChange}
                name="vendor"
              >
                {constants.vendors.map((vendor) => (
                  <MenuItem key={vendor.value} value={vendor.value}>
                    {vendor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="w-full">
            <Box className="w-full flex justify-between px-1 gap-2">
              <Typography variant="h6" fontWeight="bold" className="my-2">
                Collection
              </Typography>
              <Typography
                onClick={() =>
                  handleOpenModel({
                    inputLabel: "collection",
                    modelTitle: "Add Collection",
                  })
                }
                variant="h6"
                fontWeight="bold"
                className={`my-2 cursor-pointer hover:text-green-400`}
                color={colors.blueAccent[400]}
              >
                Add new collection
              </Typography>
            </Box>
            <FormControl variant="filled" className="w-full">
              <InputLabel id="collections-select-label">Collection</InputLabel>
              <Select
                fullWidth
                color="secondary"
                labelId="collections-select-label"
                id="collections-select"
                variant="filled"
                value={values.collection}
                onBlur={handleBlur}
                onChange={handleChange}
                name="collection"
              >
                {constants.collections.map((collection) => (
                  <MenuItem key={collection.value} value={collection.value}>
                    {collection.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="w-full">
            <Box className="w-full flex justify-between px-1 gap-2 items-center">
              <Typography variant="h6" fontWeight="bold" className="my-2">
                Tags
              </Typography>

              <Typography
                onClick={() =>
                  handleOpenModel({
                    inputLabel: "tags",
                    modelTitle: "Add Tags",
                  })
                }
                variant="subtitle"
                fontWeight="bold"
                className={`my-2 cursor-pointer hover:text-green-400`}
                color={colors.blueAccent[400]}
              >
                Add new tags
              </Typography>
            </Box>
            <FormControl variant="filled" className="w-full">
              <InputLabel id="tags-select-label">Tags</InputLabel>
              <Select
                fullWidth
                multiple
                color="secondary"
                labelId="tags-select-label"
                id="tags-select"
                variant="filled"
                value={values.tags}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                    }}
                  >
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                onBlur={handleBlur}
                onChange={handleChange}
                name="tags"
              >
                {constants.tags.map((tag) => (
                  <MenuItem key={tag.value} value={tag.value}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default OrganizeForm;
