import { Box, Divider, useTheme } from "@mui/material";
import { Breadcrumbs, Button } from "@mui/material";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";

const HomeAppearance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box className={`flex flex-col gap-4 md:mt-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">Home page Appearance</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header
          title="Home page Appearance"
          subtitle="you can edit appearance of home page"
        />
      </Box>
      <Box className="md:container px-2 md:mx-auto md:px-auto flex gap-4 py-4">
        <Box className="w-full h-fit">
          <Box className="w-full h-fit my-4 flex gap-2">
            <Button color="secondary" variant="outlined">
              New Banner
            </Button>
            <Button color="secondary" variant="outlined">
              New Category
            </Button>
          </Box>
          <Box
            backgroundColor={colors.primary[600]}
            className="w-full h-fit flex flex-col gap-4 p-2"
          >
            <Box backgroundColor={colors.primary[400]} className="p-4">
              Banner
            </Box>
            <Box backgroundColor={colors.primary[400]} className="p-4">
              Banner
            </Box>
            <Box backgroundColor={colors.primary[400]} className="p-4">
              Banner
            </Box>
          </Box>
        </Box>
        <Box className="w-full h-fit">
          <Box className="w-full h-fit my-4 flex gap-2">
            <Typography variant="h3" fontWeight="bold">
              Home Page Appearance
            </Typography>
          </Box>
          <Box
            backgroundColor={colors.primary[600]}
            className="w-full h-fit flex flex-col gap-4 p-2"
          >
            <Box backgroundColor={colors.primary[400]} className="p-4">
              Banner
            </Box>
            <Box backgroundColor={colors.primary[400]} className="p-4">
              Banner
            </Box>
            <Box backgroundColor={colors.primary[400]} className="p-4">
              Banner
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeAppearance;
