import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import MainCarousel from "./MainCarousel";
import Service from "../../components/Service";
import Subscribe from "../../components/Subscribe";
// import CategoryBanner from "./CategoryBanner";
import ProductCarouse from "../../components/ProductCarouse";

import Banner from "../../components/Banner";
import { tokens } from "../../../../theme";
import { useGetAllProductsQuery } from "../../../../features/services/productApiSlice";
import Header from "../../../../components/Header";

function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const {
    data: recommendedProducts,
    isFetching: isFetchingRecommendedProducts,
  } = useGetAllProductsQuery();

  console.log(recommendedProducts);
  return (
    <Box className="flex flex-col gap-4 md:gap-8">
      <Box backgroundColor={colors.primary[400]} className="">
        <MainCarousel />
        {/* <CategoryBanner /> */}
      </Box>
      <Box backgroundColor={colors.primary[400]} className={`px-auto`}>
        <Banner />
      </Box>
      {/* {!isFetchingRecommendedProducts &&
        recommendedProducts?.map((recommendedProduct) => (
          <Box
            key={recommendedProduct.id}
            className="md:container px-2 md:mx-auto md:px-auto"
          >
            <Box className="flex justify-between items-center">
              <Header
                title={recommendedProduct?.title}
                subtitle={recommendedProduct?.subtitle}
                bodyText={``}
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
          </Box>
        ))} */}
      {!isFetchingRecommendedProducts && (
        <Box className="">
          <ProductCarouse products={recommendedProducts} />
        </Box>
      )}

      <Box backgroundColor={colors.primary[400]} className={`px-1 md:px-auto`}>
        <Banner />
      </Box>
      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Service />
      </Box>
      <Box className="">
        <Subscribe />
      </Box>
    </Box>
  );
}

export default Home;
