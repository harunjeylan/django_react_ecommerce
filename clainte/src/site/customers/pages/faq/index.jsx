import { Box, CircularProgress, useTheme } from "@mui/material";
import { Accordion, Breadcrumbs, Button } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../../theme";
import Header2 from "../../../../components/Header2";
import { useGetAllFqaQuery } from "../../../../features/services/fqaApiSlice";

const CustomerFAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { data: FqAs = [], isFetching: isFetchingFqa } = useGetAllFqaQuery();
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            home
          </Button>
          <Typography color="text.primary">FQA</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header2
          title="Frequently Asked Question"
          subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea, numquam! Minima, voluptatum."
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        {!isFetchingFqa ? (
          FqAs.length ? (
            FqAs.map((fqa) => (
              <Accordion
                key={fqa.id}
                defaultExpanded
                sx={{ backgroundColor: colors.primary[400] }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color={colors.greenAccent[500]} variant="h5">
                    {fqa.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{fqa.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Box className="w-full flex items-center justify-center h-full min-h-40">
              <Typography>No data</Typography>
            </Box>
          )
        ) : (
          <Box className="h-full w-full flex justify-center items-center">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomerFAQ;
