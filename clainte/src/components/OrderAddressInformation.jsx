import { useTheme } from '@emotion/react'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'
import { tokens } from '../theme'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined'
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined'
import { Link } from 'react-router-dom'
const OrderAddressInformation = ({ orderData }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box className="grid  lg:grid-cols-3 gap-4">
      <Box
        backgroundColor={colors.primary[400]}
        className="drop-shadow-lg  rounded-lg p-4 flex flex-col gap-4"
      >
        <Typography
          variant="h1"
          color={colors.grey[100]}
          fontWeight="bold"
          className={`text-xl md:text-2xl  text-left my-4`}
        >
          Billing details
        </Typography>
        <List className="w-full">
          <ListItem>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Customer"
              secondary={
                <Typography sx={{ color: colors.greenAccent[500] }}>
                  <Link to={`/admin/customers/${orderData?.customer}`}>
                    {orderData?.billing_address?.first_name}{' '}
                    {orderData?.billing_address?.last_name}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={
                <Typography sx={{ color: colors.greenAccent[500] }}>
                  <Link to={`/admin/customers/${orderData?.customer}`}>
                    {orderData?.billing_address?.email}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalPhoneOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Phone"
              secondary={
                <Typography sx={{ color: colors.greenAccent[500] }}>
                  <Link to={`/admin/customers/${orderData?.customer}`}>
                    {orderData?.billing_address?.phone_number}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Address"
              secondary={
                <Typography>
                  {orderData?.billing_address?.street1}
                  {', '}
                  {orderData?.billing_address?.country}
                  {', '}
                  {orderData?.billing_address?.city}
                  {', '}
                  {orderData?.billing_address?.state}
                  {', '}
                  {orderData?.billing_address?.zipcode}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
      <Box
        backgroundColor={colors.primary[400]}
        className="drop-shadow-lg  rounded-lg p-4 flex flex-col gap-4"
      >
        <Typography
          variant="h1"
          color={colors.grey[100]}
          fontWeight="bold"
          className={`text-xl md:text-2xl  text-left my-4`}
        >
          Shipping details
        </Typography>
        <List className="w-full">
          <ListItem>
            <ListItemIcon>
              <PersonOutlineOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Customer"
              secondary={
                <Typography sx={{ color: colors.greenAccent[500] }}>
                  <Link to={`/admin/customers/${orderData?.customer}`}>
                    {orderData?.shipping_address?.first_name}{' '}
                    {orderData?.shipping_address?.last_name}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={
                <Typography sx={{ color: colors.greenAccent[500] }}>
                  <Link to={`/admin/customers/${orderData?.customer}`}>
                    {orderData?.shipping_address?.email}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalPhoneOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Phone"
              secondary={
                <Typography sx={{ color: colors.greenAccent[500] }}>
                  <Link to={`/admin/customers/${orderData?.customer}`}>
                    {orderData?.shipping_address?.phone_number}
                  </Link>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HomeOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Address"
              secondary={
                <Typography>
                  {orderData?.shipping_address?.street1}
                  {', '}
                  {orderData?.shipping_address?.country}
                  {', '}
                  {orderData?.shipping_address?.city}
                  {', '}
                  {orderData?.shipping_address?.state}
                  {', '}
                  {orderData?.shipping_address?.zipcode}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
      <Box
        backgroundColor={colors.primary[400]}
        className="drop-shadow-lg  rounded-lg p-4 flex flex-col gap-4"
      >
        <Typography
          variant="h1"
          color={colors.grey[100]}
          fontWeight="bold"
          className={`text-xl md:text-2xl  text-left my-4`}
        >
          Other details
        </Typography>
        <List className="w-full">
          <ListItem>
            <ListItemIcon>
              <CardGiftcardOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Gift order"
              secondary={<Typography>Yes</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ReceiptLongOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Recipient"
              secondary={<Typography>Monjito Shiniga</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailOutlinedIcon size="large" />
            </ListItemIcon>
            <ListItemText
              primary="Gift Meaasge"
              secondary={
                <Typography>
                  Happy Birthday Shiniga Lots of Love Buga Buga!! Yours, Mekalan
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default OrderAddressInformation
