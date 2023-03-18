import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../../../components/Header";
import { useGetRelatedProductsQuery } from "../../../../../features/services/productApiSlice";
import { tokens } from "../../../../../theme";
import ProductCarouse from "../../../components/ProductCarouse";

const RelatedProducts = ({ productId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { data: relatedProducts, isFetching: isFetchingRelatedProducts } =
    useGetRelatedProductsQuery({ productId });
  return (
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
  );
};

export default RelatedProducts;
