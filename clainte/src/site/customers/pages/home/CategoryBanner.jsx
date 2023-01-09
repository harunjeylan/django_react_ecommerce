import { Box, Typography, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { childerenImage, manImage, womenImage } from "../../import";

const MainCarousel = () => {
  const navigate = useNavigate();
  return (
    <Box
      className={`md:container px-auto mx-auto flex flex-col md:flex-row
          px-[12px] py-[96px]`}
    >
      <CardActionArea
        onClick={() => navigate(`/shopping`)}
        className={`relative mx-auto  md:h-auto overflow-hidden`}
      >
        <img
          alt="women"
          src={womenImage}
          className={`h-[100%] w-[100%] hover:scale-[102%] ease-in-out duration-300`}
        />
        <Box>
          <Typography
            variant="h1"
            fontWeight="bold"
            className={`absolute text-white text-2xl md:text-3xl lg:text-4xl top-[50%] text-6xl w-full px-auto text-center my-auto`}
          >
            Women
          </Typography>
        </Box>
      </CardActionArea>
      <CardActionArea
        onClick={() => navigate(`/shopping`)}
        className={`relative mx-auto   md:h-auto overflow-hidden`}
      >
        <img
          alt="men"
          src={manImage}
          className={`h-[100%] w-[100%] hover:scale-[102%] ease-in-out duration-300`}
        />
        <Typography
          variant="h1"
          fontWeight="bold"
          className={`absolute text-white text-2xl md:text-3xl lg:text-4xl top-[50%] text-6xl w-full px-auto text-center my-auto`}
        >
          Man
        </Typography>
      </CardActionArea>
      <CardActionArea
        onClick={() => navigate(`/shopping`)}
        className={`relative mx-auto   md:h-auto overflow-hidden`}
      >
        <img
          alt="childeren"
          src={childerenImage}
          className={`h-[100%] w-[100%] hover:scale-[102%] ease-in-out duration-300`}
        />
        <Typography
          variant="h1"
          fontWeight="bold"
          className={`absolute text-white text-2xl md:text-3xl lg:text-4xl top-[50%] text-6xl w-full px-auto text-center my-auto`}
        >
          Childeren
        </Typography>
      </CardActionArea>
    </Box>
  );
};

export default MainCarousel;
