import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  FormLabel,
  Select,
  FormGroup,
  TextField,
  IconButton,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import { constants } from "./constants";

import { tokens } from "../../../import";
import Model from "../../../../../ui/Model";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useGetAllVariantsQuery } from "../../../import";

const Item = ({ item, itemName, handleUpdate, handleDelete }) => {
  const InputRef = useRef();
  useEffect(() => {
    InputRef.current.value = item.value;
  }, [item.value]);

  return (
    <Box className="flex justify-between items-center gap-2">
      <TextField
        size="small"
        color="secondary"
        fullWidth
        type="text"
        // value={item.value}
        defaultValue={item.value}
        label={itemName}
        inputRef={InputRef}
      />
      <IconButton
        onClick={() =>
          handleUpdate({
            name: itemName,
            id: item.value,
            value: InputRef.current.value,
          })
        }
      >
        <SaveAsIcon />
      </IconButton>
      <IconButton
        onClick={() => handleDelete({ name: itemName, id: item.value })}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
const VariantList = ({
  setIsEditing,
  selected,
  setSelected,
  variants,
  handleAddToProduct,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handelChecked = (variantId) => {
    if (selected.includes(variantId)) {
      setSelected((prev) => prev.filter((id) => id !== variantId));
    } else {
      setSelected((prev) => [...prev, variantId]);
    }
  };

  const variantsIsFetching = false;
  return (
    <Box className="w-full">
      <Box className="w-full h-full grid grid-cols-4 gap-4">
        {!variantsIsFetching &&
          variants?.map((variant, index) => (
            <Box
              key={`variant-${variant.name}-variants-${variant.id}-${index}`}
              backgroundColor={colors.primary[500]}
              className="relative w-full h-full flex flex-col gap-2 p-4 rounded-md"
            >
              <Checkbox
                checked={selected.includes(variant.id)}
                onChange={() => handelChecked(variant.id)}
                color="secondary"
                className="absolute top-1 right-1"
              />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {variant.label}
                </Typography>
              </Box>
              <List>
                {variant?.options?.map((option, index2) => (
                  <ListItem
                    key={`variant-${option.name}-options-${option.id}-${index2}`}
                  >
                    {option.label}
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        <Box
          backgroundColor={colors.primary[500]}
          className="w-full h-full flex flex-col items-center justify-center p-4 rounded-md"
        >
          <IconButton
            onClick={() => setIsEditing(true)}
            size="large"
            className="w-20 h-20"
          >
            +
          </IconButton>
        </Box>
      </Box>
      <Button
        onClick={handleAddToProduct}
        type="button"
        color="secondary"
        variant="outlined"
        className={`w-full mt-4`}
      >
        Add to produtc
      </Button>
    </Box>
  );
};
const EditVariant = ({ valiant, setIsEditing }) => {
  const modelInputRef = useRef();
  const [openModel, setOpenModel] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [modelInputLabel, setModelInputLabel] = useState("");
  const [initialItems, setInitialItems] = useState([]);
  const [tapValue, setTapValue] = useState(0);

  useEffect(() => {
    setInitialItems(constants.categories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constants.categories]);
  const handleAdd = () => {
    const data = {
      name: modelInputLabel,
      value: modelInputRef.current.value,
    };
    console.log(data);
    modelInputRef.current.value = "";
    // setOpenModel(false);
  };
  const handleUpdate = ({ id, name, value }) => {
    const data = {
      id,
      name,
      value,
    };
    console.log(data);
  };
  const handleDelete = ({ id, name }) => {
    const data = {
      id,
      name,
    };
    console.log(data);
  };
  const handleChangeTaps = (event, newValue) => {
    setTapValue(newValue);
  };
  return (
    <Box className="w-full">
      <Button
        // onClick={handleOpenModel}
        type="button"
        color="secondary"
        variant="outlined"
        className={`w-full mt-4`}
      >
        Add another variants
      </Button>
      <Box>
        <Typography variant="h5" fontWeight="bold" className="py-2">
          Name
        </Typography>
        <Box className="flex justify-between items-center gap-2 mb-4">
          <TextField
            size="small"
            color="secondary"
            fullWidth
            variant="filled"
            type="text"
            label={modelInputLabel}
            inputRef={modelInputRef}
          />
          <IconButton onClick={handleAdd}>
            <SaveAsIcon />
          </IconButton>
          <IconButton onClick={handleAdd}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Typography variant="h5" fontWeight="bold" className="py-2">
          Options
        </Typography>
        <Box className="flex flex-col gap-4 mt-4">
          {initialItems?.map((item) => (
            <Item
              key={item.value}
              item={item}
              itemName={modelInputLabel}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          ))}
          <Box className="flex justify-between items-center gap-2">
            <TextField
              size="small"
              color="secondary"
              fullWidth
              type="text"
              // variant="standard"
              // value={item.value}
              label="new option"
            />
            <IconButton>
              <SaveAsIcon />
            </IconButton>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className="flex flex-row gap-4 mt-4">
          <Button
            // onClick={handleOpenModel}
            type="button"
            color="secondary"
            variant="outlined"
            className={` mt-4`}
          >
            Save Change
          </Button>
          <Button
            // onClick={handleOpenModel}
            type="button"
            color="secondary"
            variant="outlined"
            className={` mt-4`}
            onClick={() => setIsEditing(false)}
          >
            cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
const VariantsForm = ({ values, handleBlur, handleChange, setFieldValue }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModel, setOpenModel] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [selected, setSelected] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // const { data: variants, isFetching: variantsIsFetching } =
  //   useGetAllVariantsQuery();
  const variants = [
    {
      label: "puma",
      id: 1,
      options: [
        { label: "opion 1" },
        { label: "opion 2" },
        { label: "opion 3" },
      ],
    },
    {
      label: "adidas",
      id: 2,
      options: [
        { label: "opion 1" },
        { label: "opion 2" },
        { label: "opion 3" },
      ],
    },
    {
      label: "nike",
      id: 3,
      options: [
        { label: "opion 1" },
        { label: "opion 2" },
        { label: "opion 3" },
      ],
    },
  ];
  const handleOpenModel = () => {
    setModelTitle("Add Variants");
    setOpenModel(true);
  };

  const handleAddToProduct = () => {
    let selected_variants = [];
    selected.forEach((variantId) => {
      selected_variants.push(
        variants.find((variant) => variant.id === variantId)
      );
    });
    setFieldValue("variants", selected_variants);
    setOpenModel(false);
  };
  const handleRemove = (variantId) => {
    let selected_variants = values.variants.filter(
      (variant) => variant.id !== variantId
    );
    setFieldValue("variants", selected_variants);
  };
  const handleChangeOption = (e) => {
    console.log(e);
  };
  console.log(values.variants);
  return (
    <>
      <Model
        width="md"
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle={modelTitle}
      >
        {openModel && (
          <>
            {isEditing ? (
              <EditVariant setIsEditing={setIsEditing} />
            ) : (
              <VariantList
                variants={variants}
                setIsEditing={setIsEditing}
                setOpenModel={setOpenModel}
                selected={selected}
                setSelected={setSelected}
                handleAddToProduct={handleAddToProduct}
              />
            )}
          </>
        )}
      </Model>
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
              Variants
            </Typography>
          </FormLabel>
          <FormGroup className="w-full grid grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-2">
            {values.variants?.map((variant, index) => (
              <Box key={`variant-${variant.label}-${index}`} className="w-full">
                <Box className="w-full flex justify-between px-1 gap-2">
                  <Typography variant="h6" fontWeight="bold" className="my-2">
                    {variant.label}
                  </Typography>
                  <Typography
                    onClick={() => handleRemove(variant)}
                    variant="h6"
                    fontWeight="bold"
                    className={`my-2 cursor-pointer hover:text-green-400`}
                    color={colors.blueAccent[400]}
                  >
                    remove
                  </Typography>
                </Box>
                <FormControl variant="filled" className="w-full">
                  <InputLabel id="category-select-label">
                    {variant.label}
                  </InputLabel>
                  <Select
                    fullWidth
                    color="secondary"
                    labelId="category-select-label"
                    id="category-select"
                    variant="filled"
                    name="option"
                    onChange={handleChangeOption}
                  >
                    {variant.options?.map((option, index) => (
                      <MenuItem
                        key={`option-${option}-${index}`}
                        value={option.label}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))}
          </FormGroup>
        </FormControl>
        <Button
          onClick={handleOpenModel}
          type="button"
          color="secondary"
          variant="outlined"
          className={`w-full mt-4`}
        >
          Add another option
        </Button>
      </Box>
    </>
  );
};

export default VariantsForm;
