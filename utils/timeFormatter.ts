export const formatTimeSpent = (
  milliseconds: number | null | undefined
): string => {
  if (!milliseconds || milliseconds <= 0) return "Less than a second";

  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes} min ${remainingSeconds} sec`;
  } else {
    return `${remainingSeconds} sec`;
  }
};
