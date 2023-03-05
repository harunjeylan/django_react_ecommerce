import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  MenuItem,
  Divider,
  InputLabel,
  Select,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveAsIcon from "@mui/icons-material/SaveAs";

import { useAddBrandMutation, useGetAllBrandsQuery } from "../../../import";
import Model from "../../../../../ui/Model";

import { tokens } from "../../../import";

const Item = ({ item, itemName, handleUpdate, handleDelete }) => {
  const InputRef = useRef();

  useEffect(() => {
    InputRef.current.value = item.name;
  }, [item.name]);

  return (
    <Box className="flex justify-between items-center gap-2">
      <TextField
        size="small"
        color="secondary"
        fullWidth
        type="text"
        // value={item.value}
        defaultValue={item.name}
        label={itemName}
        inputRef={InputRef}
      />
      <IconButton
        onClick={() =>
          handleUpdate({
            id: item.id,
            value: InputRef.current.value,
          })
        }
      >
        <SaveAsIcon />
      </IconButton>
      <IconButton onClick={() => handleDelete({ id: item.id })}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

const ProductInformationForm = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [openModel, setOpenModel] = useState(false);
  const modelInputRef = useRef();
  const [addBrand] = useAddBrandMutation();

  const handleClean = (image) => {
    console.log("list cleaned", image);
  };
  const { data: brands, isFetching: brandsIsFetching } = useGetAllBrandsQuery();
  // const brands = [
  //   { name: "puma", id: 1 },
  //   { name: "adidas", id: 2 },
  //   { name: "nike", id: 3 },
  // ];
  // const brandsIsFetching = false;

  const handleAdd = () => {
    const data = {
      name: modelInputRef.current.value,
    };
    addBrand({ post: data });
    console.log(data);
    modelInputRef.current.value = "";
    setOpenModel(false);
  };
  const handleUpdate = ({ id, value }) => {
    const data = {
      id,
      value,
    };
    console.log(data);
  };
  const handleDelete = ({ id }) => {
    const data = {
      id,
    };
    console.log(data);
  };

  return (
    <Box className="w-full">
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle="Add Brand"
      >
        <Box className="w-full">
          <Box className="flex justify-between items-center gap-2 mb-2">
            <TextField
              size="small"
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              name={"brand"}
              label={"Brand"}
              inputRef={modelInputRef}
            />
            <IconButton onClick={handleAdd}>
              <SaveAsIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box className="flex flex-col gap-4 mt-4">
            {!brandsIsFetching &&
              brands?.length &&
              brands?.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  itemName={"brand"}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
          </Box>
        </Box>
      </Model>
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={() => setImageSrc(undefined)}
      />
      <FormControl component="fieldset" variant="standard" className="w-full ">
        <FormLabel>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left mb-2`}
          >
            Product Information
          </Typography>
        </FormLabel>
        <FormGroup className="w-full flex flex-col gap-4">
          <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Product Title
            </Typography>
            <TextField
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              label="Product Title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={!!touched.title && !!errors.title}
              helperText={touched.title && errors.title}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Product Description
            </Typography>
            <TextField
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              label="Product Description"
              multiline
              rows={4}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={!!touched.description && !!errors.description}
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box>
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
              onChange={(incommingImages) =>
                setFieldValue("thumbnail", incommingImages)
              }
              onClean={handleClean}
              value={values.thumbnail}
              maxFiles={5}
              maxFileSize={2998000}
              accept=".png,image/*"
              uploadingMessage={"Uploading..."}
            >
              {values.thumbnail.length &&
                values.thumbnail.map((file) => (
                  <FileItem
                    {...file}
                    key={file.id}
                    onDelete={(id) =>
                      setFieldValue(
                        "thumbnail",
                        values.thumbnail.filter((x) => x.id !== id)
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
          <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Display Images
            </Typography>
            <Dropzone
              style={{
                minHeight: "200px",
                minWidth: "100%",
                backgroundColor: colors.primary[400],
              }}
              label="Drop your Display images here or click to browse"
              onChange={(incommingImages) =>
                setFieldValue("images", incommingImages)
              }
              onClean={handleClean}
              value={values.images}
              maxFiles={5}
              maxFileSize={2998000}
              accept=".png,image/*"
              uploadingMessage={"Uploading..."}
            >
              {values.images.length &&
                values.images.map((file) => (
                  <FileItem
                    {...file}
                    key={file.id}
                    onDelete={(id) =>
                      setFieldValue(
                        "images",
                        values.images.filter((x) => x.id !== id)
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
          <Box className="w-full">
            <Box className="w-full flex justify-between px-1 gap-2">
              <Typography variant="h6" fontWeight="bold" className="my-2">
                Brand
              </Typography>
              <Typography
                onClick={() => setOpenModel(true)}
                variant="h6"
                fontWeight="bold"
                className={`my-2 cursor-pointer hover:text-green-400`}
                color={colors.blueAccent[400]}
              >
                Add new brand
              </Typography>
            </Box>
            <FormControl variant="filled" className="w-full">
              <InputLabel id="brands-select-label">Brand</InputLabel>
              <Select
                fullWidth
                color="secondary"
                labelId="brands-select-label"
                id="brands-select"
                variant="filled"
                value={values?.brand}
                onBlur={handleBlur}
                onChange={handleChange}
                name="brand"
              >
                {!brandsIsFetching &&
                  brands?.length &&
                  brands?.map((brand) => (
                    <MenuItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
          {/* <Box>
            <Typography variant="h6" fontWeight="bold" className="my-2">
              Brand
            </Typography>

            <TextField
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              label="Brand"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.brand}
              name="brand"
              error={!!touched.brand && !!errors.brand}
              helperText={touched.brand && errors.brand}
              sx={{ gridColumn: "span 4" }}
            />
          </Box> */}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default ProductInformationForm;
