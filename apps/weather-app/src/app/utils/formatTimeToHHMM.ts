export function formatTimeToHHMM(timeString: string): string {
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(timeString)) {
    throw new Error('Invalid time format. Expected HH:MM or HH:MM:SS');
  }
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
}
