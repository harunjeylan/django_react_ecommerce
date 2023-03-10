import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Radio,
  CircularProgress,
  Breadcrumbs,
  FormControl,
  FormLabel,
  RadioGroup,
  Collapse,
  Slider,
  useMediaQuery,
  Divider,
  ListItem,
  List,
  ListItemButton,
  TextField,
  ButtonGroup,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PaletteIcon from "@mui/icons-material/Palette";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";

import Service from "../../components/Service";
import Banner from "../../components/Banner";
import ProductCarouse from "../../components/ProductCarouse";
import ProductsList from "../../components/ProductsList";

import { tokens, Header } from "../../import";
import { useGetAllOrganizeQuery } from "../../../../features/services/organizeApiSlice";
import { useSearchAndFilterProductsQuery } from "../../import";
import { useGetAllBrandsQuery } from "../../../../features/services/brandApiSlice";
import { useGetAllVariantsQuery } from "../../../../features/services/variantApiSlice";

const Shopping = () => {
  const isNoneMobile = useMediaQuery("(min-width:1024px)");
  const [openCategory, setOpenCategory] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [searchAndFilter, setSearchAndFilter] = useState("");

  const [priceValue, setPriceValue] = useState([20, 37]);
  const [brandValue, setBradValue] = useState("");
  const [organizeValue, setOrganizeValue] = useState("");
  const [variantsValue, setValriantsValue] = useState("");

  const {
    data: searchAndFilterProducts,
    isFetching: isFetchingSearchAndFilterProducts,
  } = useSearchAndFilterProductsQuery({
    searchAndFilter,
  });

  const { data: brands, isFetching: isFetchingBrands } = useGetAllBrandsQuery();
  const { data: organize, isFetching: isFetchingOrganize } =
    useGetAllOrganizeQuery();
  const { data: variants, isFetching: isFetchingVariants } =
    useGetAllVariantsQuery();

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Home
          </Button>
          <Typography color="text.primary">Shoping</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <ButtonGroup className="w-full">
          <TextField
            variant="outlined"
            color="secondary"
            fullWidth
            placeholder="search.."
          />
          <Button variant="outlined" color="secondary">
            search
          </Button>
        </ButtonGroup>
      </Box>

      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className={`flex flex-col lg:flex-row space-4 h-full w-full`}>
          <Box
            className={`w-full bg-transparent lg:w-[25%] lg:rounded-lg mx-2 h-full `}
          >
            <Collapse
              in={isNoneMobile || openCategory}
              timeout="auto"
              unmountOnExit
              className={``}
            >
              <Box
                backgroundColor={colors.primary[400]}
                className={` w-full rounded-md lg:mb-4`}
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl p-4 text-left`}
                >
                  Organizes
                </Typography>
                <Divider />
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-lg md:text-xl px-4 mt-4 text-left mb-2`}
                >
                  Category
                </Typography>
                <List className={``}>
                  {!isFetchingOrganize &&
                    organize.categories.map((categorie) => (
                      <ListItem key={categorie.id}>
                        <ListItemButton>{categorie.name}</ListItemButton>
                      </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-lg md:text-xl px-4 mt-4 text-left mb-2`}
                >
                  Collection
                </Typography>
                <List className={``}>
                  {!isFetchingOrganize &&
                    organize.collections.map((collection) => (
                      <ListItem key={collection.id}>
                        <ListItemButton>{collection.name}</ListItemButton>
                      </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-lg md:text-xl px-4 mt-4 text-left mb-2`}
                >
                  Vendor
                </Typography>
                <List className={``}>
                  {!isFetchingOrganize &&
                    organize.vendors.map((vendor) => (
                      <ListItem key={vendor.id}>
                        <ListItemButton>{vendor.name}</ListItemButton>
                      </ListItem>
                    ))}
                </List>
                <Divider />
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-lg md:text-xl px-4 mt-4 text-left mb-2`}
                >
                  Tag
                </Typography>
                <List className={``}>
                  <Typography className="mx-4">
                    {!isFetchingOrganize &&
                      organize.tags.map((tag) => (
                        <span key={tag.id}>{tag.name}, </span>
                      ))}
                  </Typography>
                </List>
              </Box>
            </Collapse>
            <Collapse
              in={isNoneMobile || openFilter}
              timeout="auto"
              unmountOnExit
              className={``}
            >
              <Box
                backgroundColor={colors.primary[400]}
                className=" w-full  p-4 rounded-md"
              >
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl  text-left my-4`}
                >
                  Filter
                </Typography>
                <Divider />
                <Box className={`my-4 w-full`}>
                  <FormControl className={`w-[100%]`}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <Typography
                        variant="h1"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        className={`text-xl md:text-2xl text-left mb-2`}
                      >
                        Price
                      </Typography>
                    </FormLabel>
                    <Box className={`w-[100%]`}>
                      <Slider
                        mark={[
                          {
                            value: priceValue[0],
                            label: priceValue[0],
                          },
                          {
                            value: `From $${priceValue[1]}`,
                            label: `To $${priceValue[1]}`,
                          },
                        ]}
                        color="secondary"
                        getAriaLabel={() => "Temperature range"}
                        value={priceValue}
                        onChange={(event, newValue) => setPriceValue(newValue)}
                        getAriaValueText={(value) => `$${value}`}
                      />
                    </Box>
                  </FormControl>
                </Box>
                <Divider />
                <Box className={`my-4 w-full`}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <Typography
                        variant="h1"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        className={`text-xl md:text-2xl  text-left mb-2`}
                      >
                        Brands
                      </Typography>
                    </FormLabel>
                    <Box className={`flex flex-col`}>
                      {!isFetchingBrands &&
                        brands.map((brand) => (
                          <FormControlLabel
                            key={brand.id}
                            value={brand.name}
                            control={<Checkbox color="secondary" />}
                            label={brand.name}
                            labelPlacement="end"
                            className="block ml-4"
                          />
                        ))}
                    </Box>
                  </FormControl>
                </Box>
                <Divider />
                <Box className={`my-4 w-full`}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      <Typography
                        variant="h1"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        className={`text-xl md:text-2xl  text-left mb-2`}
                      >
                        Variants
                      </Typography>
                    </FormLabel>
                    <Box className={`flex flex-col`}>
                      {!isFetchingVariants &&
                        variants.map((variantOprions) => (
                          <Box key={variantOprions.id}>
                            <Typography
                              variant="h4"
                              color={colors.grey[100]}
                              fontWeight="bold"
                              className={`text-lg md:text-xl px-4 mt-4 text-left mb-2`}
                            >
                              {variantOprions.label}
                            </Typography>
                            {variantOprions.options.map((option) => (
                              <FormControlLabel
                                key={option.id}
                                value={option?.label}
                                control={<Checkbox color="secondary" />}
                                label={option?.label}
                                labelPlacement="end"
                                className="block ml-4"
                              />
                            ))}
                          </Box>
                        ))}
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            </Collapse>
          </Box>
          <Box className={`w-full lg:w-[75%] h-full`}>
            <Box className={`flex m-4 py-[20px] justify-between`}>
              <Typography
                variant="h1"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-xl md:text-2xl  text-left mb-2`}
              >
                Product List
              </Typography>
              {!isNoneMobile && (
                <Box>
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openCategory ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenCategory(!openCategory)}
                  >
                    Category
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openFilter ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    Filter
                  </Button>
                </Box>
              )}
            </Box>
            {!isFetchingSearchAndFilterProducts && (
              <ProductsList
                products={searchAndFilterProducts}
                isShopping={true}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box backgroundColor={colors.primary[400]} className={`px-1 md:px-auto`}>
        <Banner />
      </Box>
      <Box className="md:container px-2 md:mx-auto md:px-auto">
        <Service />
      </Box>
    </Box>
  );
};

export default Shopping;
