import { eachDayOfInterval, format, subDays } from "date-fns";

// ✅ Convert date string to Indian timezone (Optional, if needed)
const convertToIndianTimezone = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
};

// 🎯 Main function to generate date range filters
export const getDateRangeFilter = (dateRange?: string) => {
  let startDate: Date;
  let endDate: Date = new Date();

  let datesInRange: string[] = [];

  // 🟢 Handle date range or default to last 7 days
  if (dateRange && dateRange.trim()) {
    const [startDateStr, endDateStr] = dateRange.trim().split(" - ");

    if (startDateStr && endDateStr) {
      startDate = convertToIndianTimezone(startDateStr);
      endDate = convertToIndianTimezone(endDateStr);
    } else {
      startDate = subDays(new Date(), 7); // Default 7 days
    }
  } else {
    startDate = subDays(new Date(), 7); // Default 7 days
  }

  // ✅ Generate array of dates in range
  datesInRange = eachDayOfInterval({
    start: startDate,
    end: endDate,
  }).map((date) => format(date, "yyyy-MM-dd"));

  // ✅ Prepare where clause for DB query
  const dateWhereClause = {
    createdAt: {
      gte: new Date(new Date(startDate).setHours(0, 0, 0, 0)), // Start of the day
      lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)), // End of the day
    },
  };

  // 🧠 Return both results
  return { dateWhereClause, datesInRange };
};
