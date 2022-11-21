import { useState, SyntheticEvent } from "react";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";
import ProductCarouse from "./ProductCarouse";
import { Box, Container } from "@mui/material";

function Home() {
  const [value, setValue] = useState(0);

  return (
    <div className="home">
      <Box className="mb-4">
        <MainCarousel />
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
