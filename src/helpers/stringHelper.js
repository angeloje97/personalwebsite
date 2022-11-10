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

export const stringList = (items) => {
  let result = "";

  for (let i = 0; i < items.length; i++) {
    if (result.length > 0 && items[i].length > 0) {
      result += ", ";
    }

    result += items[i];
  }

  return result;
};
