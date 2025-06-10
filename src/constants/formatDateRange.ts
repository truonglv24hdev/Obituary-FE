export const formatDateRange = (start: string, end: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const startDate = new Date(start.split("/").reverse().join("-"));
  const endDate = new Date(end.split("/").reverse().join("-"));

  return `${startDate.toLocaleDateString(
    "en-US",
    options
  )} - ${endDate.toLocaleDateString("en-US", options)}`;
};

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateFormat = new Date(date.split("/").reverse().join("-"));

  return dateFormat.toLocaleDateString("en-US", options);
};
