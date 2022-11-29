import { useState, useEffact, SyntheticEvent } from "react";
import ShoppingList from "../../components/ShoppingList";
import Service from "../../components/Service";
import Header2 from "../../components/Header2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import MoneyIcon from "@mui/icons-material/Money";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PaletteIcon from "@mui/icons-material/Palette";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import Banner from "../../components/Banner";
import ProductCarouse from "../../components/ProductCarouse";
import Header from "../../components/Header";

import {
  Box,
  container,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  FormControlLabel,
  Checkbox,
  Radio,
  ListItem,
  CircularProgress,
  ListItemAvatar,
  Breadcrumbs,
  Link,
  ListItemIcon,
  FormControl,
  FormLabel,
  RadioGroup,
  ListItemText,
  Avatar,
  Collapse,
  Slider,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import {
  useGetAllProductsQuery as getAllProductsQuery,
  useGetAllCategoryQuery as getAllCategoryQuery,
  useGetProductsByCategoryQuery as getProductsByCategoryQuery,
} from "../../redux/services/products";

const ProductsList = ({ category }) => {
  const { data: productsByCategory } = getProductsByCategoryQuery({
    category,
  });

  const { data: allProducts, isFetching: isFetchingAllProducts } =
    getAllProductsQuery();

  return isFetchingAllProducts ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : category === "all" ? (
    <Box
      className={`grid grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-2
                    2xl:grid-cols-4 
      gap-4 items-center justify-center`}
    >
      {allProducts.products?.map((filteredProduct) => (
        <Box
          key={filteredProduct?.id}
          className={`h-100 w-100
                    max-w-[260px] 
                    md:max-w-[220px] 
                    lg:max-w-[240px] 
                    mx-auto`}
        >
          <ProductCard
            product={filteredProduct}
            key={`${filteredProduct?.title}-${filteredProduct?.id}`}
          />
        </Box>
      ))}
    </Box>
  ) : (
    <Box
      className={`grid grid-cols-1 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4   
            gap-4  items-center justify-center`}
    >
      {productsByCategory?.products.map((filteredProduct) => (
        <Box
          key={filteredProduct?.id}
          className={`h-100 w-100 
                    max-w-[260px] 
                    md:max-w-[220px] 
                    lg:max-w-[240px]  mx-auto`}
        >
          <ProductCard
            product={filteredProduct}
            key={`${filteredProduct?.title}-${filteredProduct?.id}`}
          />
        </Box>
      ))}
    </Box>
  );
};

const Shopping = () => {
  const isNoneMobile = useMediaQuery("(min-width:1024px)");
  const [openCategory, setOpenCategory] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  // useEffact(()=>{
  //     setOpenCategory(!openCategory)
  //     setOpenFilter(!openFilter)
  // },[isNoneMobile])
  const { data: allCategory, isFetching: isFetchingAllCategory } =
    getAllCategoryQuery();

  const [categoryValue, setCategoryValue] = useState("all");

  const handleChange = (event, newValue) => {
    setCategoryValue(newValue);
  };
  const [priceValue, setPriceValue] = useState([20, 37]);

  return (
    <Box className={`flex flex-col gap-4 mt-[100px] `}>
      <Box className={`container mx-auto my-[80px]`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2 ${
              "hover:bg-" + colors.greenAccent[400]
            }`}
          >
            Home
          </Button>
          <Typography color="text.primary">Shoping</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        backgroundColor={colors.primary[400]}
        className={`container mx-auto py-[80px] rounded-lg`}
      >
        <Header2
          title="Jackets and tops"
          bodyText="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt."
        />
      </Box>
      <Box className="md:container mx-auto bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg  p-4 bg-dark/5 ">
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
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2 ${
              "hover:bg-" + colors.greenAccent[400]
            }`}
          >
            More
          </Button>
        </Box>
        <ProductCarouse />
      </Box>

      <Box className={`container  mx-auto  my-[40px] space-4`}>
        <Header
          title="Shopping List"
          subtitle="One morning"
          bodyText={`One morning, when Gregor Samsa `}
        />
        <Box className={`flex flex-col lg:flex-row space-4`}>
          <Box
            className={`w-full bg-transparent lg:w-[25%] lg:rounded-lg mx-2  `}
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
                  : allCategory.map((category, index) => (
                      <Accordion
                        className={`bg-transparent p-4 rounded-md`}
                        defaultExpanded={index === 0}
                      >
                        <AccordionSummary
                          className={`flex items-center space-x-2`}
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <Avatar>
                            <BeachAccessIcon />
                          </Avatar>
                          <Typography
                            color={colors.greenAccent[500]}
                            className="ml-2"
                            variant="h5"
                          >
                            <ListItemText primary={category} secondary="22" />
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List className={`bg-transparent w-[100%]`}>
                            <ListItem>
                              <ListItemText
                                primary="Photos"
                                secondary="Jan 9, 2014"
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Work"
                                secondary="Jan 7, 2014"
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Vacation"
                                secondary="July 20, 2014"
                              />
                            </ListItem>
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    ))}
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
                        valueLabelDisplay={true}
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
          <Box
            backgroundColor={colors.primary[400]}
            className={` w-full lg:w-[75%] lg:rounded-lg p-4 mx-2 `}
          >
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
            <ProductsList category={categoryValue} />
          </Box>
        </Box>
      </Box>
      <Box backgroundColor={colors.primary[400]} className={`mb-[50px]`}>
        <Banner />
      </Box>
      <Box className="container mx-auto px-4 items-center mb-[50px]">
        <Service />
      </Box>
    </Box>
  );
};

export default Shopping;
