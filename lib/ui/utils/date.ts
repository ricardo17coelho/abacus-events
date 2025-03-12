import {
  format,
  formatDistanceToNow,
  type FormatDistanceToNowOptions,
} from 'date-fns';

export function formatDateByFormat(
  date: string | Date,
  dateFormat = 'dd.MM.yyyy',
) {
  return format(new Date(date), dateFormat);
}

export function formatDateTimeByFormat(
  date: string | Date,
  dateFormat = 'dd.MM.yyyy HH:mm',
) {
  return format(new Date(date), dateFormat);
}

export function formatDateDistanceToNow(
  date: string | Date,
  options?: FormatDistanceToNowOptions,
) {
  return formatDistanceToNow(new Date(date), options);
}

export function formatTimeByDatetime(date: string | Date) {
  return format(new Date(date), 'HH:mm');
}

export function convertMonthsInYears(months: number) {
  return Math.floor(months / 12);
}

export function convertYearsInMonths(years: number) {
  return years * 12;
}
