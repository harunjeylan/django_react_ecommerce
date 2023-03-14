import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
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
  Breadcrumbs,
  CircularProgress,
} from "@mui/material";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import InventoryIcon from "@mui/icons-material/Inventory";
import {
  mockDataCustomers,
  mockDataOrders,
  Header,
  tokens,
} from "../../import";

import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import { useGetDashboardDataQuery } from "../../../../features/main/dashboardApiSlice";

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
      keys={["failed", "complete", "pending", "cancelled"]}
      indexBy="date"
      margin={{ top: 20, right: 20, bottom: 60, left: 30 }}
      padding={0.8}
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
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 25,
          translateY: 50,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 0,
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
      enableLabel={false}
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
      margin={{ top: 20, right: 25, bottom: 60, left: 25 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
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
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 25,
          translateY: 50,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 0,
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
      margin={{ top: 20, right: 20, bottom: 60, left: 30 }}
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
          translateX: 25,
          translateY: 50,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 0,
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
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const { data: dashboardData, isFetching: isFetchingDashboardData } =
    useGetDashboardDataQuery();

  const MiniPieChartData = [
    {
      id: "payed",
      label: "Payed",
      value: 449,
    },
    {
      id: "none payed",
      label: "None Payed",
      value: 302,
    },
  ];
  const customerColumns = [
    {
      field: "first_name",
      headerName: "Customer",
      width: 200,
      hieght: 200,
      renderCell: ({ row: { full_name, avator } }) => {
        return (
          <Box className="flex gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/customers/${1}`}>
              <img
                className="h-[60px] w-[60px] pointer rounded-[50%]"
                src={avator}
                alt={`${full_name}`}
              />
            </Link>
            <Link to={`/admin/customers/${1}`}>
              <Typography color={colors.greenAccent[500]}>
                {full_name}
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
    { field: "last_order", headerName: "Last order", width: 200 },
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
      renderCell: ({ row: { full_name, avator, user_id } }) => {
        return (
          <Box className="flex justify-start gap-4 items-center py-2 w-full h-full">
            <Link to={`/admin/customers/${user_id}`}>
              <img
                className="h-[60px] w-[60px] cursor-pointer rounded-[50%]"
                src={avator}
                alt={`${full_name}`}
              />{" "}
            </Link>
            <Link to={`/admin/customers/${user_id}`}>
              <Typography
                className="cursor-pointer"
                color={colors.greenAccent[500]}
              >
                {full_name}
              </Typography>
            </Link>
          </Box>
        );
      },
    },
    {
      field: "fulfillment_status",
      headerName: "Fulfilment status",
      width: 150,
    },
    { field: "delivery_method", headerName: "Delivery Method", width: 150 },
    { field: "date", headerName: "Date", width: 200 },
  ];
  return (
    <Box className="flex flex-col gap-4 md:gap-8 md:mt-20 ">
      {/* HEADER */}
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
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
                subtitle="New Orders"
                progress="0.30"
                increase="+5%"
                icon={
                  <InventoryIcon
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
                subtitle="New Custemers"
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
                            {dashboardData?.last_week_orders?.increasing}%
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
                          {dashboardData?.last_week_orders?.total_orders}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="h-[300px] p-4">
                      {!isFetchingDashboardData ? (
                        dashboardData?.last_week_orders ? (
                          <MiniBarChart
                            data={dashboardData?.last_week_orders?.data}
                          />
                        ) : (
                          <Box className="w-full flex items-center justify-center h-full min-h-40">
                            <Typography>No data</Typography>
                          </Box>
                        )
                      ) : (
                        <Box className="w-full flex items-center justify-center h-full min-h-40">
                          <CircularProgress color="secondary" />
                        </Box>
                      )}
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
                          Top Sales Product {` `}
                          <span className="bg-[#eab308]/20 rounded-r-xl rounded-l-xl py-[1pz] px-2 border-[1px] border-[#eab308] text-[#eab308]">
                            {dashboardData?.last_week_products?.increasing}%
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
                          {dashboardData?.last_week_products?.total_products}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="h-[300px] p-4">
                      {!isFetchingDashboardData ? (
                        dashboardData?.last_week_products ? (
                          <MiniLineChart
                            data={dashboardData?.last_week_products?.data}
                          />
                        ) : (
                          <Box className="w-full flex items-center justify-center h-full min-h-40">
                            <Typography>No data</Typography>
                          </Box>
                        )
                      ) : (
                        <Box className="w-full flex items-center justify-center h-full min-h-40">
                          <CircularProgress color="secondary" />
                        </Box>
                      )}
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
                New Customers (
                {!isFetchingDashboardData && dashboardData?.new_customers
                  ? dashboardData?.new_customers?.length
                  : 0}
                )
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
                {!isFetchingDashboardData ? (
                  dashboardData?.new_customers ? (
                    <DataGrid
                      density="comfortable"
                      rows={dashboardData?.new_customers}
                      columns={customerColumns}
                      autoPageSize
                      checkboxSelection
                      components={{ Toolbar: GridToolbar }}
                    />
                  ) : (
                    <Box className="w-full flex items-center justify-center h-full min-h-40">
                      <Typography>No data</Typography>
                    </Box>
                  )
                ) : (
                  <Box className="w-full flex items-center justify-center h-full min-h-40">
                    <CircularProgress color="secondary" />
                  </Box>
                )}
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
                New Orders (
                {!isFetchingDashboardData && dashboardData?.new_orders
                  ? dashboardData?.new_orders?.length
                  : 0}
                )
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
                {!isFetchingDashboardData ? (
                  dashboardData?.new_orders ? (
                    <DataGrid
                      density="comfortable"
                      rows={dashboardData.new_orders}
                      columns={orderColumns}
                      autoPageSize
                      checkboxSelection
                      components={{ Toolbar: GridToolbar }}
                    />
                  ) : (
                    <Box className="w-full flex items-center justify-center h-full min-h-40">
                      <Typography>No data</Typography>
                    </Box>
                  )
                ) : (
                  <Box className="w-full flex items-center justify-center h-full min-h-40">
                    <CircularProgress color="secondary" />
                  </Box>
                )}
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
    </Box>
  );
};

export default Dashboard;
