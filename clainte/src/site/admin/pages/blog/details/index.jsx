import { Box, useTheme } from "@mui/material";
import { Accordion, Breadcrumbs, Button } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";

const AdminBlogDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">New Product</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="AdminFAQ" subtitle="Frequently Asked Questions Page" />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}></Box>
    </Box>
  );
};

export default AdminBlogDetails;
