import React from "react";
import PieChart from "../../../components/PieChart";
import { Box } from "@mui/material";
import {Header} from "../../../import";
const Pie = () => {
  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="Pie CHART" subtitle="simple Pie chart" />
      <PieChart />
    </Box>
  );
};

export default Pie;
