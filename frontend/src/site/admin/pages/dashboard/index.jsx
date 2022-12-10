import { Link } from "react-router-dom";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

import {
  mockDataCustomers,
  mockDataOrders,
  Header,
  tokens,
} from "../../import";

import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";

const MiniBarChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveBar
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
          },
        },
      }}
      keys={["kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.9}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: undefined,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: undefined,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridY={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 136,
          translateY: 1,
          itemsSpacing: 0,
          itemWidth: 101,
          itemHeight: 26,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 14,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
                itemTextColor: colors.greenAccent[400],
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};
const MiniLineChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: undefined,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: undefined,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "category10" }}
      enablePoints={false}
      pointSize={2}
      pointColor="black"
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-24}
      enableArea={true}
      areaOpacity={0.15}
      useMesh={true}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
const CenteredMetric = ({ dataWithArc, centerX, centerY }) => {
  let total = 0;
  dataWithArc.forEach((datum) => {
    total += datum.value;
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "30px",
        fontWeight: 600,
        fill: colors.grey[100],
      }}
    >
      {total}
    </text>
  );
};
const MiniPieChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsivePie
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.85}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "category10" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 50,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 10,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 15,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.greenAccent[400],
              },
            },
          ],
        },
      ]}
      layers={["arcs", "arcLabels", "arcLinkLabels", "legends", CenteredMetric]}
    />
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const miniBarChartData = [
    {
      country: "AD",
      "hot dog": 79,
      "hot dogColor": "hsl(56, 70%, 50%)",
      burger: 129,
      burgerColor: "hsl(327, 70%, 50%)",
      sandwich: 100,
      sandwichColor: "hsl(201, 70%, 50%)",
      kebab: 192,
      kebabColor: "hsl(52, 70%, 50%)",
      fries: 161,
      friesColor: "hsl(87, 70%, 50%)",
      donut: 145,
      donutColor: "hsl(352, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 161,
      "hot dogColor": "hsl(158, 70%, 50%)",
      burger: 192,
      burgerColor: "hsl(358, 70%, 50%)",
      sandwich: 30,
      sandwichColor: "hsl(133, 70%, 50%)",
      kebab: 98,
      kebabColor: "hsl(174, 70%, 50%)",
      fries: 175,
      friesColor: "hsl(282, 70%, 50%)",
      donut: 81,
      donutColor: "hsl(300, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 32,
      "hot dogColor": "hsl(312, 70%, 50%)",
      burger: 194,
      burgerColor: "hsl(336, 70%, 50%)",
      sandwich: 138,
      sandwichColor: "hsl(210, 70%, 50%)",
      kebab: 17,
      kebabColor: "hsl(105, 70%, 50%)",
      fries: 197,
      friesColor: "hsl(188, 70%, 50%)",
      donut: 2,
      donutColor: "hsl(43, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 197,
      "hot dogColor": "hsl(217, 70%, 50%)",
      burger: 176,
      burgerColor: "hsl(70, 70%, 50%)",
      sandwich: 188,
      sandwichColor: "hsl(69, 70%, 50%)",
      kebab: 196,
      kebabColor: "hsl(179, 70%, 50%)",
      fries: 59,
      friesColor: "hsl(283, 70%, 50%)",
      donut: 3,
      donutColor: "hsl(139, 70%, 50%)",
    },
    {
      country: "AI",
      "hot dog": 183,
      "hot dogColor": "hsl(272, 70%, 50%)",
      burger: 31,
      burgerColor: "hsl(144, 70%, 50%)",
      sandwich: 153,
      sandwichColor: "hsl(333, 70%, 50%)",
      kebab: 144,
      kebabColor: "hsl(274, 70%, 50%)",
      fries: 38,
      friesColor: "hsl(349, 70%, 50%)",
      donut: 195,
      donutColor: "hsl(330, 70%, 50%)",
    },
    {
      country: "AL",
      "hot dog": 30,
      "hot dogColor": "hsl(69, 70%, 50%)",
      burger: 179,
      burgerColor: "hsl(31, 70%, 50%)",
      sandwich: 57,
      sandwichColor: "hsl(17, 70%, 50%)",
      kebab: 41,
      kebabColor: "hsl(101, 70%, 50%)",
      fries: 17,
      friesColor: "hsl(235, 70%, 50%)",
      donut: 122,
      donutColor: "hsl(0, 70%, 50%)",
    },
    {
      country: "AM",
      "hot dog": 45,
      "hot dogColor": "hsl(6, 70%, 50%)",
      burger: 107,
      burgerColor: "hsl(184, 70%, 50%)",
      sandwich: 140,
      sandwichColor: "hsl(19, 70%, 50%)",
      kebab: 46,
      kebabColor: "hsl(273, 70%, 50%)",
      fries: 156,
      friesColor: "hsl(319, 70%, 50%)",
      donut: 96,
      donutColor: "hsl(44, 70%, 50%)",
    },
  ];
  const MiniLineChartData = [
    {
      id: "japan",
      color: "hsl(7, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 256,
        },
        {
          x: "helicopter",
          y: 140,
        },
        {
          x: "boat",
          y: 54,
        },
        {
          x: "train",
          y: 261,
        },
        {
          x: "subway",
          y: 0,
        },
        {
          x: "bus",
          y: 18,
        },
        {
          x: "car",
          y: 129,
        },
        {
          x: "moto",
          y: 191,
        },
        {
          x: "bicycle",
          y: 39,
        },
        {
          x: "horse",
          y: 70,
        },
        {
          x: "skateboard",
          y: 153,
        },
        {
          x: "others",
          y: 217,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(52, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 145,
        },
        {
          x: "helicopter",
          y: 189,
        },
        {
          x: "boat",
          y: 219,
        },
        {
          x: "train",
          y: 75,
        },
        {
          x: "subway",
          y: 160,
        },
        {
          x: "bus",
          y: 250,
        },
        {
          x: "car",
          y: 242,
        },
        {
          x: "moto",
          y: 195,
        },
        {
          x: "bicycle",
          y: 25,
        },
        {
          x: "horse",
          y: 13,
        },
        {
          x: "skateboard",
          y: 27,
        },
        {
          x: "others",
          y: 218,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(186, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 226,
        },
        {
          x: "helicopter",
          y: 200,
        },
        {
          x: "boat",
          y: 230,
        },
        {
          x: "train",
          y: 260,
        },
        {
          x: "subway",
          y: 49,
        },
        {
          x: "bus",
          y: 117,
        },
        {
          x: "car",
          y: 98,
        },
        {
          x: "moto",
          y: 297,
        },
        {
          x: "bicycle",
          y: 1,
        },
        {
          x: "horse",
          y: 232,
        },
        {
          x: "skateboard",
          y: 287,
        },
        {
          x: "others",
          y: 280,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(45, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 234,
        },
        {
          x: "helicopter",
          y: 8,
        },
        {
          x: "boat",
          y: 25,
        },
        {
          x: "train",
          y: 277,
        },
        {
          x: "subway",
          y: 162,
        },
        {
          x: "bus",
          y: 295,
        },
        {
          x: "car",
          y: 29,
        },
        {
          x: "moto",
          y: 134,
        },
        {
          x: "bicycle",
          y: 140,
        },
        {
          x: "horse",
          y: 68,
        },
        {
          x: "skateboard",
          y: 66,
        },
        {
          x: "others",
          y: 138,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(82, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 270,
        },
        {
          x: "helicopter",
          y: 121,
        },
        {
          x: "boat",
          y: 28,
        },
        {
          x: "train",
          y: 68,
        },
        {
          x: "subway",
          y: 238,
        },
        {
          x: "bus",
          y: 298,
        },
        {
          x: "car",
          y: 81,
        },
        {
          x: "moto",
          y: 6,
        },
        {
          x: "bicycle",
          y: 242,
        },
        {
          x: "horse",
          y: 15,
        },
        {
          x: "skateboard",
          y: 20,
        },
        {
          x: "others",
          y: 297,
        },
      ],
    },
  ];
  const MiniPieChartData = [
    {
      id: "go",
      label: "go",
      value: 515,
      color: "hsl(249, 70%, 50%)",
    },
    {
      id: "css",
      label: "css",
      value: 485,
      color: "hsl(227, 70%, 50%)",
    },
    {
      id: "sass",
      label: "sass",
      value: 449,
      color: "hsl(32, 70%, 50%)",
    },
    {
      id: "javascript",
      label: "javascript",
      value: 302,
      color: "hsl(77, 70%, 50%)",
    },
    {
      id: "php",
      label: "php",
      value: 478,
      color: "hsl(71, 70%, 50%)",
    },
  ];
  const columns = [
    {
      field: "first_name",
      headerName: "Customer",
      width: 200,
      hieght: 200,
      renderCell: ({ row: { first_name, last_name, avator } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/customers/${1}`}>
              <img
                className="h-[60px] w-[60px] pointer rounded-[50%]"
                src={avator}
                alt={`${first_name}-${last_name}`}
              />
            </Link>
            <Link to={`/admin/customers/${1}`}>
              <Typography color={colors.greenAccent[500]}>
                {first_name} {last_name}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: ({ row: { email } }) => {
        return (
          <Link to={`/admin/customers/${1}`}>
            <Typography color={colors.greenAccent[500]}>{email}</Typography>
          </Link>
        );
      },
    },
    { field: "orders", headerName: "Orders", width: 100 },

    {
      field: "total_spent",
      headerName: "Total spent",
      width: 100,
      renderCell: ({ row: { total_spent } }) => {
        return (
          <Typography color={colors.greenAccent[500]}>
            ${total_spent}
          </Typography>
        );
      },
    },
    { field: "city", headerName: "City", width: 200 },

    { field: "last_seen", headerName: "Last seen", width: 100 },
    { field: "last_order", headerName: "Last order", width: 100 },
  ];
  const orderColumns = [
    {
      field: "id",
      headerName: "ORDER",
      width: 100,
      renderCell: ({ row: { id } }) => {
        return (
          <Link to={`/admin/orders/${id}`}>
            <Typography
              className="cursor-pointer"
              color={colors.greenAccent[500]}
            >
              # {id}
            </Typography>
          </Link>
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      width: 100,
      renderCell: ({ row: { total } }) => {
        return <Typography>${total}</Typography>;
      },
    },
    {
      field: "first_name",
      headerName: "Customer",
      width: 200,
      hieght: 200,
      renderCell: ({ row: { first_name, last_name, avator } }) => {
        return (
          <Box className="flex justify-start gap-4 items-center py-2 w-full h-full">
            <Link to="/">
              <img
                className="h-[60px] w-[60px] cursor-pointer rounded-[50%]"
                src={avator}
                alt={`${first_name}-${last_name}`}
              />{" "}
            </Link>
            <Link to="/">
              <Typography
                className="cursor-pointer"
                color={colors.greenAccent[500]}
              >
                {first_name} {last_name}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    { field: "payment_status", headerName: "Payment status", width: 200 },
    { field: "fulfilment_status", headerName: "Fulfilment status", width: 200 },
    { field: "delivery_type", headerName: "Delivery Type", width: 200 },
    { field: "date", headerName: "Date", width: 100 },
  ];
  return (
    <Box m="20px">
      {/* HEADER */}

      <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            variant="outlined"
            color="secondary"
            className={`bg-opacity-0 hover:bg-opacity-100 px-[40px] py-4`}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box className="grid grid-cols-12 grid-rows-12 gap-4">
        <Box className="col-span-12 row-span-1 lg:col-span-6">
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="431,225"
              subtitle="Sales Obtained"
              progress="0.50"
              increase="+21%"
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
        <Box className="col-span-12 row-span-1 lg:col-span-6">
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="1,325,134"
              subtitle="Traffic Received"
              progress="0.80"
              increase="+43%"
              icon={
                <TrafficIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
        <Box className="col-span-12 row-span-1 lg:col-span-4">
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="12,361"
              subtitle="Emails Sent"
              progress="0.75"
              increase="+14%"
              icon={
                <EmailIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
        <Box className="col-span-12 row-span-1 lg:col-span-4">
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="32,441"
              subtitle="New Clients"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
        <Box className="col-span-12 row-span-1 lg:col-span-4">
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="32,441"
              subtitle="New Clients"
              progress="0.30"
              increase="+5%"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Box>
        <Box className="col-span-12 row-span-3 xl:col-span-8">
          <Box className="grid grid-cols-12 gap-4">
            <Box className="col-span-12 lg:col-span-6">
              <Box
                backgroundColor={colors.primary[400]}
                className="p-4 rounded-md"
              >
                <Box className="flex flex-col gap-2">
                  <Box className="flex justify-between">
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        Total orders{" "}
                        <span className="bg-[#eab308]/20 rounded-r-xl rounded-l-xl py-[1pz] px-2 border-[1px] border-[#eab308] text-[#eab308]">
                          -6.8%
                        </span>
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="subtitle1"
                        className={`my-2 cursor-pointer `}
                      >
                        Last 7 days
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        16,247
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="h-[300px] p-4">
                    <MiniBarChart data={miniBarChartData} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="col-span-12 lg:col-span-6">
              <Box
                backgroundColor={colors.primary[400]}
                className="p-4 rounded-md"
              >
                <Box className="flex flex-col gap-2">
                  <Box className="flex justify-between">
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        New customers {` `}
                        <span className="bg-[#eab308]/20 rounded-r-xl rounded-l-xl py-[1pz] px-2 border-[1px] border-[#eab308] text-[#eab308]">
                          +26.5%
                        </span>
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="subtitle1"
                        className={`my-2 cursor-pointer `}
                      >
                        Last 7 days
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        356
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="h-[300px] p-4">
                    <MiniLineChart data={MiniLineChartData} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="col-span-12 lg:col-span-6">
              <Box
                backgroundColor={colors.primary[400]}
                className="p-4 rounded-md"
              >
                <Box className="flex flex-col gap-2">
                  <Box className="flex justify-between">
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        Top coupons
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="subtitle1"
                        className={`my-2 cursor-pointer `}
                      >
                        Last 7 days
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        16,247
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="h-[300px] p-4">
                    <MiniPieChart data={MiniPieChartData} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="col-span-12 lg:col-span-6">
              <Box
                backgroundColor={colors.primary[400]}
                className="p-4 rounded-md"
              >
                <Box className="flex flex-col gap-2">
                  <Box className="flex justify-between">
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        Paying vs non paying{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="subtitle1"
                        className={`my-2 cursor-pointer `}
                      >
                        Last 7 days
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        16,247
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="h-[300px] p-4">
                    <MiniPieChart data={MiniPieChartData} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="col-span-12 row-span-3 xl:col-span-4">
          <Box
            backgroundColor={colors.primary[400]}
            className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
          >
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-xl md:text-2xl  text-left my-4`}
            >
              New Customers (43)
            </Typography>
            <Box
              className="h-[400px] xl:h-[720px]"
              height="400px"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiChackbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
                "& .MuiDataGrid-cell": {
                  width: "100%",
                },
              }}
            >
              <DataGrid
                density="comfortable"
                rows={mockDataCustomers}
                columns={columns}
                autoPageSize
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </Box>
        <Box className="col-span-12 row-span-6 xl:col-span-5">
          <Box
            backgroundColor={colors.primary[400]}
            className="w-full flex flex-col gap-4 drop-shadow-lg  rounded-lg p-4"
          >
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-xl md:text-2xl  text-left my-4`}
            >
              New Orders (100)
            </Typography>
            <Box
              className="h-[400px] xl:h-[1020px]"
              height="400px"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiChackbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
                "& .MuiDataGrid-cell": {
                  width: "100%",
                },
              }}
            >
              <DataGrid
                density="comfortable"
                rows={mockDataOrders.slice(0, 10)}
                columns={orderColumns}
                autoPageSize
                checkboxSelection
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </Box>
        <Box className="col-span-12 row-span-6 xl:col-span-7">
          <Box className="flex flex-col gap-4">
            <Box className="w-full">
              <Box
                backgroundColor={colors.primary[400]}
                className="p-4 rounded-md"
              >
                <Box className="flex flex-col gap-2">
                  <Box className="flex justify-between">
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        Total orders{" "}
                        <span className="bg-[#eab308]/20 rounded-r-xl rounded-l-xl py-[1pz] px-2 border-[1px] border-[#eab308] text-[#eab308]">
                          -6.8%
                        </span>
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="subtitle1"
                        className={`my-2 cursor-pointer `}
                      >
                        Last 7 days
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        16,247
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="h-[400px] xl:h-[450px] p-4">
                    <LineChart isDashboard={true} />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="w-full">
              <Box
                backgroundColor={colors.primary[400]}
                className="p-4 rounded-md"
              >
                <Box className="flex flex-col gap-2">
                  <Box className="flex justify-between">
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        New customers {` `}
                        <span className="bg-[#eab308]/20 rounded-r-xl rounded-l-xl py-[1pz] px-2 border-[1px] border-[#eab308] text-[#eab308]">
                          +26.5%
                        </span>
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight="subtitle1"
                        className={`my-2 cursor-pointer `}
                      >
                        Last 7 days
                      </Typography>
                    </Box>
                    <Box className="">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        356
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="h-[400px] xl:h-[450px] p-4">
                    <BarChart isDashboard={true} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
