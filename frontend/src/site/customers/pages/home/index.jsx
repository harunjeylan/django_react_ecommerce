import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import MainCarousel from "./MainCarousel";
import ShoppingList from "../../components/ShoppingList";
import Service from "../../components/Service";
import Subscribe from "../../components/Subscribe";
import CategoryBanner from "./CategoryBanner";
import ProductCarouse from "../../components/ProductCarouse";

import Banner from "../../components/Banner";

import { useGetLimitAndSkipProductsQuery } from "../../import";
import { Header, Header2, tokens } from "../../import";

function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const {
    data: RecommendedProducts,
    isFetching: isFetchingRecommendedProducts,
  } = useGetLimitAndSkipProductsQuery({ limit: 20, skip: 10 });
  return (
    <Box className="flex flex-col gap-4 md:gap-8">
      <Box backgroundColor={colors.primary[400]} className="">
        <MainCarousel />
        <CategoryBanner />
      </Box>
      <Box backgroundColor={colors.primary[400]} className={`px-auto`}>
        <Banner />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header2
          title="New Arrivals"
          subtitle="One morning"
          bodyText={`One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and Boxided by arches into stiff
            sections`}
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
        <Box className="">
          {!isFetchingRecommendedProducts && (
            <ProductCarouse products={RecommendedProducts} />
          )}
        </Box>
      </Box>

      <Box className="md:container px-2 md:mx-auto md:px-auto ">
        <Box className="flex justify-between items-center">
          <Header
            title="Top Products"
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
        <ShoppingList />
      </Box>
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
