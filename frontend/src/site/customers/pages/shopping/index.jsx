import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  CircularProgress,
  Breadcrumbs,
  FormControl,
  FormLabel,
  RadioGroup,
  Collapse,
  Slider,
  useMediaQuery,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PaletteIcon from "@mui/icons-material/Palette";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";

import Service from "../../components/Service";
import Banner from "../../components/Banner";
import ProductCarouse from "../../components/ProductCarouse";
import ProductsList from "../../components/ProductsList";

import { tokens, Header } from "../../import";

import {
  useGetAllCategoryQuery,
  useGetLimitAndSkipProductsQuery,
} from "../../import";

const Shopping = () => {
  const isNoneMobile = useMediaQuery("(min-width:1024px)");
  const [openCategory, setOpenCategory] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { data: allCategory, isFetching: isFetchingAllCategory } =
    useGetAllCategoryQuery();
  const {
    data: RecommendedProducts,
    isFetching: isFetchingRecommendedProducts,
  } = useGetLimitAndSkipProductsQuery({ limit: 20, skip: 10 });
  const [priceValue, setPriceValue] = useState([20, 37]);

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Home
          </Button>
          <Typography color="text.primary">Shoping</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title="Jackets and tops"
          subtitle="Lorem ipsum dolor sit amet."
        />
      </Box>
      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Box className="flex justify-between items-center">
          <Header
            title="Recommended"
            subtitle="One morning"
            bodyText={`One morning, when Gregor Samsa `}
          />
          <Button
            onClick={() => navigate(`/shopping`)}
            variant="outlined"
            color="secondary"
            className={`px-8 py-3 `}
          >
            More
          </Button>
        </Box>
        {!isFetchingRecommendedProducts && (
          <ProductCarouse products={RecommendedProducts} />
        )}
      </Box>

      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title="Shopping List"
          subtitle="One morning"
          bodyText={`One morning, when Gregor Samsa `}
        />
        <Box className={`flex flex-col lg:flex-row space-4 h-full w-full`}>
          <Box
            className={`w-full bg-transparent lg:w-[25%] lg:rounded-lg mx-2 h-full `}
          >
            <Collapse
              in={isNoneMobile || openCategory}
              timeout="auto"
              unmountOnExit
              className={``}
            >
              <Box
                backgroundColor={colors.primary[400]}
                className={` w-full  p-4 rounded-md lg:mb-4`}
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Category
                </Typography>
                {isFetchingAllCategory
                  ? null
                  : allCategory.map((category, index) => null)}
              </Box>
            </Collapse>
            <Collapse
              in={isNoneMobile || openFilter}
              timeout="auto"
              unmountOnExit
              className={``}
            >
              <Box
                backgroundColor={colors.primary[400]}
                className=" w-full  p-4 rounded-md"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Filter
                </Typography>
                <Box className={`mb-4 w-full`}>
                  <FormControl className={`w-[100%]`}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <Typography
                        variant="h1"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        className={`text-xl md:text-2xl  text-left mb-2`}
                      >
                        Price
                      </Typography>
                    </FormLabel>
                    <Box className={`w-[100%]`}>
                      <Slider
                        mark={[
                          {
                            value: priceValue[0],
                            label: priceValue[0],
                          },
                          {
                            value: `From $${priceValue[1]}`,
                            label: `To $${priceValue[1]}`,
                          },
                        ]}
                        color="secondary"
                        getAriaLabel={() => "Temperature range"}
                        value={priceValue}
                        onChange={(event, newValue) => setPriceValue(newValue)}
                        getAriaValueText={(value) => `$${value}`}
                      />
                    </Box>
                  </FormControl>
                </Box>

                <Box className={`mb-4`}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <Typography
                        variant="h1"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        className={`text-xl md:text-2xl  text-left mb-2`}
                      >
                        Brands
                      </Typography>
                    </FormLabel>
                    <Box className={`flex flex-col`}>
                      <FormControlLabel
                        value="adidass"
                        control={<Checkbox color="secondary" />}
                        label="Adidass"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="adidass"
                        control={<Checkbox color="secondary" />}
                        label="Adidass"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        value="adidass"
                        control={<Checkbox color="secondary" />}
                        label="Adidass"
                        labelPlacement="end"
                      />
                    </Box>
                  </FormControl>
                </Box>
                <Box className={`mb-4`}>
                  <Box className={`flex flex-col w-100`}>
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label">
                        <Typography
                          variant="h1"
                          color={colors.grey[100]}
                          fontWeight="bold"
                          className={`text-xl md:text-2xl  text-left mb-2`}
                        >
                          Size
                        </Typography>
                      </FormLabel>
                      <Box>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio color="secondary" />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio color="secondary" />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio color="secondary" />}
                            label="Other"
                          />
                        </RadioGroup>
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
                <Box className={`mb-4`}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <Typography
                        variant="h1"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        className={`text-xl md:text-2xl  text-left mb-2`}
                      >
                        Color
                      </Typography>
                    </FormLabel>
                    <Box className={`flex justify-center`}>
                      <Box>
                        <Checkbox
                          icon={
                            <PaletteOutlinedIcon
                              fontSize="large"
                              sx={{ color: "red" }}
                            />
                          }
                          checkedIcon={
                            <PaletteIcon
                              fontSize="large"
                              sx={{ color: "red" }}
                            />
                          }
                        />
                      </Box>
                      <Box>
                        <Checkbox
                          icon={
                            <PaletteOutlinedIcon
                              fontSize="large"
                              sx={{ color: "blue" }}
                            />
                          }
                          checkedIcon={
                            <PaletteIcon
                              fontSize="large"
                              sx={{ color: "blue" }}
                            />
                          }
                        />
                      </Box>
                      <Box>
                        <Checkbox
                          icon={
                            <PaletteOutlinedIcon
                              fontSize="large"
                              sx={{ color: "green" }}
                            />
                          }
                          checkedIcon={
                            <PaletteIcon
                              fontSize="large"
                              sx={{ color: "green" }}
                            />
                          }
                        />
                      </Box>
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            </Collapse>
          </Box>
          <Box className={`w-full lg:w-[75%] h-full`}>
            <Box className={`flex m-4 py-[20px] justify-between`}>
              <Typography
                variant="h1"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-xl md:text-2xl  text-left mb-2`}
              >
                Product List
              </Typography>
              {!isNoneMobile && (
                <Box>
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openCategory ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenCategory(!openCategory)}
                  >
                    Category
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openFilter ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    Filter
                  </Button>
                </Box>
              )}
            </Box>
            <ProductsList category={"all"} isShopping={true} />
          </Box>
        </Box>
      </Box>
      <Box backgroundColor={colors.primary[400]} className={`px-1 md:px-auto`}>
        <Banner />
      </Box>
      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Service />
      </Box>
    </Box>
  );
};

export default Shopping;
