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
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveAsIcon from "@mui/icons-material/SaveAs";

import {
  useGetAllBrandsQuery,
  useAddBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} from "../../../../../features/services/brandApiSlice";
import { tokens } from "../../../../../theme";
import Model from "../../../../../components/ui/Model";
import {
  useRemoveImageMutation,
  useRemoveThumbnailMutation,
} from "../../../../../features/services/productApiSlice";

const Brand = ({ brand, handleUpdate, handleDelete }) => {
  const InputRef = useRef();

  useEffect(() => {
    InputRef.current.value = brand.name;
  }, [brand.name]);

  return (
    <Box className="flex justify-between brands-center gap-2">
      <TextField
        size="small"
        color="secondary"
        fullWidth
        type="text"
        // value={brand.value}
        defaultValue={brand.name}
        label="Brand"
        inputRef={InputRef}
      />
      <IconButton
        onClick={() =>
          handleUpdate({
            id: brand.id,
            name: InputRef.current.value,
          })
        }
      >
        <SaveAsIcon />
      </IconButton>
      <IconButton onClick={() => handleDelete({ id: brand.id })}>
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
  initialValues,
  setInitialValues
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [openModel, setOpenModel] = useState(false);
  const modelInputRef = useRef();
  const [addBrand] = useAddBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();
  const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();
  const [removeImage] = useRemoveImageMutation();
  const [removeThumbnail] = useRemoveThumbnailMutation();

  const handleClean = (image) => {
    console.log("list cleaned", image);
  };
  const { data: brands, isFetching: brandsIsFetching } = useGetAllBrandsQuery();

  const handleAdd = () => {
    const data = {
      name: modelInputRef.current.value,
    };
    addBrand({ post: data });
    modelInputRef.current.value = "";
  };
  const handleUpdate = ({ id, name }) => {
    let brand = brands.find((brand) => brand.id === id);
    const data = {
      id,
      name,
    };
    updateBrand({ post: data });
    if (values.brand === brand.name) {
      setFieldValue("brand", "");
    }
  };
  const handleDelete = ({ id }) => {
    let brand = brands.find((brand) => brand.id === id);
    const data = {
      id,
    };
    deleteBrand({ post: data });
    if (values.brand === brand.name) {
      setFieldValue("brand", "");
    }
  };
  const handelRemoveThumbnail = () => {
    removeThumbnail({ post: { id: initialValues?.id } }).then((response) =>{
        console.log(response)
        setInitialValues(prev=>({...prev,thumbnail:undefined}))
      }
    );
  };
  const handelRemoveImage = (imageId) => {
    removeImage({ post: { id: imageId } }).then((response) => {
      console.log(response);
      setInitialValues((prev) => ({ ...prev, images: prev.images.filter(image=>image.id!==imageId) }));
    });
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
              label={"New Brand..."}
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
              brands?.map((brand) => (
                <Brand
                  key={brand.id}
                  brand={brand}
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
              onChange={handleChange}
              value={values.title}
              name="title"
              onBlur={handleBlur}
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
          {initialValues?.thumbnail && (
            <Box className="w-full ">
              <Typography variant="h6" fontWeight="bold" className="my-2">
                Old Display thumbnail
              </Typography>
              <Box
                backgroundColor={colors.primary[400]}
                className="w-full p-4 "
              >
                <Box className="w-fit flex flex-col gap-2  outline outline-1 p-1 rounded-sm">
                  <img
                    alt="Display Thumbnail"
                    className="h-[400px] "
                    src={initialValues?.thumbnail}
                  />
                  <Box>
                    <Button onClick={handelRemoveThumbnail} color="error">
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
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
              onChange={(incomingImages) =>
                setFieldValue("thumbnail", incomingImages)
              }
              onClean={handleClean}
              value={values.thumbnail}
              maxFiles={1}
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
          {initialValues?.images && (
            <Box className="w-full">
              <Typography variant="h6" fontWeight="bold" className="my-2">
                Display Images
              </Typography>
              <Box
                backgroundColor={colors.primary[400]}
                className="grid grid-cols-4 gap-4 p-4"
              >
                {initialValues?.images?.map((imageUrl, index) => (
                  <Box key={`product_image ${index}`} className="w-full flex flex-col gap-2 outline outline-1 p-1 rounded-sm">
                    <img
                      
                      alt={`product_image ${index}`}
                      src={imageUrl.image}
                    />
                    <Box>
                      <Button
                        onClick={() => handelRemoveImage(imageUrl.id)}
                        color="error"
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
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
              onChange={(incomingImages) =>
                setFieldValue("images", incomingImages)
              }
              onClean={handleClean}
              value={values.images}
              maxFiles={10}
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
                More
              </Typography>
            </Box>
            <FormControl variant="filled" className="w-full">
              <InputLabel id="brands-select-label">Brand</InputLabel>
              {!brandsIsFetching && !isUpdating && !isDeleting && (
                <Select
                  fullWidth
                  color="secondary"
                  labelId="brands-select-label"
                  id="brands-select"
                  variant="filled"
                  value={values?.brand}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.brand && !!errors.brand}
                  name="brand"
                >
                  {brands?.length &&
                    brands?.map((brand) => (
                      <MenuItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            </FormControl>
          </Box>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default ProductInformationForm;
