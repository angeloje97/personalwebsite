const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formattedDate = (date) => {
  if (!date) {
    return "";
  }

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const formatted = `${month} ${day}, ${year}`;

  return formatted;
};
