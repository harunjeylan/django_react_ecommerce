import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";
import MainCarousel from "./MainCarousel";
import ItemCarouse from "./ItemCarouse";
import { Box, Container } from "@mui/material";
import Header from "../../components/Header";
function Home() {
  return (
    <div className="home">
      <Box className="mb-4">
        <MainCarousel />
      </Box>
      <Box className="bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg  p-4 bg-dark/5 ">
        <Header title="New Products" subtitle="welcome to you Invoices" />
        <ItemCarouse />
      </Box>
      <Container maxWidth="xl">
        <Box className="my-4">
          <Header
            title="Shopping List"
            subtitle="welcome to you Shopping List"
          />
          <ShoppingList />
        </Box>
        <Box className="my-4">
          <Header title="Subscribe" subtitle="welcome to you Subscribe" />
          <Subscribe />
        </Box>
      </Container>
    </div>
  );
}

export default Home;
