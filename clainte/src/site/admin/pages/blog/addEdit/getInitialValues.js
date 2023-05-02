const getValue = (value, option) => {
  if (value) {
    return value;
  } else {
    return option;
  }
};
export const getInitialValues = (initialValues) => {
  return {
    title: getValue(initialValues?.title, ""),
    headline: getValue(initialValues?.headline, ""),
    slug: getValue(initialValues?.slug, ""),
    category: getValue(initialValues?.category?.name, ""),
    tags: getValue(
      initialValues?.tags?.map((tag) => tag.name),
      []
    ),
    body: getValue(initialValues?.body, ""),
    status: getValue(initialValues?.status, ""),
  };
};
