import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import ProductContent from "./ProductContent";
const ProductCard2 = ({ product, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const { category, price, title, images } = product;
  return (
    <>
      <CardActionArea
        className={`
            absolute 
            xs:w-[100%] h-[100%]  md:w-[45%] md:h-[110%] 
            md:-inset-y-[5%] md:right-[0] 
            xs:z-10 xs:hover:z-0
            cursor-pointer rounded-lg p-2 m-0
            bg-opacity-[90%]  backdrop-blur-xs bg-white/5
            md:hover:scale-105  ease-in-out duration-300 
          `}
      >
        <img
          src={product?.thumbnail}
          alt={`${title} image`}
          onClick={() => navigate(`/product/${product.id}`)}
          className={`w-[100%] h-[100%] rounded-lg `}
        />
      </CardActionArea>
      <CardActionArea
        className={`
          absolute  md:ml-4 md:w-[45%] md:inset-y-[5%] p-2
          w-auto h-[100%]  md:h-[90%]
          xs:z-0 xs:hover:z-10 
          flex flex-col rounded-lg justify-between
          bg-opacity-[90%]  ease-in-out duration-300
          xs:backdrop-blur-sm xs:bg-blue-900/50 
          md:bg-white/5  md:backdrop-blur-0 
         `}
      >
        <ProductContent product={product} />
      </CardActionArea>
    </>
  );
};

export default ProductCard2;
