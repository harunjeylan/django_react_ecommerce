import React from "react";
import { Box } from "@mui/material";
import LineChart from "../../../components/LineChart";
import {Header} from "../../../import";
const Line = () => {
  return (
    <Box m="20px" height="75vh" p="2px">
      <Header title="Line CHART" subtitle="simple line chart" />
      <LineChart />
    </Box>
  );
};

export default Line;
