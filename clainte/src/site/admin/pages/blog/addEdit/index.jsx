import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  IconButton,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Breadcrumbs, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { tokens } from "../../../../../theme";
import Header from "../../../../../components/Header";
import { Dropzone, FullScreenPreview } from "@dropzone-ui/react";
import { FileItem } from "@dropzone-ui/react";
import { Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { getInitialValues } from "./getInitialValues";
import { blogSchema } from "./blogSchema";
import {
  blogApi,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from "../../../../../features/services/blogApiSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import Model from "../../../../../components/ui/Model";
import {
  useAddOrganizeMutation,
  useDeleteOrganizeMutation,
  useGetAllOrganizeQuery,
  useUpdateOrganizeMutation,
} from "../../../../../features/services/organizeApiSlice";
import CloseIcon from "@mui/icons-material/Close";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    ["clean"],
    ["link", "image", "video"],
  ],
};

const Item = ({ item, itemName, handleUpdate, handleDelete }) => {
  const InputRef = useRef();

  useEffect(() => {
    InputRef.current.value = item.name;
  }, [item.name]);

  return (
    <Box className="flex justify-between items-center gap-2">
      <TextField
        size="small"
        color="secondary"
        fullWidth
        type="text"
        // value={item.value}
        defaultValue={item.name}
        label={itemName}
        inputRef={InputRef}
      />
      <IconButton
        onClick={() =>
          handleUpdate({
            name: itemName,
            id: item.id,
            value: InputRef.current.value,
          })
        }
      >
        <SaveAsIcon />
      </IconButton>
      <IconButton onClick={() => handleDelete({ name: itemName, id: item.id })}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

const AddEditBlog = ({ isEditing }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNoneMobile = useMediaQuery("(min-width:1024px)");
  const [openInfo, setOpenInfo] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [openRevision, setOpenRevision] = useState(false);

  const [openModel, setOpenModel] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const [modelInputLabel, setModelInputLabel] = useState("");
  const [addOrganize] = useAddOrganizeMutation();
  const [updateOrganize] = useUpdateOrganizeMutation();
  const [deleteOrganize] = useDeleteOrganizeMutation();

  const [imageSrc, setImageSrc] = useState(undefined);

  const [blogThumbnail, setBlogThumbnail] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const { blogSlug } = useParams();

  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [uploadImage] = useUploadBlogImageMutation();

  const modelInputRef = useRef();

  const { data: organize, isFetching: organizeIsFetching } =
    useGetAllOrganizeQuery();

  useEffect(() => {
    if (blogSlug && isEditing) {
      dispatch(
        blogApi.endpoints.getAdminBlogDetails.initiate({
          blogSlug,
        })
      ).then((response) => {
        if (response.isSuccess) {
          // console.log(response.data);
          setInitialValues(response.data);
        }
      });
    }
  }, [blogSlug, isEditing, dispatch]);
  const handleOpenModel = ({ inputLabel, modelTitle }) => {
    setModelInputLabel(inputLabel);
    setModelTitle(modelTitle);
    setOpenModel(true);
  };
  const handleAdd = () => {
    const data = {
      name: modelInputLabel,
      label: modelInputRef.current.value,
    };
    addOrganize({ post: data });
    console.log(data);
    modelInputRef.current.value = "";
    // setOpenModel(false);
  };
  const handleUpdate = ({ id, name, value }) => {
    const data = {
      id,
      name,
      label: value,
    };
    updateOrganize({ post: data });
    console.log(data);
  };
  const handleDelete = ({ id, name }) => {
    const data = {
      id,
      name,
    };
    console.log(data);
    deleteOrganize({ post: data }).then((res) => console.log(res));
  };
  const handleClean = (image) => {
    console.log("list cleaned", image);
  };
  const handleFormSubmit = useCallback((values) => {
    console.log(values);

    if (blogSlug) {
      updateBlog({ post: values, blogSlug }).then((res) => {
        let postForm = new FormData();
        postForm.append("thumbnail", blogThumbnail[0]?.file);
        postForm.append("blogId", res.data.id);
        uploadImage({
          post: postForm,
        }).then((response) => {
          console.log(response);
          navigate(`/admin/blogs/${blogSlug}`);
        });
      });
    } else {
      addBlog({ post: values }).then((res) => {
        let postForm = new FormData();
        postForm.append("thumbnail", blogThumbnail[0]?.file);
        postForm.append("blogId", res.data.id);
        uploadImage({
          post: postForm,
        }).then((response) => {
          navigate(`/admin/blogs/${res.data.slug}`);
        });
      });
    }
  });

  return (
    <>
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle={modelTitle}
      >
        <Box className="w-full">
          <Box className="flex justify-between items-center gap-2 mb-2">
            <TextField
              size="small"
              color="secondary"
              fullWidth
              variant="filled"
              type="text"
              name={modelInputLabel}
              label={modelInputLabel}
              inputRef={modelInputRef}
            />
            <IconButton onClick={handleAdd}>
              <SaveAsIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box className="flex flex-col gap-4 mt-4">
            {!organizeIsFetching &&
              organize &&
              organize[modelInputLabel]?.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  itemName={modelInputLabel}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              ))}
          </Box>
        </Box>
      </Model>
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
        <Box
          className={`md:container px-2 md:mx-auto md:px-auto flex flex-col-reverse md:flex-row gap-4`}
        >
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
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={getInitialValues(initialValues)}
              validationSchema={blogSchema}
              enableReinitialize={true}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="w-full px-4 flex flex-col  gap-4"
                >
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
                      fullWidth
                      variant="filled"
                      color="secondary"
                      placeholder="title"
                      type="text"
                      label="Blog Title"
                      onChange={handleChange}
                      value={values.title}
                      name="title"
                      onBlur={handleBlur}
                      error={!!touched.title && !!errors.title}
                      helperText={touched.title && errors.title}
                    />
                  </Box>
                  <Box className="w-full">
                    <Typography variant="h6" fontWeight="bold" className="my-2">
                      Headline
                    </Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      color="secondary"
                      placeholder="headline"
                      type="text"
                      label="Headline"
                      onChange={handleChange}
                      value={values.headline}
                      name="headline"
                      onBlur={handleBlur}
                      error={!!touched.headline && !!errors.headline}
                      helperText={touched.headline && errors.headline}
                    />
                  </Box>
                  <Box className="w-full">
                    <Typography variant="h6" fontWeight="bold" className="my-2">
                      Slug
                    </Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      color="secondary"
                      placeholder="slug"
                      type="text"
                      label="Slug"
                      onChange={handleChange}
                      value={values.slug}
                      name="slug"
                      onBlur={handleBlur}
                      error={!!touched.slug && !!errors.slug}
                      helperText={touched.slug && errors.slug}
                    />
                  </Box>
                  <Box className="w-full">
                    <Box className="w-full flex justify-between px-1 gap-2">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        Category
                      </Typography>
                      <Typography
                        onClick={() =>
                          handleOpenModel({
                            inputLabel: "categories",
                            modelTitle: "Add Category",
                          })
                        }
                        variant="h6"
                        fontWeight="bold"
                        className={`my-2 cursor-pointer hover:text-green-400`}
                        color={colors.blueAccent[400]}
                      >
                        More
                      </Typography>
                    </Box>
                    <FormControl variant="filled" className="w-full">
                      <InputLabel id="category-select-label">
                        Category
                      </InputLabel>
                      <Select
                        fullWidth
                        color="secondary"
                        labelId="category-select-label"
                        id="categories-select"
                        variant="filled"
                        name="category"
                        value={values?.category}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched?.category && !!errors?.category}
                      >
                        {!organizeIsFetching &&
                          organize.categories?.map((category) => (
                            <MenuItem key={category.id} value={category.name}>
                              {category.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box className="w-full">
                    <Box className="w-full flex justify-between px-1 gap-2 items-center">
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        className="my-2"
                      >
                        Tags
                      </Typography>

                      <Typography
                        onClick={() =>
                          handleOpenModel({
                            inputLabel: "tags",
                            modelTitle: "Add Tags",
                          })
                        }
                        variant="subtitle"
                        fontWeight="bold"
                        className={`my-2 cursor-pointer hover:text-green-400`}
                        color={colors.blueAccent[400]}
                      >
                        More
                      </Typography>
                    </Box>
                    <FormControl variant="filled" className="w-full">
                      <InputLabel id="tags-select-label">Tags</InputLabel>
                      <Select
                        fullWidth
                        multiple
                        color="secondary"
                        labelId="tags-select-label"
                        id="tags-select"
                        variant="filled"
                        value={values?.tags}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
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
                        name="tags"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched?.tags && !!errors?.tags}
                      >
                        {!organizeIsFetching &&
                          organize.tags?.map((tag) => (
                            <MenuItem key={tag.id} value={tag.name}>
                              {tag.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box className="w-full h-fit">
                    <Typography variant="h6" fontWeight="bold" className="my-2">
                      Body
                    </Typography>
                    <Field name="body">
                      {({ meta }) => (
                        <Box>
                          <ReactQuill
                            theme="snow"
                            value={values.body}
                            modules={modules}
                            onBlur={handleBlur}
                            onChange={(newVal) => setFieldValue("body", newVal)}
                          />
                          {meta.touched && meta.error && (
                            <div className="error">{meta.error}</div>
                          )}
                        </Box>
                      )}
                    </Field>
                  </Box>
                  <Box className="w-full">
                    <Typography variant="h6" fontWeight="bold" className="my-2">
                      Status
                    </Typography>
                    <FormControl variant="filled" className="w-full">
                      <InputLabel id="status-select-label">Status</InputLabel>
                      <Select
                        fullWidth
                        color="secondary"
                        labelId="status-select-label"
                        id="status-select"
                        variant="filled"
                        name="status"
                        defaultValue=""
                        onChange={handleChange}
                        value={values.status}
                        onBlur={handleBlur}
                        error={!!touched.status && !!errors.status}
                      >
                        <MenuItem value={"published"}>{"Published"}</MenuItem>
                        <MenuItem value={"scheduled"}>{"Scheduled"}</MenuItem>
                        <MenuItem value={"draft"}>{"Draft"}</MenuItem>
                        <MenuItem value={"deleted"}>{"Deleted"}</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box className="flex justify-start my-4">
                    <Button
                      type="submit"
                      color="secondary"
                      variant="outlined"
                      className={`px-8 py-3 `}
                    >
                      {blogSlug && isEditing ? "Save Blog" : "Create Blog"}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
          {isEditing && (
            <Box className="w-full md:w-1/4 flex flex-col gap-4">
              {!isNoneMobile && (
                <Box className="w-full flex gap-4">
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openInfo ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenInfo(!openInfo)}
                  >
                    Post Info
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openAction ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenAction(!openAction)}
                  >
                    Actions
                  </Button>
                  <Button
                    variant="text"
                    sx={{ color: colors.grey[100] }}
                    endIcon={
                      openRevision ? (
                        <ExpandLess color={colors.grey[100]} />
                      ) : (
                        <ExpandMore color={colors.grey[100]} />
                      )
                    }
                    onClick={() => setOpenRevision(!openRevision)}
                  >
                    Revision History
                  </Button>
                </Box>
              )}
              <Collapse
                in={isNoneMobile || openInfo}
                timeout="auto"
                unmountOnExit
                className="w-full rounded-md py-4 flex flex-col gap-4"
                sx={{
                  backgroundColor: colors.primary[400],
                }}
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
                <Box className="w-full px-4 flex flex-col gap-2 py-2">
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Post ID
                  </Typography>
                  <Typography fontWeight={"bold"} variant="h5">
                    {initialValues.id}
                  </Typography>
                </Box>
                <Divider />
                <Box className="w-full px-4 flex flex-col gap-2 py-2">
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Status
                  </Typography>
                  <Typography fontWeight={"bold"} variant="h5">
                    {initialValues.status}
                  </Typography>
                </Box>
                <Divider />
                <Box className="w-full px-4 flex flex-col gap-2 py-2">
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
                <Box className="w-full px-4 flex flex-col gap-2 py-2">
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Created at
                  </Typography>
                  <Typography fontWeight={"bold"} variant="h5">
                    {initialValues.created}
                  </Typography>
                </Box>
                <Divider />
                <Divider />

                <Box className="w-full px-4 flex flex-col gap-2 py-2">
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Last update
                  </Typography>
                  <Typography fontWeight={"bold"} variant="h5">
                    {initialValues.updated}
                  </Typography>
                </Box>
                <Divider />

                <Box className="w-full px-4 flex flex-col gap-2 py-2">
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Last Published
                  </Typography>
                  <Typography fontWeight={"bold"} variant="h5">
                    {initialValues.published}
                  </Typography>
                </Box>
              </Collapse>

              <Collapse
                in={isNoneMobile || openAction}
                timeout="auto"
                unmountOnExit
                className="w-full rounded-md py-4 flex flex-col gap-4"
                sx={{
                  backgroundColor: colors.primary[400],
                }}
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
                <Box className="w-full px-4 flex justify-between items-center gap-2 py-2">
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Unpublished
                  </Typography>
                  <IconButton>
                    <UnpublishedIcon color="warning" />
                  </IconButton>
                </Box>
                <Divider />
                <Box className="w-full px-4 flex justify-between items-center gap-2 py-2">
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    Delete
                  </Typography>
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
                <Divider />
              </Collapse>

              <Collapse
                in={isNoneMobile || openRevision}
                timeout="auto"
                unmountOnExit
                className="w-full rounded-md py-4 flex flex-col gap-4"
                sx={{
                  backgroundColor: colors.primary[400],
                }}
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
                <Box className="w-full px-4 flex justify-between items-center gap-2 py-2">
                  <Typography
                    fontWeight={"bold"}
                    variant="h5"
                    sx={{ color: colors.grey[200] }}
                    className=""
                  >
                    {initialValues.published}
                  </Typography>
                  <Typography fontWeight={"bold"} variant="h5">
                    Published
                  </Typography>
                </Box>
                <Divider />
              </Collapse>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
export default AddEditBlog;
