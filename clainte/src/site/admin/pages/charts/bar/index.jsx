import React from "react";
import { Box } from "@mui/material";
import BarChart from "../../../components/BarChart";
import {Header} from "../../../import";

const Bar = () => {
  return (
    <Box m="20px" height="75vh">
      <Header title="BAR CHART" subtitle="simple bar chart" />
      <BarChart />
    </Box>
  );
};

export default Bar;
