export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  };
  return date.toLocaleDateString('en-US', options);
};
