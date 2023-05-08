import React, { useState } from 'react'
import { useTheme } from '@emotion/react'
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import { tokens } from '../../../../../theme'
import { useGetAllOrganizeQuery } from '../../../../../features/services/organizeApiSlice'
import { useGetAllVariantsQuery } from '../../../../../features/services/variantApiSlice'
import CreateEditVariant from './components/CreateEditVariant'
import PhoneMissedIcon from '@mui/icons-material/PhoneMissed'
import useAlert from '../../../../../components/ui/useAlert'
import Variant from './components/Variant'
import CreateEditDiscount from './components/CreateEditDiscount'
import { useGetAllDiscountsQuery } from '../../../../../features/services/discountApiSlice'
import { useGetAllDeliveryQuery } from '../../../../../features/services/deliveryApiSlice'
import Delivery from './components/Delivery'
import Discount from './components/Discount'
import CreateEditDelivery from './components/CreateEditDelivery'
import CreateEditOrganize from './components/CreateEditOrganize'
import OrganizeItems from './components/OrganizeItems'

const Specification = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [CustomAlert, setMessages] = useAlert()

  const [active, setActive] = useState('organize')

  const [editingOrganize, setEditingOrganize] = useState(undefined)

  const [editingVariant, setEditingVariant] = useState(undefined)
  const [creatingVariant, setCreatingVariant] = useState(undefined)

  const [editingDelivery, setEditingDelivery] = useState(undefined)
  const [creatingDelivery, setCreatingDelivery] = useState(undefined)

  const [editingDiscount, setEditingDiscount] = useState(undefined)
  const [creatingDiscount, setCreatingDiscount] = useState(undefined)

  const { data: organize = {}, isFetching: isFetchingOrganize } =
    useGetAllOrganizeQuery()

  const { data: variants = [], isFetching: isFetchingVariants } =
    useGetAllVariantsQuery()

  const { data: discounts = [], isFetching: isFetchingDiscount } =
    useGetAllDiscountsQuery({ limit: null })

  const { data: deliveries = [], isFetching: isFetchingDelivery } =
    useGetAllDeliveryQuery()

  const handleAddVariant = () => {
    setCreatingVariant({
      label: '',
      options: [],
    })
    setEditingVariant(undefined)
  }

  const handleAddDiscount = () => {
    setCreatingDiscount({
      name: '',
      amount: 0,
      start_date: null,
      end_date: null,
    })
    setEditingDiscount(undefined)
  }

  const handleAddDelivery = () => {
    setCreatingDelivery({
      name: '',
      amount: 0,
      start_date: null,
      end_date: null,
    })
    setEditingDelivery(undefined)
  }

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">Specification</Typography>
        </Breadcrumbs>
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex flex-col-reverse  lg:flex-row  gap-4`}
      >
        <Box
          className={`w-full flex flex-col gap-8 rounder-md p-2`}
          backgroundColor={colors.primary[400]}
        >
          <Box
            backgroundColor={colors.primary[400]}
            className={`w-full h-fit rounded-md`}
          >
            <Tabs
              textColor="secondary"
              indicatorColor="secondary"
              value={active}
              onChange={(event, newValue) => setActive(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="scrollable auto tabs example"
            >
              <Tab
                className=""
                icon={<PhoneMissedIcon size="small" />}
                iconPosition="start"
                value="organize"
                label="Organize"
              />
              <Tab
                className=""
                icon={<PhoneMissedIcon size="small" />}
                iconPosition="start"
                value="variant"
                label="Variant"
              />
              <Tab
                className=""
                icon={<PhoneMissedIcon size="small" />}
                iconPosition="start"
                value="discount"
                label="Discount"
              />
              <Tab
                className=""
                icon={<PhoneMissedIcon size="small" />}
                iconPosition="start"
                value="delivery"
                label="Delivery"
              />
            </Tabs>
          </Box>
          {active === 'organize' &&
            (!isFetchingOrganize ? (
              <OrganizeItems
                organize={organize}
                setEditingOrganize={setEditingOrganize}
              />
            ) : (
              <Box className="h-full w-full flex justify-center items-center">
                <CircularProgress />
              </Box>
            ))}
          {active === 'variant' && (
            <Box className="flex flex-col gap-8">
              <Box
                className="flex justify-between items-center h-fit p-2 "
                backgroundColor={colors.primary[600]}
              >
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-lg md:text-xl text-left`}
                >
                  Variants
                </Typography>
                <Button
                  onClick={handleAddVariant}
                  type="button"
                  color="secondary"
                  variant="outlined"
                  className=""
                >
                  Add New
                </Button>
              </Box>

              <Box className="w-full">
                <Box className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {!isFetchingVariants ? (
                    variants?.map((variant, index) => (
                      <Variant
                        key={`variant-${variant.name}-variants-${variant.id}-${index}`}
                        variant={variant}
                        setEditingVariant={setEditingVariant}
                        highlightVariantId={1}
                        setMessages={setMessages}
                      />
                    ))
                  ) : (
                    <Box className="h-full w-full flex justify-center items-center">
                      <CircularProgress />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
          {active === 'discount' && (
            <Box className="flex flex-col gap-8">
              <Box
                className="flex justify-between items-center h-fit p-2 "
                backgroundColor={colors.primary[600]}
              >
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-lg md:text-xl text-left`}
                >
                  Discount
                </Typography>
                <Button
                  onClick={handleAddDiscount}
                  type="button"
                  color="secondary"
                  variant="outlined"
                  className=""
                >
                  Add New
                </Button>
              </Box>

              <Box className="w-full">
                <Box className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {!isFetchingDiscount ? (
                    discounts?.map((discount, index) => (
                      <Discount
                        key={`discount-${discount.name}-discounts-${discount.id}-${index}`}
                        discount={discount}
                        setEditingDiscount={setEditingDiscount}
                        setMessages={setMessages}
                      />
                    ))
                  ) : (
                    <Box className="h-full w-full flex justify-center items-center">
                      <CircularProgress />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
          {active === 'delivery' && (
            <Box className="flex flex-col gap-8">
              <Box
                className="flex justify-between items-center h-fit p-2 "
                backgroundColor={colors.primary[600]}
              >
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-lg md:text-xl text-left`}
                >
                  Delivery
                </Typography>
                <Button
                  onClick={handleAddDelivery}
                  type="button"
                  color="secondary"
                  variant="outlined"
                  className=""
                >
                  Add New
                </Button>
              </Box>

              <Box className="w-full">
                <Box className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {!isFetchingDelivery ? (
                    deliveries?.map((delivery, index) => (
                      <Delivery
                        key={`delivery-${delivery.name}-delivery-${delivery.id}-${index}`}
                        delivery={delivery}
                        setEditingDelivery={setEditingDelivery}
                        setMessages={setMessages}
                      />
                    ))
                  ) : (
                    <Box className="h-full w-full flex justify-center items-center">
                      <CircularProgress />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Box
          className={`h-fit ease-in-out duration-500  ${
            (active === 'organize' && editingOrganize) ||
            (active === 'variant' && (creatingVariant || editingVariant)) ||
            (active === 'discount' && (creatingDiscount || editingDiscount)) ||
            (active === 'delivery' && (creatingDelivery || editingDelivery))
              ? 'h-full lg:w-[40%]'
              : 'lg:w-0'
          }`}
        >
          <Box
            backgroundColor={colors.primary[400]}
            className={`w-full h-full flex flex-col gap-4  rounded-md  ease-in-out duration-500`}
          >
            <CustomAlert />
            {active === 'organize' &&
              editingOrganize &&
              (!isFetchingOrganize ? (
                <CreateEditOrganize
                  editingOrganize={editingOrganize}
                  setEditingOrganize={setEditingOrganize}
                  organize={organize}
                  setMessages={setMessages}
                />
              ) : (
                <Box className="h-full w-full flex justify-center items-center">
                  <CircularProgress />
                </Box>
              ))}
            {active === 'variant' &&
              (creatingVariant || editingVariant) &&
              (!isFetchingVariants ? (
                <CreateEditVariant
                  creatingVariant={creatingVariant}
                  setCreatingVariant={setCreatingVariant}
                  editingVariant={editingVariant}
                  setEditingVariant={setEditingVariant}
                  handleAddVariant={handleAddVariant}
                  setMessages={setMessages}
                />
              ) : (
                <Box className="h-full w-full flex justify-center items-center">
                  <CircularProgress />
                </Box>
              ))}

            {active === 'discount' &&
              (creatingDiscount || editingDiscount) &&
              (!isFetchingDiscount ? (
                <CreateEditDiscount
                  creatingDiscount={creatingDiscount}
                  setCreatingDiscount={setCreatingDiscount}
                  editingDiscount={editingDiscount}
                  setEditingDiscount={setEditingDiscount}
                  setMessages={setMessages}
                />
              ) : (
                <Box className="h-full w-full flex justify-center items-center">
                  <CircularProgress />
                </Box>
              ))}
            {active === 'delivery' &&
              (creatingDelivery || editingDelivery) &&
              (!isFetchingDelivery ? (
                <CreateEditDelivery
                  creatingDelivery={creatingDelivery}
                  setCreatingDelivery={setCreatingDelivery}
                  editingDelivery={editingDelivery}
                  setEditingDelivery={setEditingDelivery}
                  setMessages={setMessages}
                />
              ) : (
                <Box className="h-full w-full flex justify-center items-center">
                  <CircularProgress />
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Specification
