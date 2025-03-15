export function isDateToday(date: string) {
  const today = new Date();
  const d = new Date(date);

  return today.getDate() === d.getDate();
}
