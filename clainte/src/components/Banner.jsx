import React from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../theme";
import { getDate } from "../helpers/getDate";

const Banner = ({ discount }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <Box
      className={`relative flex items-center `} //h-[400px] md:h-[500px] lg:h-[600px]
    >
      <Box
        className={`my-[100px] w-[400px] md:w-[500px] lg:w-[600px] flex flex-col mx-auto md:mx-[200px] z-20 space-y-4`}
      >
        <Typography
          variant="subtitle"
          fontWeight="bold"
          className={`uppercase`}
        >
          {discount?.name}
        </Typography>
        {/* <Typography variant="h1" fontWeight="bold">
          Oversized denim jacket
        </Typography> */}
        {/* <Box className={`flex space-x-2`}>
          <Typography variant="p" color={colors.grey[200]} fontWeight="bold">
            $129.00
          </Typography>
          <Typography variant="p" color={colors.grey[200]} fontWeight="bold">
            $79.00
          </Typography>
        </Box> */}
        <Box>
          <Button
            variant="contained"
            sx={{
              color: colors.grey[200],
              backgroundColor: colors.greenAccent[400],
            }}
            className={`w-auto px-[20px] py-2`}
          >
            ${discount?.amount} off
          </Button>
        </Box>

        <Countdown
          date={getDate(discount?.end_date)}
          renderer={({
            total = 0,
            days = 0,
            hours = 0,
            minutes = 0,
            seconds = 0,
            completed = false,
          }) => (
            <Box className=" px-5 py-4 drop-shadow-lg mb-4 bg-opacity-80 w-[100%]  bg-white/5 item-center">
              <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Box className="text-center mb-4 mb-sm-0">
                  <Typography
                    color={colors.grey[100]}
                    variant="h1"
                    fontWeight="bold"
                    className="my-1 days"
                  >
                    {days}
                  </Typography>
                  <span className="text-muted">days</span>
                </Box>
                <Box className="text-center mb-4 mb-sm-0">
                  <Typography
                    color={colors.grey[100]}
                    variant="h1"
                    fontWeight="bold"
                    className="my-1 hours"
                  >
                    {hours}
                  </Typography>
                  <span className="text-muted">hours</span>
                </Box>
                <Box className="text-center">
                  <Typography
                    color={colors.grey[100]}
                    variant="h1"
                    fontWeight="bold"
                    className="my-1 minutes"
                  >
                    {minutes}
                  </Typography>
                  <span className="text-muted">minutes</span>
                </Box>
                <Box className="text-center">
                  <Typography
                    color={colors.grey[100]}
                    variant="h1"
                    fontWeight="bold"
                    className="my-1 seconds"
                  >
                    {seconds}
                  </Typography>
                  <span className="text-muted">seconds</span>
                </Box>
              </Box>
            </Box>
          )}
        />
        <Box>
          <Button
            onClick={() => navigate(`/shopping`)}
            variant="outlined"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-[40px] py-4`}
          >
            Shop now
          </Button>
        </Box>
      </Box>
      <Box className={`absolute h-[100%] bottom-0 right-0`}>
        {/* <img src={shopaholic} className="h-[100%]" /> */}
      </Box>
    </Box>
  );
};

export default Banner;
