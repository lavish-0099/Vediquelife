export function getFormattedDateTimeForCOD() {
  const currentDate = new Date();

  const pad = (n: number) => (n < 10 ? "0" + n : n);

  const year = currentDate.getFullYear();
  const month = pad(currentDate.getMonth() + 1);
  const day = pad(currentDate.getDate());
  const hours = pad(currentDate.getHours());
  const minutes = pad(currentDate.getMinutes());
  const seconds = pad(currentDate.getSeconds());

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
