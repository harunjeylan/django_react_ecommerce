import { useState, SyntheticEvent } from "react";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";
import ProductCarouse from "./ProductCarouse";
import { Box, Container } from "@mui/material";
import {
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Header2 from "../../components/Header2";
function Home() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="home">
      <Box className="mb-4 bg-black/5 bg-opacity-80">
        <MainCarousel />
        <Box
          className={`container mx-auto flex flex-col md:flex-row
          px-[12px] py-[96px]`}
        >
          <CardActionArea className={`relative h-[620px] overflow-hidden`}>
            <img
              src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80"
              className={`h-[100%] w-[100%] hover:scale-[102%] ease-in-out duration-300`}
            />
            <Box>
              <Typography
                variant="h1"
                fontWeight="bold"
                className={`absolute top-[50%] text-6xl w-full px-auto text-center my-auto`}
              >
                Women
              </Typography>
            </Box>
          </CardActionArea>
          <CardActionArea className={`relative h-[620px] overflow-hidden`}>
            <img
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
              className={`h-[100%] w-[100%] hover:scale-[102%] ease-in-out duration-300`}
            />
            <Typography
              variant="h1"
              fontWeight="bold"
              className={`absolute top-[50%] text-6xl w-full px-auto text-center my-auto`}
            >
              Man
            </Typography>
          </CardActionArea>
          <CardActionArea className={`relative h-[620px] overflow-hidden`}>
            <img
              src="https://images.unsplash.com/photo-1554342321-0776d282ceac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
              className={`h-[100%] w-[100%] hover:scale-[102%] ease-in-out duration-300`}
            />
            <Typography
              variant="h1"
              fontWeight="bold"
              className={`absolute top-[50%] text-6xl w-full px-auto text-center my-auto`}
            >
              Childeren
            </Typography>
          </CardActionArea>
        </Box>
      </Box>
      <Box class={`container mx-auto md:mx-[10%] p-[48px]`}>
          <Header2 title="New Arrivals" subtitle="One morning"
          bodyText={`One morning, when Gregor Samsa woke from troubled dreams, he found
            himself transformed in his bed into a horrible vermin. He lay on his
            armour-like back, and if he lifted his head a little he could see
            his brown belly, slightly domed and divided by arches into stiff
            sections`} />
      </Box>

      <Box className="md:container mx-auto bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg  p-4 bg-dark/5 ">
        <ProductCarouse />
      </Box>
      <Container maxWidth="xl" className={`container xs:px-8 md:px-2`}>
        <Box className="my-4">
          <ShoppingList />
        </Box>
        <Box className="my-4">
          <Subscribe />
        </Box>
      </Container>
    </div>
  );
}

export default Home;
