import { CardContent, CardMedia, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

import ProductContent from "./ProductContent";
const ProductCard = ({ product, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { category, price, title, images } = product;
  return (
    <CardActionArea
      onClick={() => navigate(`/product/${product.id}`)}
      className={`rounded-lg hover:scale-[102%] md:hover:scale-105 ease-in-out duration-300
        bg-opacity-80 backdrop-blur-sm  bg-white/5`}
    >
      <CardMedia
        component="img"
        image={product?.thumbnail}
        alt={`${title} image`}
        className="max-w-[80] rounded-t-lg max-h-52 h-52"
      />
      <CardContent className="w-auto">
        <ProductContent product={product} />
      </CardContent>
    </CardActionArea>
  );
};

export default ProductCard;
