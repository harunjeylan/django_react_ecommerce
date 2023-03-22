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
const BannerForm = () => {
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
    <Box>
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={() => setImageSrc(undefined)}
      />
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
          Banner
        </Typography>
        <Box className="w-full">
          <Typography variant="h6" fontWeight="bold" className="my-2">
            Display Thumbnail
          </Typography>
          <Dropzone
            style={{
              minHeight: "200px",
              minWidth: "100%",
              backgroundColor: colors.primary[400],
            }}
            label="Drop your Display thumbnail here or click to browse"
            onChange={(incomingImages) => setCategoryThumbnail(incomingImages)}
            onClean={handleClean}
            value={categoryThumbnail}
            maxFiles={1}
            maxFileSize={2998000}
            accept=".png,image/*"
            uploadingMessage={"Uploading..."}
          >
            {categoryThumbnail.length &&
              categoryThumbnail.map((file) => (
                <FileItem
                  {...file}
                  key={file.id}
                  onDelete={(id) =>
                    setCategoryThumbnail(
                      categoryThumbnail.filter((x) => x.id !== id)
                    )
                  }
                  onSee={(imageSource) => setImageSrc(imageSource)}
                  resultOnTooltip
                  preview
                  info
                  hd
                />
              ))}
          </Dropzone>
        </Box>
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
          <TextField
            fullWidth
            color="secondary"
            variant="filled"
            type="text"
            label="Body Text"
            name="body_text"
            multiline
            minRows={3}
          />
        </Box>
        <Box>
          <FormControlLabel
            name="discount"
            control={<Checkbox color="secondary" />}
            label={"Discount"}
            labelPlacement="end"
            className="block"
          />
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
    </Box>
  );
};

export default BannerForm;
