import { Box, Typography, CardActionArea, useTheme } from '@mui/material'
import { tokens } from '../../../../../theme'

const Delivery = ({
  deliveries,
  isFetchingDelivery,
  values,
  setFieldValue,
}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box className="flex flex-col items-start gap-4">
        <Typography sx={{ mb: '15px' }} fontSize="18px">
          Delivery Method
        </Typography>

        <Box className="flex flex-col w-full    bg-slate-400/10 rounded-lg">
          <Box
            className="px-4 py-4 rounded-t-lg"
            backgroundColor={
              values.deliveryMethod === null
                ? colors.greenAccent[600]
                : colors.primary[400]
            }
          >
            <Typography variant="h5" fontWeight="bold">
              None
            </Typography>
          </Box>
          <CardActionArea
            onClick={() => setFieldValue('deliveryMethod', null)}
            className="flex flex-col items-start gap-4 px-4 py-2"
          >
            <Typography variant="h5" fontWeight="bold">
              $0.00
            </Typography>
            <Typography variant="p">
              you have to come and take the product in 3 day
            </Typography>
          </CardActionArea>
        </Box>
        {!isFetchingDelivery &&
          deliveries.map((delivery, index) => (
            <Box
              key={`${delivery.id}-${index}`}
              className="flex flex-col w-full   bg-slate-400/10 rounded-lg"
            >
              <Box
                className="px-4 py-4  rounded-t-lg"
                backgroundColor={
                  values.deliveryMethod === delivery.id
                    ? colors.greenAccent[600]
                    : colors.primary[400]
                }
              >
                <Typography variant="h5" fontWeight="bold">
                  {delivery.name}
                </Typography>
              </Box>
              <CardActionArea
                onClick={() => setFieldValue('deliveryMethod', delivery.id)}
                className="flex flex-col items-start gap-4 px-4 py-2"
              >
                <Typography variant="h5" fontWeight="bold">
                  ${delivery.pricing}
                </Typography>
                <Typography variant="p">{delivery.description}</Typography>
              </CardActionArea>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default Delivery
