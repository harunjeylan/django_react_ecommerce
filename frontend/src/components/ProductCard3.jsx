import { CardActionArea, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { tokens } from "../theme";
import ProductContent from "./ProductContent";
import useMediaQuery from "@mui/material/useMediaQuery";
const ProductCard3 = ({ product, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNoneMobile = useMediaQuery("(min-width:768px)");
  const [isHovered, setIsHovered] = useState(false);
  const { category, price, title, images } = product;
  return (
    <>
      <CardActionArea
        onClick={() => navigate(`/product/${product.id}`)}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        className={`
            absolute 
            xs:w-[100%] h-[100%]  md:w-[45%] md:h-[110%] 
            md:-inset-y-[5%] md:right-[0] 
            cursor-pointer rounded-lg p-2 m-0
            bg-opacity-[90%]   bg-white/5
            md:hover:scale-105  ease-in-out duration-300 
          `}
      >
        <img
          src={product?.thumbnail}
          alt={`${title} image`}
          className={`w-[100%] h-[100%] rounded-lg `}
        />
      </CardActionArea>
      <Box display={isHovered || isNoneMobile ? "block" : "none"}>
        <CardActionArea
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          className={`
          absolute  md:ml-4 md:w-[45%] md:inset-y-[5%] p-2
          w-[100%] h-[100%]  md:h-[90%] z-10
          flex flex-col rounded-lg justify-between
          bg-opacity-[90%]  ease-in-out duration-300
          xs:backdrop-blur-sm xs:bg-blue-900/50 
          md:bg-white/5 
         `}
        >
          <ProductContent product={product} />
        </CardActionArea>
      </Box>
    </>
  );
};

export default ProductCard3;
