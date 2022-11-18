import React from 'react'
import PieChart from '../../components/PieChart'
import { Box } from '@mui/material';
import Header from '../../components/Header';
// import { useTheme } from '@mui/material';
// import { tokens } from '../../theme';
const Pie = () => {
    // const theme = useTheme()
    // const colors = tokens(theme.palette.mode)
    return (
        <Box m="20px" height="75vh" p="2px">
            <Header title="Pie CHART" subtitle="simple Pie chart" />
            <PieChart />
        </Box>
    )
}

export default Pie