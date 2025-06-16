export const timeFormatter = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
export const dateFormatter = (dateStr) => {
  return dateStr.split("T")[0];
};
