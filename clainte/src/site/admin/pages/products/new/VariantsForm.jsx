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
} from "@mui/material";
import { constants } from "./constants";

import { tokens } from "../../../import";
import Model from "../../../../../ui/Model";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SaveAsIcon from "@mui/icons-material/SaveAs";

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
const VariantList = ({ setIsEditing }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box className="w-full h-full grid grid-cols-4 gap-4">
      <Box
        backgroundColor={colors.primary[500]}
        className="w-full h-full flex flex-col gap-2 p-4 rounded-md"
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Valiant Label
          </Typography>
        </Box>
        <List>
          <ListItem>Option 1</ListItem>
          <ListItem>Option 2</ListItem>
          <ListItem>Option 3</ListItem>
        </List>
      </Box>
      <Box
        backgroundColor={colors.primary[500]}
        className="w-full h-full flex flex-col gap-2 p-4 rounded-md"
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Valiant Label
          </Typography>
        </Box>
        <List>
          <ListItem>Option 1</ListItem>
          <ListItem>Option 2</ListItem>
          <ListItem>Option 3</ListItem>
        </List>
      </Box>
      <Box
        backgroundColor={colors.primary[500]}
        className="w-full h-full flex flex-col gap-2 p-4 rounded-md"
      >
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Valiant Label
          </Typography>
        </Box>
        <List>
          <ListItem>Option 1</ListItem>
          <ListItem>Option 2</ListItem>
          <ListItem>Option 3</ListItem>
        </List>
      </Box>
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
          {initialItems.map((item) => (
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
const VariantsForm = ({ values, handleBlur, handleChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openModel, setOpenModel] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [modelInputLabel, setModelInputLabel] = useState("");
  const [initialItems, setInitialItems] = useState([]);
  const [tapValue, setTapValue] = useState(0);
  const [isEditing, setIsEditing] = useState(true);

  const handleOpenModel = () => {
    setModelInputLabel("option");
    setModelTitle("Add Variants");
    setOpenModel(true);
  };

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
              <VariantList setIsEditing={setIsEditing} />
            )}{" "}
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
            {constants.variants.map((variant, index) => (
              <Box key={`variant-${variant.name}-${index}`} className="w-full">
                <Box className="w-full flex justify-between px-1 gap-2">
                  <Typography variant="h6" fontWeight="bold" className="my-2">
                    {variant.name}
                  </Typography>
                  <Typography
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
                    {variant.name}
                  </InputLabel>
                  <Select
                    fullWidth
                    color="secondary"
                    labelId="category-select-label"
                    id="category-select"
                    variant="filled"
                    defaultValue={variant.value}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name={`variants[${index}].value`}
                  >
                    {variant.options.map((option, index) => (
                      <MenuItem
                        key={`option-${option}-${index}`}
                        value={option}
                      >
                        {option}
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
