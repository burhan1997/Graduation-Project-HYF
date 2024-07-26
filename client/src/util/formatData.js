export const formatDate = (dateInput) => {
  let date;

  if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    date = new Date(dateInput);

    if (isNaN(date.getTime())) {
      return "";
    }
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
