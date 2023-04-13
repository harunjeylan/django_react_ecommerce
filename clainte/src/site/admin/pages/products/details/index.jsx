import React, { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Box,
  CardActionArea,
  Button,
  Typography,
  Breadcrumbs,
  Tabs,
  Tab,
  CircularProgress,
  ButtonGroup,
} from "@mui/material";
import { useGetProductsDetailsQuery } from "../../../../../features/services/productApiSlice";
import StarIcon from "@mui/icons-material/Star";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import Reviews from "../../../../../components/Reviews";

const ProductDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { productId } = useParams();
  const [value, setValue] = useState("description");

  const { data: product, isFetching: isFetchingProduct } =
    useGetProductsDetailsQuery({ productId });

  const [activeImage, setActiveImage] = useState(product?.thumbnail);

  useEffect(() => {
    setActiveImage(product?.thumbnail);
  }, [product?.thumbnail]);

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">Product Details</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex justify-between items-center`}
      >
        <Header
          title={`Product details`}
          subtitle={`Product ID : ${productId}`}
        />
        <ButtonGroup>
          <Button
            onClick={() => navigate(`/admin/products/${productId}/edit`)}
            color="secondary"
            variant="outlined"
            size="large"
          >
            Edit
          </Button>
          <Button
            onClick={() => navigate(`/admin/products/new`)}
            color="secondary"
            variant="outlined"
            size="large"
          >
            Add New
          </Button>
        </ButtonGroup>
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
            </Box>
            <Typography variant="body2" className={`w-full px-auto  my-auto`}>
              Samsa was a travelling salesman - and above it there hung a
              picture that he had recently cut out of an illustrated magazine
              and housed in a nice, gilded frame.
            </Typography>
            <Box className=" w-full mt-4 rounded-md flex justify-between p-4 m-4 gap-8">
              <Box className=" w-full">
                <Box className=" w-full">
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-xl md:text-2xl  text-left my-4`}
                  >
                    Organize
                  </Typography>
                  <Box className="flex flex-col gap-4 justify-start w-fit">
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
                          {product?.organize?.tags?.map((tag, index) => (
                            <span key={`tag-${tag.id}-${index}`}>
                              {tag?.name}
                              {", "}
                            </span>
                          ))}
                        </Typography>
                      </>
                    ) : undefined}
                  </Box>
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-lg md:text-xl  text-left my-4`}
                  >
                    Brand : {product?.brand?.name}
                  </Typography>
                </Box>
                <Box className=" w-full">
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-xl md:text-2xl  text-left my-4`}
                  >
                    Rating
                  </Typography>
                  <Box className="flex flex-col gap-4 justify-start w-full">
                    {!isFetchingProduct ? (
                      <Box className=" w-full flex gap-4 items-center">
                        <Box className="w-32">
                          <StarIcon
                            fontSize="large"
                            className="text-yellow-500 text-6xl"
                          />
                          <Typography
                            variant="h1"
                            color={colors.greenAccent[400]}
                          >
                            {product?.rating.average}
                          </Typography>
                          <Typography
                            variant="h5"
                            color={colors.greenAccent[400]}
                          >
                            {product?.rating.total} Reviews
                          </Typography>
                        </Box>

                        <Box className=" w-full flex flex-col gap-2">
                          {product?.rating?.values?.map((rating) => (
                            <Box
                              key={rating.rating}
                              className={`flex gap-2 w-full items-center`}
                            >
                              <Typography>
                                <strong>{rating.rating}</strong>
                              </Typography>
                              <Box
                                backgroundColor={colors.primary[300]}
                                className="w-full h-4 outline-1 flex justify-start items-center rounded-md"
                              >
                                <span
                                  style={{ width: `${rating?.average}%` }}
                                  className={`py1 bg-yellow-500 h-full rounded-md`}
                                />
                              </Box>
                              <strong>{rating?.total}</strong>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ) : (
                      <Box className="w-full flex items-center justify-center h-full min-h-40">
                        <CircularProgress color="secondary" />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box className="flex flex-col gap-4 justify-start w-fit">
                <Box>
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-xl md:text-2xl  text-left my-4`}
                  >
                    Variant
                  </Typography>
                  <Box className="flex gap-6 w-full">
                    {!isFetchingProduct ? (
                      product.variants?.map((variant, index) => (
                        <Box
                          className="flex flex-col gap-2"
                          key={`variant-${variant.name}-variants-${variant.id}-${index}`}
                        >
                          <Box className="w-full flex  items-center">
                            <Box className="">
                              <Typography variant="h5" fontWeight="bold">
                                {variant.variantLabel}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            {variant?.options?.map((option, index2) => (
                              <Typography
                                key={`variant-${option.label}-options-${option.id}-${index2}`}
                              >
                                {option.label}
                              </Typography>
                            ))}
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Box className="w-full flex items-center justify-center h-full min-h-40">
                        <CircularProgress color="secondary" />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className={`w-full flex flex-col-reverse lg:flex-row gap-4 lg:max-w-[50%]`}
          >
            <Box
              className={`w-full flex flex-row-wrap lg:flex-col gap-4 my-4 justify-center items-center lg:w-[120px] px-auto`}
            >
              <CardActionArea
                onClick={() => setActiveImage(product?.thumbnail)}
                className={`${
                  theme.palette.mode === "dark" ? "bg-white/5" : "bg-black/5"
                } ${
                  activeImage === product?.thumbnail
                    ? "h-[80px] w-[80px]"
                    : "h-[70px] w-[70px]"
                } bg-opacity-90 p-1  rounded-md  ease-in-out duration-300 `}
              >
                <img
                  alt="product"
                  src={product?.thumbnail}
                  className={` rounded-md h-[100%] w-[100%]`}
                />
              </CardActionArea>
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
                alt="product thumbnail"
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
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab label="Description" value="description" />
            <Tab label="Additional Information" value="addition-information" />
            <Tab label="Reviews" value="reviews" />
          </Tabs>
          <Box className="flex flex-wrap gap-4  mt-8">
            {value === "description" && (
              <div
                style={{ color: colors.neutral[400] }}
                className={`w-full prose lg:prose-xl `}
                dangerouslySetInnerHTML={{ __html: product?.description }}
              />
            )}
            {value === "reviews" && (
              <Box className={`flex flex-col gap-4 w-full`}>
                {product?.reviews?.map((review, index) => (
                  <Reviews key={`reviews-${index}`} review={review} />
                ))}
              </Box>
            )}
            {value === "addition-information" && (
              <Box>additional-information</Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
