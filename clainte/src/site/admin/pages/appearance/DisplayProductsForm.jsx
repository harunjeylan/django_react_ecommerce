import {
  Box,
  useTheme,
  Divider,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Breadcrumbs, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import Model from "../../../../components/ui/Model";
import { useRef, useState } from "react";
import { useGetAllCategoryQuery } from "../../../../features/services/organizeApiSlice";

import Countdown from "react-countdown";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MoneyIcon from "@mui/icons-material/Money";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import { MenuItem } from "@mui/material/MenuItem";
const DisplayProductsForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [categoryThumbnail, setCategoryThumbnail] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");

  const inputRef = useRef();
  // const handleAdd = () => {};
  // const handleUpdate = () => {};
  // const handleDelete = () => {};
  const handleChange = (e) => {
    console.log(e);
  };
  const { data: categories = [], isFetching: categoriesIsFetching } =
    useGetAllCategoryQuery();
  const handleClean = (image) => {
    console.log("list cleaned", image);
  };
  return (
    <Box
      backgroundColor={colors.primary[400]}
      className="w-full h-fit flex flex-col gap-4 p-2"
    >
      <Typography
        variant="h1"
        color={colors.grey[100]}
        fontWeight="bold"
        className={`text-xl md:text-2xl  text-left`}
      >
        Display Products
      </Typography>
      <Box className="w-full h-fit flex flex-col gap-4">
        <TextField
          fullWidth
          color="secondary"
          variant="filled"
          type="text"
          label="Title"
          name="title"
        />
        <TextField
          fullWidth
          color="secondary"
          variant="filled"
          type="text"
          label="Subtitle"
          name="subtitle"
        />
      </Box>
      <Typography variant="h6" fontWeight="bold" className="my-2">
        Product types
      </Typography>
      <Box className="w-full grid grid-cols-2  gap-2">
        <FormControl variant="filled" className="w-full">
          <InputLabel id="categories-select-label">Discount</InputLabel>
          {!categoriesIsFetching && (
            <Select
              fullWidth
              color="secondary"
              labelId="categories-select-label"
              id="categories-select"
              variant="filled"
              name="category"
              inputRef={inputRef}
              defaultValue=""
              // value={categoryValue}

              // onChange={handleChange}
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value={"category"}>category</MenuItem>
            </Select>
          )}
        </FormControl>
        <FormControl variant="filled" className="w-full">
          <InputLabel id="categories-select-label">Discount</InputLabel>
          {!categoriesIsFetching && (
            <Select
              fullWidth
              color="secondary"
              labelId="categories-select-label"
              id="categories-select"
              variant="filled"
              name="category"
              inputRef={inputRef}
              defaultValue=""
              // value={categoryValue}

              // onChange={handleChange}
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value={"category"}>category</MenuItem>
            </Select>
          )}
        </FormControl>
        <FormControl variant="filled" className="w-full">
          <InputLabel id="categories-select-label">Discount</InputLabel>
          {!categoriesIsFetching && (
            <Select
              fullWidth
              color="secondary"
              labelId="categories-select-label"
              id="categories-select"
              variant="filled"
              name="category"
              inputRef={inputRef}
              defaultValue=""
              // value={categoryValue}

              // onChange={handleChange}
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value={"category"}>category</MenuItem>
            </Select>
          )}
        </FormControl>
        <FormControl variant="filled" className="w-full">
          <InputLabel id="categories-select-label">Discount</InputLabel>
          {!categoriesIsFetching && (
            <Select
              fullWidth
              color="secondary"
              labelId="categories-select-label"
              id="categories-select"
              variant="filled"
              name="category"
              inputRef={inputRef}
              defaultValue=""
              // value={categoryValue}

              // onChange={handleChange}
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
              <MenuItem value={"category"}>category</MenuItem>
            </Select>
          )}
        </FormControl>
      </Box>
    </Box>
  );
};

export default DisplayProductsForm;
