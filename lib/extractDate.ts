export const convertToIndianTimezone = (dateString: string) => {
  const extractedDate = dateString.split("T")[0];
  const dateInIST = new Date(extractedDate);
  return dateInIST;
};
