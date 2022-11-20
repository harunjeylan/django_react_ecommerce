import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";
import ItemCarouse from "./ItemCarouse";
import { Box, Container } from "@mui/material";

function Home() {
  return (
    <div className="home">
      <Box className="mb-4">
        <MainCarousel />
      </Box>
      <Box className="bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg  p-4 bg-dark/5 ">
        <ItemCarouse />
      </Box>
      <Container maxWidth="xl">
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
