import { useState, useEffact, SyntheticEvent } from "react";
import ShoppingList from "../../components/ShoppingList";
import Service from "../../components/Service";
import Subscribe from "../../components/Subscribe";
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
import ProductCarouse1 from "../../components/ProductCarouse1";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  Tabs,
  Tab,
  Link,
  ListItemIcon,
  FormControl,
  FormLabel,
  RadioGroup,
  Rating,
  ListItemText,
  Avatar,
  Collapse,
  Slider,
  IconButton,
  TextField,
  ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import Reviews from "../../components/Reviews";
import ReviewForm from "../../components/ReviewForm";
import { reviews } from "../../data/reviews";
import { addToCart } from "../../redux/services/cartReducer";
import {
  useGetProductsByCategoryQuery,
  useGetProductsDetailesQuery,
} from "../../redux/services/products";

const ProductDetails = () => {
  const isNoneMobile = useMediaQuery("(min-width:1024px)");
  const [openCategory, setOpenCategory] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { productId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(productId);

  const {
    data: product,
    isFetching: productIsFetching,
    error: productError,
  } = useGetProductsDetailesQuery({ productId });

  const [activeImage, setActiveImage] = useState(product?.thumbnail);

  return (
    <Box className={`flex flex-col gap-8 mt-[100px] `}>
      <Box className={`container mx-auto my-[80px] px-8`}>
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
          <Button
            onClick={() => navigate(`/shopping`)}
            variant="text"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-4 py-2 ${
              "hover:bg-" + colors.greenAccent[400]
            }`}
          >
            shopping
          </Button>
          <Typography color="text.primary">{product?.title}</Typography>
        </Breadcrumbs>
      </Box>

      <Box className="container mx-auto px-8">
        <Box className={`flex flex-col gap-8 lg:flex-row-reverse`}>
          <Box className={``}>
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-2xl md:text-4xl`}
            >
              {product?.title}
            </Typography>
            <Box className="flex  items-sm-center justify-between mb-4">
              <Typography
                variant="h4"
                color={colors.grey[100]}
                className="text-md"
              >
                <s className="me-2 mr-1">$40.00</s>
                <span>${product?.price}</span>
              </Typography>
              <Box className="flex gap-4 items-center text-sm">
                <Rating name="read-only" value={product?.rating} readOnly />
                <Typography variant="h5" color={colors.greenAccent[400]}>
                  25 reviews
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" className={`w-full px-auto  my-auto`}>
              Samsa was a travelling salesman - and above it there hung a
              picture that he had recently cut out of an illustrated magazine
              and housed in a nice, gilded frame.
            </Typography>
            <Box className=" w-full mt-4 rounded-md">
              <Typography
                variant="h1"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-xl md:text-2xl  text-left my-4`}
              >
                Filter
              </Typography>
              <Box className="flex  items-sm-center justify-between mb-4">
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
                    <Box className={``}>
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
            </Box>
            <Box className="flex-col w-full px-4  md:px-2 md:py-1 space-y-2">
              <Box className="flex justify-between items-center w-full">
                <ButtonGroup
                  size="large"
                  variant="contained"
                  aria-label="outlined primary button group"
                  sx={{
                    backgroundColor: colors.primary[400],
                    color: colors.grey[100],
                  }}
                  className="border-1 w-full"
                >
                  <IconButton
                    size="large"
                    onClick={() => setCount(Math.max(count - 1, 1))}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    id="outlined-number"
                    type="number"
                    value={count}
                    onChange={(event) => setCount(event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <IconButton size="large" onClick={() => setCount(count + 1)}>
                    <AddIcon />
                  </IconButton>
                  <Button
                    startIcon={<AddShoppingCartIcon />}
                    variant="contained"
                    onClick={() => {
                      dispatch(addToCart({ product: { ...product, count } }));
                    }}
                    className={`w-full
                        text-[${colors.grey[100]}] 
                        bg-[#3da58a] 
                        hover:bg-[#2e7c67]`}
                  >
                    Add to Cart
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
          <Box className={` flex flex-col gap-4 w-full lg:max-w-[50%]`}>
            <Box className={`my-4 max-h-[600px] overflow-hidden`}>
              <img
                style={{
                  objectFit: "cover",
                  backgroundAttachment: "fixed",
                }}
                src={activeImage}
                className={` max-w-[600px] max-h-[600px] rounded-md mx-auto`}
              />
            </Box>

            <Box
              className={`flex flex-wrap gap-4 my-4 justify-center items-center w-full px-auto`}
            >
              {product?.images?.map((image, index) => (
                <CardActionArea
                  onClick={() => setActiveImage(image)}
                  className={`${
                    theme.palette.mode === "dark" ? "bg-white/5" : "bg-black/5"
                  } ${
                    activeImage === image
                      ? "h-[80px] w-[80px]"
                      : "h-[70px] w-[70px]"
                  } bg-opacity-90 p-1  rounded-md  ease-in-out duration-300 `}
                >
                  <img
                    key={index}
                    src={image}
                    className={` rounded-md h-[100%] w-[100%]`}
                  />
                </CardActionArea>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className={`w-full`}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            
          >
            <Tab label="Description" value="description" />
            <Tab label="Additional Information" value="additiona-information" />
            <Tab label="Reviews" value="reviews" />
          </Tabs>
          <Box className="flex flex-wrap gap-4  mt-8">
            {value === "description" && <Box>{product?.description}</Box>}
            {value === "reviews" && (
              <Box className={`flex flex-col gap-4 w-full`}>
                {reviews.map((review) => (
                  <Reviews review={review} />
                ))}
                <ReviewForm />
              </Box>
            )}
            {value === "additiona-information" && (
              <Box>additiona-information</Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box className="md:container mx-auto px-8 py-4 mt-16 ">
        <Box className="flex justify-between items-center">
          <Header title="You might also like these" />
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
        <ProductCarouse1 />
      </Box>
      <Box
        backgroundColor={colors.primary[400]}
        className="px-4 flex justify-center lg:px-auto py-[80px] items-center mb-[50px]"
      >
        <Service />
      </Box>
      <Box className="my-2">
        <Subscribe />
      </Box>
    </Box>
  );
};

export default ProductDetails;
