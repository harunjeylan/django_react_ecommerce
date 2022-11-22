import { CardActionArea, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { tokens } from "../../theme";
import ProductContent from "../../components/ProductContent";

import useMediaQuery from "@mui/material/useMediaQuery";
const ProductContent2 = ({ product, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:768px)");
  const [isHovered, setIsHovered] = useState(false);
  const { category, price, title, images } = product ? product: { category:"", price:"", title:"", images:[] };
  return (
    <>
      <Box>
        <CardActionArea
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          className={`
          absolute  mr-4 w-[50%] inset-y-[5%] p-2
           h-[100%]  h-[90%] z-10 right-[-10%] 
          flex flex-col rounded-lg justify-between
          bg-opacity-[90%]  ease-in-out duration-300
          bg-white/5 
         `}
        >
          <ProductContent
            product={product}
            showDescriptions={false}
            sliceTitle={true}
            showAddToCartButton={isNoneMobile}
          />
        </CardActionArea>
      </Box>
            <CardActionArea
        onClick={() => navigate(`/product/${product?.id}`)}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className={`
            absolute w-[60%] h-[110%] 
            -inset-y-[5%] left-[-10%] 
            cursor-pointer rounded-lg p-2 m-0
            bg-opacity-[90%]   bg-white/5
            hover:scale-105  ease-in-out duration-300 
          `}
      >
          <img
          src={product?.thumbnail}
          alt={`${title} image`}
          className={`w-[100%] h-[100%] rounded-lg `}
        />

      </CardActionArea>
    </>
  );
};

export default ProductContent2;
