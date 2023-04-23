import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";

import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  CardActionArea,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { tokens } from "../../../../../theme";
import {
  useAddDiscountMutation,
  useDeleteDiscountMutation,
  useGetAllDiscountsQuery,
  useUpdateDiscountMutation,
} from "../../../../../features/services/discountApiSlice";

import Model from "../../../../../components/ui/Model";

const Discount = ({
  discount,
  handleSave,
  handleClose,
  isNew = false,
  isHighlighted = false,
  readOnly = false,
  setFieldValue = (...all) => {},
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [inputState, setInputState] = useState({
    name: discount.name,
    amount: discount.amount,
    start_date: dayjs(discount.start_date),
    end_date: dayjs(discount.end_date),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  // console.log(errors, inputState);

  useEffect(() => {
    let error = { ...errors };
    if (!inputState.name?.length) {
      error = { ...error, name: "require" };
    } else {
      delete error.name;
      error = { ...error };
    }
    if (!String(inputState.amount).length) {
      error = { ...error, amount: "require" };
    } else {
      delete error.amount;
      error = { ...error };
    }
    if (!inputState.start_date?.isValid()) {
      error = { ...error, start_date: "invalid" };
    } else {
      delete error.start_date;
      error = { ...error };
    }
    if (!inputState.end_date?.isValid()) {
      error = { ...error, end_date: "invalid" };
    } else {
      delete error.end_date;
      error = { ...error };
    }
    setErrors(error);
  }, [inputState]);

  const handleChange = (e) => {
    setInputState((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!Object.values(errors).filter((val) => !!val).length) {
      handleSave({
        ...discount,
        name: inputState.name,
        amount: inputState.amount,
        start_date: inputState.start_date.format("DD-MM-YYYY"),
        end_date: inputState.end_date.format("DD-MM-YYYY"),
      });
    }
  };
  return isEditing || isNew ? (
    <Box
      borderColor={colors.grey[500]}
      className="flex flex-col gap-4 border p-4 rounded-md"
    >
      <TextField
        size="small"
        color="secondary"
        fullWidth
        type="text"
        name="name"
        value={inputState.name}
        onChange={handleChange}
        label="Name"
        error={!!errors.name}
        helperText={errors.name}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DemoItem label="Start Date">
            <DatePicker
              fullWidth
              disablePast
              inputFormat="DD-MM-YYYY"
              openTo="year"
              views={["year", "month", "day"]}
              value={inputState.start_date}
              onChange={(newVal) =>
                setInputState((pre) => ({ ...pre, start_date: newVal }))
              }
              onError={() =>
                setErrors((pre) => ({ ...pre, start_date: "invalid" }))
              }
              onAccept={() =>
                setErrors((pre) => ({ ...pre, start_date: undefined }))
              }
            />
          </DemoItem>
          <DemoItem label="End Date">
            <DatePicker
              fullWidth
              disablePast
              inputFormat="DD-MM-YYYY"
              openTo="year"
              views={["year", "month", "day"]}
              value={inputState.end_date}
              onChange={(newVal) =>
                setInputState((pre) => ({ ...pre, end_date: newVal }))
              }
              onError={() =>
                setErrors((pre) => ({ ...pre, end_date: "invalid" }))
              }
              onAccept={() =>
                setErrors((pre) => ({ ...pre, end_date: undefined }))
              }
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

      <TextField
        size="small"
        color="secondary"
        fullWidth
        type="number"
        name="amount"
        value={inputState.amount}
        onChange={handleChange}
        label="Amount"
        error={!!errors.amount}
        helperText={errors.amount}
      />
      <Box className="flex gap-2">
        <Button
          type="button"
          color="secondary"
          variant="outlined"
          startIcon={<SaveAsIcon />}
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button
          type="button"
          color="warning"
          variant="outlined"
          startIcon={<CloseIcon />}
          onClick={() => (discount.id ? setIsEditing(false) : handleClose())}
        >
          cancel
        </Button>
        {discount.id && (
          <Button
            type="button"
            color="error"
            variant="outlined"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={() => handleClose({ id: discount.id })}
          >
            Delete
          </Button>
        )}
      </Box>
    </Box>
  ) : (
    <Box
      key={discount.id}
      className="flex flex-col  w-full  bg-slate-400/10 rounded-lg"
    >
      <Box
        className="flex justify-between items-center px-4 py-4 rounded-t-lg"
        backgroundColor={
          isHighlighted ? colors.greenAccent[600] : colors.primary[300]
        }
      >
        <Typography variant="h5" fontWeight="bold">
          {discount.name}
        </Typography>
        {!readOnly && (
          <Box className="flex flex-col gap-2">
            <IconButton onClick={() => setIsEditing(true)}>
              <EditOutlinedIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <CardActionArea
        onClick={() => setFieldValue("discount", discount.id)}
        className="flex flex-col items-start gap-4 px-4 py-2"
      >
        <Typography variant="h5" fontWeight="bold">
          {discount.amount}%
        </Typography>
        <Typography variant="p">
          {discount.start_date} - {discount.end_date}
        </Typography>
      </CardActionArea>
    </Box>
  );
};
const PricingForm = ({
  setFieldValue,
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [addingNewDiscount, setAddingNewDiscount] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [addDiscount] = useAddDiscountMutation();
  const [updateDiscount, { isLoading: isUpdating }] =
    useUpdateDiscountMutation();
  const [deleteDiscount, { isLoading: isDeleting }] =
    useDeleteDiscountMutation();
  const { data: discounts = [], isFetching: discountsIsFetching } =
    useGetAllDiscountsQuery();

  const handleAdd = (discount) => {
    addDiscount({ post: discount });
    setAddingNewDiscount(false);
  };
  const handleUpdate = (discount) => {
    updateDiscount({ post: discount });
    if (values.discount === discount.id) {
      setFieldValue("discount", null);
    }
  };
  const handleDelete = ({ id }) => {
    const data = {
      id,
    };
    deleteDiscount({ post: data });
    if (values.discount === id) {
      setFieldValue("discount", null);
    }
  };
  return (
    <Box className="h-full w-full max-h-full overflow-y-auto">
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle="Add Discount"
      >
        <Box className="w-full">
          <Box className="flex flex-col gap-2">
            {addingNewDiscount && (
              <Discount
                discount={{
                  name: "",
                  amount: 0,
                  start_date: null,
                  end_date: null,
                }}
                handleSave={handleAdd}
                handleClose={() => setAddingNewDiscount(false)}
                isNew={true}
              />
            )}

            <Button
              onClick={() => setAddingNewDiscount(true)}
              type="button"
              color="secondary"
              variant="outlined"
              className={`w-full mt-4`}
            >
              Add New
            </Button>
          </Box>
          <Divider />
          <Box
            borderColor={colors.grey[100]}
            className="flex flex-col gap-8 mt-4"
          >
            {!discountsIsFetching &&
              discounts?.length &&
              discounts?.map((discount) => (
                <Discount
                  key={discount.id}
                  isHighlighted={
                    !(dayjs(discount.end_date) < dayjs(new Date().getTime()))
                  }
                  discount={discount}
                  handleSave={handleUpdate}
                  handleClose={handleDelete}
                />
              ))}
          </Box>
        </Box>
      </Model>
      <FormControl
        className="h-full w-full p-4"
        component="fieldset"
        variant="standard"
      >
        <FormLabel>
          <Typography
            variant="h1"
            color={colors.grey[100]}
            fontWeight="bold"
            className={`text-xl md:text-2xl  text-left mb-2`}
          >
            Pricing
          </Typography>
        </FormLabel>
        <FormGroup className="flex  h-full w-full gap-4 ">
          <TextField
            color="secondary"
            fullWidth
            variant="filled"
            type="number"
            label="Regular price"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.regularPrice}
            name="regularPrice"
            error={!!touched.regularPrice && !!errors.regularPrice}
            helperText={touched.regularPrice && errors.regularPrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />

          <TextField
            color="secondary"
            fullWidth
            variant="filled"
            type="number"
            label="Sale price"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.salePrice}
            name="salePrice"
            error={!!touched.salePrice && !!errors.salePrice}
            helperText={touched.salePrice && errors.salePrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
          <FormLabel>
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-xl md:text-2xl  text-left mb-2`}
            >
              Discount
            </Typography>
          </FormLabel>
          <Discount
            discount={{
              name: "None",
              id: null,
              amount: 0,
              start_date: "null",
              end_date: "null",
            }}
            isHighlighted={values.discount === null}
            setFieldValue={setFieldValue}
            readOnly
          />
          {!discountsIsFetching ? (
            discounts.length ? (
              discounts
                ?.filter(
                  (discount) =>
                    !(dayjs(discount.end_date) < dayjs(new Date().getTime()))
                )
                ?.map((discount) => (
                  <Discount
                    key={discount.id}
                    discount={discount}
                    isHighlighted={values.discount === discount.id}
                    setFieldValue={setFieldValue}
                    readOnly
                  />
                ))
            ) : (
              <Typography
                sx={{ mb: "15px" }}
                fontSize="18px"
                className="text-center"
              >
                No Discount
              </Typography>
            )
          ) : (
            <Typography
              sx={{ mb: "15px" }}
              fontSize="18px"
              className="text-center"
            >
              Loading...
            </Typography>
          )}
          <Button
            type="button"
            color="secondary"
            variant="outlined"
            className={`w-full mt-4`}
            onClick={() => setOpenModel(true)}
          >
            More
          </Button>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default PricingForm;
