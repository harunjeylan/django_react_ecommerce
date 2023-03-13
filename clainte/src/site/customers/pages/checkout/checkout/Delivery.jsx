import { Box, Typography, CardActionArea, useTheme } from "@mui/material";
import { tokens } from "../../../import";

const Delivery = ({ values, setFieldValue }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box className="flex flex-col items-start gap-4">
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Delivery Method
        </Typography>

        <Box className="flex flex-col w-full    bg-slate-400/10 rounded-lg">
          <Box
            className="px-4 py-4 rounded-t-lg"
            backgroundColor={
              values.deliveryMethod === "none"
                ? colors.greenAccent[600]
                : colors.primary[400]
            }
          >
            <Typography variant="h5" fontWeight="bold">
              None
            </Typography>
          </Box>
          <CardActionArea
            onClick={() => setFieldValue("deliveryMethod", "none")}
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
        <Box className="flex flex-col w-full   bg-slate-400/10 rounded-lg">
          <Box
            className="px-4 py-4  rounded-t-lg"
            backgroundColor={
              values.deliveryMethod === "usps"
                ? colors.greenAccent[600]
                : colors.primary[400]
            }
          >
            <Typography variant="h5" fontWeight="bold">
              Usps next day
            </Typography>
          </Box>
          <CardActionArea
            onClick={() => setFieldValue("deliveryMethod", "usps")}
            className="flex flex-col items-start gap-4 px-4 py-2"
          >
            <Typography variant="h5" fontWeight="bold">
              $10.00
            </Typography>
            <Typography variant="p">
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff sections
            </Typography>
          </CardActionArea>
        </Box>
        <Box className="flex flex-col w-full   bg-slate-400/10 rounded-lg">
          <Box
            className="px-4 py-4 rounded-t-lg"
            backgroundColor={
              values.deliveryMethod === "dhl"
                ? colors.greenAccent[600]
                : colors.primary[400]
            }
          >
            <Typography variant="h5" fontWeight="bold">
              DHL
            </Typography>
          </Box>
          <CardActionArea
            onClick={() => setFieldValue("deliveryMethod", "dhl")}
            className="flex flex-col items-start gap-4 px-4 py-2"
          >
            <Typography variant="h5" fontWeight="bold">
              $15.00
            </Typography>
            <Typography variant="p">
              Get it right on next day - fastest option possible.
            </Typography>
          </CardActionArea>
        </Box>
        <Box className="flex flex-col w-full  bg-slate-400/10 rounded-lg">
          <Box
            className="px-4 py-4 rounded-t-lg"
            backgroundColor={
              values.deliveryMethod === "ppl"
                ? colors.greenAccent[600]
                : colors.primary[400]
            }
          >
            <Typography variant="h5" fontWeight="bold">
              PPL
            </Typography>
          </Box>
          <CardActionArea
            onClick={() => setFieldValue("deliveryMethod", "ppl")}
            className="flex flex-col items-start gap-4 px-4 py-2"
          >
            <Typography variant="h5" fontWeight="bold">
              &8.00
            </Typography>
            <Typography variant="p">
              Get it right on next day - fastest option possible.
            </Typography>
          </CardActionArea>
        </Box>
        <Box className="flex flex-col w-full  bg-slate-400/10 rounded-lg">
          <Box
            className="px-4 py-4 rounded-t-lg "
            backgroundColor={
              values.deliveryMethod === "ups"
                ? colors.greenAccent[600]
                : colors.primary[400]
            }
          >
            <Typography variant="h5" fontWeight="bold">
              UPS
            </Typography>
          </Box>
          <CardActionArea
            onClick={() => setFieldValue("deliveryMethod", "ups")}
            className="flex flex-col items-start gap-4 px-4 py-2"
          >
            <Typography variant="h5" fontWeight="bold">
              $20.00
            </Typography>
            <Typography variant="p">
              Get it right on next day - fastest option possible.
            </Typography>
          </CardActionArea>
        </Box>
      </Box>
    </Box>
  );
};

export default Delivery;
