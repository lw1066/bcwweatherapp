export const formatDate = (dateStr: string): string => {
  const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  if (!isValidFormat) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
  }

  const [year, month, day] = dateStr.split('-').map(Number);

  const date = new Date(year, month - 1, day);

  // console.log(date, date.getTime());

  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  };
  return date.toLocaleDateString('en-US', options);
};
