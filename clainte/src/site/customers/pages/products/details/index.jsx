import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  CardActionArea,
  Button,
  Typography,
  Checkbox,
  Breadcrumbs,
  Tabs,
  Tab,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Rating,
  IconButton,
  TextField,
  ButtonGroup,
} from "@mui/material";

import PaletteIcon from "@mui/icons-material/Palette";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import ProductCarouse from "../../../components/ProductCarouse";
import Service from "../../../components/Service";
import Subscribe from "../../../components/Subscribe";

import { mockDataReviews } from "../../../import";
import { addToCart } from "../../../import";
import { tokens, Reviews, ReviewForm, Header } from "../../../import";
import {
  useAddProductReviewMutation,
  useGetProductsDetailesQuery,
  useGetRelatedProductsQuery,
} from "../../../../../features/services/productApiSlice";

const ProductDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { productId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [addProductReview] = useAddProductReviewMutation();
  const handleReviewFormSubmit = (values, { resetForm }) => {
    console.log(values);
    addProductReview({ post: values, productId }).then(() => resetForm());
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: product, isFetching: isFetchingProduct } =
    useGetProductsDetailesQuery({ productId });
  const { data: relatedProducts, isFetching: isFetchingRelatedProducts } =
    useGetRelatedProductsQuery({ productId });
  console.log(product?.organize?.category?.name);

  const [activeImage, setActiveImage] = useState(product?.thumbnail);
  useEffect(() => {
    setActiveImage(product?.thumbnail);
  }, [product?.thumbnail]);
  console.log(relatedProducts);
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
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title={`Product details`}
          subtitle={`Product ID : ${productId}`}
        />
      </Box>

      <Box className="md:container px-2 md:mx-auto md:px-auto">
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
                className="text-md flex gap-4"
              >
                <s className="me-2 mr-1">${product?.regular_pricing}</s>
                <strong>${product?.sale_pricing}</strong>
              </Typography>
              <Box className="flex gap-4 items-center text-sm">
                {!isFetchingProduct ? (
                  <Rating
                    name="read-only"
                    defaultValue={product?.rating}
                    readOnly
                  />
                ) : (
                  <Box></Box>
                )}

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
            <Box className=" w-full mt-4 rounded-md flex justify-between p-4 m-4 ">
              <Box>
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Organize
                </Typography>
                <Box>
                  {product?.organize?.category?.name && (
                    <Typography>
                      <strong>category : </strong>
                      {product?.organize?.category?.name}
                    </Typography>
                  )}

                  {product?.organize?.collection?.name && (
                    <Typography>
                      <strong>collection : </strong>
                      {product?.organize?.collection?.name}
                    </Typography>
                  )}
                  {product?.organize?.vendor?.name && (
                    <Typography>
                      <strong>vendor : </strong>
                      {product?.organize?.vendor?.name}
                    </Typography>
                  )}
                  {product?.organize?.tags?.length ? (
                    <>
                      <Typography>
                        <strong>tags : </strong>
                      </Typography>
                      <Box>
                        {product?.organize?.tags?.map((tag) => (
                          <Typography key={tag.id}>{tag?.name}</Typography>
                        ))}
                      </Box>
                    </>
                  ) : undefined}
                </Box>
              </Box>
              <Box>
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Variant
                </Typography>
                <Box>
                  {product?.variants?.map((variant) => (
                    <Typography>
                      <strong>{variant.variant} : </strong>
                      {variant.option}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box className="flex-col w-full px-4  md:px-2 md:py-1 space-y-2">
              <Box className="flex justify-between items-center w-full">
                <ButtonGroup
                  variant="outlined"
                  color="secondary"
                  aria-label="outlined primary button group"
                  sx={{ backgroundColor: colors.primary[400] }}
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
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                  />
                  <IconButton size="large" onClick={() => setCount(count + 1)}>
                    <AddIcon />
                  </IconButton>
                  <Button
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => {
                      dispatch(addToCart({ product: { ...product, count } }));
                    }}
                    className={`w-full `}
                  >
                    Add to Cart
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Box>
          <Box
            className={`w-full flex flex-col-reverse lg:flex-row gap-4 w-full lg:max-w-[50%]`}
          >
            <Box
              className={`w-full flex flex-row-wrap lg:flex-col gap-4 my-4 justify-center items-center lg:w-[120px] px-auto`}
            >
              {product?.images?.map((image, index) => (
                <CardActionArea
                  key={index}
                  onClick={() => setActiveImage(image?.image)}
                  className={`${
                    theme.palette.mode === "dark" ? "bg-white/5" : "bg-black/5"
                  } ${
                    activeImage === image?.image
                      ? "h-[80px] w-[80px]"
                      : "h-[70px] w-[70px]"
                  } bg-opacity-90 p-1  rounded-md  ease-in-out duration-300 `}
                >
                  <img
                    alt="product"
                    src={image?.image}
                    className={` rounded-md h-[100%] w-[100%]`}
                  />
                </CardActionArea>
              ))}
            </Box>
            <Box className={`my-4 w-full  overflow-hidden`}>
              <img
                alt="product thamnail"
                style={{
                  objectFit: "cover",
                  backgroundAttachment: "fixed",
                }}
                src={activeImage}
                className={` max-w-[600px] max-h-[600px] rounded-md mx-auto`}
              />
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
                {product?.reviews?.map((review, index) => (
                  <Reviews key={`reviews-${index}`} review={review} />
                ))}
                <ReviewForm handleReviewFormSubmit={handleReviewFormSubmit} />
              </Box>
            )}
            {value === "additiona-information" && (
              <Box>additiona-information</Box>
            )}
          </Box>
        </Box>
      </Box>

      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Box className="flex justify-between items-center">
          <Header
            title="You might also like these"
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
        <Box className="">
          {!isFetchingRelatedProducts && (
            <ProductCarouse products={relatedProducts} />
          )}
        </Box>
      </Box>

      <Box
        backgroundColor={colors.primary[400]}
        className="px-2 md:px-4 flex justify-center lg:px-auto py-[80px] items-center mb-[50px]"
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
