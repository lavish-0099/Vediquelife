export const allSlots = [
  "10 AM - 11 AM",
  "11 AM - 12 PM",
  "12 PM - 01 PM",
  "01 PM - 02 PM",
  "02 PM - 03 PM",
  "03 PM - 04 PM",
  "04 PM - 05 PM",
  "05 PM - 06 PM",
  "06 PM - 07 PM",
];

export function getAvailableSlots(day: "today" | "tomorrow") {
  const now = new Date();
  const currentHour = now.getHours();

  return allSlots.filter((slot) => {
    const [start] = slot.split(" - ");
    const slotHour = convertTo24Hour(start);

    if (day === "today") {
      return slotHour > currentHour; // sirf future slots aayenge
    }
    return true; // tomorrow ke liye sab available
  });
}

function convertTo24Hour(timeStr: string) {
  const [hourStr, meridian] = timeStr.split(" ");
  let hour = parseInt(hourStr);

  if (meridian === "PM" && hour !== 12) {
    hour += 12;
  }
  if (meridian === "AM" && hour === 12) {
    hour = 0;
  }

  return hour;
}
