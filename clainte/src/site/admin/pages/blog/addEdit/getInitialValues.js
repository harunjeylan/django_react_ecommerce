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
    category: getValue(initialValues?.organize?.category?.name, ""),
    tags: getValue(
      initialValues?.organize?.tags?.map((tag) => tag.name),
      []
    ),
    body: getValue(initialValues?.description, ""),
    status: getValue(initialValues?.status, ""),
  };
};
