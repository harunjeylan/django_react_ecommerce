export const getDate = (stringDate) => {
  if (stringDate) {
    const [day, month, year] = stringDate.split("-");
    return new Date(year, month - 1, day);
  } else {
    return new Date();
  }
};
