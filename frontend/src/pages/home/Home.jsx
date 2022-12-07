import ShoppingList from "../../components/ShoppingList";
import Service from "../../components/Service";
import Subscribe from "../../components/Subscribe";
import MainCarousel from "./MainCarousel";
import ProductCarouse1 from "../../components/ProductCarouse1";
import Header from "../../components/Header";
import Header2 from "../../components/Header2";
import Banner from "../../components/Banner";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardActionArea, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

import childerenImage from "../../data/images/childeren.webp";
import manImage from "../../data/images/man.webp";
import womenImage from "../../data/images/women.webp";

function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box className="flex flex-col gap-8 ">
      <Box className="mb-4 bg-black/5 bg-opacity-80">
        <MainCarousel />
        <Box
          className={`container px-auto mx-auto flex flex-col md:flex-row
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
      </Box>
      <Box backgroundColor={colors.primary[400]} className={`mb-[50px]`}>
        <Banner />
      </Box>
      <Box className={`container mx-auto p-[48px] max-w-xl`}>
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

      <Box className="container mx-auto">
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
        <ProductCarouse1 />
      </Box>

      <Box className="container mx-auto mb-[50px]">
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
      <Box backgroundColor={colors.primary[400]} className={`mb-[50px]`}>
        <Banner />
      </Box>
      <Box className="container mx-auto px-4 items-center mb-[50px]">
        <Service />
      </Box>
      <Box className="my-4">
        <Subscribe />
      </Box>
    </Box>
  );
}

export default Home;
