import { useTheme } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import MainCarousel from "./MainCarousel";
import Service from "../../../../components/Service";
import Subscribe from "../../components/Subscribe";
// import CategoryBanner from "./CategoryBanner";
import ProductCarouse from "../../components/ProductCarouse";

import Banner from "../../../../components/Banner";
import { tokens } from "../../../../theme";
import {
  useGetTopRatedProductsQuery,
  useGetMostSealedProductsQuery,
} from "../../../../features/services/productApiSlice";
import NowsRoom from "./NowsRoom";
import Header2 from "../../../../components/Header2";
import { useGetDiscountsQuery } from "../../../../features/services/discountApiSlice";

function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { data: discounts = [], isFetching: isFetchingDiscounts } =
    useGetDiscountsQuery({ limit: 2 });
  const { data: topRatedProducts, isFetching: isFetchingTopRatedProducts } =
    useGetTopRatedProductsQuery({ limit: 10 });
  const { data: mostSealedProducts, isFetching: isFetchingMostSealedProducts } =
    useGetMostSealedProductsQuery({ limit: 10 });

  return (
    <Box className="flex flex-col gap-4 md:gap-12">
      <Box backgroundColor={colors.primary[400]} className="">
        <MainCarousel />
        {/* <CategoryBanner /> */}
      </Box>
      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Service />
      </Box>
      {!isFetchingDiscounts && discounts.length >= 1 && (
        <Box
          backgroundColor={colors.primary[400]}
          className={`px-1 md:px-auto`}
        >
          <Banner discount={discounts[0]} />
        </Box>
      )}
      {!isFetchingTopRatedProducts && (
        <Box
          className={`w-full flex flex-col gap-4 px-2 md:mx-auto md:px-auto mt-8`}
        >
          <Header2
            title="Top Rated Product"
            subtitle="Alif Newsroom  Newsroom"
          />
          <ProductCarouse products={topRatedProducts} />
          <Box className="w-fit mx-auto">
            <Button
              onClick={() => navigate(`/products/top-rated`)}
              variant="outlined"
              color="secondary"
              className={`bg-opacity-0 hover:bg-opacity-100 px-[40px] py-4`}
            >
              Browse More
            </Button>
          </Box>
        </Box>
      )}
      {!isFetchingMostSealedProducts && (
        <Box
          className={`w-full flex flex-col gap-4 px-2 md:mx-auto md:px-auto mt-8`}
        >
          <ProductCarouse
            header={
              <Header2
                title="Most Sealed Product"
                subtitle="Alif Newsroom  Newsroom"
              />
            }
            products={mostSealedProducts}
          />
          <Box className="w-fit mx-auto">
            <Button
              onClick={() => navigate(`/products/most-sealed`)}
              // LinkComponent={<Navigate to="/products/most-sealed" />}
              variant="outlined"
              color="secondary"
              className={`bg-opacity-0 hover:bg-opacity-100 px-[40px] py-4`}
            >
              Browse More
            </Button>
          </Box>
        </Box>
      )}
      {!isFetchingDiscounts && discounts.length === 2 && (
        <Box
          backgroundColor={colors.primary[400]}
          className={`px-1 md:px-auto`}
        >
          <Banner discount={discounts[1]} />
        </Box>
      )}

      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <NowsRoom
          header={
            <Header2
              title="Get Alif Newsroom"
              subtitle="Alif Newsroom Alif Newsroom"
            />
          }
          footer={
            <Box className="w-fit mx-auto">
              <Button
                onClick={() => navigate(`/blogs`)}
                variant="outlined"
                color="secondary"
                className={`bg-opacity-0 hover:bg-opacity-100 px-[40px] py-4`}
              >
                Browse More
              </Button>
            </Box>
          }
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="max-w-lg mx-auto flex justify-between items-center gap-4">
          <Subscribe />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
