import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "@emotion/react";

import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";

import { tokens } from "../../../../../theme";
import { useGetAllDiscountsQuery } from "../../../../../features/services/discountApiSlice";

import Model from "../../../../../components/ui/Model";
import CreateEditDiscount from "../components/CreateEditDiscount";
import DiscountList from "../components/DiscountList";
import Discount from "../components/Discount";

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

  const [editingDiscount, setEditingDiscount] = useState(undefined);
  const [creatingDiscount, setCreatingDiscount] = useState(undefined);

  const [openModel, setOpenModel] = useState(false);

  const { data: discounts = [], isFetching: discountsIsFetching } =
    useGetAllDiscountsQuery();

  const nowDiscounts = useMemo(() => {
    let newDiscount = {
      name: "None",
      id: null,
      amount: 0,
      start_date: "null",
      end_date: "null",
    };
    let filteredDiscounts = [
      newDiscount,
      ...discounts
        ?.filter(
          (discount) =>
            !(dayjs(discount.end_date) < dayjs(new Date().getTime()))
        )
        ?.slice(0, 2),
    ];
    let isSelectedDiscount = filteredDiscounts.find(
      (discount) => discount.id === values.discount
    );
    if (!isSelectedDiscount) {
      let selectedDiscount = discounts.find(
        (discount) => discount.id === values.discount
      );
      if (selectedDiscount) {
        filteredDiscounts.push(selectedDiscount);
      }
    }
    return filteredDiscounts;
  }, [discounts, values.discount]);

  const handleAddDiscount = () => {
    setCreatingDiscount({
      name: "",
      amount: 0,
      start_date: null,
      end_date: null,
    });
    setEditingDiscount(undefined);
  };
  const handleSetDiscount = (discountId) => {
    setFieldValue("discount", discountId);
  };
  return (
    <Box className="h-full w-full max-h-full overflow-y-auto">
      <Model
        width="md"
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle="Add Discount"
      >
        {openModel && (
          <>
            {creatingDiscount || editingDiscount ? (
              <CreateEditDiscount
                creatingDiscount={creatingDiscount}
                setCreatingDiscount={setCreatingDiscount}
                editingDiscount={editingDiscount}
                setEditingDiscount={setEditingDiscount}
              />
            ) : !discountsIsFetching ? (
              <DiscountList
                discounts={discounts}
                setEditingDiscount={setEditingDiscount}
                handleAddDiscount={handleAddDiscount}
                handleSetDiscount={handleSetDiscount}
                highlightDiscountId={values.discount}
              />
            ) : (
              <Box className="h-full w-full flex justify-center items-center">
                <CircularProgress />
              </Box>
            )}
          </>
        )}
      </Model>
      <FormControl
        className="h-full w-full p-4"
        component="fieldset"
        discount="standard"
      >
        <FormLabel>
          <Typography
            discount="h1"
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
            discount="filled"
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
            discount="filled"
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
              discount="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-xl md:text-2xl  text-left mb-2`}
            >
              Discount
            </Typography>
          </FormLabel>
          {!discountsIsFetching ? (
            discounts.length ? (
              <DiscountList
                discounts={nowDiscounts}
                setEditingDiscount={setEditingDiscount}
                handleAddDiscount={handleAddDiscount}
                handleSetDiscount={handleSetDiscount}
                highlightDiscountId={values.discount}
                readOnly
              />
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
            <Box className="h-full w-full flex justify-center items-center">
              <CircularProgress />
            </Box>
          )}
          <Button
            onClick={() => setOpenModel(true)}
            type="button"
            color="secondary"
            variant="outlined"
            className={`w-full mt-4`}
          >
            Add another Discount
          </Button>
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default PricingForm;
