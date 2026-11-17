export const formatDate = (date: Date) => {
  const d = new Date(date);

  const formatDate = d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formatDate;
};
