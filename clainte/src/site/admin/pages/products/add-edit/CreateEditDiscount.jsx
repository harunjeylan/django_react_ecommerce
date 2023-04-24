import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import * as yup from "yup";
import dayjs from "dayjs";
import { tokens } from "../../../../../theme";
import {
  useAddDiscountMutation,
  useUpdateDiscountMutation,
} from "../../../../../features/services/discountApiSlice";
import { Form, Formik } from "formik";

const CreateEditDiscount = ({
  creatingDiscount,
  editingDiscount,
  setCreatingDiscount,
  setEditingDiscount,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [addDiscount] = useAddDiscountMutation();
  const [updateDiscount, { isLoading: isUpdating }] =
    useUpdateDiscountMutation();

  const getDate = (stringDate) => {
    if (stringDate) {
      const [day, month, year] = stringDate.split("-");
      console.log(day, month, year);
      return new Date(year, month - 1, day);
    } else {
      return new Date();
    }
  };
  const discount = creatingDiscount || editingDiscount;
  const initialDiscountValues = {
    ...discount,
    start_date: dayjs(getDate(discount.start_date)),
    end_date: dayjs(getDate(discount.end_date)),
  };
  console.log(initialDiscountValues);
  //   console.log(dayjs(getDate(discount.start_date)));
  const handleSaveDiscount = (values) => {
    console.log(values);
    if (creatingDiscount) {
      addDiscount({
        post: {
          ...values,
          start_date: values.start_date.format("DD-MM-YYYY"),
          end_date: values.end_date.format("DD-MM-YYYY"),
        },
      });
    } else if (editingDiscount) {
      updateDiscount({
        post: {
          ...values,
          start_date: values.start_date.format("DD-MM-YYYY"),
          end_date: values.end_date.format("DD-MM-YYYY"),
        },
      });
    }
    setCreatingDiscount(undefined);
    setEditingDiscount(undefined);
  };

  const handleCancel = () => {
    setCreatingDiscount(undefined);
    setEditingDiscount(undefined);
  };
  return (
    <Formik
      initialValues={initialDiscountValues}
      validationSchema={newDiscountSchema}
      onSubmit={handleSaveDiscount}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Box
          borderColor={colors.grey[500]}
          className="flex flex-col gap-4 border p-4 rounded-md"
        >
          {console.log(errors)}
          <TextField
            size="small"
            color="secondary"
            fullWidth
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            label="Name"
            onBlur={handleBlur}
            error={!!touched.name && !!errors.name}
            helperText={touched.name && errors.name}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DemoItem className="w-full" label="Start Date">
                <DatePicker
                  fullWidth
                  disablePast
                  format="DD/MM/YYYY"
                  openTo="year"
                  views={["year", "month", "day"]}
                  //   value={values.start_date}
                  defaultValue={initialDiscountValues.start_date}
                  onChange={(newVal) => setFieldValue("start_date", newVal)}
                />
                {!!touched.start_date && !!errors.start_date && (
                  <>
                    <Divider color="error" className="h-[2px] mt-[-1px]" />
                    <Typography className="text-red-500">
                      {touched.start_date && errors.start_date}
                    </Typography>
                  </>
                )}
              </DemoItem>
              <DemoItem label="End Date">
                <DatePicker
                  fullWidth
                  disablePast
                  format="DD/MM/YYYY"
                  openTo="year"
                  views={["year", "month", "day"]}
                  //   value={values.end_date}
                  defaultValue={initialDiscountValues.end_date}
                  onChange={(newVal) => setFieldValue("end_date", newVal)}
                />
                {!!touched.end_date && !!errors.end_date && (
                  <>
                    <Divider color="error" className="h-[2px] mt-[-1px]" />
                    <Typography className="text-red-500">
                      {touched.end_date && errors.end_date}
                    </Typography>
                  </>
                )}
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            size="small"
            color="secondary"
            fullWidth
            type="number"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            label="Amount"
            onBlur={handleBlur}
            error={!!touched.amount && !!errors.amount}
            helperText={touched.amount && errors.amount}
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
              onClick={handleCancel}
            >
              cancel
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
};
const newDiscountSchema = yup.object().shape({
  name: yup.string().required("require"),
  amount: yup.number().required("require"),
  start_date: yup.date().required("require"),
  end_date: yup.date().required("require"),
});
export default CreateEditDiscount;
