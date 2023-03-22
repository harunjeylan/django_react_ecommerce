import { Box, useTheme, Divider } from "@mui/material";
import { Breadcrumbs, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../../theme";
import Header from "../../../../components/Header";
import Model from "../../../../components/ui/Model";
import { useRef, useState } from "react";
import { useGetAllCategoryQuery } from "../../../../features/services/organizeApiSlice";

import Countdown from "react-countdown";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MoneyIcon from "@mui/icons-material/Money";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
const HomeAppearance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [categoryThumbnail, setCategoryThumbnail] = useState([]);
  const [categoryValue, setCategoryValue] = useState("");

  const inputRef = useRef();
  // const handleAdd = () => {};
  // const handleUpdate = () => {};
  // const handleDelete = () => {};
  const handleChange = (e) => {
    console.log(e);
  };
  const { data: categories = [], isFetching: categoriesIsFetching } =
    useGetAllCategoryQuery();
  const handleClean = (image) => {
    console.log("list cleaned", image);
  };
  console.log(categories);
  return (
    <Box className={`flex flex-col gap-4 md:mt-10`}>
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle="Add Brand"
      ></Model>

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
            <Button
              onClick={() => setOpenModel(true)}
              color="secondary"
              variant="outlined"
            >
              Add Banner
            </Button>
            <Button
              onClick={() => setOpenModel(true)}
              color="secondary"
              variant="outlined"
            >
              Add Category
            </Button>
            <Button
              onClick={() => setOpenModel(true)}
              color="secondary"
              variant="outlined"
            >
              Add Products
            </Button>
          </Box>
          <Box className="w-full h-fit my-4 flex gap-2">
            <Typography variant="h3" fontWeight="bold">
              Home Page Appearance
            </Typography>
          </Box>

          <Box
            backgroundColor={colors.primary[600]}
            className="w-full h-fit flex flex-col gap-4 p-2"
          >
            <Box
              backgroundColor={colors.primary[400]}
              className="w-full flex flex-col gap-2 p-4"
            >
              <Box
                backgroundColor={colors.primary[400]}
                className="w-full grid grid-cols-2  gap-2"
              >
                <Box className="p-2 flex gap-2 items-center border-[1px] rounded-md">
                  <Box>
                    <img
                      style={{ backgroundColor: colors.primary[400] }}
                      className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                      src={
                        "https://robohash.org/utetasperiores.png?size=200x200"
                      }
                      alt={`https://robohash.org/utetasperiores.png?size=200x200`}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h4">Category</Typography>
                    <Typography variant="lorem">
                      Lorem ipsum, dolor sit amet
                    </Typography>
                  </Box>
                </Box>
                <Box className="p-2 flex gap-2 items-center border-[1px] rounded-md">
                  <Box>
                    <img
                      style={{ backgroundColor: colors.primary[400] }}
                      className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                      src={
                        "https://robohash.org/utetasperiores.png?size=200x200"
                      }
                      alt={`https://robohash.org/utetasperiores.png?size=200x200`}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h4">Category</Typography>
                    <Typography variant="lorem">Lorem ipsum, dolor</Typography>
                  </Box>
                </Box>
                <Box className="p-2 flex gap-2 items-center border-[1px] rounded-md">
                  <Box>
                    <img
                      style={{ backgroundColor: colors.primary[400] }}
                      className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                      src={
                        "https://robohash.org/utetasperiores.png?size=200x200"
                      }
                      alt={`https://robohash.org/utetasperiores.png?size=200x200`}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h4">Category</Typography>
                    <Typography variant="lorem">
                      Lorem ipsum, dolor sit amet
                    </Typography>
                  </Box>
                </Box>
                <Box className="p-2 flex gap-2 items-center border-[1px] rounded-md">
                  <Box>
                    <img
                      style={{ backgroundColor: colors.primary[400] }}
                      className="h-[60px] w-[60px] pointer rounded-md border-[1px]"
                      src={
                        "https://robohash.org/utetasperiores.png?size=200x200"
                      }
                      alt={`https://robohash.org/utetasperiores.png?size=200x200`}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h4">Category</Typography>
                    <Typography variant="lorem">Lorem ipsum, dolor</Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box className="flex gap-2">
                <Button color="secondary" variant="outlined">
                  edit
                </Button>
                <Button color="error" variant="outlined">
                  remove
                </Button>
              </Box>
            </Box>

            <Box
              backgroundColor={colors.primary[400]}
              className="w-full p-4 relative flex flex-col gap-2"
            >
              <Box>
                <img
                  style={{ backgroundColor: colors.primary[400] }}
                  className="h-[200px] w-full pointer rounded-md border-[1px]"
                  src={"https://robohash.org/utetasperiores.png?size=200x200"}
                  alt={`https://robohash.org/utetasperiores.png?size=200x200`}
                />
              </Box>
              <Box className="absolute m-2">
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  className={`uppercase`}
                >
                  DEAL OF THE WEEK
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  Oversized denim jacket
                </Typography>
                <Box className={`flex space-x-2 items-center`}>
                  <Typography
                    variant="h4"
                    color={colors.grey[100]}
                    fontWeight="bold"
                  >
                    $50 off
                  </Typography>
                </Box>
                <Countdown
                  date={Date.now() + 100000000}
                  renderer={({
                    total = 0,
                    days = 0,
                    hours = 0,
                    minutes = 0,
                    seconds = 0,
                    completed = false,
                  }) => (
                    <Box className="p-2 drop-shadow-lg bg-opacity-80 w-full  bg-white/5 item-center">
                      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Box className="text-center mb-sm-0">
                          <Typography
                            color={colors.grey[100]}
                            variant="h4"
                            fontWeight="bold"
                            className="days"
                          >
                            {days}
                          </Typography>
                          <span className="text-muted">days</span>
                        </Box>
                        <Box className="text-center mb-sm-0">
                          <Typography
                            color={colors.grey[100]}
                            variant="h4"
                            fontWeight="bold"
                            className="hours"
                          >
                            {hours}
                          </Typography>
                          <span className="text-muted">hours</span>
                        </Box>
                        <Box className="text-center">
                          <Typography
                            color={colors.grey[100]}
                            variant="h4"
                            fontWeight="bold"
                            className="minutes"
                          >
                            {minutes}
                          </Typography>
                          <span className="text-muted">minutes</span>
                        </Box>
                        <Box className="text-center">
                          <Typography
                            color={colors.grey[100]}
                            variant="h4"
                            fontWeight="bold"
                            className="seconds"
                          >
                            {seconds}
                          </Typography>
                          <span className="text-muted">seconds</span>
                        </Box>
                      </Box>
                    </Box>
                  )}
                />
                <Box className={`my-1`}>
                  <Button
                    onClick={() => navigate(`/shopping`)}
                    variant="outlined"
                    color="secondary"
                    className={``}
                  >
                    Shop now
                  </Button>
                </Box>
              </Box>
              <Divider />
              <Box className="flex gap-2 ">
                <Button color="secondary" variant="outlined">
                  edit
                </Button>
                <Button color="error" variant="outlined">
                  remove
                </Button>
              </Box>
            </Box>

            <Box
              backgroundColor={colors.primary[400]}
              className="w-full p-4 relative flex flex-col gap-2"
            >
              <Box>
                <img
                  style={{ backgroundColor: colors.primary[400] }}
                  className="h-[200px] w-full pointer rounded-md border-[1px]"
                  src={"https://robohash.org/utetasperiores.png?size=200x200"}
                  alt={`https://robohash.org/utetasperiores.png?size=200x200`}
                />
              </Box>
              <Box className="absolute m-2 space-y-2">
                <Typography
                  variant="subtitle2"
                  fontWeight="bold"
                  className={`uppercase`}
                >
                  DEAL OF THE WEEK
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  Oversized denim jacket
                </Typography>
                <Typography variant="subtitle2" color={colors.grey[100]}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
                  voluptas.
                </Typography>
              </Box>
              <Divider />
              <Box className="flex gap-2 ">
                <Button color="secondary" variant="outlined">
                  edit
                </Button>
                <Button color="error" variant="outlined">
                  remove
                </Button>
              </Box>
            </Box>

            <Box
              backgroundColor={colors.primary[400]}
              className="w-full p-4 relative flex flex-col gap-2"
            >
              <Box className="w-full flex justify-between items-center">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    Oversized denim jacket
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Oversized denim jacket
                  </Typography>
                </Box>
                <Box>
                  <Button color="secondary" variant="outlined">
                    more
                  </Button>
                </Box>
              </Box>

              <Box className="grid grid-cols-4 h-fit gap-2">
                <Box className="shadow-sm">
                  <img
                    alt="placeholde"
                    src="https://placehold.co/200x300"
                    className="w-full h-40"
                  />
                </Box>
                <Box className="shadow-sm">
                  <img
                    alt="placeholde"
                    src="https://placehold.co/200x300"
                    className="w-full h-40"
                  />
                </Box>
                <Box className="shadow-sm">
                  <img
                    alt="placeholde"
                    src="https://placehold.co/200x300"
                    className="w-full h-40"
                  />
                </Box>
                <Box className="shadow-sm">
                  <img
                    alt="placeholde"
                    src="https://placehold.co/200x300"
                    className="w-full h-40"
                  />
                </Box>
              </Box>
              <Divider />
              <Box className="flex gap-2 ">
                <Button color="secondary" variant="outlined">
                  edit
                </Button>
                <Button color="error" variant="outlined">
                  remove
                </Button>
              </Box>
            </Box>
            <Box
              backgroundColor={colors.primary[400]}
              className="w-full p-4 relative flex flex-col gap-2"
            >
              <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Box className="flex space-x-4">
                  <LocalShippingIcon fontSize="large" />
                  <Box className="service-text">
                    <Typography
                      color={colors.grey[100]}
                      variant="h4"
                      fontWeight="bold"
                      className="text-sm mb-1"
                    >
                      Free shipping &amp; return
                    </Typography>
                    <Typography
                      variant="subtitle"
                      color={colors.grey[200]}
                      className="text-muted fw-light text-sm mb-0"
                    >
                      Free Shipping over $300
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex space-x-4">
                  <MoneyIcon fontSize="large" />
                  <Box className="service-text">
                    <Typography
                      color={colors.grey[100]}
                      variant="h4"
                      fontWeight="bold"
                      className="text-sm mb-1"
                    >
                      Money back guarantee
                    </Typography>
                    <Typography
                      variant="subtitle"
                      color={colors.grey[200]}
                      className="text-muted fw-light text-sm mb-0"
                    >
                      30 Days Money Back Guarantee
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex space-x-4">
                  <PriceCheckIcon fontSize="large" />
                  <Box className="service-text">
                    <Typography
                      color={colors.grey[100]}
                      variant="h4"
                      fontWeight="bold"
                      className="text-sm mb-1"
                    >
                      Best prices
                    </Typography>
                    <Typography
                      variant="subtitle"
                      color={colors.grey[200]}
                      className="text-muted fw-light text-sm mb-0"
                    >
                      Always the best prices
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex space-x-4">
                  <SupportAgentIcon fontSize="large" />
                  <Box className="service-text">
                    <Typography
                      color={colors.grey[100]}
                      variant="h4"
                      fontWeight="bold"
                      className="text-sm mb-1"
                    >
                      020-800-456-747
                    </Typography>
                    <Typography
                      variant="subtitle"
                      color={colors.grey[200]}
                      className="text-muted fw-light text-sm mb-0"
                    >
                      24/7 Available Support
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box className="flex gap-2 ">
                <Button color="secondary" variant="outlined">
                  edit
                </Button>
                <Button color="error" variant="outlined">
                  remove
                </Button>
              </Box>
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
