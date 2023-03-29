import * as yup from "yup";
export const blogSchema = yup.object().shape({
  title: yup.string().required("Required"),
  headline: yup.string().required("Required"),
  slug: yup
    .string()
    .required("Required")
    .matches(
      /^[-\w]+$/,
      "The s must contain only alphabetical and '-' character"
    ),
  category: yup.string().required("Required"),
  body: yup.string().required("Required"),
  tags: yup.array().of(yup.string()),
  status: yup.string().required("Required"),
});
