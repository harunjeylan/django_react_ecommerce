import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  TextField,
  useTheme,
  MenuItem,
  OutlinedInput,
  Chip,
  Avatar,
} from "@mui/material";
import { Breadcrumbs, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import { useState } from "react";
import { Dropzone, FullScreenPreview } from "@dropzone-ui/react";
import { FileItem } from "@dropzone-ui/react";

const AddEditBlog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  // const [openModel, setOpenModel] = useState(false);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [blogThumbnail, setBlogThumbnail] = useState([]);
  // const [blogValue, setBlogValue] = useState("");
  const handleClean = (image) => {
    console.log("list cleaned", image);
  };
  return (
    <>
      <FullScreenPreview
        imgSource={imageSrc}
        openImage={imageSrc}
        onClose={() => setImageSrc(undefined)}
      />
      <Box className={`flex flex-col gap-4 md:gap-8 md:my-10`}>
        <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
          <Breadcrumbs aria-label="breadcrumb">
            <Button
              onClick={() => navigate(`/`)}
              variant="text"
              color="secondary"
            >
              Admin Dashboard
            </Button>
            <Typography color="text.primary">New Blog</Typography>
          </Breadcrumbs>
        </Box>
        <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
          <Header
            title="Add New Post"
            subtitle="Frequently Asked Questions Page"
          />
        </Box>
        <Box className={`md:container px-2 md:mx-auto md:px-auto flex gap-4`}>
          <Box
            backgroundColor={colors.primary[400]}
            className="w-full md:w-3/4 rounded-md py-4"
          >
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-xl md:text-2xl p-4 text-left`}
            >
              Create Post
            </Typography>
            <Divider />
            <Box className="w-full px-4 flex flex-col  gap-4">
              <Box className="w-full">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Display Thumbnail
                </Typography>
                <Dropzone
                  style={{
                    minHeight: "200px",
                    minWidth: "100%",
                    backgroundColor: colors.primary[400],
                  }}
                  label="Drop your Display thumbnail here or click to browse"
                  onChange={(incomingImages) =>
                    setBlogThumbnail(incomingImages)
                  }
                  onClean={handleClean}
                  value={blogThumbnail}
                  maxFiles={1}
                  maxFileSize={2998000}
                  accept=".png,image/*"
                  uploadingMessage={"Uploading..."}
                >
                  {blogThumbnail.length &&
                    blogThumbnail.map((file) => (
                      <FileItem
                        {...file}
                        key={file.id}
                        onDelete={(id) =>
                          setBlogThumbnail(
                            blogThumbnail.filter((x) => x.id !== id)
                          )
                        }
                        onSee={(imageSource) => setImageSrc(imageSource)}
                        resultOnTooltip
                        preview
                        info
                        hd
                      />
                    ))}
                </Dropzone>
              </Box>
              <Box className="w-full">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Title
                </Typography>
                <TextField
                  variant="filled"
                  color="secondary"
                  fullWidth
                  placeholder="title"
                />
              </Box>
              <Box className="w-full">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Headline
                </Typography>
                <TextField
                  variant="filled"
                  color="secondary"
                  fullWidth
                  placeholder="headline"
                />
              </Box>
              <Box className="w-full">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Category
                </Typography>
                <FormControl variant="filled" className="w-full">
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    fullWidth
                    color="secondary"
                    labelId="category-select-label"
                    id="category-select"
                    variant="filled"
                    name="category"
                    defaultValue=""
                  >
                    <MenuItem value={"category 1"}>{"category 1"}</MenuItem>
                    <MenuItem value={"category 2"}>{"category 2"}</MenuItem>
                    <MenuItem value={"category 3"}>{"category 3"}</MenuItem>
                    <MenuItem value={"category 4"}>{"category 4"}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="w-full">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Tags
                </Typography>
                <FormControl variant="filled" className="w-full">
                  <InputLabel id="tags-select-label">Tag</InputLabel>
                  <Select
                    fullWidth
                    color="secondary"
                    labelId="tags-select-label"
                    id="tags-select"
                    variant="filled"
                    name="brand"
                    multiple
                    defaultValue={[]}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        {selected?.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    <MenuItem value={"tag 1"}>{"tag 1"}</MenuItem>
                    <MenuItem value={"tag 2"}>{"tag 2"}</MenuItem>
                    <MenuItem value={"tag 3"}>{"tag 3"}</MenuItem>
                    <MenuItem value={"tag 4"}>{"tag 4"}</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className="w-full">
                <Typography variant="h6" fontWeight="bold" className="my-2">
                  Body
                </Typography>
                <TextField
                  variant="filled"
                  color="secondary"
                  fullWidth
                  placeholder="headline"
                  multiline
                  minRows={5}
                />
              </Box>
            </Box>
          </Box>
          <Box className="w-full md:w-1/4 flex flex-col gap-4">
            <Box
              backgroundColor={colors.primary[400]}
              className="w-full rounded-md py-4 flex flex-col gap-4"
            >
              <Box className="w-full flex-col">
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl p-4 text-left`}
                >
                  Post Info
                </Typography>
                <Divider />
              </Box>
              <Box className="w-full px-4 flex flex-col gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Post ID
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  8693637308
                </Typography>
              </Box>
              <Divider />
              <Box className="w-full px-4 flex flex-col gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Status
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  Published (unsaved changes)
                </Typography>
              </Box>
              <Divider />
              <Box className="w-full px-4 flex flex-col gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Created by
                </Typography>
                <Box className="flex justify-start items-center gap-4">
                  <Avatar>A</Avatar>

                  <Typography fontWeight={"bold"} variant="h5">
                    Admin
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box className="w-full px-4 flex flex-col gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Created at
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  Jul 30, 2:21 PM
                </Typography>
              </Box>
              <Divider />
              <Box className="w-full px-4 flex flex-col gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  First published at
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  Jul 30, 2:21 PM
                </Typography>
              </Box>
              <Divider />

              <Box className="w-full px-4 flex flex-col gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Last update
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  Jul 30, 2:21 PM
                </Typography>
              </Box>
              <Divider />

              <Box className="w-full px-4 flex flex-col gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Last Published
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  Jul 30, 2:21 PM
                </Typography>
              </Box>
            </Box>
            <Box
              backgroundColor={colors.primary[400]}
              className="w-full rounded-md py-4 flex flex-col gap-4"
            >
              <Box className="w-full flex-col">
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl p-4 text-left`}
                >
                  Actions
                </Typography>
                <Divider />
              </Box>
              <Box className="w-full px-4 flex justify-between items-center gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Unpublished
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  8693637308
                </Typography>
              </Box>
              <Divider />
              <Box className="w-full px-4 flex justify-between items-center gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Duplicate
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  8693637308
                </Typography>
              </Box>
              <Divider />
              <Box className="w-full px-4 flex justify-between items-center gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Delete
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  8693637308
                </Typography>
              </Box>
              <Divider />
            </Box>
            <Box
              backgroundColor={colors.primary[400]}
              className="w-full rounded-md py-4 flex flex-col gap-4"
            >
              <Box className="w-full flex-col">
                <Typography
                  variant="h1"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-xl md:text-2xl p-4 text-left`}
                >
                  Revision History
                </Typography>
                <Divider />
              </Box>
              <Box className="w-full px-4 flex justify-between items-center gap-2">
                <Typography
                  fontWeight={"bold"}
                  variant="h5"
                  sx={{ color: colors.grey[200] }}
                  className=""
                >
                  Aug 31, 12:21 PM
                </Typography>
                <Typography fontWeight={"bold"} variant="h5">
                  Published
                </Typography>
              </Box>
              <Divider />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddEditBlog;
