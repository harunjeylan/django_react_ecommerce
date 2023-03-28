import React from "react";
import Header2 from "../../../../components/Header2.jsx";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  List,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { tokens } from "../../../../theme.js";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../../../../features/services/blogApiSlice.js";
const Blog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useGetAllBlogsQuery();
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header2
          title="Alif Newsroom"
          subtitle="Geeks Newsroom Geeks Newsroom"
          bodyText="Stories, tips, and tools to inspire you to find your most creative self. Subscribe to get curated content delivered directly to your inbox."
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="max-w-lg mx-auto flex justify-between items-center gap-4">
          <TextField
            fullWidth
            placeholder="Email Address"
            variant="outlined"
            size="medium"
            color="secondary"
          />
          <Button
            color="secondary"
            variant="outlined"
            size="large"
            className="py-3"
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex flex-col-reverse md:flex-row gap-4`}
      >
        <Box className="w-full md:w-3/4 rounded-md px-2">
          <Box className="w-full grid grid-cols-1  md:grid-cols-2 gap-8">
            <Card
              sx={{
                backgroundColor: colors.primary[400],
              }}
              className="shadow md:col-span-2 flex flex-col md:flex-row items-center hover:drop-shadow-md"
            >
              <CardMedia
                sx={{ height: 360, width: "100%" }}
                title="the-first-blog"
                image="https://geeks-react.netlify.app/static/media/blogpost-3.08def44b3b2603bd3985.jpg"
              />
              <CardContent>
                <Link to={`blog/the-first-blog`}>
                  <Typography
                    variant="h1"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    className={`text-2xl md:text-3xl p-4 text-left hover:text-green-400`}
                  >
                    Recent Posts Getting started the Web App JavaScript in 2020
                  </Typography>
                  <Typography variant="subtitle1">
                    Debitis ipsam ratione molestias dolores qui asperiores
                    consequatur facilis error.
                  </Typography>
                </Link>
              </CardContent>
            </Card>
            {[1, 2, 3, 4, 5].map((id) => (
              <Card
                key={id}
                sx={{
                  backgroundColor: colors.primary[400],
                }}
                className="shadow hover:drop-shadow-md"
              >
                <CardMedia
                  sx={{ height: 300, width: "100%" }}
                  title="the-first-blog"
                  image="https://geeks-react.netlify.app/static/media/blogpost-3.08def44b3b2603bd3985.jpg"
                />
                <CardContent>
                  <Link to={`blog/the-first-blog`}>
                    <Typography
                      variant="h1"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-xl md:text-2xl py-4 text-left hover:text-green-400`}
                    >
                      Recent Posts Getting started the Web App JavaScript in
                      2020
                    </Typography>
                    <Typography variant="subtitle1">
                      Debitis ipsam ratione molestias dolores qui asperiores
                      consequatur facilis error.
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
        <Box className="w-full md:w-1/4 flex flex-col gap-4">
          <Box
            backgroundColor={colors.primary[400]}
            className=" w-full rounded-md mb-4"
          >
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              placeholder="search.."
            />
          </Box>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Recent Posts
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={``}>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
              </List>
              {/* {!isFetchingOrganize &&
                organize?.categories.map((categorie) => (
                  <FormControlLabel
                    key={categorie.id}
                    value={categorie.name}
                    name="category"
                    onClick={(e) => handleCheckFilter(e, setOrganizeValue)}
                    control={<Checkbox color="secondary" />}
                    label={categorie.name}
                    labelPlacement="end"
                    className="block ml-4"
                  />
                ))} */}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Categories
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={``}>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
              </List>
              {/* {!isFetchingOrganize &&
                organize?.categories.map((categorie) => (
                  <FormControlLabel
                    key={categorie.id}
                    value={categorie.name}
                    name="category"
                    onClick={(e) => handleCheckFilter(e, setOrganizeValue)}
                    control={<Checkbox color="secondary" />}
                    label={categorie.name}
                    labelPlacement="end"
                    className="block ml-4"
                  />
                ))} */}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Archive
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={``}>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
              </List>
              {/* {!isFetchingOrganize &&
                organize?.categories.map((categorie) => (
                  <FormControlLabel
                    key={categorie.id}
                    value={categorie.name}
                    name="category"
                    onClick={(e) => handleCheckFilter(e, setOrganizeValue)}
                    control={<Checkbox color="secondary" />}
                    label={categorie.name}
                    labelPlacement="end"
                    className="block ml-4"
                  />
                ))} */}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Tags
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={``}>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`p-1 outline outline-1 rounded-sm hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`p-1 outline outline-1 rounded-sm hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
                <Link to={`blogs/slag1`}>
                  <Typography
                    variant="p"
                    fontWeight="bold"
                    className={`p-1 outline outline-1 rounded-sm hover:text-green-400`}
                  >
                    Organizes
                  </Typography>
                </Link>
              </List>
              {/* {!isFetchingOrganize &&
                organize?.categories.map((categorie) => (
                  <FormControlLabel
                    key={categorie.id}
                    value={categorie.name}
                    name="category"
                    onClick={(e) => handleCheckFilter(e, setOrganizeValue)}
                    control={<Checkbox color="secondary" />}
                    label={categorie.name}
                    labelPlacement="end"
                    className="block ml-4"
                  />
                ))} */}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default Blog;
